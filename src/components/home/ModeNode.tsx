"use client";

import { motion } from "framer-motion";

type Mode = "systems" | "narratives" | "perception";

interface ModeNodeProps {
  id: Mode;
  label: string;
  description: string;
  isActive: boolean;
  onHover: (mode: Mode | null) => void;
  onClick: (mode: Mode) => void;
}

export default function ModeNode({
  id,
  label,
  description,
  isActive,
  onHover,
  onClick,
}: ModeNodeProps) {
  return (
    <motion.button
      onHoverStart={() => onHover(id)}
      onHoverEnd={() => onHover(null)}
      onClick={() => onClick(id)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{
        background: "transparent",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "24px 32px",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 300ms ease, background 300ms ease",
        borderColor: isActive ? "var(--text-muted)" : "var(--border)",
        backgroundColor: isActive ? "var(--surface)" : "transparent",
      }}
    >
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="node-highlight"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "12px",
            background: "var(--surface)",
            zIndex: 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          className="text-label"
          style={{
            color: isActive ? "var(--text-primary)" : "var(--text-muted)",
            marginBottom: "8px",
            transition: "color 300ms ease",
          }}
        >
          {label}
        </p>
        <p
          className="text-small"
          style={{
            color: "var(--text-muted)",
            lineHeight: 1.5,
            transition: "color 300ms ease",
          }}
        >
          {description}
        </p>
      </div>
    </motion.button>
  );
}