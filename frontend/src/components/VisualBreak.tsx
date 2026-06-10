const VisualBreak = () => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: 480,
      overflow: "hidden",
    }}
  >
    <svg
      viewBox="0 0 1440 480"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="vbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#07070a" />
          <stop offset="100%" stopColor="#0e0e14" />
        </linearGradient>
        <linearGradient id="gs1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c8a84b" stopOpacity="0" />
          <stop offset="35%" stopColor="#e8c96a" stopOpacity="0.9" />
          <stop offset="65%" stopColor="#d4a83c" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#c8a84b" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gs2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c8a84b" stopOpacity="0" />
          <stop offset="35%" stopColor="#e0bc58" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#caa840" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#c8a84b" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vg1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c8a84b" stopOpacity="0" />
          <stop offset="25%" stopColor="#dfc060" stopOpacity="0.8" />
          <stop offset="75%" stopColor="#c8a84b" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#c8a84b" stopOpacity="0" />
        </linearGradient>
        <filter id="glw" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="glw2" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <rect width="1440" height="480" fill="url(#vbg)" />
      <rect x="0" y="0" width="560" height="480" fill="#060608" />
      <rect x="880" y="0" width="560" height="480" fill="#060608" />
      <rect x="520" y="0" width="400" height="190" fill="#0b0b0f" />
      <rect x="520" y="290" width="400" height="190" fill="#0b0b0f" />
      <rect x="680" y="0" width="80" height="480" fill="#09090d" />
      <polygon
        points="520,0 720,240 920,0 940,0 720,260 500,0"
        fill="#c8a030"
        filter="url(#glw2)"
        opacity="0.35"
      />
      <line
        x1="520"
        y1="0"
        x2="720"
        y2="260"
        stroke="url(#gs1)"
        strokeWidth="3"
        filter="url(#glw)"
      />
      <line
        x1="920"
        y1="0"
        x2="720"
        y2="260"
        stroke="url(#gs2)"
        strokeWidth="3"
        filter="url(#glw)"
      />
      <line
        x1="521"
        y1="0"
        x2="721"
        y2="261"
        stroke="#e8c060"
        strokeWidth="1.2"
        opacity="0.9"
      />
      <line
        x1="919"
        y1="0"
        x2="719"
        y2="261"
        stroke="#e8c060"
        strokeWidth="1.2"
        opacity="0.9"
      />
      <line
        x1="80"
        y1="148"
        x2="500"
        y2="148"
        stroke="url(#gs1)"
        strokeWidth="2"
        filter="url(#glw)"
        opacity="0.7"
      />
      <line
        x1="30"
        y1="218"
        x2="500"
        y2="218"
        stroke="#d4a840"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="100"
        y1="300"
        x2="500"
        y2="300"
        stroke="url(#gs1)"
        strokeWidth="1.5"
        filter="url(#glw)"
        opacity="0.6"
      />
      <line
        x1="50"
        y1="370"
        x2="500"
        y2="370"
        stroke="#c89830"
        strokeWidth="1"
        opacity="0.4"
      />
      <line
        x1="940"
        y1="148"
        x2="1360"
        y2="148"
        stroke="url(#gs2)"
        strokeWidth="2"
        filter="url(#glw)"
        opacity="0.7"
      />
      <line
        x1="940"
        y1="218"
        x2="1410"
        y2="218"
        stroke="#d4a840"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="940"
        y1="300"
        x2="1340"
        y2="300"
        stroke="url(#gs2)"
        strokeWidth="1.5"
        filter="url(#glw)"
        opacity="0.6"
      />
      <line
        x1="940"
        y1="370"
        x2="1390"
        y2="370"
        stroke="#c89830"
        strokeWidth="1"
        opacity="0.4"
      />
      <rect
        x="716"
        y="0"
        width="8"
        height="480"
        fill="url(#vg1)"
        filter="url(#glw)"
        opacity="0.5"
      />
      <rect x="0" y="0" width="1440" height="60" fill="#000" opacity="0.5" />
      <rect x="0" y="420" width="1440" height="60" fill="#000" opacity="0.5" />
    </svg>
  </div>
);

export default VisualBreak;
