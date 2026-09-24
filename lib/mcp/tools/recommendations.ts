import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAppTool } from "@modelcontextprotocol/ext-apps/server";

import {
  searchFood,
  getTopFoods,
} from "@/lib/food/food.service";

export function registerRecommendationTools(server: McpServer) {
  // SEARCH FOOD
  registerAppTool(
    server,
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

      _meta: {
        ui: {
          resourceUri: "ui://food/recommendations",
        },
      },
    },

    async ({
      city,
      area,
      category,
      foodName,
    }: {
      city: string;
      area?: string;
      category?: string;
      foodName?: string;
    }) => {
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

        structuredContent: {
          results,
        },
      };
    }
  );

  // GET TOP FOODS
  registerAppTool(
    server,
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

      _meta: {
        ui: {
          resourceUri: "ui://food/recommendations",
        },
      },
    },

    async ({
      city,
      category,
      limit,
    }: {
      city: string;
      category?: string;
      limit?: number;
    }) => {
      const results = await getTopFoods(
        city,
        category,
        limit ?? 5
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],

        structuredContent: {
          results,
        },
      };
    }
  );
}