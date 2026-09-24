import { z } from "zod";
import { searchFood, getTopFoods } from "@/lib/food/food.service";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerRecommendationTools(server: McpServer) {

  server.registerTool(
    "search_food",
    {
      title: "Search Food",
      description:
        "Find recommended food and restaurants by city, area, category, or food name.",
      inputSchema: {
        city: z.string(),
        area: z.string().optional(),
        category: z.string().optional(),
        foodName: z.string().optional(),
      },
    },
    async ({ city, area, category, foodName }) => {
      const results = await searchFood({
        city,
        area,
        category,
        foodName,
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "get_top_foods",
    {
      title: "Get Top Foods",
      description:
        "Get the highest-rated food recommendations in a city, optionally filtered by category.",
      inputSchema: {
        city: z.string(),
        category: z.string().optional(),
        limit: z.number().int().min(1).max(10).optional(),
      },
    },
    async ({ city, category, limit }) => {
      console.log("GET TOP FOODS TOOL INPUT:", {
        city,
        category,
        limit,
      });

      const results = await getTopFoods(
        city,
        category,
        limit ?? 5
      );

      console.log("GET TOP FOODS TOOL RESULT:", results);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }
  );
}