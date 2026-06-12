"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { Link, Mail } from "lucide-react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] },
});

export default function ProfilePage() {
  return (
    <div
      className="profile-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: "80px",
        alignItems: "start",
      }}
    >
      {/* Left column */}
      <div
        className="profile-left-sticky"
        style={{ position: "sticky", top: "80px" }}
      >
        <motion.div {...fadeUp(0)}>
          {/* Profile image */}
          <div
            className="profile-image"
            style={{
              width: "100%",
              aspectRatio: "1",
              borderRadius: "12px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              overflow: "hidden",
              marginBottom: "24px",
            }}
          >
            {profile.image ? (
              <img
                src={profile.image}
                alt={profile.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  className="text-label"
                  style={{ color: "var(--text-muted)" }}
                >
                  Your Photo
                </span>
              </div>
            )}
          </div>

          {/* Name + handle */}
          <h1
            className="text-heading"
            style={{
              color: "var(--text-primary)",
              fontSize: "1.375rem",
              marginBottom: "4px",
            }}
          >
            {profile.name}
          </h1>
          <p
            className="text-small"
            style={{ color: "var(--text-muted)", marginBottom: "6px" }}
          >
            {profile.handle}
          </p>
          <p
            className="text-small"
            style={{ color: "var(--text-muted)", marginBottom: "24px" }}
          >
            {profile.location}
          </p>

          {/* Availability */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              borderRadius: "8px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#22c55e",
                flexShrink: 0,
              }}
            />
            <p
              className="text-small"
              style={{ color: "var(--text-secondary)" }}
            >
              {profile.availability}
            </p>
          </div>

          {/* Links */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {[
              { label: "GitHub", href: profile.links.github },
              { label: "Substack", href: profile.links.substack },
              { label: "LinkedIn", href: profile.links.linkedin },
            ].map((link) => (
              
           <a     key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  color: "var(--text-muted)",
                  fontSize: "0.8125rem",
                  transition: "all 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.borderColor = "var(--text-muted)";
                  e.currentTarget.style.background = "var(--surface)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Link size={12} />
                {link.label}
              </a>
            ))}

            
            <a  href={`mailto:${profile.links.email}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--text-muted)",
                fontSize: "0.8125rem",
                transition: "all 200ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
                e.currentTarget.style.borderColor = "var(--text-muted)";
                e.currentTarget.style.background = "var(--surface)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Mail size={12} />
              Email
            </a>
          </div>
        </motion.div>
      </div>

      {/* Right column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "56px",
        }}
      >
        {/* Current focus */}
        <motion.div {...fadeUp(0.1)}>
          <DossierSection label="Current Focus">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {profile.currentFocus.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
                      flexShrink: 0,
                      marginTop: "7px",
                    }}
                  />
                  <p
                    className="text-body"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </DossierSection>
        </motion.div>

        {/* Tools */}
        <motion.div {...fadeUp(0.15)}>
          <DossierSection label="Tools">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {profile.tools.map((tool) => (
                <span
                  key={tool}
                  className="text-small"
                  style={{
                    color: "var(--text-secondary)",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    fontSize: "0.8125rem",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </DossierSection>
        </motion.div>

        {/* Active research */}
        <motion.div {...fadeUp(0.2)}>
          <DossierSection label="Active Research Areas">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {profile.activeResearch.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "16px",
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
                      width: "20px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="text-body"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </DossierSection>
        </motion.div>

        {/* Operating principles */}
        <motion.div {...fadeUp(0.25)}>
          <DossierSection label="Operating Principles">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {profile.operatingPrinciples.map((principle, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  style={{
                    padding: "20px",
                    borderRadius: "10px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p
                    className="text-small"
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 500,
                      marginBottom: "6px",
                    }}
                  >
                    {principle.label}
                  </p>
                  <p
                    className="text-body"
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </DossierSection>
        </motion.div>
      </div>
    </div>
  );
}

function DossierSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        className="text-label"
        style={{
          color: "var(--text-muted)",
          marginBottom: "16px",
          paddingBottom: "10px",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}