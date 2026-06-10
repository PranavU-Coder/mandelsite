import { motion } from "framer-motion";
import FractalBackdrop from "./FractalBackdrop";

const wordVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const Hero = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "64px max(16px, 3.5vw) 0",
        position: "relative",
        overflow: "hidden",
        background: "#000D0A",
      }}
    >
      <FractalBackdrop opacity={0.08} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 96,
          right: 48,
          width: 48,
          height: 48,
          borderTop: "2px solid #00FF88",
          borderRight: "2px solid #00FF88",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 48,
          width: 48,
          height: 48,
          borderBottom: "2px solid #00FF88",
          borderLeft: "2px solid #00FF88",
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              background: "#00FF88",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 10,
              color: "#00FF88",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
            }}
          >
            Indie GameDev Studios Based in India
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(36px, 9.5vw, 108px)",
            lineHeight: 0.92,
            textTransform: "uppercase",
            margin: "0 0 36px 0",
            overflow: "hidden",
          }}
        >
          {(["Mandelbrot", "Studios"] as const).map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              style={{ display: "block", color: i === 0 ? "#fff" : "#00FF88" }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 15,
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.7,
            maxWidth: 360,
            margin: "0 0 48px 0",
          }}
        >
          Indie games studio with hope <br /> & VISION.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 80,
          }}
        >
          <a
            href="#games"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              background: "#00FF88",
              color: "#000D0A",
              padding: "16px 44px",
              textDecoration: "none",
            }}
          >
            Explore
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              border: "2px solid #fff",
              color: "#fff",
              padding: "16px 44px",
              textDecoration: "none",
            }}
          >
            Get In Touch
          </a>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 1,
              height: 48,
              background: "rgba(255,255,255,0.15)",
            }}
          />
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 9,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
