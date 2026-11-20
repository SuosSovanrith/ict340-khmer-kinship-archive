"use client";

import { useEffect, useMemo, useState } from "react";
import { splitClusters, frameAt } from "../../lib/khmerClusters.js";

// The home page title, typed out: the English line first, then the Khmer line,
// then the finished title is held until the loop restarts (see TYPING in
// lib/khmerClusters.js; one loop is 5 seconds).
//
// - The full text is always in the layout (hidden until typed), so nothing
//   below the title jumps while it types.
// - Screen readers get the full title once from the visually hidden copy; the
//   animated lines are aria-hidden.
// - With prefers-reduced-motion the whole title is shown at once.
// - The animation pauses while the tab is hidden.
//
// Props: en, km (strings); id, className and style (for the <h1>); enStyle and
// kmStyle (each line); caret (set false to turn the blinking caret off).

const HIDDEN = { visibility: "hidden" };

function Line({ parts, shown, showCaret, lang, style }) {
  return (
    <span aria-hidden="true" lang={lang} style={{ display: "block", ...style }}>
      {parts.slice(0, shown).join("")}
      {showCaret ? <span className="home-caret" /> : null}
      <span style={HIDDEN}>{parts.slice(shown).join("")}</span>
    </span>
  );
}

export default function TypingTitle({ en, km, id, className, style, enStyle, kmStyle, caret = true }) {
  const enParts = useMemo(() => splitClusters(en), [en]);
  const kmParts = useMemo(() => splitClusters(km), [km]);
  const [frame, setFrame] = useState({ en: 0, km: 0, caret: "en" });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer = null;
    let startedAt = 0;

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
    function tick() {
      const next = frameAt(performance.now() - startedAt, enParts.length, kmParts.length);
      setFrame((prev) =>
        prev.en === next.en && prev.km === next.km && prev.caret === next.caret ? prev : next
      );
    }
    function begin() {
      stop();
      if (reduced.matches) {
        setFrame({ en: enParts.length, km: kmParts.length, caret: "none" });
        return;
      }
      startedAt = performance.now();
      tick();
      timer = setInterval(tick, 40);
    }
    function onVisibility() {
      if (document.hidden) stop();
      else begin();
    }

    begin();
    reduced.addEventListener("change", begin);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      reduced.removeEventListener("change", begin);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enParts, kmParts]);

  return (
    <h1 id={id} className={className} style={style}>
      <span className="home-sr-only">
        {en} <span lang="km">{km}</span>
      </span>
      <Line parts={enParts} shown={frame.en} showCaret={caret && frame.caret === "en"} style={enStyle} />
      <Line parts={kmParts} shown={frame.km} showCaret={caret && frame.caret === "km"} lang="km" style={kmStyle} />
      <style jsx global>{`
        .home-sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        /* An empty inline anchor: it takes no width and adds no line-break
           opportunity, so the caret never changes how the title wraps. */
        .home-caret {
          position: relative;
        }
        .home-caret::after {
          content: "";
          position: absolute;
          left: 0.05em;
          top: 0.12em;
          bottom: 0.12em;
          width: 0.06em;
          min-width: 2px;
          background: currentColor;
          animation: home-caret-blink 1s steps(1) infinite;
        }
        @keyframes home-caret-blink {
          50% {
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .home-caret::after {
            animation: none;
          }
        }
      `}</style>
    </h1>
  );
}
