import axios from "axios";
import { parse } from "csv-parse/sync";
import { FoodRecommendation } from "@/lib/types/food";
import { getDriveImageUrl } from "@/lib/utils/image";

interface SheetRow {
    City?: string;
    "Area / Locality"?: string;
    "Shop / Restaurant Name"?: string;
    "Food Category"?: string;
    "Best Food / Dish"?: string;
    Rating?: string;
    "Why do you recommend it?"?: string;
    "Food Image"?: string;
}

const CACHE_DURATION_MS = 60_000;

let cachedFoods: FoodRecommendation[] | null = null;
let cacheExpiresAt = 0;
let pendingRequest: Promise<FoodRecommendation[]> | null = null;

function valueOrEmpty(value: string | undefined): string {
    return value?.trim() ?? "";
}

async function fetchFoodFromSheet(): Promise<FoodRecommendation[]> {
    // Ensure your URL has the correct gid for Form responses 4
    const url = process.env.FOOD_SHEET_CSV_URL;

    if (!url) {
        throw new Error("Food data is not configured. Check FOOD_SHEET_CSV_URL.");
    }

    const response = await axios.get<string>(url, {
        timeout: 8_000,
        responseType: "text",
    });

    const rows = parse(response.data, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    }) as SheetRow[];

    return rows.flatMap((row) => {
        const city = valueOrEmpty(row.City);
        const area = valueOrEmpty(row["Area / Locality"]);
        const shopName = valueOrEmpty(row["Shop / Restaurant Name"]);
        const category = valueOrEmpty(row["Food Category"]);
        const foodName = valueOrEmpty(row["Best Food / Dish"]);
        const rating = Number(row.Rating);

        if (
            !city ||
            !area ||
            !shopName ||
            !category ||
            !foodName ||
            !Number.isFinite(rating) ||
            rating < 0 ||
            rating > 5
        ) {
            return [];
        }

        return [
            {
                city,
                area,
                shopName,
                category,
                foodName,
                rating,
                reason: valueOrEmpty(row["Why do you recommend it?"]),
                imageUrl: getDriveImageUrl(valueOrEmpty(row["Food Image"])),
                mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${shopName} ${area} ${city}`
                )}`,
            },
        ];
    });
}

export async function getFoodFromSheet(): Promise<FoodRecommendation[]> {
    if (cachedFoods && Date.now() < cacheExpiresAt) {
        return cachedFoods;
    }

    if (pendingRequest) {
        return pendingRequest;
    }

    pendingRequest = fetchFoodFromSheet();

    try {
        const foods = await pendingRequest;
        cachedFoods = foods;
        cacheExpiresAt = Date.now() + CACHE_DURATION_MS;
        return foods;
    } finally {
        pendingRequest = null;
    }
}