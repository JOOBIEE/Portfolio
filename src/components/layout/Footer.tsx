"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ContactModal from "@/components/ui/ContactModal";

export default function Footer() {
  const router = useRouter();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <footer
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "40px 32px",
          marginTop: "96px",
        }}
      >
        <div
          className="footer-grid"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: "32px",
          }}
        >
          {/* Left — nav links */}
          <div
            className="footer-links-left"
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Systems", path: "/systems" },
              { label: "Narratives", path: "/narratives" },
              { label: "Perception", path: "/perception" },
              { label: "Profile", path: "/profile" },
              { label: "Services", path: "/services" },
              { label: "Archive", path: "/archive" },
              { label: "Graph", path: "/graph" },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => router.push(link.path)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  color: "var(--text-muted)",
                  fontSize: "0.8125rem",
                  fontFamily: "var(--font-geist-sans)",
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Center — wordmark */}
          <button
            onClick={() => router.push("/")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <span
              className="text-label"
              style={{
                color: "var(--text-muted)",
                letterSpacing: "0.12em",
                fontSize: "0.7rem",
              }}
            >
              ALGORYTHMS
            </span>
          </button>

          {/* Right — external + email */}
          <div
            className="footer-links-right"
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "center",
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "GitHub", href: "https://github.com/JOOBIEE" },
              { label: "Substack", href: "https://substack.com/@thehumanalgorythm" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/omotosho-jubril-73523a30b" },
            ].map((link) => (
              
               <a key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.8125rem",
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => setContactOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                color: "var(--text-muted)",
                fontSize: "0.8125rem",
                fontFamily: "var(--font-geist-sans)",
                transition: "color 200ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              Email
            </button>
          </div>
        </div>

        {/* Bottom line */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "24px auto 0",
            paddingTop: "24px",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.75rem",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Every outcome is downstream of a system.
          </p>
        </div>
      </footer>

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}