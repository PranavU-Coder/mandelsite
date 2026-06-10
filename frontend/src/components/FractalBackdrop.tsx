import React, { useRef, useCallback, useMemo } from "react";
import { gsap, useGSAP } from "../lib/gsap";

type Point = [number, number];
type Triangle = [Point, Point, Point];

function midpt(a: Point, b: Point): Point {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

function sierpinski(tri: Triangle, depth: number): Triangle[] {
  if (depth === 0) return [tri];
  const [a, b, c] = tri;
  const ab = midpt(a, b);
  const bc = midpt(b, c);
  const ca = midpt(c, a);
  return [
    ...sierpinski([a, ab, ca], depth - 1),
    ...sierpinski([ab, b, bc], depth - 1),
    ...sierpinski([ca, bc, c], depth - 1),
  ];
}

function kochPoints(a: Point, b: Point, depth: number): Point[] {
  if (depth === 0) return [a, b];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const p1: Point = [a[0] + dx / 3, a[1] + dy / 3];
  const p2: Point = [a[0] + (2 * dx) / 3, a[1] + (2 * dy) / 3];
  // apex of equilateral triangle on p1→p2 segment, pointing outward
  const peak: Point = [
    p1[0] + dx / 6 - (dy * Math.sqrt(3)) / 6,
    p1[1] + dy / 6 + (dx * Math.sqrt(3)) / 6,
  ];
  return [
    ...kochPoints(a, p1, depth - 1).slice(0, -1),
    ...kochPoints(p1, peak, depth - 1).slice(0, -1),
    ...kochPoints(peak, p2, depth - 1).slice(0, -1),
    ...kochPoints(p2, b, depth - 1),
  ];
}

function kochFlakePath(
  cx: number,
  cy: number,
  r: number,
  depth: number,
): string {
  const verts: Point[] = [90, 210, 330].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy - r * Math.sin(rad)];
  });
  const pts = [
    ...kochPoints(verts[0], verts[1], depth).slice(0, -1),
    ...kochPoints(verts[1], verts[2], depth).slice(0, -1),
    ...kochPoints(verts[2], verts[0], depth).slice(0, -1),
  ];
  return (
    pts
      .map(
        (p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`,
      )
      .join(" ") + " Z"
  );
}

interface Props {
  opacity?: number;
}

const FractalBackdrop = React.forwardRef<SVGGElement, Props>(
  ({ opacity = 0.08 }, forwardedRef) => {
    const groupRef = useRef<SVGGElement>(null);

    const mergedRef = useCallback(
      (el: SVGGElement | null) => {
        (groupRef as React.MutableRefObject<SVGGElement | null>).current = el;
        if (typeof forwardedRef === "function") {
          forwardedRef(el);
        } else if (forwardedRef) {
          (forwardedRef as { current: SVGGElement | null }).current = el;
        }
      },
      [forwardedRef],
    );

    useGSAP(
      () => {
        if (!groupRef.current) return;
        gsap.to(groupRef.current, {
          rotation: 360,
          duration: 120,
          repeat: -1,
          ease: "none",
          svgOrigin: "200 200",
        });
      },
      { dependencies: [] },
    );

    const triangles = useMemo(
      () =>
        sierpinski(
          [
            [20, 370],
            [380, 370],
            [200, 30],
          ],
          4,
        ),
      [],
    );
    const snowflake1 = useMemo(() => kochFlakePath(85, 85, 65, 4), []);
    const snowflake2 = useMemo(() => kochFlakePath(315, 315, 65, 4), []);

    return (
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "hidden",
        }}
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g ref={mergedRef} opacity={opacity} fill="#00FF88">
          {triangles.map(([a, b, c], i) => (
            <polygon
              key={i}
              points={`${a[0].toFixed(2)},${a[1].toFixed(2)} ${b[0].toFixed(2)},${b[1].toFixed(2)} ${c[0].toFixed(2)},${c[1].toFixed(2)}`}
            />
          ))}
          <path d={snowflake1} fill="none" stroke="#00FF88" strokeWidth="0.8" />
          <path d={snowflake2} fill="none" stroke="#00FF88" strokeWidth="0.8" />
        </g>
      </svg>
    );
  },
);

FractalBackdrop.displayName = "FractalBackdrop";

export default FractalBackdrop;
