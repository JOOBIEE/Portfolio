"use client";

import { motion } from "framer-motion";
import { ArchiveEntry } from "@/data/archive";

interface ArchiveCardProps {
  entry: ArchiveEntry;
  index: number;
  onClick: () => void;
}

const statusColors: Record<ArchiveEntry["status"], string> = {
  raw: "var(--text-muted)",
  developing: "#f59e0b",
  crystallized: "#22c55e",
};

const typeLabels: Record<ArchiveEntry["type"], string> = {
  observation: "Observation",
  note: "Note",
  experiment: "Experiment",
  fragment: "Fragment",
  research: "Research",
  "mental-model": "Mental Model",
  "thought-log": "Thought Log",
};

export default function ArchiveCard({
  entry,
  index,
  onClick,
}: ArchiveCardProps) {
  const preview = entry.content.slice(0, 160).trim() + "...";

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      whileHover={{ y: -2 }}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        padding: "20px 24px",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "border-color 200ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--text-muted)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "12px",
          gap: "12px",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "6px",
            }}
          >
            <span
              className="text-label"
              style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}
            >
              {typeLabels[entry.type]}
            </span>
            <span
              style={{
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: "var(--text-muted)",
              }}
            />
            <span
              className="text-label"
              style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}
            >
              {entry.date}
            </span>
          </div>

          <h3
            className="text-small"
            style={{
              color: "var(--text-primary)",
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            {entry.title}
          </h3>
        </div>

        {/* Status dot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            flexShrink: 0,
            marginTop: "2px",
          }}
        >
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: statusColors[entry.status],
            }}
          />
          <span
            className="text-label"
            style={{ color: "var(--text-muted)", fontSize: "0.6rem" }}
          >
            {entry.status}
          </span>
        </div>
      </div>

      {/* Preview */}
      <p
        className="text-small"
        style={{
          color: "var(--text-muted)",
          lineHeight: 1.65,
          marginBottom: "14px",
          fontSize: "0.8125rem",
        }}
      >
        {preview}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="text-label"
            style={{
              fontSize: "0.6rem",
              color: "var(--text-muted)",
              background: "var(--background)",
              border: "1px solid var(--border)",
              padding: "2px 8px",
              borderRadius: "20px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.button>
  );
}