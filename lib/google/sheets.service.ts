import axios from "axios";
import { parse } from "csv-parse/sync";
import { FoodRecommendation } from "@/lib/types/food";

interface SheetRow {
  City: string;
  "Area / Locality": string;
  "Shop / Restaurant Name": string;
  "Food Category": string;
  "Best Food / Dish": string;
  Rating: string;
  "Why do you recommend it?": string;
}

export async function getFoodFromSheet(): Promise<FoodRecommendation[]> {
  const url = process.env.FOOD_SHEET_CSV_URL;

  if (!url) {
    throw new Error("FOOD_SHEET_CSV_URL is not configured");
  }

  const response = await axios.get(url);

  const rows = parse(response.data, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as SheetRow[];

  return rows.map((row) => ({
    city: row.City,
    area: row["Area / Locality"],
    shopName: row["Shop / Restaurant Name"],
    category: row["Food Category"],
    foodName: row["Best Food / Dish"],
    rating: Number(row.Rating),
    reason: row["Why do you recommend it?"],
  }));
}