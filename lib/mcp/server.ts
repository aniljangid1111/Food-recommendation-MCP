import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  registerAppResource,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";

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
          text: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 16px;
      font-family: Arial, sans-serif;
      background: #f7f7f7;
      color: #111;
    }

    h2 {
      margin-top: 0;
    }

    #foods {
      display: grid;
      gap: 16px;
    }

    .card {
      overflow: hidden;
      background: white;
      border: 1px solid #ddd;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,.08);
    }

    .image {
      width: 100%;
      height: 180px;
      object-fit: cover;
      display: block;
    }

    .content {
      padding: 16px;
    }

    .title {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }

    .title h3 {
      margin: 0;
    }

    .rating {
      white-space: nowrap;
    }

    .shop {
      margin: 8px 0;
      font-weight: bold;
    }

    .location,
    .reason {
      color: #666;
      font-size: 14px;
    }

    .category {
      display: inline-block;
      margin-top: 8px;
      padding: 5px 10px;
      border-radius: 20px;
      background: #eee;
      font-size: 12px;
    }

    .maps {
      display: block;
      margin-top: 14px;
      padding: 10px;
      border-radius: 10px;
      background: #111;
      color: white;
      text-align: center;
      text-decoration: none;
    }
  </style>
</head>

<body>

  <h2>🍴 Food Recommendations</h2>

  <div id="foods">
    <p>Waiting for food recommendations...</p>
  </div>

 <script>
  function renderFoods(foods) {
    const container = document.getElementById("foods");

    if (!foods || foods.length === 0) {
      container.innerHTML = "<p>No food recommendations found.</p>";
      return;
    }

    container.innerHTML = "";

    foods.forEach(function (food) {
      const card = document.createElement("div");
      card.className = "card";

      let html = "";

      if (food.imageUrl) {
        html +=
          '<img class="image" src="' +
          food.imageUrl +
          '" alt="' +
          food.foodName +
          '">';
      }

      html +=
        '<div class="content">' +
          '<div class="title">' +
            '<h3>' +
              food.foodName +
            '</h3>' +

            '<span class="rating">' +
              '⭐ ' +
              food.rating +
            '</span>' +

          '</div>' +

          '<div class="shop">' +
            food.shopName +
          '</div>' +

          '<div class="location">' +
            '📍 ' +
            food.area +
            ', ' +
            food.city +
          '</div>' +

          '<span class="category">' +
            food.category +
          '</span>';

      if (food.reason) {
        html +=
          '<p class="reason">' +
            food.reason +
          '</p>';
      }

      const mapUrl =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(
          food.shopName +
          " " +
          food.area +
          " " +
          food.city
        );

      html +=
          '<a class="maps" href="' +
            mapUrl +
            '" target="_blank" rel="noopener noreferrer">' +
            '📍 View on Google Maps' +
          '</a>' +

        '</div>';

      card.innerHTML = html;

      container.appendChild(card);
    });
  }


  window.addEventListener("message", function (event) {
    const message = event.data;

    console.log("MCP MESSAGE:", message);

    if (!message) {
      return;
    }

    if (message.method === "ui/notifications/tool-result") {
      const result = message.params;

      console.log("MCP TOOL RESULT:", result);

      if (result && result.isError) {
        document.getElementById("foods").innerHTML =
          "<p>Something went wrong.</p>";

        return;
      }

      const foods =
        result &&
        result.structuredContent &&
        result.structuredContent.results
          ? result.structuredContent.results
          : [];

      renderFoods(foods);
    }
  });


  window.parent.postMessage(
    {
      jsonrpc: "2.0",
      method: "ui/notifications/initialized",
      params: {}
    },
    "*"
  );
</script>

</body>
</html>
          `,
        },
      ],
    })
  );

  return server;
}