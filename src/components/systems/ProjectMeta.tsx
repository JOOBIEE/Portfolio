"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Link } from "lucide-react";
import { Project } from "@/data/projects";
import Lightbox from "@/components/ui/Lightbox";

interface ProjectMetaProps {
  project: Project;
}

export default function ProjectMeta({ project }: ProjectMetaProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          className="systems-meta-sticky"
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            position: "sticky",
            top: "80px",
          }}
        >
          {/* Tech stack */}
          <div>
            <p
              className="text-label"
              style={{
                color: "var(--text-muted)",
                marginBottom: "12px",
                paddingBottom: "8px",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              Tech Stack
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-small"
                  style={{
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
                      flexShrink: 0,
                    }}
                  />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <p
              className="text-label"
              style={{
                color: "var(--text-muted)",
                marginBottom: "12px",
                paddingBottom: "8px",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              Themes
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              {project.tags.map((tag) => (
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
          </div>

          {/* Architecture diagram */}
          <div>
            <p
              className="text-label"
              style={{
                color: "var(--text-muted)",
                marginBottom: "12px",
                paddingBottom: "8px",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              Architecture
            </p>
            <div
              onClick={() =>
                project.architectureDiagram &&
                setLightboxSrc(project.architectureDiagram)
              }
              style={{
                width: "100%",
                borderRadius: "8px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                overflow: "hidden",
                minHeight: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: project.architectureDiagram
                  ? "zoom-in"
                  : "default",
                transition: "border-color 200ms ease",
              }}
              onMouseEnter={(e) => {
                if (project.architectureDiagram) {
                  e.currentTarget.style.borderColor = "var(--text-muted)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {project.architectureDiagram ? (
                <img
                  src={project.architectureDiagram}
                  alt={`${project.title} architecture`}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              ) : (
                <span
                  className="text-label"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.65rem",
                    padding: "40px 16px",
                    textAlign: "center",
                  }}
                >
                  Architecture Diagram
                </span>
              )}
            </div>
          </div>

          {/* Links */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {project.github && (
              
             <a   href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text-secondary)",
                  fontSize: "0.8125rem",
                  transition: "all 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.borderColor = "var(--text-muted)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <Link size={14} />
                View on GitHub
              </a>
            )}

            {project.liveDemo && (
              
             <a   href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text-secondary)",
                  fontSize: "0.8125rem",
                  transition: "all 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.borderColor = "var(--text-muted)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <Lightbox
        src={lightboxSrc}
        alt={
          lightboxSrc === project.architectureDiagram
            ? `${project.title} architecture`
            : project.title
        }
        onClose={() => setLightboxSrc(null)}
      />
    </>
  );
}