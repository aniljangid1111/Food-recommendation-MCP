import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createMcpServer } from "@/lib/mcp/server";
import { registerRecommendationTools } from "@/lib/mcp/tools/recommendations";

export async function POST(request: Request) {
  const server = createMcpServer();

  registerRecommendationTools(server);

  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  await server.connect(transport);

  return transport.handleRequest(request);
}