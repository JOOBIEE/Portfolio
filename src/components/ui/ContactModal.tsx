"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Check } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

type Status = "idle" | "sending" | "success" | "error";

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setError("");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 300);
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
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              zIndex: 200,
            }}
          />

          {/* Modal — full screen on mobile, floating on desktop */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 201,
              background: "var(--background)",
              borderTop: "1px solid var(--border)",
              borderRadius: "20px 20px 0 0",
              padding: "24px 20px 32px",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 -8px 40px rgba(0,0,0,0.12)",
            }}
            className="contact-modal-inner"
          >
            {/* Drag handle — visual only */}
            <div
              style={{
                width: "36px",
                height: "4px",
                borderRadius: "2px",
                background: "var(--border)",
                margin: "0 auto 20px",
              }}
            />

            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "24px",
              }}
            >
              <div>
                <p
                  className="text-label"
                  style={{
                    color: "var(--text-muted)",
                    marginBottom: "4px",
                  }}
                >
                  Get In Touch
                </p>
                <h2
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-geist-sans)",
                  }}
                >
                  Send a Message
                </h2>
              </div>

              <button
                onClick={handleClose}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-secondary)",
                  flexShrink: 0,
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Success state */}
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                  padding: "32px 0",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Check size={20} style={{ color: "#22c55e" }} />
                </div>
                <div>
                  <p
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 500,
                      marginBottom: "6px",
                      fontFamily: "var(--font-geist-sans)",
                    }}
                  >
                    Message sent.
                  </p>
                  <p
                    className="text-small"
                    style={{ color: "var(--text-muted)" }}
                  >
                    I will get back to you as soon as possible.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  style={{
                    marginTop: "8px",
                    padding: "8px 20px",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text-muted)",
                    fontSize: "0.8rem",
                    fontFamily: "var(--font-geist-sans)",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </motion.div>
            ) : (
              /* Form */
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {/* Name + Email — stack on mobile */}
                <div
                  className="form-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                  }}
                >
                  <div>
                    <label
                      className="text-label"
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.65rem",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      style={{
                        width: "100%",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        padding: "10px 14px",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        fontFamily: "var(--font-geist-sans)",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--text-muted)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="text-label"
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.65rem",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      style={{
                        width: "100%",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        padding: "10px 14px",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        fontFamily: "var(--font-geist-sans)",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--text-muted)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                      }}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    className="text-label"
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.65rem",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    style={{
                      width: "100%",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      fontFamily: "var(--font-geist-sans)",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--text-muted)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    className="text-label"
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.65rem",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me what you have in mind..."
                    rows={4}
                    style={{
                      width: "100%",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      fontFamily: "var(--font-geist-sans)",
                      outline: "none",
                      resize: "vertical",
                      minHeight: "100px",
                      lineHeight: 1.7,
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--text-muted)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                    }}
                  />
                </div>

                {/* Error */}
                {error && (
                  <p
                    className="text-small"
                    style={{ color: "#ef4444", fontSize: "0.8rem" }}
                  >
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: "8px",
                    border: "none",
                    background:
                      status === "sending"
                        ? "var(--surface)"
                        : "var(--text-primary)",
                    color:
                      status === "sending"
                        ? "var(--text-muted)"
                        : "var(--background)",
                    fontSize: "0.9rem",
                    fontFamily: "var(--font-geist-sans)",
                    fontWeight: 500,
                    cursor:
                      status === "sending" ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "4px",
                  }}
                >
                  {status === "sending" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send size={14} />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}