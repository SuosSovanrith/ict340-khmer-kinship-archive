"use client";

import { useState } from "react";
import sources from "../../sources.config.js";
import { GENERATION_ORDER, GENERATION_LABELS } from "../../lib/generations.js";
import GenerationPanel from "./GenerationPanel.js";
import { styles } from "./EntryCardStyles.js";

// Lets a visitor click through elder -> middle -> peer answers for the
// same term, so the generational drift is something you see, not just
// read about. Plain React state + CSS transition — no animation library
// (AGENTS.md: no new dependencies).
export default function GenerationExplorer({ entry }) {
  const [activeGen, setActiveGen] = useState("elder");
  const [visible, setVisible] = useState(true);

  if (!entry.generations) return null;

  function selectGeneration(genKey) {
    if (genKey === activeGen) return;
    setVisible(false);
    setTimeout(() => {
      setActiveGen(genKey);
      setVisible(true);
    }, 150);
  }

  return (
    <div style={styles.genExplorer}>
      <p style={styles.genExplorerLabel}>
        How this word changes across generations
      </p>
      <div style={styles.genTabs}>
        {GENERATION_ORDER.map((genKey) => (
          <button
            key={genKey}
            type="button"
            onClick={() => selectGeneration(genKey)}
            style={{
              ...styles.genTab,
              ...(genKey === activeGen ? styles.genTabActive : {}),
            }}
          >
            {GENERATION_LABELS[genKey]}
          </button>
        ))}
      </div>
      <GenerationPanel
        entry={entry}
        genKey={activeGen}
        sources={sources}
        visible={visible}
      />
    </div>
  );
}