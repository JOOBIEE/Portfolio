"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import SearchModal from "@/components/search/SearchModal";

const links = [
  { label: "Systems", path: "/systems" },
  { label: "Narratives", path: "/narratives" },
  { label: "Perception", path: "/perception" },
  { label: "Profile", path: "/profile" },
  {label: "Services", path: "/services" },
  { label: "Archive", path: "/archive" },
  { label: "Graph", path: "/graph" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <button
          onClick={() => setSearchOpen(true)}
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
          }}
        >
          <Search size={15} />
        </button>

        <button
          onClick={() => setOpen(!open)}
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
          }}
        >
          {open ? <X size={15} /> : <Menu size={15} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: "60px",
              left: 0,
              right: 0,
              background: "var(--background)",
              borderBottom: "1px solid var(--border)",
              zIndex: 49,
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                style={{
                  background: pathname.startsWith(link.path)
                    ? "var(--surface)"
                    : "transparent",
                  border: "1px solid",
                  borderColor: pathname.startsWith(link.path)
                    ? "var(--border)"
                    : "transparent",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  cursor: "pointer",
                  textAlign: "left",
                  color: pathname.startsWith(link.path)
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                  fontSize: "0.9375rem",
                  fontFamily: "var(--font-geist-sans)",
                  transition: "all 150ms ease",
                }}
              >
                {link.label}
              </button>
            ))}

            <div
              style={{
                marginTop: "8px",
                paddingTop: "12px",
                borderTop: "1px solid var(--border-subtle)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px 0",
              }}
            >
              <span
                className="text-label"
                style={{ color: "var(--text-muted)" }}
              >
                {theme === "dark" ? "Dark mode" : "Light mode"}
              </span>
              <button
                onClick={toggleTheme}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                Toggle
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}