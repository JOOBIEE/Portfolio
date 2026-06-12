import { projects } from "@/data/projects";
import { essays } from "@/data/essays";
import { archiveEntries } from "@/data/archive";
import { caseStudies } from "@/data/caseStudies";

export type SearchResult = {
  id: string;
  title: string;
  excerpt: string;
  type: "project" | "essay" | "case-study" | "archive";
  tags: string[];
  path: string;
};

function excerpt(text: string, query: string, length = 120): string {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return text.slice(0, length) + "...";
  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, idx + length);
  return (start > 0 ? "..." : "") + text.slice(start, end) + "...";
}

function matches(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}

export function search(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];

  projects.forEach((p) => {
    if (
      matches(p.title, query) ||
      matches(p.tagline, query) ||
      matches(p.problem, query) ||
      matches(p.approach, query) ||
      matches(p.whyItExists, query) ||
      p.tags.some((t) => matches(t, query))
    ) {
      results.push({
        id: p.id,
        title: p.title,
        excerpt: excerpt(p.problem, query),
        type: "project",
        tags: p.tags,
        path: `/systems?project=${p.id}`,
      });
    }
  });

  essays.forEach((e) => {
    if (
      matches(e.title, query) ||
      matches(e.keyInsight, query) ||
      matches(e.content, query) ||
      matches(e.theme, query) ||
      e.tags.some((t) => matches(t, query))
    ) {
      results.push({
        id: e.id,
        title: e.title,
        excerpt: excerpt(e.content, query),
        type: "essay",
        tags: e.tags,
        path: `/narratives?essay=${e.id}`,
      });
    }
  });

  caseStudies.forEach((c) => {
    if (
      matches(c.title, query) ||
      matches(c.summary, query) ||
      matches(c.before.label, query) ||
      matches(c.after.label, query) ||
      c.tags.some((t) => matches(t, query))
    ) {
      results.push({
        id: c.id,
        title: c.title,
        excerpt: excerpt(c.summary, query),
        type: "case-study",
        tags: c.tags,
        path: `/perception?case=${c.id}`,
      });
    }
  });

  archiveEntries.forEach((a) => {
    if (
      matches(a.title, query) ||
      matches(a.content, query) ||
      a.tags.some((t) => matches(t, query))
    ) {
      results.push({
        id: a.id,
        title: a.title,
        excerpt: excerpt(a.content, query),
        type: "archive",
        tags: a.tags,
        path: `/archive?entry=${a.id}`,
      });
    }
  });

  return results;
}