"use client";

/**
 * AexonOrbitalAnimation
 * Futuristic 3D animated "A" logo with 3 orbital rings and glowing nodes.
 * CSS animations driven, GPU-accelerated, mobile-friendly.
 * Serves as a persistent full-page background (position: fixed, z-index: 0).
 */

export default function AexonOrbitalAnimation() {
  return (
    <div
      style={{
        position: "fixed",
        inset: "0",
        zIndex: 0,
        opacity: 0.12,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Ambient center glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(34,211,238,0.04) 40%, transparent 70%)",
          animation: "pulse-center 6s ease-in-out infinite",
        }}
      />

      {/* ── Ring 1: 8 cyan nodes, clockwise ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          border: "1px solid rgba(34,211,238,0.18)",
          animation: "orbit-1 10s linear infinite",
        }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <div
            key={`r1-${i}`}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#22d3ee",
              boxShadow:
                "0 0 6px #22d3ee, 0 0 14px rgba(34,211,238,0.7), 0 0 24px rgba(34,211,238,0.4)",
              transform: `rotate(${deg}deg) translateX(180px) translateY(-50%)`,
              transformOrigin: "center center",
              marginLeft: "-4px",
              marginTop: "-4px",
            }}
          />
        ))}
      </div>

      {/* ── Ring 2: 9 violet nodes, counter-clockwise ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          border: "1px solid rgba(167,139,250,0.14)",
          animation: "orbit-2 16s linear infinite",
        }}
      >
        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg, i) => (
          <div
            key={`r2-${i}`}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#a78bfa",
              boxShadow:
                "0 0 6px #a78bfa, 0 0 14px rgba(167,139,250,0.6), 0 0 22px rgba(167,139,250,0.3)",
              transform: `rotate(${deg}deg) translateX(260px) translateY(-50%)`,
              transformOrigin: "center center",
              marginLeft: "-3.5px",
              marginTop: "-3.5px",
            }}
          />
        ))}
      </div>

      {/* ── Ring 3: 10 cyan nodes, clockwise ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          border: "1px solid rgba(34,211,238,0.09)",
          animation: "orbit-3 22s linear infinite",
        }}
      >
        {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg, i) => (
          <div
            key={`r3-${i}`}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#22d3ee",
              boxShadow:
                "0 0 5px #22d3ee, 0 0 12px rgba(34,211,238,0.5), 0 0 18px rgba(34,211,238,0.2)",
              transform: `rotate(${deg}deg) translateX(350px) translateY(-50%)`,
              transformOrigin: "center center",
              marginLeft: "-3px",
              marginTop: "-3px",
            }}
          />
        ))}
      </div>

      {/* ── Center "A" letter with glow ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        {/* Halo */}
        <div
          style={{
            position: "absolute",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,211,238,0.2) 0%, rgba(34,211,238,0.05) 50%, transparent 70%)",
            animation: "pulse-halo 4s ease-in-out infinite",
          }}
        />
        {/* The "A" */}
        <div
          style={{
            fontSize: "120px",
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            textShadow:
              "0 0 20px rgba(34,211,238,0.8), 0 0 40px rgba(34,211,238,0.5), 0 0 80px rgba(34,211,238,0.3), 0 0 120px rgba(34,211,238,0.15)",
            WebkitTextStroke: "1px rgba(34,211,238,0.6)",
          }}
        >
          A
        </div>
      </div>

      {/* Cursor spotlight (updated via JS in parent) */}
      <div
        id="orbital-cursor"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          pointerEvents: "none",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          transition: "left 0.15s ease, top 0.15s ease",
          zIndex: 3,
        }}
      />
    </div>
  );
}
