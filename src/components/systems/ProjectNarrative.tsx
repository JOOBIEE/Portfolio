"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Project } from "@/data/projects";
import Lightbox from "@/components/ui/Lightbox";

interface ProjectNarrativeProps {
  project: Project;
}

const sections = [
  { key: "problem", label: "Problem" },
  { key: "approach", label: "Approach" },
  { key: "systemDesign", label: "System Design" },
  { key: "challenges", label: "Challenges" },
  { key: "whyItExists", label: "Why It Exists" },
] as const;

export default function ProjectNarrative({ project }: ProjectNarrativeProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>("");

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          {/* Header */}
          <div
            style={{
              borderBottom: "1px solid var(--border-subtle)",
              paddingBottom: "24px",
            }}
          >
            <p
              className="text-label"
              style={{ color: "var(--text-muted)", marginBottom: "10px" }}
            >
              {project.year} —{" "}
              {project.status.replace("-", " ").toUpperCase()}
            </p>
            <h2
              className="text-heading"
              style={{
                color: "var(--text-primary)",
                marginBottom: "12px",
              }}
            >
              {project.title}
            </h2>
            <p
              className="text-subheading"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.tagline}
            </p>

            {/* Screenshot */}
            <div
              onClick={() =>
                project.image &&
                openLightbox(project.image, `${project.title} screenshot`)
              }
              style={{
                marginTop: "24px",
                width: "100%",
                height: "220px",
                borderRadius: "10px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: project.image ? "zoom-in" : "default",
                transition: "border-color 200ms ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (project.image) {
                  e.currentTarget.style.borderColor = "var(--text-muted)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {project.image ? (
                <>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {/* Zoom hint overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 200ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(0,0,0,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(0,0,0,0)";
                    }}
                  >
                    <span
                      style={{
                        color: "white",
                        fontSize: "0.7rem",
                        fontFamily: "var(--font-geist-sans)",
                        letterSpacing: "0.06em",
                        opacity: 0,
                        transition: "opacity 200ms ease",
                        background: "rgba(0,0,0,0.5)",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        pointerEvents: "none",
                      }}
                      className="zoom-hint"
                    >
                      Click to expand
                    </span>
                  </div>
                </>
              ) : (
                <span
                  className="text-label"
                  style={{ color: "var(--text-muted)" }}
                >
                  Screenshot / Preview
                </span>
              )}
            </div>
          </div>

          {/* Sections */}
          {sections.map((section, i) => (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <p
                className="text-label"
                style={{
                  color: "var(--text-muted)",
                  borderBottom: "1px solid var(--border-subtle)",
                  paddingBottom: "8px",
                }}
              >
                {section.label}
              </p>
              <p
                className="text-body"
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                }}
              >
                {project[section.key]}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Lightbox
        src={lightboxSrc}
        alt={lightboxAlt}
        onClose={() => setLightboxSrc(null)}
      />
    </>
  );
}