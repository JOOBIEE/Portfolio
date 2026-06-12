"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useTheme();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={mode}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{
          minHeight: "100vh",
          paddingTop: "96px",      // clears fixed navbar + breathing room
          paddingBottom: "64px",
          paddingLeft: "32px",
          paddingRight: "32px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {children}
        </div>
      </motion.main>
    </AnimatePresence>
  );
}