"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import SearchModal from "@/components/search/SearchModal";
import MobileNav from "@/components/layout/MobileNav";

const modes = [
  { id: "systems", label: "Systems", path: "/systems" },
  { id: "narratives", label: "Narratives", path: "/narratives" },
  { id: "perception", label: "Perception", path: "/perception" },
] as const;

export default function Navbar() {
  const { theme, setMode, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleModeClick = (
    id: "systems" | "narratives" | "perception",
    path: string
  ) => {
    setMode(id);
    router.push(path);
  };

  const activeMode =
    modes.find((m) => pathname.startsWith(m.path))?.id ?? null;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: "1px solid var(--border-subtle)",
          backgroundColor: "var(--background)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 32px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          {/* Desktop nav */}
          <div
            className="desktop-only"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: "16px",
            }}
          >
            {/* Left — logo + links */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                flexShrink: 0,
              }}
            >
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
                    color: "var(--text-primary)",
                    letterSpacing: "0.12em",
                  }}
                >
                  ALGORYTHMS
                </span>
              </button>

              {[
                { label: "Profile", path: "/profile" },
                {label: "Services", path: "/services" },
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
                    color: pathname.startsWith(link.path)
                      ? "var(--text-primary)"
                      : "var(--text-muted)",
                    fontSize: "0.8125rem",
                    fontFamily: "var(--font-geist-sans)",
                    transition: "color 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!pathname.startsWith(link.path)) {
                      e.currentTarget.style.color = "var(--text-muted)";
                    }
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Center — mode switcher */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                background: "var(--surface)",
                borderRadius: "10px",
                padding: "4px",
                border: "1px solid var(--border)",
              }}
            >
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleModeClick(m.id, m.path)}
                  style={{
                    position: "relative",
                    padding: "6px 16px",
                    borderRadius: "7px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color:
                      activeMode === m.id
                        ? "var(--text-primary)"
                        : "var(--text-muted)",
                    fontSize: "0.8125rem",
                    fontWeight: activeMode === m.id ? 500 : 400,
                    fontFamily: "var(--font-geist-sans)",
                    transition: "color 250ms ease",
                    zIndex: 1,
                  }}
                >
                  {activeMode === m.id && (
                    <motion.span
                      layoutId="mode-pill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "7px",
                        background: "var(--background)",
                        border: "1px solid var(--border)",
                        zIndex: -1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                      }}
                    />
                  )}
                  {m.label}
                </button>
              ))}
            </div>

            {/* Right — search + theme */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => setSearchOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-geist-sans)",
                  transition: "all 200ms ease",
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
                <Search size={13} />
                <span>Search</span>
                <kbd
                  style={{
                    fontSize: "0.6rem",
                    color: "var(--text-muted)",
                    background: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                    padding: "1px 4px",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  ⌘K
                </kbd>
              </button>

              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-secondary)",
                  transition: "all 250ms ease",
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
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          <div
            className="mobile-only"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
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
                  color: "var(--text-primary)",
                  letterSpacing: "0.12em",
                }}
              >
                ALGORTYHMS
              </span>
            </button>
            <MobileNav />
          </div>
        </div>
      </nav>

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}