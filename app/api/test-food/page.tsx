"use client";

import { useEffect, useState } from "react";
import FoodCard from "@/components/food/FoodCard";
import { FoodRecommendation } from "@/lib/types/food";

export default function TestFoodPage() {
  const [foods, setFoods] = useState<FoodRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFoods() {
      try {
        const response = await fetch("/api/test-sheet");
        const result = await response.json();

        if (result.success) {
          setFoods(result.data);
        }
      } catch (error) {
        console.error("Failed to load food:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFoods();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        Loading food...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium text-orange-400">
            FOOD RECOMMENDATIONS
          </p>

          <h1 className="text-4xl font-bold">
            Jodhpur Food Guide 🍴
          </h1>

          <p className="mt-3 text-gray-400">
            Recommended food and places from local food lovers.
          </p>
        </div>

        {foods.length === 0 ? (
          <p className="text-gray-400">
            No food recommendations found.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {foods.map((food, index) => (
              <FoodCard
                key={`${food.shopName}-${food.foodName}-${index}`}
                food={food}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}