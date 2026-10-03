import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

describe("Ereğli Ticaret Borsası portal worker", () => {
  it("serves the Turkish portal", async () => {
    const response = await SELF.fetch("https://example.com/");
    const html = await response.text();
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");
    expect(html).toContain("Ereğli Ticaret Borsası");
    expect(html).toContain("Müstahsil Tescil Başvurusu");
    expect(html).toContain("admin@demo.test");
  });
  it("reports health and returns 404", async () => {
    const health = await SELF.fetch("https://example.com/health");
    expect(await health.json()).toEqual({ ok: true, service: "eregli-ticaret-borsasi-demo" });
    expect((await SELF.fetch("https://example.com/olmayan")).status).toBe(404);
  });
});
