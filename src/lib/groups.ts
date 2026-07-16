// Guest groups, read from src/data/groups.json at build time.
//
// The JSON mirrors the Google Sheet's structure:
//   slug    -> column G (the group's URL: /<slug>)
//   title   -> column D "Grupos"
//   members -> one entry per guest row; `id` is column A "No." and is what
//              the confirmation POST sends to the Apps Script web app.
//
// To update the guest list, edit src/data/groups.json and rebuild.

import data from "@/data/groups.json";

export type Member = {
  id: string; // stable per-guest id (sheet column A "No.")
  name: string;
};

export type Group = {
  slug: string;
  title: string;
  names: string[]; // convenience: just the names, in order
  members: Member[];
};

const GROUPS: Group[] = data.groups.map((g) => ({
  ...g,
  names: g.members.map((m) => m.name),
}));

export function getGroups(): Group[] {
  return GROUPS;
}

export function getGroup(slug: string): Group | undefined {
  return GROUPS.find((g) => g.slug === slug);
}
