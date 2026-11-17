import axios from "axios";
import { parse } from "csv-parse/sync";
import { FoodRecommendation } from "@/lib/types/food";
import { getDriveImageUrl } from "@/lib/utils/image";

const CACHE_DURATION_MS = 60_000;

let cachedFoods: FoodRecommendation[] | null = null;
let cacheExpiresAt = 0;
let pendingRequest: Promise<FoodRecommendation[]> | null = null;

function valueOrEmpty(value: string | undefined): string {
    return value?.trim() ?? "";
}

function extractFoodImage(row: Record<string, string | undefined>): string {
    for (const [key, val] of Object.entries(row)) {
        if (/image/i.test(key) && val?.trim()) {
            return val.trim();
        }
    }
    return "";
}

function extractMapsUrl(row: Record<string, string | undefined>, defaultUrl: string): string {
    for (const [key, val] of Object.entries(row)) {
        if (/maps|location/i.test(key) && val?.trim()) {
            return val.trim();
        }
    }
    return defaultUrl;
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
        columns: (header: string[]) => {
            const counts: Record<string, number> = {};
            return header.map((h) => {
                const trimmed = h.trim();
                counts[trimmed] = (counts[trimmed] || 0) + 1;
                return counts[trimmed] > 1 ? `${trimmed}_${counts[trimmed]}` : trimmed;
            });
        },
        skip_empty_lines: true,
        trim: true,
    }) as Record<string, string>[];

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

        const defaultMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${shopName} ${area} ${city}`
        )}`;

        const rawImageUrl = extractFoodImage(row);

        return [
            {
                city,
                area,
                shopName,
                category,
                foodName,
                rating,
                reason: valueOrEmpty(row["Why do you recommend it?"]),
                imageUrl: getDriveImageUrl(rawImageUrl),
                mapsUrl: extractMapsUrl(row, defaultMapsUrl),
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