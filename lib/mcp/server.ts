import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function createMcpServer() {
  const server = new McpServer({
    name: "Food Recommendation MCP",
    version: "1.0.0",
  });

  return server;
}