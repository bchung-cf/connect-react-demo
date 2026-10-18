export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/edge-info") {
      return Response.json({
        runtime: "Cloudflare Workers",
        timestamp: new Date().toISOString(),
        colo: request.cf?.colo ?? "local development",
        country: request.cf?.country ?? "local development",
      });
    }

    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler;