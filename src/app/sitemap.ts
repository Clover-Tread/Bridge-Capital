import type { MetadataRoute } from "next";

const SITE_URL = "https://bridgecapital.mx";

const routes: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/nosotros", priority: 0.8 },
  { path: "/servicios", priority: 0.9 },
  { path: "/filosofia-inversion", priority: 0.8 },
  { path: "/calculadora", priority: 0.7 },
  { path: "/contacto", priority: 0.9 },
  { path: "/legal/aviso-de-privacidad", priority: 0.3 },
  { path: "/legal/politica-de-privacidad", priority: 0.3 },
  { path: "/legal/politica-de-cookies", priority: 0.3 },
  { path: "/legal/guia-de-servicios-de-inversion", priority: 0.3 },
  { path: "/legal/marco-general-de-actuacion", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
