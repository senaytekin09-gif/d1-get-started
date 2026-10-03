import portal from "../public/index.html";

export default {
  async fetch(request): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (request.method === "GET" && (pathname === "/" || pathname === "/index.html")) {
      return new Response(portal, { headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "public, max-age=300",
        "x-content-type-options": "nosniff",
        "content-security-policy": "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-ancestors 'none'",
      }});
    }
    if (pathname === "/health") return Response.json({ ok: true, service: "eregli-ticaret-borsasi-demo" });
    return new Response("Bulunamadı", { status: 404 });
  },
} satisfies ExportedHandler;
