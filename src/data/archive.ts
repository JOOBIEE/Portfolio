export type ArchiveEntry = {
  id: string;
  title: string;
  type:
    | "observation"
    | "note"
    | "experiment"
    | "fragment"
    | "research"
    | "mental-model"
    | "thought-log";
  tags: string[];
  date: string;
  content: string;
  status: "raw" | "developing" | "crystallized";
};

export const archiveEntries: ArchiveEntry[] = [
  {
    id: "disposable-websites",
    title: "Why most websites feel disposable",
    type: "observation",
    tags: ["Design", "Culture", "Technology"],
    date: "Mar 2024",
    status: "crystallized",
    content: `Most websites feel disposable because they are built from components, not decisions.

The modern web runs on component libraries. Figma kits. UI packages. Templates that get lightly reskinned and deployed.

The output is technically proficient and aesthetically identical.

Proficiency without distinctiveness produces forgettability. And forgettability is the most expensive outcome a website can have — every visitor who leaves without remembering you is a relationship that never started.

The websites that don't feel disposable share one quality: they feel decided. Not decorated. Every choice — typeface, spacing, what's left out — feels like it came from a point of view strong enough to justify departing from the default.

Most websites don't have a point of view. They have preferences.

A point of view is a position. Something you'll defend. Something that makes the site wrong for some people and right for others.

The disposable web is built by people trying to appeal to everyone.`,
  },
];