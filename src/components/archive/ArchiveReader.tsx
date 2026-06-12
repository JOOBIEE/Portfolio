"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ArchiveEntry } from "@/data/archive";
import { useEffect } from "react";

interface ArchiveReaderProps {
  entry: ArchiveEntry | null;
  onClose: () => void;
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

export default function ArchiveReader({
  entry,
  onClose,
}: ArchiveReaderProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (entry) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [entry]);

  return (
    <AnimatePresence>
      {entry && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(4px)",
              zIndex: 100,
            }}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            className="archive-reader-panel"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(600px, 100vw)",
              background: "var(--background)",
              borderLeft: "1px solid var(--border)",
              zIndex: 101,
              overflowY: "auto",
              padding: "40px 32px 80px",
            }}
          >
            {/* Top bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "40px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: statusColors[entry.status],
                  }}
                />
                <span
                  className="text-label"
                  style={{ color: "var(--text-muted)" }}
                >
                  {typeLabels[entry.type]} · {entry.status}
                </span>
              </div>

              <button
                onClick={onClose}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-secondary)",
                  transition: "all 200ms ease",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Header */}
            <div
              style={{
                marginBottom: "40px",
                paddingBottom: "32px",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <p
                className="text-label"
                style={{
                  color: "var(--text-muted)",
                  marginBottom: "10px",
                }}
              >
                {entry.date}
              </p>
              <h2
                className="text-heading"
                style={{ color: "var(--text-primary)" }}
              >
                {entry.title}
              </h2>
            </div>

            {/* Content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "22px",
              }}
            >
              {entry.content
                .split("\n\n")
                .filter((p) => p.trim().length > 0)
                .map((paragraph, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="text-body"
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.85,
                      fontSize: "1rem",
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
            </div>

            {/* Tags */}
            <div
              style={{
                marginTop: "48px",
                paddingTop: "24px",
                borderTop: "1px solid var(--border-subtle)",
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-label"
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--text-muted)",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    padding: "4px 10px",
                    borderRadius: "20px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}