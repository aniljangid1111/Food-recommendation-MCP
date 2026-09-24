"use client";

import type { FoodRecommendation } from "@/lib/types/food";

interface FoodWidgetProps {
  foods: FoodRecommendation[];
}

export default function App({ foods }: FoodWidgetProps) {
  return (
    <div className="grid gap-4">
      {foods.map((food, index) => (
        <div
          key={`${food.shopName}-${food.foodName}-${index}`}
          className="overflow-hidden rounded-2xl border bg-white shadow-sm"
        >
          {food.imageUrl && (
            <img
              src={food.imageUrl}
              alt={food.foodName}
              className="h-48 w-full object-cover"
            />
          )}

          <div className="p-4">
            <div className="flex justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">
                  {food.foodName}
                </h2>

                <p className="font-medium">
                  {food.shopName}
                </p>
              </div>

              <span>⭐ {food.rating}</span>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              📍 {food.area}, {food.city}
            </p>

            <span className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs">
              {food.category}
            </span>

            {food.reason && (
              <p className="mt-3 text-sm text-gray-600">
                {food.reason}
              </p>
            )}

            {food.mapsUrl && (
              <a
                href={food.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block rounded-xl bg-black px-4 py-2 text-center text-sm text-white"
              >
                📍 View on Maps
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}