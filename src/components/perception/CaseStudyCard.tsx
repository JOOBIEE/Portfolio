"use client";

import { motion } from "framer-motion";
import { CaseStudy } from "@/data/caseStudies";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index: number;
  onClick: () => void;
}

export default function CaseStudyCard({
  caseStudy,
  index,
  onClick,
}: CaseStudyCardProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -3 }}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "24px",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "border-color 250ms ease",
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
          marginBottom: "16px",
        }}
      >
        <div>
          <p
            className="text-label"
            style={{ color: "var(--text-muted)", marginBottom: "6px" }}
          >
            {caseStudy.category} · {caseStudy.year}
          </p>
          <h3
            className="text-subheading"
            style={{
              color: "var(--text-primary)",
              fontSize: "1rem",
            }}
          >
            {caseStudy.title}
          </h3>
        </div>
        <span
          className="text-label"
          style={{
            fontSize: "0.6rem",
            color: "var(--text-muted)",
            background: "var(--background)",
            border: "1px solid var(--border)",
            padding: "4px 8px",
            borderRadius: "20px",
            whiteSpace: "nowrap",
            marginLeft: "12px",
            flexShrink: 0,
          }}
        >
          Case Study
        </span>
      </div>

      {/* Transformation flow */}
      <div
        className="perception-card-flow"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: "8px",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        {/* Before */}
        <div
          style={{
            background: "var(--background)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "10px 12px",
          }}
        >
          <p
            className="text-label"
            style={{
              color: "var(--text-muted)",
              fontSize: "0.6rem",
              marginBottom: "4px",
            }}
          >
            Before
          </p>
          <p
            className="text-small"
            style={{ color: "var(--text-secondary)", lineHeight: 1.4 }}
          >
            {caseStudy.before.label}
          </p>
        </div>

        {/* Arrow */}
        <div
          className="perception-card-arrow"
          style={{
            display: "flex",
            alignItems: "center",
            color: "var(--text-muted)",
            fontSize: "0.75rem",
            flexShrink: 0,
          }}
        >
          →
        </div>

        {/* After */}
        <div
          style={{
            background: "var(--background)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "10px 12px",
          }}
        >
          <p
            className="text-label"
            style={{
              color: "var(--text-muted)",
              fontSize: "0.6rem",
              marginBottom: "4px",
            }}
          >
            After
          </p>
          <p
            className="text-small"
            style={{ color: "var(--text-secondary)", lineHeight: 1.4 }}
          >
            {caseStudy.after.label}
          </p>
        </div>
      </div>

      {/* Summary */}
      <p
        className="text-small"
        style={{
          color: "var(--text-muted)",
          lineHeight: 1.6,
          borderTop: "1px solid var(--border-subtle)",
          paddingTop: "12px",
        }}
      >
        {caseStudy.summary}
      </p>
    </motion.button>
  );
}