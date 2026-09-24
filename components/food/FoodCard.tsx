import { FoodRecommendation } from "@/lib/types/food";

interface FoodCardProps {
  food: FoodRecommendation;
}

export default function FoodCard({ food }: FoodCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur">
      {food.imageUrl ? (
        <img
          src={food.imageUrl}
          alt={food.foodName}
          className="h-52 w-full object-cover"
        />
      ) : (
        <div className="flex h-52 items-center justify-center bg-white/10 text-gray-500">
          No Image
        </div>
      )}

      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white">
              {food.foodName}
            </h2>

            <p className="mt-1 text-gray-300">
              {food.shopName}
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-yellow-400/10 px-3 py-1 text-sm text-yellow-300">
            ⭐ {food.rating}
          </span>
        </div>

        <p className="text-sm text-gray-400">
          📍 {food.area}, {food.city}
        </p>

        <span className="mt-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
          {food.category}
        </span>

        {food.reason && (
          <p className="mt-4 text-sm leading-6 text-gray-400">
            {food.reason}
          </p>
        )}

        {food.mapsUrl && (
          <a
            href={food.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 block rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
          >
            📍 View on Google Maps
          </a>
        )}
      </div>
    </article>
  );
}