"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { services } from "@/data/services";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] },
});

function openWhatsApp() {
  const url = `https://wa.me/${services.whatsappNumber}?text=${encodeURIComponent(
    services.whatsappMessage
  )}`;
  window.open(url, "_blank");
}

export default function ServicesPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "96px",
      }}
    >
      {/* Hero */}
      <motion.div {...fadeUp(0)} style={{ maxWidth: "640px" }}>
        <p
          className="text-label"
          style={{ color: "var(--text-muted)", marginBottom: "16px" }}
        >
          Services
        </p>
        <h1
          className="text-heading"
          style={{
            color: "var(--text-primary)",
            marginBottom: "20px",
          }}
        >
          {services.headline}
        </h1>
        <p
          className="text-body"
          style={{
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            marginBottom: "12px",
          }}
        >
          {services.subheadline}
        </p>
        <p
          className="text-body"
          style={{ color: "var(--text-muted)", lineHeight: 1.8 }}
        >
          {services.description}
        </p>
      </motion.div>

      {/* Monthly packages */}
      <motion.div {...fadeUp(0.1)}>
        <div
          style={{
            marginBottom: "32px",
            paddingBottom: "16px",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <p
            className="text-label"
            style={{ color: "var(--text-muted)", marginBottom: "6px" }}
          >
            Social Media Management
          </p>
          <h2
            className="text-subheading"
            style={{ color: "var(--text-primary)" }}
          >
            Monthly Packages
          </h2>
        </div>

        <div
          className="services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            alignItems: "start",
          }}
        >
          {services.packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              {...fadeUp(0.1 + i * 0.08)}
              style={{
                background: pkg.badge ? "var(--surface)" : "transparent",
                border: "1px solid",
                borderColor: pkg.badge
                  ? "var(--text-muted)"
                  : "var(--border)",
                borderRadius: "14px",
                padding: "28px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {pkg.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--text-primary)",
                    color: "var(--background)",
                    padding: "3px 12px",
                    borderRadius: "20px",
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                    fontFamily: "var(--font-geist-sans)",
                  }}
                >
                  {pkg.badge}
                </div>
              )}

              <div>
                <p
                  className="text-label"
                  style={{
                    color: "var(--text-muted)",
                    marginBottom: "8px",
                  }}
                >
                  {pkg.tier}
                </p>
                <p
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "1.125rem",
                    fontWeight: 500,
                    fontFamily: "var(--font-geist-sans)",
                    lineHeight: 1.2,
                    marginBottom: "4px",
                  }}
                >
                  {pkg.currency} {pkg.priceRange}
                </p>
                <p
                  className="text-small"
                  style={{ color: "var(--text-muted)" }}
                >
                  per {pkg.period}
                </p>
              </div>

              <p
                className="text-small"
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                {pkg.description}
              </p>

              <div
                style={{
                  height: "1px",
                  background: "var(--border-subtle)",
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {pkg.includes.map((item, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <Check
                      size={13}
                      style={{
                        color: "var(--text-muted)",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    <p
                      className="text-small"
                      style={{
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {pkg.production.length > 0 && (
                <div>
                  <p
                    className="text-label"
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.65rem",
                      marginBottom: "10px",
                      borderTop: "1px solid var(--border-subtle)",
                      paddingTop: "12px",
                    }}
                  >
                    Content Production Included
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {pkg.production.map((item, j) => (
                      <div
                        key={j}
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: "var(--text-muted)",
                            flexShrink: 0,
                            marginTop: "6px",
                          }}
                        />
                        <p
                          className="text-small"
                          style={{
                            color: "var(--text-secondary)",
                            lineHeight: 1.5,
                          }}
                        >
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {pkg.note && (
                <p
                  className="text-label"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.65rem",
                    padding: "8px 12px",
                    background: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                  }}
                >
                  Note: {pkg.note}
                </p>
              )}

              <button
                onClick={openWhatsApp}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: pkg.badge
                    ? "var(--text-primary)"
                    : "transparent",
                  color: pkg.badge
                    ? "var(--background)"
                    : "var(--text-secondary)",
                  fontSize: "0.8125rem",
                  fontFamily: "var(--font-geist-sans)",
                  cursor: "pointer",
                  transition: "all 200ms ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  marginTop: "auto",
                }}
                onMouseEnter={(e) => {
                  if (!pkg.badge) {
                    e.currentTarget.style.background = "var(--surface)";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!pkg.badge) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }
                }}
              >
                Get Started
                <ArrowRight size={13} />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* One-time services */}
      <motion.div {...fadeUp(0.15)}>
        <div
          style={{
            marginBottom: "32px",
            paddingBottom: "16px",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <p
            className="text-label"
            style={{ color: "var(--text-muted)", marginBottom: "6px" }}
          >
            One-Time Setup
          </p>
          <h2
            className="text-subheading"
            style={{ color: "var(--text-primary)" }}
          >
            Web Solutions
          </h2>
        </div>

        <div
          className="services-two-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
        >
          {services.oneTime.map((item, i) => (
            <motion.div
              key={item.id}
              {...fadeUp(0.15 + i * 0.08)}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                    gap: "12px",
                  }}
                >
                  <div>
                    <p
                      className="text-label"
                      style={{
                        color: "var(--text-muted)",
                        marginBottom: "6px",
                      }}
                    >
                      {item.type}
                    </p>
                    <h3
                      className="text-subheading"
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "1rem",
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        fontFamily: "var(--font-geist-sans)",
                      }}
                    >
                      {item.currency} {item.priceRange}
                    </p>
                  </div>
                </div>
                <p
                  className="text-small"
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {item.includes.map((inc, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <Check
                      size={12}
                      style={{
                        color: "var(--text-muted)",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    <p
                      className="text-small"
                      style={{
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                      }}
                    >
                      {inc}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={openWhatsApp}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  color: "var(--text-secondary)",
                  fontSize: "0.8125rem",
                  fontFamily: "var(--font-geist-sans)",
                  cursor: "pointer",
                  transition: "all 200ms ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  marginTop: "auto",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--background)";
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.borderColor = "var(--text-muted)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                Enquire
                <ArrowRight size={13} />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Add-ons */}
      <motion.div {...fadeUp(0.2)}>
        <div
          style={{
            marginBottom: "32px",
            paddingBottom: "16px",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <p
            className="text-label"
            style={{ color: "var(--text-muted)", marginBottom: "6px" }}
          >
            Optional
          </p>
          <h2
            className="text-subheading"
            style={{ color: "var(--text-primary)" }}
          >
            Add-Ons
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {services.addOns.map((addon, i) => (
            <motion.div
              key={addon.id}
              {...fadeUp(0.2 + i * 0.06)}
              className="services-addon-row"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "24px 28px",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "32px",
                alignItems: "start",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    marginBottom: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <h3
                    className="text-small"
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 500,
                    }}
                  >
                    {addon.title}
                  </h3>
                  <span
                    className="text-label"
                    style={{
                      fontSize: "0.6rem",
                      color: "var(--text-muted)",
                      background: "var(--background)",
                      border: "1px solid var(--border)",
                      padding: "2px 8px",
                      borderRadius: "20px",
                    }}
                  >
                    {addon.type}
                  </span>
                </div>
                <p
                  className="text-small"
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: "14px",
                  }}
                >
                  {addon.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  {addon.includes.map((item, j) => (
                    <span
                      key={j}
                      className="text-label"
                      style={{
                        fontSize: "0.65rem",
                        color: "var(--text-muted)",
                        background: "var(--background)",
                        border: "1px solid var(--border)",
                        padding: "3px 10px",
                        borderRadius: "20px",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  textAlign: "right",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "12px",
                  flexShrink: 0,
                }}
              >
                <div>
                  <p
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "1rem",
                      fontWeight: 500,
                      fontFamily: "var(--font-geist-sans)",
                    }}
                  >
                    {addon.currency} {addon.priceRange}
                  </p>
                  <p
                    className="text-small"
                    style={{ color: "var(--text-muted)" }}
                  >
                    per {addon.period}
                  </p>
                </div>
                <button
                  onClick={openWhatsApp}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text-muted)",
                    fontSize: "0.8rem",
                    fontFamily: "var(--font-geist-sans)",
                    cursor: "pointer",
                    transition: "all 200ms ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.borderColor = "var(--text-muted)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  Add On
                  <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Starter services */}
      <motion.div {...fadeUp(0.25)}>
        <div
          style={{
            marginBottom: "24px",
            paddingBottom: "16px",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <p
            className="text-label"
            style={{ color: "var(--text-muted)", marginBottom: "6px" }}
          >
            Smaller Engagements
          </p>
          <h2
            className="text-subheading"
            style={{ color: "var(--text-primary)" }}
          >
            Starter Services
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "10px",
          }}
        >
          {services.starterServices.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "14px 16px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "var(--text-muted)",
                  flexShrink: 0,
                  marginTop: "6px",
                }}
              />
              <p
                className="text-small"
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA block */}
      <motion.div
        {...fadeUp(0.3)}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "48px 32px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h2
          className="text-subheading"
          style={{ color: "var(--text-primary)" }}
        >
          {services.cta.heading}
        </h2>
        <p
          className="text-body"
          style={{
            color: "var(--text-secondary)",
            maxWidth: "480px",
            lineHeight: 1.8,
          }}
        >
          {services.cta.body}
        </p>
        <button
          onClick={openWhatsApp}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 28px",
            borderRadius: "10px",
            border: "none",
            background: "var(--text-primary)",
            color: "var(--background)",
            fontSize: "0.9375rem",
            fontFamily: "var(--font-geist-sans)",
            fontWeight: 500,
            cursor: "pointer",
            transition: "opacity 200ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.85";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          {services.cta.buttonText}
          <ArrowRight size={16} />
        </button>
      </motion.div>
    </div>
  );
}