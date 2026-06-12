"use client";

import IdentityGraph from "@/components/graph/IdentityGraph";
import Navbar from "@/components/layout/Navbar";
import { projects } from "@/data/projects";
import { essays } from "@/data/essays";
import { archiveEntries } from "@/data/archive";
import { caseStudies } from "@/data/caseStudies";
import { ContentItem } from "@/lib/buildGraph";

export default function GraphPage() {
  const items: ContentItem[] = [
    ...projects.map((p) => ({
      id: p.id,
      title: p.title,
      tags: p.tags,
      type: "project" as const,
      path: `/systems?project=${p.id}`,
    })),
    ...essays.map((e) => ({
      id: e.id,
      title: e.title,
      tags: e.tags,
      type: "essay" as const,
      path: `/narratives?essay=${e.id}`,
    })),
    ...archiveEntries.map((a) => ({
      id: a.id,
      title: a.title,
      tags: a.tags,
      type: "archive" as const,
      path: `/archive?entry=${a.id}`,
    })),
    ...caseStudies.map((c) => ({
      id: c.id,
      title: c.title,
      tags: c.tags,
      type: "case-study" as const,
      path: `/perception?case=${c.id}`,
    })),
  ];

  return (
    <>
      <Navbar />
      <div
        style={{
          position: "fixed",
          inset: 0,
          paddingTop: "60px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header bar */}
        <div
          className="graph-header"
          style={{
            padding: "16px 32px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            background: "var(--background)",
          }}
        >
          <div>
            <p
              className="text-label"
              style={{ color: "var(--text-muted)", marginBottom: "2px" }}
            >
              Identity Graph
            </p>
            <h1
              style={{
                fontSize: "1rem",
                fontWeight: 500,
                color: "var(--text-primary)",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              Everything connects.
            </h1>
          </div>
          <p
            className="text-small graph-header-desc"
            style={{
              color: "var(--text-muted)",
              maxWidth: "320px",
              textAlign: "right",
            }}
          >
            Every project, essay, case study, and archive entry —
            connected by shared themes.
          </p>
        </div>

        {/* Graph canvas */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <IdentityGraph items={items} />
        </div>
      </div>
    </>
  );
}