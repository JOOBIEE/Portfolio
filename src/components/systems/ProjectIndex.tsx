"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";

interface ProjectIndexProps {
  projects: Project[];
  activeId: string;
  onSelect: (id: string) => void;
}

const statusColors: Record<Project["status"], string> = {
  live: "#22c55e",
  "in-progress": "#f59e0b",
  archived: "var(--text-muted)",
};

export default function ProjectIndex({
  projects,
  activeId,
  onSelect,
}: ProjectIndexProps) {
  return (
    <div
      className="systems-index-sticky"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        position: "sticky",
        top: "80px",
      }}
    >
      <p
        className="text-label"
        style={{
          color: "var(--text-muted)",
          marginBottom: "16px",
          paddingBottom: "12px",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        Projects
      </p>

      {projects.map((project, i) => (
        <motion.button
          key={project.id}
          onClick={() => onSelect(project.id)}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          style={{
            background:
              activeId === project.id ? "var(--surface)" : "transparent",
            border: "1px solid",
            borderColor:
              activeId === project.id ? "var(--border)" : "transparent",
            borderRadius: "8px",
            padding: "12px 14px",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 200ms ease",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            if (activeId !== project.id) {
              e.currentTarget.style.background = "var(--surface)";
            }
          }}
          onMouseLeave={(e) => {
            if (activeId !== project.id) {
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "4px",
            }}
          >
            <span
              className="text-small"
              style={{
                color:
                  activeId === project.id
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                fontWeight: activeId === project.id ? 500 : 400,
                transition: "color 200ms ease",
              }}
            >
              {project.title}
            </span>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: statusColors[project.status],
                flexShrink: 0,
              }}
            />
          </div>

          <p
            className="text-small"
            style={{
              color: "var(--text-muted)",
              fontSize: "0.75rem",
              lineHeight: 1.4,
            }}
          >
            {project.tagline}
          </p>

          <div
            style={{
              display: "flex",
              gap: "6px",
              marginTop: "8px",
              flexWrap: "wrap",
            }}
          >
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-label"
                style={{
                  fontSize: "0.6rem",
                  color: "var(--text-muted)",
                  background: "var(--border-subtle)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  border: "1px solid var(--border)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.button>
      ))}
    </div>
  );
}