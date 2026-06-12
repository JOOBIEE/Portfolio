"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import Footer from "@/components/layout/Footer";
import CaseStudyCard from "@/components/perception/CaseStudyCard";
import CaseStudyModal from "@/components/perception/CaseStudyModal";
import { caseStudies, CaseStudy } from "@/data/caseStudies";

export default function PerceptionPage() {
  const searchParams = useSearchParams();
  const caseParam = searchParams.get("case");
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  useEffect(() => {
    if (caseParam) {
      const found = caseStudies.find((c) => c.id === caseParam);
      if (found) setSelected(found);
    }
  }, [caseParam]);

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Header */}
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
            Perception
          </h1>
          <p
            className="text-body"
            style={{
              color: "var(--text-secondary)",
              marginTop: "8px",
              maxWidth: "480px",
            }}
          >
            How trust, identity, and positioning are engineered. Each
            case study is a shift in what people believe — and why.
          </p>
        </div>

        {/* Grid */}
        {caseStudies.length === 0 ? (
          <p
            className="text-body"
            style={{ color: "var(--text-muted)" }}
          >
            No case studies yet. Add your first to{" "}
            <code>src/data/caseStudies.ts</code>
          </p>
        ) : (
          <div
            className="perception-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "16px",
            }}
          >
            {caseStudies.map((cs, i) => (
              <CaseStudyCard
                key={cs.id}
                caseStudy={cs}
                index={i}
                onClick={() => setSelected(cs)}
              />
            ))}
          </div>
        )}
      </PageWrapper>
      <Footer />

      <CaseStudyModal
        caseStudy={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}