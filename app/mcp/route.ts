import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import {
  registerAppResource,
  registerAppTool,
} from "@modelcontextprotocol/ext-apps/server";
import { z } from "zod";

import {
  FOOD_WIDGET_URI,
  WIDGET_MIME_TYPE,
  foodWidgetResourceMeta,
  foodWidgetToolMeta,
  getAppOrigin,
} from "@/lib/mcp-widget-config";
import { createFoodWidgetHtml } from "@/lib/food-widget-html";
import {
  buildFoodErrorResult,
  buildFoodToolResult,
} from "@/lib/food-tool-result";
import {
  getTopFoods,
  searchFood,
  SearchFoodInput,
} from "@/lib/food/food.service";

const searchFoodSchema = {
  city: z.string().optional().describe("City name, defaults to Jodhpur"),
  area: z
    .string()
    .optional()
    .describe("Area or locality, e.g. Sardarpura, Ratanada"),
  category: z
    .string()
    .optional()
    .describe("Category, e.g. Street Food, Sweets, Bakery"),
  foodName: z
    .string()
    .optional()
    .describe("Dish name, e.g. Mirchi Bada, Chole Kulche"),
  limit: z
    .number()
    .int()
    .min(1)
    .max(20)
    .optional()
    .describe("Max items to return (1-20)"),
};

const topFoodsSchema = {
  city: z.string().optional().describe("City name, defaults to Jodhpur"),
  category: z.string().optional().describe("Category to filter top rated foods"),
  limit: z
    .number()
    .int()
    .min(1)
    .max(10)
    .optional()
    .describe("Max items to return (1-10)"),
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Food recommendations could not be loaded.";
}

export function createFoodMcpServer() {
  const server = new McpServer({
    name: "Food Recommendation MCP",
    version: "1.0.0",
  });

  const widgetDomain = getAppOrigin();
  const widgetHtml = createFoodWidgetHtml();
  const resourceMeta = foodWidgetResourceMeta(widgetDomain);
  const toolMeta = foodWidgetToolMeta(widgetDomain);

  registerAppResource(
    server,
    "Food Recommendations UI",
    FOOD_WIDGET_URI,
    {
      _meta: resourceMeta,
    },
    async () => ({
      contents: [
        {
          uri: FOOD_WIDGET_URI,
          mimeType: WIDGET_MIME_TYPE,
          text: widgetHtml,
          _meta: resourceMeta,
        },
      ],
    })
  );

  registerAppTool(
    server,
    "search_food",
    {
      title: "Search Food",
      description:
        "Search food and restaurants by city, dish, area, or category. Defaults to Jodhpur.",
      inputSchema: searchFoodSchema,
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
      inputSchema: topFoodsSchema,
      _meta: toolMeta,
    },
    async (input: { city?: string; category?: string; limit?: number }) => {
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

  return server;
}

async function handler(request: Request) {
  const server = createFoodMcpServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  await server.connect(transport);
  return transport.handleRequest(request);
}

export { handler as GET, handler as POST };
