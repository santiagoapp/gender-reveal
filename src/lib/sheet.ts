// Build-time reader for the Google Sheet.
//
// Runs ONLY during `next build` (server side), so the API key is read from a
// CI secret and never ships to the browser. The static export bakes the
// resulting group/name data into the HTML.
//
// Sheet columns (row 1 = headers, data from row 2):
//   A No. | B Participa? | C Invitados | D Grupos | E Papá o Mamá? | F Confirmation | G slug
//
// Groups are keyed by the `slug` column (G): every row sharing a slug belongs
// to the same group. The whole group confirms with one button.

const SHEET_ID = process.env.SHEET_ID;
const API_KEY = process.env.GOOGLE_API_KEY;
const SHEET_TAB = process.env.SHEET_TAB || "Participación";

// Column indexes (0-based) within the A:G range.
const COL_NAME = 2; // C
const COL_SLUG = 6; // G

export type Group = {
  slug: string;
  names: string[];
};

// Local/dev fallback so the project builds & runs without secrets configured.
const MOCK_GROUPS: Group[] = [
  { slug: "familia-marina", names: ["Marina", "Orlando", "Marlon"] },
  { slug: "familia-cesitar", names: ["Cesitar", "Tatiana", "Julieta"] },
  { slug: "demo", names: ["Invitado de ejemplo"] },
];

export async function getGroups(): Promise<Group[]> {
  if (!SHEET_ID || !API_KEY) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[sheet] SHEET_ID / GOOGLE_API_KEY no configurados — usando datos de ejemplo."
      );
    }
    return MOCK_GROUPS;
  }

  const range = `${SHEET_TAB}!A2:G1000`;
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}` +
    `/values/${encodeURIComponent(range)}?key=${API_KEY}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `[sheet] Error al leer el Sheet (${res.status}): ${text.slice(0, 300)}`
    );
  }

  const data = (await res.json()) as { values?: string[][] };
  const rows = data.values || [];

  // Preserve first-seen order of slugs while grouping names.
  const order: string[] = [];
  const map = new Map<string, string[]>();

  for (const row of rows) {
    const name = (row[COL_NAME] || "").trim();
    const slug = (row[COL_SLUG] || "").trim();
    if (!slug || !name) continue;
    if (!map.has(slug)) {
      map.set(slug, []);
      order.push(slug);
    }
    map.get(slug)!.push(name);
  }

  return order.map((slug) => ({ slug, names: map.get(slug)! }));
}

export async function getGroup(slug: string): Promise<Group | undefined> {
  const groups = await getGroups();
  return groups.find((g) => g.slug === slug);
}
