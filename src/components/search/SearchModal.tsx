"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { search, SearchResult } from "@/lib/search";
import { useRouter } from "next/navigation";

const typeLabels = {
  project: "Project",
  essay: "Essay",
  "case-study": "Case Study",
  archive: "Archive",
};

const typeColors = {
  project: "#4D7EFF",
  essay: "#C8B8FF",
  "case-study": "#7FAAFF",
  archive: "#8A9BB8",
};

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults([]);
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const res = search(query);
    setResults(res);
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[activeIndex]) {
        navigate(results[activeIndex]);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, results, activeIndex]);

  const navigate = (result: SearchResult) => {
    router.push(result.path);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              zIndex: 200,
            }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            style={{
  position: "fixed",
  top: "70px",
  left: "12px",
  right: "12px",
  width: "auto",
  maxWidth: "640px",
  margin: "0 auto",
  maxHeight: "calc(100vh - 100px)",
  overflowY: "auto",
  background: "var(--background)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  zIndex: 201,
  boxShadow: "0 24px 48px rgba(0,0,0,0.12)",
}}
          >
            {/* Input */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 20px",
                borderBottom:
                  results.length > 0 || query
                    ? "1px solid var(--border-subtle)"
                    : "none",
              }}
            >
              <Search
                size={16}
                style={{ color: "var(--text-muted)", flexShrink: 0 }}
              />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, essays, case studies, archive..."
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  outline: "none",
                  color: "var(--text-primary)",
                  fontSize: "0.9375rem",
                  fontFamily: "var(--font-geist-sans)",
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    display: "flex",
                    padding: 0,
                  }}
                >
                  <X size={14} />
                </button>
              )}
              <kbd
                style={{
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  padding: "2px 6px",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div
                style={{
                  maxHeight: "420px",
                  overflowY: "auto",
                  padding: "8px",
                }}
              >
                {results.map((result, i) => (
                  <button
                    key={result.id}
                    onClick={() => navigate(result)}
                    onMouseEnter={() => setActiveIndex(i)}
                    style={{
                      width: "100%",
                      background:
                        activeIndex === i
                          ? "var(--surface)"
                          : "transparent",
                      border: "1px solid",
                      borderColor:
                        activeIndex === i
                          ? "var(--border)"
                          : "transparent",
                      borderRadius: "8px",
                      padding: "12px 14px",
                      cursor: "pointer",
                      textAlign: "left",
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                      transition: "all 150ms ease",
                      marginBottom: "2px",
                    }}
                  >
                    {/* Type dot */}
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: typeColors[result.type],
                        flexShrink: 0,
                        marginTop: "5px",
                      }}
                    />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "4px",
                        }}
                      >
                        <span
                          className="text-label"
                          style={{
                            color: "var(--text-muted)",
                            fontSize: "0.6rem",
                          }}
                        >
                          {typeLabels[result.type]}
                        </span>
                        <div
                          style={{
                            display: "flex",
                            gap: "4px",
                            flexWrap: "wrap",
                          }}
                        >
                          {result.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-label"
                              style={{
                                fontSize: "0.55rem",
                                color: "var(--text-muted)",
                                background: "var(--border-subtle)",
                                padding: "1px 5px",
                                borderRadius: "3px",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p
                        className="text-small"
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: 500,
                          marginBottom: "4px",
                        }}
                      >
                        {result.title}
                      </p>

                      <p
                        style={{
                          color: "var(--text-muted)",
                          fontSize: "0.8rem",
                          lineHeight: 1.5,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {result.excerpt}
                      </p>
                    </div>

                    <ArrowRight
                      size={12}
                      style={{
                        color: "var(--text-muted)",
                        flexShrink: 0,
                        marginTop: "4px",
                        opacity: activeIndex === i ? 1 : 0,
                        transition: "opacity 150ms ease",
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Empty state */}
            {query && results.length === 0 && (
              <div
                style={{
                  padding: "40px 24px",
                  textAlign: "center",
                }}
              >
                <p
                  className="text-body"
                  style={{ color: "var(--text-muted)" }}
                >
                  No results for "{query}"
                </p>
              </div>
            )}

            {/* Hint when empty */}
            {!query && (
              <div
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <p
                  className="text-label"
                  style={{
                    color: "var(--text-muted)",
                    marginBottom: "4px",
                  }}
                >
                  Search across
                </p>
                {[
                  { label: "Projects", color: typeColors.project },
                  { label: "Essays", color: typeColors.essay },
                  { label: "Case Studies", color: typeColors["case-study"] },
                  { label: "Archive", color: typeColors.archive },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: item.color,
                      }}
                    />
                    <span
                      className="text-small"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}

                <div
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <kbd
                    style={{
                      fontSize: "0.65rem",
                      color: "var(--text-muted)",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      padding: "2px 6px",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    ↑↓
                  </kbd>
                  <span
                    className="text-small"
                    style={{ color: "var(--text-muted)" }}
                  >
                    navigate
                  </span>
                  <kbd
                    style={{
                      fontSize: "0.65rem",
                      color: "var(--text-muted)",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      padding: "2px 6px",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    ↵
                  </kbd>
                  <span
                    className="text-small"
                    style={{ color: "var(--text-muted)" }}
                  >
                    open
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}