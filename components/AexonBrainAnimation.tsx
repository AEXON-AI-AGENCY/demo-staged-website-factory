"use client";

/**
 * AexonBrainAnimation
 * Pure CSS animated "Big A" brain/neural network background component
 * matching the style of aexonai.com's hero animation.
 * 
 * Elements: rotating mesh layers, floating mini-nodes, drifting neurons,
 * pulse lines, and a glowing "A" letter.
 */
export default function AexonBrainAnimation() {
  return (
    <div className="aexon-brain-container" aria-hidden="true">
      {/* Logo orbit container */}
      <div className="logo-orbit">
        {/* Inner mark with brain field */}
        <div className="aexon-mark">
          <div className="brain-field">
            {/* Three animated mesh layers */}
            <div className="mesh mesh-one" />
            <div className="mesh mesh-two" />
            <div className="mesh mesh-three" />

            {/* Five floating mini-nodes */}
            <div className="mini-node mini-one" />
            <div className="mini-node mini-two" />
            <div className="mini-node mini-three" />
            <div className="mini-node mini-four" />
            <div className="mini-node mini-five" />
          </div>
        </div>

        {/* The glowing A letter */}
        <div className="aexon-letter">A</div>

        {/* Four drifting neurons */}
        <div className="neuron neuron-a" />
        <div className="neuron neuron-b" />
        <div className="neuron neuron-c" />
        <div className="neuron neuron-d" />

        {/* Three pulse lines */}
        <div className="pulse-line line-a" />
        <div className="pulse-line line-b" />
        <div className="pulse-line line-c" />
      </div>
    </div>
  );
}
