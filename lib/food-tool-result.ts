import type { FoodRecommendation } from "@/lib/types/food";
import { getAppOrigin, getWidgetCsp } from "@/lib/mcp-widget-config";

export function buildFoodToolResult(
  results: FoodRecommendation[],
  label: string
) {
  const structuredContent = {
    count: results.length,
    label,
    results,
  };

  const { csp, openaiCsp } = getWidgetCsp(getAppOrigin());

  // Detailed textual summary for LLM context and non-UI clients
  const foodTextDetails = results
    .map((food) => {
      const parts = [
        `### ${food.foodName} (${food.shopName})`,
        `Rating: ${food.rating} / 5`,
        `Location: ${[food.area, food.city].filter(Boolean).join(", ")}`,
        food.category ? `Category: ${food.category}` : "",
        food.reason ? `Note: ${food.reason}` : "",
        food.mapsUrl ? `Google Maps: ${food.mapsUrl}` : "",
      ].filter(Boolean);
      return parts.join("\n");
    })
    .join("\n\n---\n\n");

  const fullText = results.length > 0 ? `${label}\n\n${foodTextDetails}` : label;

  return {
    content: [
      {
        type: "text" as const,
        text: fullText,
      },
    ],
    structuredContent,
    _meta: {
      results,
      ui: { csp },
      "openai/widgetCSP": openaiCsp,
    },
  };
}

export function buildFoodErrorResult(errorMessage: string) {
  return {
    isError: true,
    content: [
      {
        type: "text" as const,
        text: errorMessage,
      },
    ],
  };
}
