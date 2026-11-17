import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAppTool } from "@modelcontextprotocol/ext-apps/server";
import { z } from "zod";
import {
  getTopFoods,
  searchFood,
  SearchFoodInput,
} from "@/lib/food/food.service";
import { foodWidgetToolMeta } from "@/lib/mcp-widget-config";
import {
  buildFoodErrorResult,
  buildFoodToolResult,
} from "@/lib/food-tool-result";

interface TopFoodsInput {
  city?: string;
  category?: string;
  limit?: number;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Food recommendations could not be loaded.";
}

export function registerRecommendationTools(server: McpServer) {
  const toolMeta = foodWidgetToolMeta();

  registerAppTool(
    server,
    "search_food",
    {
      title: "Search Food",
      description:
        "Search food and restaurants by city, dish, area, or category. Defaults to Jodhpur.",
      inputSchema: {
        city: z.string().optional().describe("City name, defaults to Jodhpur"),
        area: z.string().optional().describe("Area or locality"),
        category: z.string().optional().describe("Food category"),
        foodName: z.string().optional().describe("Dish name"),
        limit: z.number().int().min(1).max(20).optional().describe("Max items (1-20)"),
      },
      _meta: toolMeta,
    },
    async (input: SearchFoodInput) => {
      try {
        const results = await searchFood({
          city: input.city?.trim() || "Jodhpur",
          area: input.area,
          category: input.category,
          foodName: input.foodName,
          limit: input.limit ?? 10,
        });

        const label = results.length
          ? `Found ${results.length} food recommendations.`
          : "No matching food recommendations were found.";

        return buildFoodToolResult(results, label);
      } catch (error) {
        return buildFoodErrorResult(getErrorMessage(error));
      }
    }
  );

  registerAppTool(
    server,
    "get_top_foods",
    {
      title: "Get Top Foods",
      description:
        "Get the highest-rated food recommendations in a city. Defaults to Jodhpur.",
      inputSchema: {
        city: z.string().optional().describe("City name, defaults to Jodhpur"),
        category: z.string().optional().describe("Optional category to filter top rated foods"),
        limit: z.number().int().min(1).max(10).optional().describe("Max items (1-10)"),
      },
      _meta: toolMeta,
    },
    async (input: TopFoodsInput) => {
      try {
        const results = await getTopFoods(
          input.city?.trim() || "Jodhpur",
          input.category,
          input.limit ?? 5
        );

        const label = results.length
          ? `Found ${results.length} top food recommendations.`
          : "No matching food recommendations were found.";

        return buildFoodToolResult(results, label);
      } catch (error) {
        return buildFoodErrorResult(getErrorMessage(error));
      }
    }
  );
}
