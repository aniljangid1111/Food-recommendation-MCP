import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAppTool } from "@modelcontextprotocol/ext-apps/server";
import {
  getTopFoods,
  searchFood,
  SearchFoodInput,
} from "@/lib/food/food.service";

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
  registerAppTool(
    server,
    "search_food",
    {
      title: "Search Food",
      description:
        "Search food and restaurants by city, dish, area, or category. City defaults to Jodhpur.",
      inputSchema: {
        city: z.string().optional(),
        area: z.string().optional(),
        category: z.string().optional(),
        foodName: z.string().optional(),
        limit: z.number().int().min(1).max(20).optional(),
      },
      _meta: {
        ui: {
          resourceUri: "ui://food/recommendations",
        },
      },
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

        return {
          content: [
            {
              type: "text" as const,
              text: results.length
                ? `Found ${results.length} food recommendations.`
                : "No matching food recommendations were found.",
            },
          ],
          structuredContent: { results },
        };
      } catch (error) {
        return {
          isError: true,
          content: [
            {
              type: "text" as const,
              text: getErrorMessage(error),
            },
          ],
        };
      }
    }
  );

  registerAppTool(
    server,
    "get_top_foods",
    {
      title: "Get Top Foods",
      description:
        "Get the highest-rated food recommendations in a city. City defaults to Jodhpur.",
      inputSchema: {
        city: z.string().optional(),
        category: z.string().optional(),
        limit: z.number().int().min(1).max(10).optional(),
      },
      _meta: {
        ui: {
          resourceUri: "ui://food/recommendations",
        },
      },
    },
    async (input: TopFoodsInput) => {
      try {
        const results = await getTopFoods(
          input.city?.trim() || "Jodhpur",
          input.category,
          input.limit ?? 5
        );

        return {
          content: [
            {
              type: "text" as const,
              text: results.length
                ? `Found ${results.length} top food recommendations.`
                : "No matching food recommendations were found.",
            },
          ],
          structuredContent: { results },
        };
      } catch (error) {
        return {
          isError: true,
          content: [
            {
              type: "text" as const,
              text: getErrorMessage(error),
            },
          ],
        };
      }
    }
  );
}