import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  registerAppResource,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";

const foodRecommendationsHtml = String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Food recommendations</title>
    <style>
      :root {
        color-scheme: light dark;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: #1d1b19;
        background: #fffdf9;
      }

      * { box-sizing: border-box; }
      body { margin: 0; padding: 20px; }
      main { width: min(100%, 900px); margin: 0 auto; }
      header { margin-bottom: 18px; }
      .eyebrow { margin: 0 0 5px; color: #a14b19; font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
      h1 { margin: 0; font-size: clamp(21px, 4vw, 28px); line-height: 1.2; }
      #status { margin: 8px 0 0; color: #716a64; font-size: 14px; }
      #foods { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 14px; }
      .card { overflow: hidden; border: 1px solid #e9e1d8; border-radius: 16px; background: #fff; box-shadow: 0 5px 18px rgb(58 39 20 / 6%); }
      .image { display: block; width: 100%; height: 180px; object-fit: cover; background: #f1ece5; }
      .content { padding: 16px; }
      .title-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
      h2 { margin: 0; font-size: 18px; line-height: 1.3; }
      .rating { flex: 0 0 auto; color: #8b4c00; font-size: 14px; font-weight: 700; }
      .shop { margin: 8px 0 0; font-weight: 650; }
      .location, .reason { color: #716a64; font-size: 14px; line-height: 1.5; }
      .location { margin: 7px 0 0; }
      .reason { margin: 12px 0 0; }
      .category { display: inline-flex; margin-top: 11px; padding: 5px 9px; border-radius: 999px; background: #f5eee6; color: #70411f; font-size: 12px; }
      .maps { display: inline-flex; margin-top: 15px; padding: 10px 13px; border-radius: 10px; background: #7c3516; color: #fff; font-size: 14px; font-weight: 650; text-decoration: none; }
      .maps:hover { background: #63280f; }
      .empty { grid-column: 1 / -1; padding: 18px; border: 1px dashed #d8cec2; border-radius: 14px; color: #716a64; }
      @media (prefers-color-scheme: dark) {
        :root { color: #f6f0e8; background: #1c1916; }
        #status, .location, .reason { color: #c1b6aa; }
        .card { border-color: #40372e; background: #28231e; box-shadow: none; }
        .image { background: #38312a; }
        .category { background: #3b3027; color: #f0c9a7; }
        .empty { border-color: #5a4d40; }
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <p class="eyebrow">Jodhpur food guide</p>
        <h1>Food recommendations</h1>
        <p id="status" role="status" aria-live="polite">Connecting to recommendations…</p>
      </header>
      <section id="foods" aria-label="Food recommendations"></section>
    </main>
    <script>
      (function () {
        var status = document.getElementById("status");
        var container = document.getElementById("foods");
        var requestId = 1;
        var initialized = false;

        function makeElement(tag, className, text) {
          var element = document.createElement(tag);
          if (className) element.className = className;
          if (text !== undefined && text !== null) element.textContent = String(text);
          return element;
        }

        function renderFoods(foods) {
          container.replaceChildren();

          if (!Array.isArray(foods) || foods.length === 0) {
            status.textContent = "No matching food recommendations were found.";
            container.appendChild(makeElement("p", "empty", "Try another dish, area, or category."));
            return;
          }

          status.textContent = foods.length + (foods.length === 1 ? " recommendation" : " recommendations");

          foods.forEach(function (food) {
            var card = makeElement("article", "card");

            if (food.imageUrl) {
              var image = makeElement("img", "image");
              image.src = food.imageUrl;
              image.alt = food.foodName || food.shopName || "Food";
              image.loading = "lazy";
              image.referrerPolicy = "no-referrer";
              card.appendChild(image);
            }

            var content = makeElement("div", "content");
            var titleRow = makeElement("div", "title-row");
            titleRow.appendChild(makeElement("h2", "", food.foodName || "Recommended dish"));

            if (food.rating !== undefined && food.rating !== null && food.rating !== "") {
              titleRow.appendChild(makeElement("span", "rating", "★ " + food.rating));
            }

            content.appendChild(titleRow);
            content.appendChild(makeElement("p", "shop", food.shopName || "Restaurant"));

            var location = [food.area, food.city].filter(Boolean).join(", ");
            if (location) content.appendChild(makeElement("p", "location", "📍 " + location));
            if (food.category) content.appendChild(makeElement("span", "category", food.category));
            if (food.reason) content.appendChild(makeElement("p", "reason", food.reason));

            var mapUrl = food.mapsUrl;
            if (!mapUrl) {
              mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(
                [food.shopName, food.area, food.city].filter(Boolean).join(" ")
              );
            }

            var mapLink = makeElement("a", "maps", "View on Google Maps");
            mapLink.href = mapUrl;
            mapLink.target = "_blank";
            mapLink.rel = "noopener noreferrer";
            content.appendChild(mapLink);
            card.appendChild(content);
            container.appendChild(card);
          });
        }

        function handleMessage(event) {
          if (event.source !== window.parent || !event.data || event.data.jsonrpc !== "2.0") return;

          var message = event.data;

          if (message.id === requestId && message.result && !initialized) {
            initialized = true;
            window.parent.postMessage({
              jsonrpc: "2.0",
              method: "ui/notifications/initialized",
              params: {}
            }, "*");
            status.textContent = "Waiting for food recommendations…";
            return;
          }

          if (message.method === "ui/notifications/tool-result") {
            var result = message.params || {};

            if (result.isError) {
              status.textContent = "Food recommendations could not be loaded.";
              container.replaceChildren(makeElement("p", "empty", "Please try the search again."));
              return;
            }

            var foods = result.structuredContent && result.structuredContent.results;
            if (!foods && Array.isArray(result.content)) {
              var textContent = result.content.find(function (item) {
                return item.type === "text" && item.text;
              });
              if (textContent) {
                try {
                  var parsed = JSON.parse(textContent.text);
                  foods = parsed.results || parsed;
                } catch (_) {
                  foods = [];
                }
              }
            }

            renderFoods(foods || []);
          }
        }

        window.addEventListener("message", handleMessage);
        window.parent.postMessage({
          jsonrpc: "2.0",
          id: requestId,
          method: "ui/initialize",
          params: {
            protocolVersion: "2025-11-21",
            appInfo: { name: "Food Recommendations", version: "1.0.0" },
            appCapabilities: {}
          }
        }, "*");
      })();
    </script>
  </body>
</html>`;

export function createMcpServer() {
  const server = new McpServer({
    name: "Food Recommendation MCP",
    version: "1.0.0",
  });

  const resourceUri = "ui://food/recommendations";

  registerAppResource(
    server,
    "Food Recommendations UI",
    resourceUri,
    {},
    async () => ({
      contents: [
        {
          uri: resourceUri,
          mimeType: RESOURCE_MIME_TYPE,
          text: foodRecommendationsHtml,
          _meta: {
            ui: {
              csp: {
                resourceDomains: [
                  "https://drive.google.com",
                  "https://lh3.googleusercontent.com",
                ],
              },
            },
          },
        },
      ],
    })
  );

  return server;
}
