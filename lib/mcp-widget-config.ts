export const FOOD_WIDGET_URI = "ui://food/recommendations";
export const WIDGET_MIME_TYPE = "text/html;profile=mcp-app";

export function getAppOrigin(): string {
  const configuredOrigin =
    process.env.MCP_BASE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.APP_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  if (!configuredOrigin) {
    if (process.env.NODE_ENV === "production") {
      return "https://food-recommendation-mcp.vercel.app";
    }
    return "http://localhost:3000";
  }

  let origin = configuredOrigin.trim();
  if (!/^https?:\/\//i.test(origin)) {
    origin = `https://${origin}`;
  }

  if (
    process.env.NODE_ENV === "production" &&
    origin.startsWith("http://") &&
    !origin.includes("localhost") &&
    !origin.includes("127.0.0.1")
  ) {
    origin = origin.replace(/^http:\/\//i, "https://");
  }

  return origin.replace(/\/+$/, "");
}

export const getMcpBaseUrl = getAppOrigin;

export function getWidgetCsp(widgetDomain: string = getAppOrigin()) {
  const rawDomains = [
    widgetDomain,
    "https://drive.google.com",
    "https://lh3.googleusercontent.com",
    "https://images.unsplash.com",
  ];

  // OpenAI strictly requires valid HTTPS origins (rejects insecure http:// or invalid hosts)
  const httpsResourceDomains = Array.from(
    new Set(
      rawDomains
        .filter((d): d is string => typeof d === "string" && d.startsWith("https://"))
        .map((d) => d.replace(/\/+$/, ""))
    )
  );

  const connectDomains = httpsResourceDomains.filter(
    (d) =>
      !d.includes("drive.google.com") &&
      !d.includes("lh3.googleusercontent.com") &&
      !d.includes("unsplash.com")
  );

  return {
    csp: {
      connectDomains: connectDomains.length > 0 ? connectDomains : httpsResourceDomains,
      resourceDomains: httpsResourceDomains,
    },
    openaiCsp: {
      connect_domains: connectDomains.length > 0 ? connectDomains : httpsResourceDomains,
      resource_domains: httpsResourceDomains,
      redirect_domains: ["maps.google.com", "www.google.com"],
    },
  };
}

export function foodWidgetToolMeta(widgetDomain: string = getAppOrigin()) {
  const { csp, openaiCsp } = getWidgetCsp(widgetDomain);

  return {
    ui: {
      resourceUri: FOOD_WIDGET_URI,
      visibility: ["model", "app"],
      domain: widgetDomain.startsWith("https://") ? widgetDomain : undefined,
      csp,
    },
    "openai/outputTemplate": FOOD_WIDGET_URI,
    "openai/widgetAccessible": true,
    "openai/toolInvocation/invoking": "Searching food recommendations",
    "openai/toolInvocation/invoked": "Food recommendations loaded",
    "openai/widgetCSP": openaiCsp,
  };
}

export function foodWidgetResourceMeta(
  widgetDomain: string = getAppOrigin(),
  description: string = "Interactive food recommendation cards and guide"
) {
  const { csp, openaiCsp } = getWidgetCsp(widgetDomain);

  return {
    ui: {
      prefersBorder: true,
      domain: widgetDomain.startsWith("https://") ? widgetDomain : undefined,
      csp,
    },
    "openai/widgetDescription": description,
    "openai/widgetDomain": widgetDomain.startsWith("https://") ? widgetDomain : undefined,
    "openai/widgetPrefersBorder": true,
    "openai/widgetCSP": openaiCsp,
  };
}
