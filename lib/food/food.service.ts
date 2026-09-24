import { FoodRecommendation } from "@/lib/types/food";
import { getFoodFromSheet } from "@/lib/google/sheets.service";

export async function searchFood({
    city,
    area,
    category,
    foodName,
}: {
    city: string;
    area?: string;
    category?: string;
    foodName?: string;
}): Promise<FoodRecommendation[]> {
    const foods = await getFoodFromSheet();

    return foods
        .filter((food) => {
            const cityMatch =
                food.city.toLowerCase() === city.toLowerCase();

            const areaMatch = area
                ? food.area.toLowerCase() === area.toLowerCase()
                : true;

            const categoryMatch = category
                ? food.category.toLowerCase() === category.toLowerCase()
                : true;

            const foodNameMatch = foodName
                ? food.foodName
                    .toLowerCase()
                    .includes(foodName.toLowerCase())
                : true;

            return (
                cityMatch &&
                areaMatch &&
                categoryMatch &&
                foodNameMatch
            );
        })
        .sort((a, b) => b.rating - a.rating);
}

export async function getTopFoods(
    city: string,
    category?: string,
    limit: number = 5
): Promise<FoodRecommendation[]> {
    const foods = await getFoodFromSheet();

    console.log("FOODS FROM SHEET:", foods);
    console.log("SEARCH INPUT:", { city, category, limit });

    const results = foods
        .filter((food) => {
            const cityMatch =
                food.city.toLowerCase() === city.toLowerCase();

            const categoryMatch = category
                ? food.category.toLowerCase() === category.toLowerCase()
                : true;

            return cityMatch && categoryMatch;
        })
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);

    console.log("TOP FOOD RESULTS:", results);

    return results;
}