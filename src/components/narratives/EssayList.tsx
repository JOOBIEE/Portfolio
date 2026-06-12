"use client";

import { motion } from "framer-motion";
import { Essay } from "@/data/essays";

interface EssayListProps {
  essays: Essay[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function EssayList({
  essays,
  activeId,
  onSelect,
}: EssayListProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <p
        className="text-label"
        style={{
          color: "var(--text-muted)",
          marginBottom: "16px",
          paddingBottom: "12px",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        Essays
      </p>

      {essays.map((essay, i) => (
        <motion.button
          key={essay.id}
          onClick={() => onSelect(essay.id)}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          style={{
            background:
              activeId === essay.id ? "var(--surface)" : "transparent",
            border: "1px solid",
            borderColor:
              activeId === essay.id ? "var(--border)" : "transparent",
            borderRadius: "8px",
            padding: "14px",
            cursor: "pointer",
            textAlign: "left",
            width: "100%",
            transition: "all 200ms ease",
          }}
          onMouseEnter={(e) => {
            if (activeId !== essay.id) {
              e.currentTarget.style.background = "var(--surface)";
            }
          }}
          onMouseLeave={(e) => {
            if (activeId !== essay.id) {
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          <p
            className="text-small"
            style={{
              color:
                activeId === essay.id
                  ? "var(--text-primary)"
                  : "var(--text-secondary)",
              fontWeight: activeId === essay.id ? 500 : 400,
              marginBottom: "4px",
              transition: "color 200ms ease",
            }}
          >
            {essay.title}
          </p>

          <p
            className="text-small"
            style={{
              color: "var(--text-muted)",
              fontSize: "0.75rem",
              marginBottom: "8px",
            }}
          >
            {essay.theme} · {essay.readingTime}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {essay.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-label"
                style={{
                  fontSize: "0.6rem",
                  color: "var(--text-muted)",
                  background: "var(--border-subtle)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  border: "1px solid var(--border)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.button>
      ))}
    </div>
  );
}