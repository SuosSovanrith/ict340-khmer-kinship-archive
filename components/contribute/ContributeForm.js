"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client.js";
import {
  CATEGORIES,
  MIME_EXT,
  buildPayload,
  validateContribute,
} from "../../lib/contributeValidation.js";
import { GENERATION_ORDER } from "../../lib/generations.js";
import GenerationBlock from "./GenerationBlock.js";
import TagsEditor from "./TagsEditor.js";
import { styles } from "./ContributeStyles.js";

const initialForm = {
  term_khmer: "",
  term_romanized: "",
  pronunciation: "",
  category: "",
  relation_described: "",
  also_used_for_non_relatives: "",
  usage_notes: "",
  region_or_family_variation: "",
  tags: [],
  photo_caption: "",
  photo_credit: "",
  generations: {
    elder: { still_used: "", note: "", alternate_term: "", source_override: "" },
    middle: { still_used: "", note: "", alternate_term: "", source_override: "" },
    peer: { still_used: "", note: "", alternate_term: "", source_override: "" },
  },
};

export default function ContributeForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [photoFile, setPhotoFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function setField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function setGenerations(genKey, field, value) {
    setForm((prev) => ({
      ...prev,
      generations: {
        ...prev.generations,
        [genKey]: { ...prev.generations[genKey], [field]: value },
      },
    }));
  }

  const err = (key) => errors[key] || null;
  const controlStyle = (key, base = styles.input) =>
    err(key) ? { ...base, ...styles.inputError } : base;

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setErrors({});

    // Owner always comes from the live session — never from the form.
    const supabase = createClient();
    const { data, error: userError } = await supabase.auth.getUser();
    if (userError || !data.user) {
      setMessage("Please log in to contribute.");
      if (userError) console.error("Contribute: getUser failed:", userError);
      return;
    }

    const checked = validateContribute(form, photoFile);
    setErrors(checked);
    if (Object.keys(checked).length > 0) return;

    setSubmitting(true);
    try {
      const ext = MIME_EXT[photoFile.type];
      const path = `${data.user.id}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(path, photoFile);
      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage.from("photos").getPublicUrl(path);

      const payload = buildPayload(form, publicData.publicUrl, data.user.id);
      const { error: insertError } = await supabase.from("entries").insert(payload);
      if (insertError) throw insertError;

      router.push("/entries");
    } catch (err) {
      // Never surface error.message to the user — log the real cause instead.
      console.error("Contribute: save failed:", err);
      setMessage("Could not save your entry. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main style={styles.wrap}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label style={styles.label} htmlFor="term-khmer">
            TERM IN KHMER <span style={styles.required}>*</span>
          </label>
          <input
            id="term-khmer"
            style={controlStyle("term_khmer")}
            value={form.term_khmer}
            onChange={(e) => setField("term_khmer", e.target.value)}
          />
          {err("term_khmer") && <p style={styles.errorText}>{err("term_khmer")}</p>}
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="term-romanized">
            ROMANIZED <span style={styles.required}>*</span>
          </label>
          <input
            id="term-romanized"
            style={controlStyle("term_romanized")}
            value={form.term_romanized}
            onChange={(e) => setField("term_romanized", e.target.value)}
          />
          {err("term_romanized") && (
            <p style={styles.errorText}>{err("term_romanized")}</p>
          )}
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="pronunciation">
            PRONUNCIATION <span style={styles.hint}>(optional, max 32)</span>
          </label>
          <input
            id="pronunciation"
            style={styles.input}
            value={form.pronunciation}
            onChange={(e) => setField("pronunciation", e.target.value)}
          />
          {err("pronunciation") && <p style={styles.errorText}>{err("pronunciation")}</p>}
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="category">
            CATEGORY <span style={styles.required}>*</span>
          </label>
          <select
            id="category"
            style={controlStyle("category", styles.select)}
            value={form.category}
            onChange={(e) => setField("category", e.target.value)}
          >
            <option value="">Choose a category…</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {err("category") && <p style={styles.errorText}>{err("category")}</p>}
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="relation-described">
            RELATION DESCRIBED <span style={styles.required}>*</span>
          </label>
          <textarea
            id="relation-described"
            style={controlStyle("relation_described", styles.textarea)}
            value={form.relation_described}
            onChange={(e) => setField("relation_described", e.target.value)}
          />
          {err("relation_described") && (
            <p style={styles.errorText}>{err("relation_described")}</p>
          )}
        </div>
        <div style={styles.field}>
          <label style={styles.label} htmlFor="also-used">
            ALSO USED FOR NON-RELATIVES{" "}
            <span style={styles.hint}>(optional, max 300)</span>
          </label>
          <textarea
            id="also-used"
            style={styles.textarea}
            value={form.also_used_for_non_relatives}
            onChange={(e) => setField("also_used_for_non_relatives", e.target.value)}
          />
          {err("also_used_for_non_relatives") && (
            <p style={styles.errorText}>{err("also_used_for_non_relatives")}</p>
          )}
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="usage-notes">
            USAGE NOTES <span style={styles.hint}>(optional, max 300)</span>
          </label>
          <textarea
            id="usage-notes"
            style={styles.textarea}
            value={form.usage_notes}
            onChange={(e) => setField("usage_notes", e.target.value)}
          />
          {err("usage_notes") && <p style={styles.errorText}>{err("usage_notes")}</p>}
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="region-variation">
            REGION OR FAMILY VARIATION{" "}
            <span style={styles.hint}>(optional, max 1000)</span>
          </label>
          <textarea
            id="region-variation"
            style={styles.textarea}
            value={form.region_or_family_variation}
            onChange={(e) => setField("region_or_family_variation", e.target.value)}
          />
          {err("region_or_family_variation") && (
            <p style={styles.errorText}>{err("region_or_family_variation")}</p>
          )}
        </div>

        <div style={styles.section}>
          <p style={styles.sectionLabel}>Photo</p>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="photo">
              PHOTO <span style={styles.required}>*</span>
            </label>
            <input
              id="photo"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              style={{ ...styles.input, padding: 10 }}
              onChange={(e) => setPhotoFile(e.target.files[0] || null)}
            />
            {err("photo") && <p style={styles.errorText}>{err("photo")}</p>}
            <p style={styles.hint}>
              JPEG, PNG, or WebP, max 5 MB. Never an identifiable portrait — this
              archive&apos;s policy is a photo of the word&apos;s handwriting by
              default.
            </p>
          </div>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="photo-caption">
              PHOTO CAPTION <span style={styles.hint}>(optional, max 128)</span>
            </label>
            <input
              id="photo-caption"
              style={styles.input}
              value={form.photo_caption}
              onChange={(e) => setField("photo_caption", e.target.value)}
            />
            {err("photo_caption") && (
              <p style={styles.errorText}>{err("photo_caption")}</p>
            )}
          </div>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="photo-credit">
              PHOTO CREDIT <span style={styles.hint}>(optional, max 64)</span>
            </label>
            <input
              id="photo-credit"
              style={styles.input}
              value={form.photo_credit}
              onChange={(e) => setField("photo_credit", e.target.value)}
            />
            {err("photo_credit") && (
              <p style={styles.errorText}>{err("photo_credit")}</p>
            )}
          </div>
        </div>
        <div style={styles.section}>
          <p style={styles.sectionLabel}>
            How this word changes across generations
          </p>
          {GENERATION_ORDER.map((genKey) => (
            <GenerationBlock
              key={genKey}
              genKey={genKey}
              gen={form.generations[genKey]}
              errors={errors}
              onChange={setGenerations}
            />
          ))}
        </div>

        <div style={styles.section}>
          <p style={styles.sectionLabel}>Tags</p>
          <TagsEditor
            tags={form.tags}
            onChange={(tags) => setField("tags", tags)}
            error={err("tags")}
          />
        </div>

        {message && <p style={styles.message}>{message}</p>}

        <button
          type="submit"
          style={{ ...styles.button, ...(submitting ? styles.buttonDisabled : {}) }}
          disabled={submitting}
        >
          {submitting ? "Saving…" : "Save entry"}
        </button>
      </form>
    </main>
  );
}