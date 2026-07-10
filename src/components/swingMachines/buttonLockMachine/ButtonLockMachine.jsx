import React, { useState, useRef, useCallback, useEffect } from "react";

/**
 * JukiLK1903CDiagram
 *
 * An original schematic illustration (not a traced photo) of the JUKI
 * LK-1903C Computer-Controlled, High-Speed, Lockstitch Button Sewing Machine,
 * built from its published spec sheet:
 *  - Max 2,700 sti/min, direct-drive AC servomotor (no belt)
 *  - Upright LCD operation panel mounted on the side of the head, USB port
 *  - Active tension: electronic thread tension control, settable per seam phase
 *  - Auto-lifter (stepping motor), work clamp foot lift up to 13mm
 *  - Needle: DPx17 (#14), needle bar stroke 45.7mm
 *  - Dry-head technology: needle bar/take-up need no lubrication, only the hook does
 *  - Hand pulley on the arm to visually check needle entry points
 *  - X-Y shuttle motion sews around the button's holes rather than feeding fabric forward
 *
 * Same interaction model: ambient motion runs continuously (the button-sewing
 * X-Y shuttle path, needle, take-up lever, hand pulley), and hovering/tapping
 * a dot shows a cursor-following tooltip with the part's name and function.
 */

const PARTS = [
  { id: 1, name: "Thread Stand & Spool", fn: "Table-mounted pole holding the thread cone that feeds down into the head.", x: 288, y: 22 },
  { id: 2, name: "Thread Guide", fn: "Routes thread from the stand into the active tension unit and take-up lever.", x: 200, y: 50 },
  { id: 3, name: "Active Tension Unit", fn: "Electronic thread tension control; settings can differ across the start, middle, and fastening stitch of a seam.", x: 182, y: 68 },
  { id: 4, name: "Take-Up Lever", fn: "Draws up slack thread each stitch cycle to set the lockstitch.", x: 168, y: 86 },
  { id: 5, name: "Upright LCD Operation Panel", fn: "Side-mounted panel so the operator can adjust settings without looking away from the button. Has a USB port for data transfer.", x: 250, y: 100 },
  { id: 6, name: "Integrated Control Box", fn: "JUKI-designed control box built into the head itself, stores up to 999 patterns / 500,000 stitches.", x: 220, y: 130 },
  { id: 7, name: "Hand Pulley", fn: "Manual wheel on the arm letting the operator visually check exact needle entry points.", x: 224, y: 156 },
  { id: 8, name: "Direct-Drive AC Servomotor", fn: "Compact motor connects straight to the head with no belt, for low noise and low vibration.", x: 250, y: 156 },
  { id: 9, name: "Needle Clamp", fn: "Holds a DPx17 (#14) needle to the needle bar.", x: 128, y: 108 },
  { id: 10, name: "Needle", fn: "Stitches through the button and fabric at up to 2,700 stitches per minute.", x: 128, y: 130 },
  { id: 11, name: "Needle Bar X-Y Shuttle", fn: "Shifts the needle bar in X and Y between stitches so the thread passes through each hole of the button in pattern.", x: 128, y: 96 },
  { id: 12, name: "Work Clamp Foot (Button Clamp)", fn: "Holds the button and fabric in place; lifts up to 13mm via the auto-lifter for the next piece.", x: 116, y: 150 },
  { id: 13, name: "Auto-Lifter (Stepping Motor)", fn: "Automatically raises/lowers the work clamp foot, reducing operator fatigue; supports a two-step stroke.", x: 108, y: 168 },
  { id: 14, name: "Hook (under bed)", fn: "Standard rotary hook beneath the bed; needs only minute-quantity lubrication thanks to the dry-head design.", x: 100, y: 186 },
  { id: 15, name: "Bobbin Thread Counter", fn: "Counts remaining bobbin thread using an up/down method, standard on this model.", x: 150, y: 176 },
  { id: 16, name: "LED Hand Light", fn: "Adjustable-color (white / warm) LED with 5 brightness and 10 dimming levels over the sewing area.", x: 118, y: 92 },
  { id: 17, name: "Bed", fn: "Compact flatbed that supports the fabric directly under the button clamp foot.", x: 80, y: 180 },
];

export default function ButtonLockMachine() {
  const [active, setActive] = useState(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const isActive = (id) => active === id;
  const activePart = PARTS.find((p) => p.id === active);
  const dim = (id) => (active && !isActive(id) ? 0.35 : 1);

  const handleMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleTouch = useCallback((id, e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    setCursor({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
    setActive(id);
  }, []);

  const TOOLTIP_W = 250;
  const [containerWidth, setContainerWidth] = useState(680);

  useEffect(() => {
    function updateWidth() {
      const w = containerRef.current?.clientWidth;
      if (w) setContainerWidth(w);
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const clampedLeft = Math.min(
    Math.max(cursor.x + 16, 8),
    containerWidth - TOOLTIP_W - 8
  );
  const clampedTop = Math.max(cursor.y - 12, 8);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-[#F5F4F2] rounded-2xl border border-[#DEDAD3]">
      <style>{`
        @keyframes shuttleMove {
          0%   { transform: translate(0px, 0px); }
          25%  { transform: translate(5px, -3px); }
          50%  { transform: translate(0px, -6px); }
          75%  { transform: translate(-5px, -3px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes needleBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(14px); } }
        @keyframes takeUpSwing { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-14deg); } }
        @keyframes pulleyTurn { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ledPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }
        @keyframes idlePulse { 0%,100% { r: 4.5; opacity: 0.9; } 50% { r: 6.5; opacity: 0.3; } }

        .anim-shuttle { animation: shuttleMove 1600ms ease-in-out infinite; }
        .anim-needle  { animation: needleBob 400ms cubic-bezier(.45,0,.55,1) infinite; transform-origin: top center; }
        .anim-takeup  { animation: takeUpSwing 400ms cubic-bezier(.45,0,.55,1) infinite; transform-origin: 168px 78px; }
        .anim-pulley  { animation: pulleyTurn 1600ms linear infinite; transform-origin: 224px 156px; }
        .anim-led     { animation: ledPulse 1.8s ease-in-out infinite; }
        .hotspot-pulse { animation: idlePulse 2.2s ease-in-out infinite; transform-origin: center; }
        .hotspot-core, .part-shape { transition: fill 150ms ease, opacity 150ms ease, r 150ms ease; }
        .tooltip-card { animation: tooltipIn 140ms ease-out; pointer-events: none; }
        @keyframes tooltipIn { from { opacity: 0; transform: translateY(4px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

      <div className="mb-4">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#8D8577] font-mono">
          Textile Engineering &mdash; Industrial Machinery
        </p>
        <h2 className="text-2xl font-semibold text-[#2A2823]">
          JUKI LK-1903C &mdash; Button Sewing Machine
        </h2>
        <p className="text-sm text-[#6B6459] mt-1">
          Computer-controlled, direct-drive lockstitch button sewing system. Hover any dot for its name and function.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative bg-white rounded-xl border border-[#E6E2D9] p-3 select-none"
        onMouseMove={handleMove}
      >
        <svg viewBox="0 0 320 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="14" height="14" patternUnits="userSpaceOnUse">
              <path d="M14 0 H0 V14" fill="none" stroke="#F0EEE7" strokeWidth="1" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="320" height="230" fill="url(#grid)" />

          {/* Table top */}
          <rect x="10" y="200" width="300" height="8" fill="#D6D1C6" />
          <rect x="14" y="208" width="6" height="16" fill="#C2BCAE" />
          <rect x="300" y="208" width="6" height="16" fill="#C2BCAE" />

          {/* Bed */}
          <rect className="part-shape" x="60" y="172" width="90" height="16" rx="3"
            fill={isActive(17) ? "#B91C1C" : "#3A362E"} opacity={dim(17)} />

          {/* Hook, hidden under bed, dashed */}
          <circle className="part-shape" cx="100" cy="188" r="7" fill="none"
            stroke={isActive(14) ? "#B91C1C" : "#948C7C"} strokeDasharray="2 2" strokeWidth="1.4" opacity={dim(14)} />

          {/* Bobbin thread counter */}
          <rect className="part-shape" x="144" y="170" width="14" height="10" rx="2"
            fill={isActive(15) ? "#B91C1C" : "#948C7C"} opacity={dim(15)} />

          {/* Pillar / arm housing motor + panel */}
          <path
            d="M110 172
               C110 140 116 118 132 108
               L150 100
               C150 76 166 56 190 50
               C216 50 236 62 244 84
               L244 172 Z"
            fill="#2B2823"
          />

          {/* Work clamp foot (button clamp) holding a button */}
          <g className="part-shape" opacity={dim(12)}>
            <path d="M104 150 C104 158 108 164 116 164 C124 164 128 158 128 150"
              fill="none" stroke={isActive(12) ? "#B91C1C" : "#948C7C"} strokeWidth="3" strokeLinecap="round" />
            <circle cx="116" cy="158" r="6" fill={isActive(12) ? "#FCA5A5" : "#E4E0D6"} stroke="#948C7C" strokeWidth="1" />
            <circle cx="113" cy="155" r="0.9" fill="#57534E" />
            <circle cx="119" cy="155" r="0.9" fill="#57534E" />
            <circle cx="113" cy="160" r="0.9" fill="#57534E" />
            <circle cx="119" cy="160" r="0.9" fill="#57534E" />
          </g>

          {/* Auto-lifter (small stepper unit behind clamp) */}
          <rect className="part-shape" x="96" y="160" width="8" height="16" rx="2"
            fill={isActive(13) ? "#B91C1C" : "#5A554A"} opacity={dim(13)} />

          {/* LED hand light */}
          <circle className="part-shape anim-led" cx="118" cy="92" r="4"
            fill={isActive(16) ? "#B91C1C" : "#FDE68A"} opacity={dim(16)} />

          {/* Upright LCD operation panel, side-mounted */}
          <rect className="part-shape" x="238" y="76" width="26" height="46" rx="3"
            fill={isActive(5) ? "#B91C1C" : "#111111"} opacity={dim(5)} />
          <rect x="241" y="80" width="20" height="30" rx="2" fill="#1E2A22" opacity={dim(5)} />
          <path d="M244 96 l3 -4 l3 4 l3 -6 l3 6" stroke="#7DE0B0" strokeWidth="1" fill="none" opacity={dim(5)} />
          <rect x="248" y="104" width="4" height="2" fill="#7DE0B0" opacity={dim(5)} />

          {/* Integrated control box indicator (inside the pillar) */}
          <rect className="part-shape" x="206" y="118" width="22" height="26" rx="2"
            fill="none" stroke={isActive(6) ? "#B91C1C" : "#948C7C"} strokeDasharray="2 2" strokeWidth="1.3" opacity={dim(6)} />

          {/* Direct-drive servomotor (integrated, no belt) */}
          <rect className="part-shape" x="238" y="140" width="24" height="34" rx="4"
            fill={isActive(8) ? "#B91C1C" : "#1C1A16"} opacity={dim(8)} />

          {/* Hand pulley */}
          <circle className="part-shape" cx="224" cy="156" r="14" fill="none"
            stroke={isActive(7) ? "#B91C1C" : "#948C7C"} strokeWidth="3" opacity={dim(7)} />
          <g className="anim-pulley">
            <line x1="224" y1="156" x2="224" y2="144" stroke={isActive(7) ? "#B91C1C" : "#C2BCAE"} strokeWidth="2.4" strokeLinecap="round" />
          </g>

          {/* Active tension unit */}
          <circle className="part-shape" cx="182" cy="68" r="5"
            fill={isActive(3) ? "#B91C1C" : "#948C7C"} opacity={dim(3)} />

          {/* Take-up lever (swings) */}
          <g className="anim-takeup">
            <rect className="part-shape" x="166" y="70" width="4" height="14" rx="1.5"
              fill={isActive(4) ? "#B91C1C" : "#6B6459"} opacity={dim(4)} />
          </g>

          {/* Thread guide + thread path */}
          <path className="part-shape" d="M288 34 C288 44 210 46 200 50 C192 54 184 60 182 64"
            stroke={isActive(2) ? "#B91C1C" : "#948C7C"} strokeWidth="1.6" fill="none"
            strokeDasharray="3 2" opacity={dim(2)} />

          {/* Thread stand + spool */}
          <line x1="288" y1="200" x2="288" y2="28" stroke="#3A362E" strokeWidth="3" />
          <rect className="part-shape" x="276" y="14" width="24" height="16" rx="2"
            fill={isActive(1) ? "#B91C1C" : "#EAB308"} opacity={dim(1)} />

          {/* Needle bar X-Y shuttle carriage + needle clamp + needle: moves in a small square path */}
          <g className="anim-shuttle">
            <rect className="part-shape" x="122" y="88" width="12" height="10" rx="2"
              fill={isActive(11) ? "#B91C1C" : "#3A362E"} opacity={dim(11)} />
            <g className="anim-needle">
              <rect className="part-shape" x="123" y="98" width="10" height="10" rx="2"
                fill={isActive(9) ? "#B91C1C" : "#111111"} opacity={dim(9)} />
              <rect className="part-shape" x="126.5" y="108" width="3" height="28"
                fill={isActive(10) ? "#B91C1C" : "#6B6459"} opacity={dim(10)} />
            </g>
          </g>

          {/* Hotspots */}
          {PARTS.map((p) => (
            <g
              key={p.id}
              onMouseEnter={() => setActive(p.id)}
              onMouseLeave={() => setActive(null)}
              onTouchStart={(e) => handleTouch(p.id, e)}
              onClick={() => setActive(isActive(p.id) ? null : p.id)}
              style={{ cursor: "pointer" }}
            >
              <circle cx={p.x} cy={p.y} r="9" fill="transparent" />
              {!isActive(p.id) && (
                <circle className="hotspot-pulse" cx={p.x} cy={p.y} r="4.5" fill="#B91C1C" opacity="0.35" />
              )}
              <circle
                className="hotspot-core"
                cx={p.x}
                cy={p.y}
                r={isActive(p.id) ? 6 : 3.2}
                fill={isActive(p.id) ? "#B91C1C" : "#2A2823"}
                stroke="white"
                strokeWidth="1.2"
              />
            </g>
          ))}
        </svg>

        {activePart && (
          <div
            className="tooltip-card absolute z-10 bg-[#1F1D19] text-white rounded-lg shadow-lg px-3 py-2"
            style={{ left: clampedLeft, top: clampedTop, width: TOOLTIP_W }}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[10px] text-[#F87171] font-bold">
                {String(activePart.id).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold">{activePart.name}</span>
            </div>
            <p className="text-xs text-[#D6D2C4] mt-1 leading-snug">{activePart.fn}</p>
          </div>
        )}
      </div>

      <p className="text-xs text-[#8D8577] mt-3">
        {PARTS.length} labeled parts &middot; Max 2,700 sti/min &middot; DPx17 (#14) needle &middot; direct-drive AC servomotor
      </p>
    </div>
  );
}