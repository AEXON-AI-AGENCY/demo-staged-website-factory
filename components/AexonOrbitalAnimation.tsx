"use client";

/**
 * AexonOrbitalAnimation
 * Futuristic 3D animated "A" logo with 3 orbital rings and glowing nodes.
 * Matches AEXON brand — deep space background, bright white volumetric "A",
 * cyan glow rings, 8-10 glowing nodes orbiting at differential speeds.
 * 
 * CSS animations driven, GPU-accelerated, mobile-friendly.
 * Serves as a persistent full-page background (position: fixed, z-index: 0).
 */

export default function AexonOrbitalAnimation() {
  return (
    <div className="orbital-container" aria-hidden="true">
      {/* Deep space background */}
      <div className="orbital-bg" />
      
      {/* Atmospheric glow beneath center */}
      <div className="orbital-center-glow" />
      
      {/* Three orbital rings */}
      <div className="orbital-ring ring-1">
        <div className="ring-body" />
        {/* 3 nodes on ring 1 */}
        <div className="orbital-node node-primary node-1a" />
        <div className="orbital-node node-secondary node-1b" />
        <div className="orbital-node node-primary node-1c" />
      </div>
      
      <div className="orbital-ring ring-2">
        <div className="ring-body" />
        {/* 3 nodes on ring 2 */}
        <div className="orbital-node node-primary node-2a" />
        <div className="orbital-node node-secondary node-2b" />
        <div className="orbital-node node-primary node-2c" />
      </div>
      
      <div className="orbital-ring ring-3">
        <div className="ring-body" />
        {/* 3 nodes on ring 3 */}
        <div className="orbital-node node-primary node-3a" />
        <div className="orbital-node node-secondary node-3b" />
        <div className="orbital-node node-primary node-3c" />
      </div>
      
      {/* Centered volumetric "A" letter */}
      <div className="orbital-a-container">
        {/* Outer halo */}
        <div className="a-halo" />
        {/* Mid glow */}
        <div className="a-mid-glow" />
        {/* Inner glow */}
        <div className="a-inner-glow" />
        {/* The "A" letter */}
        <div className="a-letter">A</div>
        {/* Cyan edge highlight */}
        <div className="a-edge-glow" />
      </div>
      
      {/* Scattered ambient particles */}
      <div className="particle particle-1" />
      <div className="particle particle-2" />
      <div className="particle particle-3" />
      <div className="particle particle-4" />
      <div className="particle particle-5" />
    </div>
  );
}
