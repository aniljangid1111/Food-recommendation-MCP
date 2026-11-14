import { FoodRecommendation } from "@/lib/types/food";
import { getFoodFromSheet } from "@/lib/google/sheets.service";

export interface SearchFoodInput {
    city?: string;
    area?: string;
    category?: string;
    foodName?: string;
    limit?: number;
}

function normalize(value: string): string {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\b(vada|vadaa|vado)\b/g, "bada")
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");
}

export async function searchFood({
    city = "Jodhpur",
    area,
    category,
    foodName,
    limit = 10,
}: SearchFoodInput): Promise<FoodRecommendation[]> {
    const foods = await getFoodFromSheet();

    const normalizedCity = normalize(city);
    const normalizedArea = area ? normalize(area) : "";
    const normalizedCategory = category ? normalize(category) : "";
    const normalizedFoodName = foodName ? normalize(foodName) : "";

    return foods
        .filter((food) => {
            return (
                normalize(food.city) === normalizedCity &&
                (!normalizedArea || normalize(food.area).includes(normalizedArea)) &&
                (!normalizedCategory ||
                    normalize(food.category).includes(normalizedCategory)) &&
                (!normalizedFoodName ||
                    normalize(food.foodName).includes(normalizedFoodName) ||
                    normalizedFoodName.includes(normalize(food.foodName)))
            );
        })
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}

export async function getTopFoods(
    city = "Jodhpur",
    category?: string,
    limit = 5
): Promise<FoodRecommendation[]> {
    const foods = await getFoodFromSheet();
    const normalizedCity = normalize(city);
    const normalizedCategory = category ? normalize(category) : "";

    return foods
        .filter(
            (food) =>
                normalize(food.city) === normalizedCity &&
                (!normalizedCategory ||
                    normalize(food.category).includes(normalizedCategory))
        )
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}