"use client";

// One labeled field for the contribute form, matching the markup ContributeForm
// used to inline: a label + required/optional marker, the control, and the error
// paragraph. `as` picks input/textarea/select; children is rendered inside the
// control, so a <select> passes its <option>s here. `onChange` gets the raw
// value (not the event), like the original setField call sites.
import { styles } from "./ContributeStyles.js";

export default function FormField({
  label,
  id,
  required,
  hint,
  as = "input",
  value,
  onChange,
  error,
  children,
}) {
  // Matches the original form exactly: only *required* controls carry the gold
  // error border; optional ones just print the error text below the control.
  const controlStyle = (base) =>
    error && required ? { ...base, ...styles.inputError } : base;

  const base =
    as === "textarea" ? styles.textarea : as === "select" ? styles.select : styles.input;

  const control =
    as === "textarea" ? (
      <textarea
        id={id}
        style={controlStyle(base)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : as === "select" ? (
      <select
        id={id}
        style={controlStyle(base)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
    ) : (
      <input
        id={id}
        style={controlStyle(base)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );

  return (
    <div style={styles.field}>
      <label style={styles.label} htmlFor={id}>
        {label} {required ? <span style={styles.required}>*</span> : hint ? <span style={styles.hint}>{hint}</span> : null}
      </label>
      {control}
      {error && <p style={styles.errorText}>{error}</p>}
    </div>
  );
}