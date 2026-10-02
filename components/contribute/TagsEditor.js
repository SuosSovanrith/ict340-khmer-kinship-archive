"use client";

import { styles } from "./ContributeStyles.js";

// Repeatable tag inputs. `tags` is an array of strings (one blank row = one
// editable tag); duplicates/empties/max are enforced by validateContribute on
// submit and surfaced through the `error` prop next to the field.
export default function TagsEditor({ tags, onChange, error }) {
  function update(index, value) {
    const next = [...tags];
    next[index] = value;
    onChange(next);
  }
  function remove(index) {
    onChange(tags.filter((_, i) => i !== index));
  }
  function add() {
    onChange([...tags, ""]);
  }

  return (
    <div>
      {tags.map((tag, i) => (
        <div key={i} style={styles.tagRow}>
          <input
            style={styles.tagInput}
            value={tag}
            maxLength={32}
            onChange={(e) => update(i, e.target.value)}
          />
          <button
            type="button"
            style={styles.removeButton}
            onClick={() => remove(i)}
            aria-label={`Remove tag ${i + 1}`}
          >
            ×
          </button>
        </div>
      ))}
      {tags.length < 8 && (
        <button type="button" style={styles.smallButton} onClick={add}>
          + Add tag
        </button>
      )}
      {error && <p style={styles.errorText}>{error}</p>}
    </div>
  );
}