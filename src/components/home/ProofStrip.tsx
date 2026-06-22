"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { proofStrip } from "@/data/proofStrip";

type ProofItem = {
  label: string;
  hook: string;
  title: string;
  path: string;
  description?: string;
  external?: boolean;
};

export default function ProofStrip() {
  const router = useRouter();

  const handleClick = (path: string, external?: boolean) => {
    if (external) {
      window.open(path, "_blank");
    } else {
      router.push(path);
    }
  };

  const items: ProofItem[] = [
    proofStrip.systems,
    proofStrip.narratives,
    proofStrip.perception,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.65 }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "760px",
      }}
    >
      <p
        className="text-label"
        style={{ color: "var(--text-muted)" }}
      >
        Proof, not just promise
      </p>

      <div
        className="proof-strip-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }}
      >
        {items.map((item, i) => (
          <motion.button
            key={item.label}
            onClick={() => handleClick(item.path, item.external)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }}
            whileHover={{ y: -3 }}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "18px",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              transition: "border-color 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--text-muted)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            <p
              className="text-label"
              style={{
                color: "var(--text-muted)",
                fontSize: "0.65rem",
              }}
            >
              {item.label} — {item.title}
            </p>

            <p
              className="text-small"
              style={{
                color: "var(--text-primary)",
                lineHeight: 1.5,
                fontWeight: 500,
              }}
            >
              {item.hook}
            </p>

            {item.description && (
              <p
                className="text-small"
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.75rem",
                  lineHeight: 1.5,
                }}
              >
                {item.description}
              </p>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--text-muted)",
                marginTop: "auto",
              }}
            >
              <span style={{ fontSize: "0.75rem" }}>View</span>
              <ArrowRight size={11} />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}