"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import Footer from "@/components/layout/Footer";
import EssayList from "@/components/narratives/EssayList";
import EssayReader from "@/components/narratives/EssayReader";
import ScrollToast from "@/components/ui/ScrollToast";
import { essays } from "@/data/essays";

export default function NarrativesPage() {
  const searchParams = useSearchParams();
  const essayParam = searchParams.get("essay");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  const [activeId, setActiveId] = useState(
    essayParam && essays.find((e) => e.id === essayParam)
      ? essayParam
      : essays[0]?.id ?? ""
  );

  useEffect(() => {
    if (essayParam && essays.find((e) => e.id === essayParam)) {
      setActiveId(essayParam);
    }
  }, [essayParam]);

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

  const activeEssay =
    essays.find((e) => e.id === activeId) ?? essays[0];

  if (!activeEssay) {
    return (
      <>
        <Navbar />
        <PageWrapper>
          <p
            className="text-body"
            style={{ color: "var(--text-muted)", paddingTop: "40px" }}
          >
            No essays yet. Add your first essay to{" "}
            <code>src/data/essays.ts</code>
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
            Narratives
          </h1>
          <p
            className="text-body"
            style={{
              color: "var(--text-secondary)",
              marginTop: "8px",
              maxWidth: "480px",
            }}
          >
            How thought becomes language. Essays on systems, perception,
            identity, and the structures beneath everyday life.
          </p>
        </div>

        <div
          className="narratives-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "220px 1fr",
            gap: "64px",
            alignItems: "start",
          }}
        >
          <div
            className="narratives-list-sticky"
            style={{ position: "sticky", top: "80px" }}
          >
            <EssayList
              essays={essays}
              activeId={activeId}
              onSelect={handleSelect}
            />
          </div>
          <EssayReader essay={activeEssay} />
        </div>
      </PageWrapper>
      <Footer />
      <ScrollToast visible={toastVisible} label="Essay opened below" />
    </>
  );
}