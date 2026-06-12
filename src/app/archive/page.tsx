"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import Footer from "@/components/layout/Footer";
import ArchiveFilters from "@/components/archive/ArchiveFilters";
import ArchiveCard from "@/components/archive/ArchiveCard";
import ArchiveReader from "@/components/archive/ArchiveReader";
import { archiveEntries, ArchiveEntry } from "@/data/archive";

type FilterType = ArchiveEntry["type"] | "all";
type FilterStatus = ArchiveEntry["status"] | "all";

export default function ArchivePage() {
  const searchParams = useSearchParams();
  const entryParam = searchParams.get("entry");

  const [activeType, setActiveType] = useState<FilterType>("all");
  const [activeStatus, setActiveStatus] = useState<FilterStatus>("all");
  const [activeTag, setActiveTag] = useState("all");
  const [selected, setSelected] = useState<ArchiveEntry | null>(null);

  useEffect(() => {
    if (entryParam) {
      const found = archiveEntries.find((a) => a.id === entryParam);
      if (found) setSelected(found);
    }
  }, [entryParam]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    archiveEntries.forEach((e) => e.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filtered = useMemo(() => {
    return archiveEntries.filter((entry) => {
      if (activeType !== "all" && entry.type !== activeType) return false;
      if (activeStatus !== "all" && entry.status !== activeStatus)
        return false;
      if (activeTag !== "all" && !entry.tags.includes(activeTag))
        return false;
      return true;
    });
  }, [activeType, activeStatus, activeTag]);

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Header */}
        <div
          style={{
            marginBottom: "48px",
            paddingBottom: "32px",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <p
            className="text-label"
            style={{ color: "var(--text-muted)", marginBottom: "8px" }}
          >
            Signal Archive
          </p>
          <h1
            className="text-heading"
            style={{ color: "var(--text-primary)" }}
          >
            The Archive
          </h1>
          <p
            className="text-body"
            style={{
              color: "var(--text-secondary)",
              marginTop: "8px",
              maxWidth: "480px",
            }}
          >
            Thinking before execution. Observations, notes, fragments,
            and research in various stages of development.
          </p>

          <p
            className="text-label"
            style={{
              color: "var(--text-muted)",
              marginTop: "16px",
              fontSize: "0.7rem",
            }}
          >
            {filtered.length} of {archiveEntries.length} entries
            {activeType !== "all" && ` · ${activeType}`}
            {activeStatus !== "all" && ` · ${activeStatus}`}
            {activeTag !== "all" && ` · ${activeTag}`}
          </p>
        </div>

        {/* Layout */}
        <div
          className="archive-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          <ArchiveFilters
            activeType={activeType}
            activeStatus={activeStatus}
            activeTag={activeTag}
            allTags={allTags}
            onTypeChange={setActiveType}
            onStatusChange={setActiveStatus}
            onTagChange={setActiveTag}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {filtered.length === 0 ? (
              <div
                style={{
                  padding: "64px 24px",
                  textAlign: "center",
                  border: "1px dashed var(--border)",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <p
                  className="text-body"
                  style={{ color: "var(--text-muted)" }}
                >
                  No entries match these filters.
                </p>
                <button
                  onClick={() => {
                    setActiveType("all");
                    setActiveStatus("all");
                    setActiveTag("all");
                  }}
                  style={{
                    background: "none",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    padding: "6px 14px",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    fontSize: "0.8125rem",
                    fontFamily: "var(--font-geist-sans)",
                    transition: "all 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.borderColor = "var(--text-muted)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              filtered.map((entry, i) => (
                <ArchiveCard
                  key={entry.id}
                  entry={entry}
                  index={i}
                  onClick={() => setSelected(entry)}
                />
              ))
            )}
          </div>
        </div>
      </PageWrapper>
      <Footer />

      <ArchiveReader
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}