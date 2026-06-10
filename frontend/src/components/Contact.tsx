import { useState, useRef, type CSSProperties } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import FractalBackdrop from "./FractalBackdrop";

const API_URL = import.meta.env.VITE_API_URL || "";

type FormState = {
  name: string;
  email: string;
  message: string;
  consent: boolean;
};
type Status = "idle" | "loading" | "success" | "error";

const baseInput: CSSProperties = {
  width: "100%",
  background: "transparent",
  padding: "14px 16px",
  color: "#fff",
  fontFamily: "'Outfit', sans-serif",
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

function fieldStyle(focused: string, id: string): CSSProperties {
  return {
    ...baseInput,
    border: `1px solid ${focused === id ? "#00FF88" : "rgba(255,255,255,0.12)"}`,
  };
}

const labelStyle: CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontSize: 9,
  color: "rgba(255,255,255,0.4)",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  display: "block",
  marginBottom: 8,
};

const fieldVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState("");

  const formInView = useInView(formRef, { once: true, margin: "-80px" });

  const set =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          consent: form.consent,
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
    } catch (e) {
      console.error("Contact form submission failed:", e);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: "120px 40px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FractalBackdrop opacity={0.07} />

      <div
        className="section-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(52px, 6vw, 88px)",
              lineHeight: 0.92,
              textTransform: "uppercase",
              margin: "0 0 40px 0",
            }}
          >
            <span style={{ color: "#fff", display: "block" }}>What</span>
            <span style={{ color: "#00FF88", display: "block" }}>Up?</span>
          </h2>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.8,
              maxWidth: 280,
              margin: "0 0 40px 0",
            }}
          >
            Interested to collaborate with Mandelbrot-Studios? Please let us
            know!!!
          </p>
          <a
            href="mailto:mandelbrotstudios@gmail.com"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 13,
              color: "rgba(255,255,255,0.55)",
              textDecoration: "underline",
              textUnderlineOffset: 4,
            }}
          >
            mandelbrotstudios@gmail.com
          </a>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  border: "2px solid #00FF88",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10L8 14L16 6"
                    stroke="#00FF88"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: 900,
                  fontSize: 22,
                  color: "#fff",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                Message Sent
              </h3>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.4)",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                We'll be in touch soon.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              onSubmit={handleSubmit}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              style={{ display: "flex", flexDirection: "column", gap: 24 }}
            >
              <motion.div
                custom={0}
                initial="hidden"
                animate={formInView ? "visible" : "hidden"}
                variants={fieldVariants}
              >
                <label style={labelStyle}>Name</label>
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={set("name")}
                  style={fieldStyle(focused, "name")}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused("")}
                />
              </motion.div>

              <motion.div
                custom={1}
                initial="hidden"
                animate={formInView ? "visible" : "hidden"}
                variants={fieldVariants}
              >
                <label style={labelStyle}>Email</label>
                <input
                  required
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={set("email")}
                  style={fieldStyle(focused, "email")}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                />
              </motion.div>

              <motion.div
                custom={2}
                initial="hidden"
                animate={formInView ? "visible" : "hidden"}
                variants={fieldVariants}
              >
                <label style={labelStyle}>Purpose</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us why you're reaching out..."
                  value={form.message}
                  onChange={set("message")}
                  style={{ ...fieldStyle(focused, "message"), resize: "none" }}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused("")}
                />
              </motion.div>

              <motion.div
                custom={3}
                initial="hidden"
                animate={formInView ? "visible" : "hidden"}
                variants={fieldVariants}
                style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
              >
                <input
                  required
                  type="checkbox"
                  id="consent"
                  checked={form.consent}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, consent: e.target.checked }))
                  }
                  style={{
                    marginTop: 2,
                    accentColor: "#00FF88",
                    cursor: "pointer",
                  }}
                />
                <label
                  htmlFor="consent"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: 1.6,
                    cursor: "pointer",
                  }}
                >
                  I consent to Mandelbrot Studios storing my contact information
                  to respond to this inquiry.
                </label>
              </motion.div>

              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    key="error-msg"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 12,
                      color: "#ff6b6b",
                      margin: "-8px 0 0",
                    }}
                  >
                    Something went wrong. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                custom={4}
                initial="hidden"
                animate={formInView ? "visible" : "hidden"}
                variants={fieldVariants}
                type="submit"
                disabled={status === "loading" || !form.consent}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  background: "#00FF88",
                  color: "#000D0A",
                  padding: "16px",
                  border: "none",
                  cursor:
                    status === "loading"
                      ? "wait"
                      : !form.consent
                        ? "not-allowed"
                        : "pointer",
                  marginTop: 8,
                  opacity: status === "loading" || !form.consent ? 0.5 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                {status === "loading" ? "Sending…" : "Send Message"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contact;
