import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FractalBackdrop from "./FractalBackdrop";
import { gsap, useGSAP } from "../lib/gsap";

const bodyText = {
  fontFamily: "'Outfit', sans-serif",
  fontSize: 14,
  color: "rgba(255,255,255,0.4)",
  lineHeight: 1.8,
} as const;

function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const fractalGroupRef = useRef<SVGGElement>(null);

  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  useGSAP(
    () => {
      if (fractalGroupRef.current) {
        gsap.to(fractalGroupRef.current, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [] },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        padding: "120px 40px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FractalBackdrop ref={fractalGroupRef} opacity={0.07} />

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
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 10,
              color: "#00FF88",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              margin: "0 0 24px 0",
            }}
          >
            About Us
          </p>

          <motion.h2
            ref={headingRef}
            initial={{ y: 30, opacity: 0 }}
            animate={headingInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(32px, 4vw, 56px)",
              color: "#fff",
              lineHeight: 1,
              textTransform: "uppercase",
              margin: "0 0 40px 0",
            }}
          >
            Making Games
            <br />
            With <span style={{ color: "#00FF88" }}>Love & Passion :3</span>
          </motion.h2>

          <p style={{ ...bodyText, margin: "0 0 16px 0" }}>
            Mandelbrot Studios is an indie game studio built on an idea of
            creating games that makes people go ... "NOW THAT IS A FUCKING
            GAME!", Right now just spearheaded by this{" "}
            <a
              href="https://github.com/PranavU-Coder"
              style={{
                color: "rgba(255,255,255,0.6)",
                textDecoration: "underline",
              }}
            >
              fella
            </a>
            . With the aims to expand beyond eventually and make it big in the
            game.
          </p>
          <p style={{ ...bodyText, margin: 0 }}>
            All games are made with the intention to serve a narrative that the
            dev wishes to convey and to make the player feel something while
            playing which is what we hope to deliver!
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              aspectRatio: "1",
              maxWidth: 360,
              width: "100%",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 20,
                height: 20,
                borderTop: "2px solid #00FF88",
                borderRight: "2px solid #00FF88",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: 12,
                width: 20,
                height: 20,
                borderBottom: "2px solid #00FF88",
                borderLeft: "2px solid #00FF88",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 200,
                height: 200,
                border: "1px solid rgba(255,255,255,0.08)",
                transform: "rotate(45deg)",
              }}
            />
            <div
              style={{
                width: 110,
                height: 110,
                border: "2px solid #00FF88",
                transform: "rotate(45deg)",
                opacity: 0.55,
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 8,
                height: 8,
                background: "#00FF88",
                opacity: 0.7,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
