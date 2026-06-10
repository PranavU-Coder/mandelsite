import logo from "../assets/logo.png";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "40px" }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
          }}
        >
          <img
            src={logo}
            alt="Mandelbrot Studios"
            style={{ width: 32, height: 32, objectFit: "contain" }}
          />
          <span
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.25em",
              color: "#fff",
              textTransform: "uppercase",
            }}
          >
            Mandelbrot
          </span>
        </a>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 11,
            color: "rgba(255,255,255,0.18)",
            margin: 0,
          }}
        >
          © {year} Mandelbrot Studios. All rights reserved.
        </p>

        <div style={{ display: "flex", gap: 32 }}>
          {[
            { label: "About", href: "#about" },
            { label: "Games", href: "#games" },
            { label: "Contact", href: "#contact" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 11,
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
