import { config } from "./config";

// Build a URL for a watercolor asset in /public/assets, honoring the deploy
// basePath (e.g. "/gender-reveal" on GitHub Pages).
export function asset(name: string): string {
  return `${config.basePath}/assets/${name}`;
}
