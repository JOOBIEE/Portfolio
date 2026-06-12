"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface ScrollToastProps {
  visible: boolean;
  label?: string;
}

export default function ScrollToast({
  visible,
  label = "Opened below",
}: ScrollToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed",
            top: "76px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 80,
            background: "var(--text-primary)",
            color: "var(--background)",
            padding: "8px 16px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          }}
        >
          <ArrowDown size={12} />
          <span
            style={{
              fontSize: "0.8rem",
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 500,
            }}
          >
            {label}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}