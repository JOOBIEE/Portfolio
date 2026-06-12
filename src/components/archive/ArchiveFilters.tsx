"use client";

import { ArchiveEntry } from "@/data/archive";

type FilterType = ArchiveEntry["type"] | "all";
type FilterStatus = ArchiveEntry["status"] | "all";

interface ArchiveFiltersProps {
  activeType: FilterType;
  activeStatus: FilterStatus;
  activeTag: string;
  allTags: string[];
  onTypeChange: (type: FilterType) => void;
  onStatusChange: (status: FilterStatus) => void;
  onTagChange: (tag: string) => void;
}

const types: { id: FilterType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "observation", label: "Observations" },
  { id: "note", label: "Notes" },
  { id: "research", label: "Research" },
  { id: "mental-model", label: "Mental Models" },
  { id: "thought-log", label: "Thought Logs" },
  { id: "fragment", label: "Fragments" },
  { id: "experiment", label: "Experiments" },
];

const statuses: { id: FilterStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "raw", label: "Raw" },
  { id: "developing", label: "Developing" },
  { id: "crystallized", label: "Crystallized" },
];

const statusColors: Record<ArchiveEntry["status"], string> = {
  raw: "var(--text-muted)",
  developing: "#f59e0b",
  crystallized: "#22c55e",
};

const filterBtnStyle = (active: boolean) => ({
  background: active ? "var(--surface)" : "transparent",
  border: "1px solid",
  borderColor: active ? "var(--border)" : "transparent",
  borderRadius: "6px",
  padding: "6px 10px",
  cursor: "pointer",
  textAlign: "left" as const,
  color: active ? "var(--text-primary)" : "var(--text-muted)",
  fontSize: "0.8125rem",
  fontFamily: "var(--font-geist-sans)",
  transition: "all 150ms ease",
  whiteSpace: "nowrap" as const,
});

export default function ArchiveFilters({
  activeType,
  activeStatus,
  activeTag,
  allTags,
  onTypeChange,
  onStatusChange,
  onTagChange,
}: ArchiveFiltersProps) {
  return (
    <div
      className="archive-filters-sticky"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        position: "sticky",
        top: "80px",
      }}
    >
      {/* Type filter */}
      <div>
        <p
          className="text-label"
          style={{
            color: "var(--text-muted)",
            marginBottom: "10px",
            paddingBottom: "8px",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          Type
        </p>
        <div
          className="archive-filters-types"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => onTypeChange(type.id)}
              style={filterBtnStyle(activeType === type.id)}
              onMouseEnter={(e) => {
                if (activeType !== type.id) {
                  e.currentTarget.style.color = "var(--text-secondary)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeType !== type.id) {
                  e.currentTarget.style.color = "var(--text-muted)";
                }
              }}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status filter */}
      <div>
        <p
          className="text-label"
          style={{
            color: "var(--text-muted)",
            marginBottom: "10px",
            paddingBottom: "8px",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          Status
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {statuses.map((status) => (
            <button
              key={status.id}
              onClick={() => onStatusChange(status.id)}
              style={{
                ...filterBtnStyle(activeStatus === status.id),
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {status.id !== "all" && (
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background:
                      statusColors[status.id as ArchiveEntry["status"]],
                    flexShrink: 0,
                  }}
                />
              )}
              <span>{status.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tag filter */}
      <div>
        <p
          className="text-label"
          style={{
            color: "var(--text-muted)",
            marginBottom: "10px",
            paddingBottom: "8px",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          Tags
        </p>
        <div
          className="archive-filters-types"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <button
            onClick={() => onTagChange("all")}
            style={filterBtnStyle(activeTag === "all")}
          >
            All Tags
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagChange(tag)}
              style={filterBtnStyle(activeTag === tag)}
              onMouseEnter={(e) => {
                if (activeTag !== tag) {
                  e.currentTarget.style.color = "var(--text-secondary)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTag !== tag) {
                  e.currentTarget.style.color = "var(--text-muted)";
                }
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}