"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import Footer from "@/components/layout/Footer";
import ProjectIndex from "@/components/systems/ProjectIndex";
import ProjectNarrative from "@/components/systems/ProjectNarrative";
import ProjectMeta from "@/components/systems/ProjectMeta";
import ScrollToast from "@/components/ui/ScrollToast";
import { projects } from "@/data/projects";

export default function SystemsPage() {
  const searchParams = useSearchParams();
  const projectParam = searchParams.get("project");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  const [activeId, setActiveId] = useState(
    projectParam && projects.find((p) => p.id === projectParam)
      ? projectParam
      : projects[0]?.id ?? ""
  );

  useEffect(() => {
    if (projectParam && projects.find((p) => p.id === projectParam)) {
      setActiveId(projectParam);
    }
  }, [projectParam]);

  const handleSelect = (id: string) => {
    setActiveId(id);

    // Only show toast on mobile
    if (window.innerWidth < 900) {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      setToastVisible(true);
      toastTimer.current = setTimeout(() => setToastVisible(false), 2000);
    }
  };

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const activeProject =
    projects.find((p) => p.id === activeId) ?? projects[0];

  if (!activeProject) {
    return (
      <>
        <Navbar />
        <PageWrapper>
          <p
            className="text-body"
            style={{ color: "var(--text-muted)", paddingTop: "40px" }}
          >
            No projects yet. Add your first project to{" "}
            <code>src/data/projects.ts</code>
          </p>
        </PageWrapper>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div
          style={{
            marginBottom: "48px",
            paddingBottom: "32px",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <p
            className="text-label"
            style={{ color: "var(--text-muted)", marginBottom: "8px" }}
          >
            Mode
          </p>
          <h1
            className="text-heading"
            style={{ color: "var(--text-primary)" }}
          >
            Systems
          </h1>
          <p
            className="text-body"
            style={{
              color: "var(--text-secondary)",
              marginTop: "8px",
              maxWidth: "480px",
            }}
          >
            How problems are analyzed, designed, and deployed. Each
            project is a system — built with intent.
          </p>
        </div>

        <div
          className="systems-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "220px 1fr 200px",
            gap: "48px",
            alignItems: "start",
          }}
        >
          <ProjectIndex
            projects={projects}
            activeId={activeId}
            onSelect={handleSelect}
          />
          <ProjectNarrative project={activeProject} />
          <ProjectMeta project={activeProject} />
        </div>
      </PageWrapper>
      <Footer />
      <ScrollToast visible={toastVisible} label="Project opened below" />
    </>
  );
}