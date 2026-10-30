"use client";

import { useState } from "react";
import useContributeSubmit from "../../lib/useContributeSubmit.js";
import { CATEGORIES } from "../../lib/contributeValidation.js";
import { GENERATION_ORDER } from "../../lib/generations.js";
import FormField from "./FormField.js";
import PhotoFields from "./PhotoFields.js";
import GenerationBlock from "./GenerationBlock.js";
import TagsEditor from "./TagsEditor.js";
import SubmittedNotice from "./SubmittedNotice.js";
import { styles } from "./ContributeStyles.js";
import Bi from "../../components/Bi.js";
import { bi, labelFor, CATEGORY_KEYS } from "../../lib/uiText.js";

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

// Maps a stored entry row into the form's shape (edit mode). Nulls become empty
// strings, nested generations are flattened per cohort, tags stay an array.
function formFromEntry(entry) {
  const generations = {};
  GENERATION_ORDER.forEach((genKey) => {
    const gen = entry.generations?.[genKey] || {};
    generations[genKey] = {
      still_used: gen.still_used || "",
      note: gen.note || "",
      alternate_term: gen.alternate_term || "",
      source_override: gen.source_override || "",
    };
  });
  return {
    term_khmer: entry.term_khmer || "",
    term_romanized: entry.term_romanized || "",
    pronunciation: entry.pronunciation || "",
    category: entry.category || "",
    relation_described: entry.relation_described || "",
    also_used_for_non_relatives: entry.also_used_for_non_relatives || "",
    usage_notes: entry.usage_notes || "",
    region_or_family_variation: entry.region_or_family_variation || "",
    tags: Array.isArray(entry.tags) ? entry.tags : [],
    photo_caption: entry.photo_caption || "",
    photo_credit: entry.photo_credit || "",
    generations,
  };
}

// `entry` is optional: when present the same form runs in edit mode (pre-filled
// from the row, update instead of insert); when absent it's the blank create
// form used by /contribute. All fields/validation are shared either way.
export default function ContributeForm({ entry }) {
  const isEdit = Boolean(entry);
  const [form, setForm] = useState(() => (entry ? formFromEntry(entry) : initialForm));
  const [photoFile, setPhotoFile] = useState(null);
  const { errors, message, submitting, submitted, handleSubmit } = useContributeSubmit(form, photoFile, {
    entryId: entry?.id,
    existingPhotoUrl: entry?.photo_url,
  });
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
  return (
    <main style={styles.wrap}>
      {submitted ? (
        <SubmittedNotice />
      ) : (
        <form style={styles.form} onSubmit={handleSubmit}>
        <FormField label={<Bi k="termKhmer" />} id="term-khmer" field="term_khmer" required value={form.term_khmer} onChange={(v) => setField("term_khmer", v)} error={errors.term_khmer} />
        <FormField label={<Bi k="romanized" />} id="term-romanized" field="term_romanized" required value={form.term_romanized} onChange={(v) => setField("term_romanized", v)} error={errors.term_romanized} />
        <FormField label={<Bi k="pronunciation" />} id="pronunciation" field="pronunciation" hint={<Bi k="hintOptionalMax" vars={{ max: 32 }} />} value={form.pronunciation} onChange={(v) => setField("pronunciation", v)} error={errors.pronunciation} />
        <FormField label={<Bi k="category" />} id="category" field="category" required as="select" value={form.category} onChange={(v) => setField("category", v)} error={errors.category}>
          <option value="">{bi("chooseCategoryPlaceholder")}</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{labelFor(CATEGORY_KEYS, c)}</option>
          ))}
        </FormField>
        <FormField label={<Bi k="relationDescribed" />} id="relation-described" field="relation_described" required as="textarea" value={form.relation_described} onChange={(v) => setField("relation_described", v)} error={errors.relation_described} />
        <FormField label={<Bi k="alsoUsedForNonRelatives" />} id="also-used" field="also_used_for_non_relatives" hint={<Bi k="hintOptionalMax" vars={{ max: 300 }} />} as="textarea" value={form.also_used_for_non_relatives} onChange={(v) => setField("also_used_for_non_relatives", v)} error={errors.also_used_for_non_relatives} />
        <FormField label={<Bi k="usageNotes" />} id="usage-notes" field="usage_notes" hint={<Bi k="hintOptionalMax" vars={{ max: 300 }} />} as="textarea" value={form.usage_notes} onChange={(v) => setField("usage_notes", v)} error={errors.usage_notes} />
        <FormField label={<Bi k="regionOrFamilyVariation" />} id="region-variation" field="region_or_family_variation" hint={<Bi k="hintOptionalMax" vars={{ max: 1000 }} />} as="textarea" value={form.region_or_family_variation} onChange={(v) => setField("region_or_family_variation", v)} error={errors.region_or_family_variation} />
        <PhotoFields form={form} errors={errors} onChange={setField} onPhotoFile={setPhotoFile} required={!isEdit} />

        <div style={styles.section}>
          <p style={styles.sectionLabel}><Bi k="sectionGenerations" /></p>
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
          <p style={styles.sectionLabel}><Bi k="sectionTags" /></p>
          <TagsEditor tags={form.tags} onChange={(tags) => setField("tags", tags)} error={errors.tags} />
        </div>
        {message && <p style={styles.message}>{message}</p>}
        <button type="submit" style={{ ...styles.button, ...(submitting ? styles.buttonDisabled : {}) }} disabled={submitting}>
          {submitting ? bi("saving") : (isEdit ? bi("saveChanges") : bi("saveEntry"))}
        </button>
        </form>
      )}
    </main>
  );
}