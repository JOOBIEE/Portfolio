"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { CaseStudy } from "@/data/caseStudies";
import { useEffect } from "react";

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyModal({
  caseStudy,
  onClose,
}: CaseStudyModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (caseStudy) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [caseStudy]);

  return (
    <AnimatePresence>
      {caseStudy && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              zIndex: 100,
            }}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            className="case-study-panel"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(560px, 100vw)",
              background: "var(--background)",
              borderLeft: "1px solid var(--border)",
              zIndex: 101,
              overflowY: "auto",
              padding: "40px 32px 80px",
            }}
          >
            {/* Close */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "40px",
              }}
            >
              <span
                className="text-label"
                style={{ color: "var(--text-muted)" }}
              >
                Intelligence Report
              </span>
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

            {/* Title */}
            <div style={{ marginBottom: "40px" }}>
              <p
                className="text-label"
                style={{ color: "var(--text-muted)", marginBottom: "8px" }}
              >
                {caseStudy.category} · {caseStudy.year}
              </p>
              <h2
                className="text-heading"
                style={{
                  color: "var(--text-primary)",
                  marginBottom: "12px",
                }}
              >
                {caseStudy.title}
              </h2>
              <p
                className="text-body"
                style={{ color: "var(--text-secondary)" }}
              >
                {caseStudy.summary}
              </p>
            </div>

            {/* Before */}
            <Section label="Initial Perception">
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <p
                  className="text-subheading"
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "0.9375rem",
                    marginBottom: "10px",
                  }}
                >
                  {caseStudy.before.label}
                </p>
                <p
                  className="text-body"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {caseStudy.before.description}
                </p>
              </div>
            </Section>

            <Divider label="Intervention" />

            {/* Intervention */}
            <Section label="What Changed">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {caseStudy.intervention.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      className="text-label"
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.65rem",
                        marginTop: "2px",
                        flexShrink: 0,
                        width: "18px",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      className="text-body"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Section>

            <Divider label="Result" />

            {/* After */}
            <Section label="Resulting Perception">
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <p
                  className="text-subheading"
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "0.9375rem",
                    marginBottom: "10px",
                  }}
                >
                  {caseStudy.after.label}
                </p>
                <p
                  className="text-body"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {caseStudy.after.description}
                </p>
              </div>
            </Section>

            {/* Result quote */}
            {caseStudy.result && (
              <div
                style={{
                  marginTop: "32px",
                  borderLeft: "2px solid var(--text-muted)",
                  paddingLeft: "20px",
                }}
              >
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                  }}
                >
                  {caseStudy.result}
                </p>
              </div>
            )}

            {/* Tags */}
            <div
              style={{
                marginTop: "40px",
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              {caseStudy.tags.map((tag) => (
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

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <p
        className="text-label"
        style={{
          color: "var(--text-muted)",
          marginBottom: "12px",
          paddingBottom: "8px",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        margin: "24px 0",
      }}
    >
      <div
        style={{ flex: 1, height: "1px", background: "var(--border)" }}
      />
      <span
        className="text-label"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
      <div
        style={{ flex: 1, height: "1px", background: "var(--border)" }}
      />
    </div>
  );
}