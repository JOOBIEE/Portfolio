"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function ServicesPreview() {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => router.push("/services")}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.95 }}
      whileHover={{ y: -2 }}
      style={{
        background: "var(--text-primary)",
        border: "none",
        borderRadius: "12px",
        padding: "20px 24px",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        maxWidth: "760px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
      }}
    >
      <div>
        <p
          className="text-label"
          style={{
            color: "var(--background)",
            opacity: 0.6,
            marginBottom: "6px",
          }}
        >
          Work with me
        </p>
        <p
          style={{
            color: "var(--background)",
            fontSize: "0.9375rem",
            fontWeight: 500,
            fontFamily: "var(--font-geist-sans)",
          }}
        >
          See pricing, packages, and how engagements work
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--background)",
          flexShrink: 0,
        }}
      >
        <span
          className="text-small"
          style={{ color: "var(--background)", opacity: 0.8 }}
        >
          View services
        </span>
        <ArrowRight size={14} />
      </div>
    </motion.button>
  );
}