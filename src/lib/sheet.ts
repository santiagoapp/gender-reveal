// Build-time reader for the Google Sheet.
//
// Runs ONLY during `next build` (server side), so the API key is read from a
// CI secret and never ships to the browser. The static export bakes the
// resulting group/name data into the HTML.
//
// Sheet columns (row 1 = headers, data from row 2):
//   A No. | B Participa? | C Invitados | D Grupos | E Papá o Mamá? | F Confirmation | G slug
//
// Grouping: a NON-EMPTY "Grupos" cell (col D) marks the START of a new group;
// the following rows with an empty D belong to that same group. Each group's
// URL slug is taken from column G if present, otherwise auto-generated from the
// first member's name (e.g. "Marina" -> "marina", deduped on collision).

const SHEET_ID = process.env.SHEET_ID;
const API_KEY = process.env.GOOGLE_API_KEY;
const SHEET_TAB = process.env.SHEET_TAB || "Participación";

// Column indexes (0-based) within the A:G range.
const COL_NO = 0; // A  (stable per-guest id used for confirmation)
const COL_NAME = 2; // C
const COL_GROUP = 3; // D  (non-empty marks a new group)
const COL_SLUG = 6; // G  (optional explicit slug override)

// "Tío Carlos (1)" -> "tio-carlos". Strips accents, parentheticals, symbols.
function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // drop diacritics
    .replace(/\([^)]*\)/g, "") // drop "(1)" style notes
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type Member = {
  id: string; // value of column A ("No.") — stable id for a single guest row
  name: string;
};

export type Group = {
  slug: string;
  names: string[]; // convenience: just the names, in order
  members: Member[];
};

// Local/dev fallback so the project builds & runs without secrets configured.
const MOCK_GROUPS: Group[] = [
  {
    slug: "familia-marina",
    names: ["Marina", "Orlando", "Marlon"],
    members: [
      { id: "1", name: "Marina" },
      { id: "2", name: "Orlando" },
      { id: "3", name: "Marlon" },
    ],
  },
  {
    slug: "familia-cesitar",
    names: ["Cesitar", "Tatiana", "Julieta"],
    members: [
      { id: "6", name: "Cesitar" },
      { id: "7", name: "Tatiana" },
      { id: "8", name: "Julieta" },
    ],
  },
  {
    slug: "demo",
    names: ["Invitado de ejemplo"],
    members: [{ id: "0", name: "Invitado de ejemplo" }],
  },
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

  // Build-time read baked into the static export — must be cacheable so the
  // route can be statically prerendered (no-store would force dynamic mode).
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `[sheet] Error al leer el Sheet (${res.status}): ${text.slice(0, 300)}`
    );
  }

  const data = (await res.json()) as { values?: string[][] };
  const rows = data.values || [];

  type Draft = { slugOverride: string; members: Member[] };
  const drafts: Draft[] = [];

  for (const row of rows) {
    const id = (row[COL_NO] || "").trim();
    const name = (row[COL_NAME] || "").trim();
    const marker = (row[COL_GROUP] || "").trim();
    const slugOverride = (row[COL_SLUG] || "").trim();
    if (!name) continue;

    // A non-empty "Grupos" cell (or the very first row) starts a new group.
    if (marker || drafts.length === 0) {
      drafts.push({ slugOverride, members: [] });
    }
    const current = drafts[drafts.length - 1];
    if (slugOverride) current.slugOverride = slugOverride;
    // Fall back to the name as id if column A is empty, so confirmation
    // still has something stable to target.
    current.members.push({ id: id || name, name });
  }

  // Assign final slugs (explicit override wins; else slugify first member),
  // deduping collisions with a numeric suffix.
  const used = new Set<string>();
  return drafts
    .filter((d) => d.members.length > 0)
    .map((d) => {
      const base = d.slugOverride || slugify(d.members[0].name) || "grupo";
      let slug = base;
      let n = 1;
      while (used.has(slug)) {
        n += 1;
        slug = `${base}-${n}`;
      }
      used.add(slug);
      return { slug, members: d.members, names: d.members.map((m) => m.name) };
    });
}

export async function getGroup(slug: string): Promise<Group | undefined> {
  const groups = await getGroups();
  return groups.find((g) => g.slug === slug);
}
