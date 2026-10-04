"use client";

// The Photo section of the contribute form: the file picker plus the archive
// policy hint, then the caption and credit controls. Same props pattern as
// GenerationBlock (errors map + a callback for plain fields); onChange(field,
// value) updates plain form fields and onPhotoFile receives the chosen File (or
// null) for the upload.
import FormField from "./FormField.js";
import { styles } from "./ContributeStyles.js";

export default function PhotoFields({ form, errors, onChange, onPhotoFile }) {
  return (
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
          onChange={(e) => onPhotoFile(e.target.files[0] || null)}
        />
        {errors?.photo && <p style={styles.errorText}>{errors.photo}</p>}
        <p style={styles.hint}>
          JPEG, PNG, or WebP, max 5 MB. Never an identifiable portrait — this
          archive&apos;s policy is a photo of the word&apos;s handwriting by
          default.
        </p>
      </div>
      <FormField
        label="PHOTO CAPTION"
        id="photo-caption"
        hint="(optional, max 128)"
        value={form.photo_caption}
        onChange={(value) => onChange("photo_caption", value)}
        error={errors?.photo_caption}
      />
      <FormField
        label="PHOTO CREDIT"
        id="photo-credit"
        hint="(optional, max 64)"
        value={form.photo_credit}
        onChange={(value) => onChange("photo_credit", value)}
        error={errors?.photo_credit}
      />
    </div>
  );
}