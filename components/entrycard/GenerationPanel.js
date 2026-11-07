import Bi from "../Bi.js";
import { STATUS_STYLE, resolveGenerationSource } from "../../lib/generations.js";
import { labelFor, STATUS_KEYS } from "../../lib/uiText.js";
import { styles } from "./EntryCardStyles.js";

// One generation's answer inside GenerationExplorer. `visible` drives the
// fade/slide transition — GenerationExplorer toggles it around the swap.
export default function GenerationPanel({ entry, genKey, sources, visible }) {
  const gen = entry.generations[genKey];
  if (!gen) return null;

  const status = STATUS_STYLE[gen.still_used] ?? STATUS_STYLE.Unused;
  const source = resolveGenerationSource(entry, genKey, sources);

  return (
    <div
      style={{
        ...styles.genPanel,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(4px)",
      }}
    >
      <div style={styles.genStatusRow}>
        <div style={styles.genStatusTrack}>
          <div
            style={{
              ...styles.genStatusFill,
              width: status.width,
              backgroundColor: status.color,
            }}
          />
        </div>
        <span style={{ ...styles.genStatusLabel, color: status.color }}>
          {labelFor(STATUS_KEYS, gen.still_used)}
        </span>
      </div>

      {gen.alternate_term && (
        <p style={styles.genAlternate}>
          <Bi k="wordUsedInstead" /> {gen.alternate_term}
        </p>
      )}

      <p style={styles.genNoteText}>{gen.note}</p>
      <p style={styles.genSource}>— {source.description}</p>
    </div>
  );
}