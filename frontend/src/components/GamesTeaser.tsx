import { useRef } from "react";
import FractalBackdrop from "./FractalBackdrop";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";
import gamePng from "../assets/game.png";

const CODENAME = "Purgatory";
const TAGLINE = "Psych-Horror";
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#";

function GamesTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          scale: 0.85,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        });
      }

      if (glitchRef.current) {
        const original = "COMING SOON";
        const state = { frame: 0 };
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
          onEnter: () => {
            gsap.to(state, {
              frame: original.length + 4,
              duration: (original.length + 4) * 0.04,
              ease: "none",
              onUpdate: () => {
                if (!glitchRef.current) return;
                const f = Math.floor(state.frame);
                glitchRef.current.textContent = original
                  .split("")
                  .map((char, i) =>
                    i < f
                      ? original[i]
                      : char === " "
                        ? " "
                        : GLITCH_CHARS[
                            Math.floor(Math.random() * GLITCH_CHARS.length)
                          ],
                  )
                  .join("");
              },
              onComplete: () => {
                if (glitchRef.current) glitchRef.current.textContent = original;
              },
            });
          },
        });
      }

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.55,
          scale: 1.06,
          duration: 1.6,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    },
    { scope: sectionRef, dependencies: [] },
  );

  return (
    <section
      ref={sectionRef}
      id="games"
      style={{
        padding: "120px 40px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FractalBackdrop opacity={0.08} />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
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
          In Development
        </p>
        <h2
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(40px, 5vw, 64px)",
            color: "#fff",
            textTransform: "uppercase",
            lineHeight: 1,
            margin: "0 0 64px 0",
          }}
        >
          First Title
        </h2>

        <div
          ref={cardRef}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 640,
            border: "1px solid rgba(0,255,136,0.25)",
            padding: "60px 48px",
            background: "rgba(0,13,10,0.7)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            ref={glowRef}
            style={{
              position: "absolute",
              inset: -1,
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(0,255,136,0.14) 0%, transparent 68%)",
              pointerEvents: "none",
              opacity: 0.25,
            }}
          />

          <p
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: 9,
              color: "rgba(0,255,136,0.5)",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              margin: "0 0 20px 0",
            }}
          >
            {CODENAME}
          </p>

          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 18,
              color: "rgba(255,255,255,0.55)",
              margin: "0 0 32px 0",
              lineHeight: 1.5,
            }}
          >
            {TAGLINE}
          </p>

          <img
            src={gamePng}
            alt={CODENAME}
            style={{
              width: "100%",
              height: "auto",
              marginBottom: 32,
              border: "1px solid rgba(0,255,136,0.15)",
            }}
          />

          <div
            style={{
              marginBottom: 44,
              paddingBottom: 44,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span
              ref={glitchRef}
              style={{
                fontFamily: "'Unbounded', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(28px, 4vw, 48px)",
                color: "#00FF88",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              COMING SOON
            </span>
          </div>

          <a
            href="mailto:mandelbrotstudios@gmail.com?subject=Waitlist%20-%20Purgatory"
            style={{
              display: "inline-block",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              border: "1px solid #00FF88",
              color: "#00FF88",
              padding: "14px 40px",
              textDecoration: "none",
            }}
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </section>
  );
}

export default GamesTeaser;
