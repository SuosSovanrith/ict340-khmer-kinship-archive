"use client";

import { GENERATION_LABELS, STATUS_STYLE } from "../../lib/generations.js";
import { styles } from "./ContributeStyles.js";

// still_used options come straight from STATUS_STYLE's keys — no second copy.
const STATUS_CHOICES = Object.keys(STATUS_STYLE);

// One age cohort's section of the contribute form. `errors` is the flat
// { fieldKey: message } map from validateContribute; genKey is elder/middle/peer.
export default function GenerationBlock({ genKey, gen, errors, onChange }) {
  function set(field, value) {
    onChange(genKey, field, value);
  }
  const err = (field) => errors?.[`generations.${genKey}.${field}`] || null;
  const controlStyle = (field, base) =>
    err(field) ? { ...base, ...styles.inputError } : base;

  return (
    <div style={styles.genBlock}>
      <p style={styles.genBlockTitle}>{GENERATION_LABELS[genKey]}</p>

      <div style={styles.field}>
        <label style={styles.label} htmlFor={`${genKey}-still-used`}>
          STILL USED <span style={styles.required}>*</span>
        </label>
        <select
          id={`${genKey}-still-used`}
          style={controlStyle("still_used", styles.select)}
          value={gen.still_used}
          onChange={(e) => set("still_used", e.target.value)}
        >
          <option value="">Choose…</option>
          {STATUS_CHOICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {err("still_used") && <p style={styles.errorText}>{err("still_used")}</p>}
      </div>

      <div style={styles.field}>
        <label style={styles.label} htmlFor={`${genKey}-note`}>
          NOTE <span style={styles.required}>*</span>
        </label>
        <textarea
          id={`${genKey}-note`}
          style={controlStyle("note", styles.textarea)}
          value={gen.note}
          onChange={(e) => set("note", e.target.value)}
        />
        {err("note") && <p style={styles.errorText}>{err("note")}</p>}
      </div>

      {gen.still_used === "Replaced" && (
        <div style={styles.field}>
          <label style={styles.label} htmlFor={`${genKey}-alternate`}>
            ALTERNATE TERM <span style={styles.required}>*</span>
          </label>
          <input
            id={`${genKey}-alternate`}
            style={controlStyle("alternate_term", styles.input)}
            value={gen.alternate_term}
            onChange={(e) => set("alternate_term", e.target.value)}
          />
          {err("alternate_term") && (
            <p style={styles.errorText}>{err("alternate_term")}</p>
          )}
        </div>
      )}

      <div style={styles.field}>
        <label style={styles.label} htmlFor={`${genKey}-source-override`}>
          SOURCE OVERRIDE <span style={styles.hint}>(optional)</span>
        </label>
        <input
          id={`${genKey}-source-override`}
          style={styles.input}
          value={gen.source_override}
          onChange={(e) => set("source_override", e.target.value)}
        />
        {err("source_override") && (
          <p style={styles.errorText}>{err("source_override")}</p>
        )}
      </div>
    </div>
  );
}