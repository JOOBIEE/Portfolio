"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Essay } from "@/data/essays";

interface EssayReaderProps {
  essay: Essay;
}

export default function EssayReader({ essay }: EssayReaderProps) {
  const paragraphs = essay.content
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={essay.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Header */}
        <div
          style={{
            paddingBottom: "40px",
            marginBottom: "40px",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            <span
              className="text-label"
              style={{ color: "var(--text-muted)" }}
            >
              {essay.publishedDate}
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
              style={{ color: "var(--text-muted)" }}
            >
              {essay.readingTime}
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
              style={{ color: "var(--text-muted)" }}
            >
              {essay.theme}
            </span>
          </div>

          <h1
            className="text-heading"
            style={{
              color: "var(--text-primary)",
              marginBottom: "24px",
              lineHeight: 1.2,
            }}
          >
            {essay.title}
          </h1>

          {/* Key insight pull quote */}
          <div
            style={{
              borderLeft: "2px solid var(--text-muted)",
              paddingLeft: "20px",
              marginTop: "24px",
            }}
          >
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.0625rem",
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              {essay.keyInsight}
            </p>
          </div>
        </div>

        {/* Body */}
        <div
          className="narratives-reader"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "640px",
          }}
        >
          {paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              className="text-body"
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.85,
                fontSize: "1.0625rem",
              }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "64px",
            paddingTop: "32px",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {essay.tags.map((tag) => (
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

          {essay.substackUrl && (
            
           <a   href={essay.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
                transition: "color 200ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              Read on Substack
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </motion.article>
    </AnimatePresence>
  );
}