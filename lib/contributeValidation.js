// Shared constants + client-side validation for the /contribute form.
// Kept as plain functions (not a component) so the rules are testable and the
// form component stays small. The controlled vocabularies here are the ONLY
// copies — generation order/status come from lib/generations.js, and the five
// categories are the exhaustive allow-list (a <select>, no free text).

import { GENERATION_ORDER, STATUS_STYLE } from "./generations.js";

// Exactly the five allowed categories — the single source for both the
// <select> options and the validation allow-list.
export const CATEGORIES = [
  "Grandparents' generation",
  "Parents' generation",
  "Same generation",
  "Children's & grandchildren's generation",
  "Non-relative honorific",
];

// File-upload guardrails (OWASP: whitelist MIME, hard size cap, extension derived
// from MIME — never from the user's filename). Reject before the upload starts.
export const ALLOWED_IMAGE_MIME = ["image/jpeg", "image/png", "image/webp"];
export const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5 MB
export const MIME_EXT = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

// still_used options come straight from STATUS_STYLE — don't retype them.
const STATUS_CHOICES = Object.keys(STATUS_STYLE);

// A Unicode letter (matches Latin AND Khmer script). Rejects whitespace-only
// and symbols/digits-only input.
const LETTER = /[\p{L}]/u;
const hasLetter = (value) => LETTER.test(value);

function requiredLetters(value, min, max) {
  const trimmed = String(value || "").trim();
  if (trimmed.length === 0) return "Required";
  if (trimmed.length < min || trimmed.length > max) {
    return `${min}–${max} characters`;
  }
  if (!hasLetter(trimmed)) return "Needs at least one letter";
  return null;
}

// Optional text: empty is always fine; if present it must be within max.
function optionalCap(value, max) {
  const trimmed = String(value || "").trim();
  if (trimmed.length === 0) return null;
  if (trimmed.length > max) return `Max ${max} characters`;
  return null;
}

function validateTags(tags) {
  const trimmed = (Array.isArray(tags) ? tags : [])
    .map((t) => String(t || "").trim())
    .filter((t) => t !== "");
  if (trimmed.length === 0) return null; // tags are optional
  if (trimmed.length > 8) return "Max 8 tags";
  if (trimmed.some((t) => t.length < 1 || t.length > 32)) {
    return "Each tag is 1–32 characters";
  }
  const seen = new Set(trimmed.map((t) => t.toLowerCase()));
  if (seen.size !== trimmed.length) return "Tags must be unique";
  return null;
}

// Runs every rule. Returns a flat { fieldKey: message } map; empty means valid.
export function validateContribute(form, photoFile) {
  const errors = {};
  const add = (key, msg) => {
    if (msg && !errors[key]) errors[key] = msg;
  };

  add("term_khmer", requiredLetters(form.term_khmer, 1, 40));
  add("term_romanized", requiredLetters(form.term_romanized, 1, 40));

  // A <select> can't admit free text, but the value still has to be one of the
  // five allowed strings (an empty/placeholder value is not one of them).
  if (!CATEGORIES.includes(form.category)) {
    add("category", "Choose a category");
  }

  add("relation_described", requiredLetters(form.relation_described, 15, 300));

  add("pronunciation", optionalCap(form.pronunciation, 32));
  add("also_used_for_non_relatives", optionalCap(form.also_used_for_non_relatives, 300));
  add("usage_notes", optionalCap(form.usage_notes, 300));
  add("region_or_family_variation", optionalCap(form.region_or_family_variation, 1000));
  add("photo_caption", optionalCap(form.photo_caption, 128));
  add("photo_credit", optionalCap(form.photo_credit, 64));

  // Three cohorts, ordered by GENERATION_ORDER (no second copy of the order).
  GENERATION_ORDER.forEach((genKey) => {
    const gen = form.generations?.[genKey] || {};
    if (!STATUS_CHOICES.includes(gen.still_used)) {
      add(`generations.${genKey}.still_used`, "Choose a status");
    }
    add(`generations.${genKey}.note`, requiredLetters(gen.note, 1, 500));
    // alternate_term only matters when this cohort replaced the word — it is the
    // replacement, so it is an actionable field exactly when it is shown.
    if (gen.still_used === "Replaced") {
      add(`generations.${genKey}.alternate_term`, requiredLetters(gen.alternate_term, 1, 100));
    }
    add(`generations.${genKey}.source_override`, optionalCap(gen.source_override, 300));
  });

  const tagsMsg = validateTags(form.tags);
  if (tagsMsg) add("tags", tagsMsg);

  if (!photoFile) {
    add("photo", "A photo is required");
  } else if (!ALLOWED_IMAGE_MIME.includes(photoFile.type)) {
    add("photo", "Only JPEG, PNG, or WebP");
  } else if (photoFile.size > MAX_PHOTO_BYTES) {
    add("photo", "Max 5 MB");
  }

  return errors;
}

// Trims every field and shapes the row for insert. Only the exact columns this
// task allows are touched; empty optional fields become null (the schema's
// convention), never empty strings.
export function buildPayload(form, photoUrl, owner) {
  const generations = {};
  GENERATION_ORDER.forEach((genKey) => {
    const g = form.generations?.[genKey] || {};
    generations[genKey] = {
      still_used: g.still_used,
      note: String(g.note || "").trim(),
      alternate_term:
        g.still_used === "Replaced" ? String(g.alternate_term || "").trim() || null : null,
      source_override: String(g.source_override || "").trim() || null,
    };
  });

  const tags = (Array.isArray(form.tags) ? form.tags : [])
    .map((t) => String(t || "").trim())
    .filter((t) => t !== "");

  const opt = (value) => String(value || "").trim() || null;

  return {
    term_khmer: String(form.term_khmer || "").trim(),
    term_romanized: String(form.term_romanized || "").trim(),
    pronunciation: opt(form.pronunciation),
    category: form.category,
    relation_described: String(form.relation_described || "").trim(),
    also_used_for_non_relatives: opt(form.also_used_for_non_relatives),
    usage_notes: opt(form.usage_notes),
    region_or_family_variation: opt(form.region_or_family_variation),
    tags: tags.length ? tags : null,
    generations,
    photo_url: photoUrl,
    photo_caption: opt(form.photo_caption),
    photo_credit: opt(form.photo_credit),
    owner,
  };
}