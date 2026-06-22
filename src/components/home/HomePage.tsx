"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { useRouter } from "next/navigation";
import NetworkCanvas from "./NetworkCanvas";
import ModeNode from "./ModeNode";
import ProofStrip from "./ProofStrip";
import ServicesPreview from "./ServicesPreview";

type Mode = "systems" | "narratives" | "perception";

const modes = [
  {
    id: "systems" as Mode,
    label: "SYSTEMS",
    description: "How problems are analyzed, built, and deployed.",
  },
  {
    id: "narratives" as Mode,
    label: "NARRATIVES",
    description: "How thought becomes language.",
  },
  {
    id: "perception" as Mode,
    label: "PERCEPTION",
    description: "How trust, identity, and positioning are engineered.",
  },
];

const words = ["SYSTEMS", "LANGUAGE", "PERCEPTION"];

export default function HomePage() {
  const [hoveredMode, setHoveredMode] = useState<Mode | null>(null);
  const { setMode } = useTheme();
  const router = useRouter();

  const handleEnter = (id: Mode) => {
    setMode(id);
    router.push(`/${id}`);
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        paddingBottom: "64px",
      }}
    >
      {/* Network background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <NetworkCanvas hoveredMode={hoveredMode} />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "56px",
        }}
      >
        {/* Hero words */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {words.map((word, i) => (
            <motion.h1
              key={word}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="text-display"
              style={{
                color: "var(--text-primary)",
                lineHeight: 1.05,
              }}
            >
              {word}
            </motion.h1>
          ))}

          {/* Statement */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-subheading"
            style={{
              color: "var(--text-muted)",
              marginTop: "24px",
              maxWidth: "480px",
            }}
          >
            Every outcome is downstream of a system.
          </motion.p>

          {/* Offer line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-body"
            style={{
              color: "var(--text-secondary)",
              marginTop: "12px",
              maxWidth: "480px",
              lineHeight: 1.7,
            }}
          >
            I build the products, write the thinking, and shape the
            perception behind brands that need to move fast.
          </motion.p>
        </motion.div>

        {/* Entry nodes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="home-mode-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
            maxWidth: "760px",
          }}
        >
          {modes.map((m) => (
            <ModeNode
              key={m.id}
              id={m.id}
              label={m.label}
              description={m.description}
              isActive={hoveredMode === m.id}
              onHover={setHoveredMode}
              onClick={handleEnter}
            />
          ))}
        </motion.div>

        {/* Proof strip */}
        <ProofStrip />

        {/* Services preview */}
        <ServicesPreview />

        {/* Bottom links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {[
            { label: "View operator profile", path: "/profile" },
            { label: "Explore the identity graph", path: "/graph" },
          ].map((item, i) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 + i * 0.08 }}
            >
              <button
                onClick={() => router.push(item.path)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
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
                <div
                  style={{
                    width: "24px",
                    height: "1px",
                    background: "currentColor",
                  }}
                />
                <span className="text-small">{item.label}</span>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}