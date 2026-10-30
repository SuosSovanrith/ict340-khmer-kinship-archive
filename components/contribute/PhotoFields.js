"use client";

// The Photo section of the contribute form: the file picker plus the archive
// policy hint, then the caption and credit controls. Same props pattern as
// GenerationBlock (errors map + a callback for plain fields); onChange(field,
// value) updates plain form fields and onPhotoFile receives the chosen File (or
// null) for the upload.
import FormField from "./FormField.js";
import { styles } from "./ContributeStyles.js";
import Bi from "../../components/Bi.js";

export default function PhotoFields({ form, errors, onChange, onPhotoFile, required = true }) {
  return (
    <div style={styles.section}>
      <p style={styles.sectionLabel}><Bi k="sectionPhoto" /></p>
      <div style={styles.field}>
        <label style={styles.label} htmlFor="photo">
          <Bi k="photo" /> {required ? <span style={styles.required}>*</span> : <span style={styles.hint}><Bi k="hintPhotoKeepCurrent" /></span>}
        </label>
        <input
          id="photo"
          data-field="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ ...styles.input, padding: 10 }}
          onChange={(e) => onPhotoFile(e.target.files[0] || null)}
        />
        {errors?.photo && <p style={styles.errorText}>{errors.photo}</p>}
        <p style={styles.hint}>
          <Bi k="photoPolicy" separator={<br />} />
        </p>
      </div>
      <FormField
        label={<Bi k="photoCaption" />}
        id="photo-caption"
        field="photo_caption"
        hint={<Bi k="hintOptionalMax" vars={{ max: 128 }} />}
        value={form.photo_caption}
        onChange={(value) => onChange("photo_caption", value)}
        error={errors?.photo_caption}
      />
      <FormField
        label={<Bi k="photoCredit" />}
        id="photo-credit"
        field="photo_credit"
        hint={<Bi k="hintOptionalMax" vars={{ max: 64 }} />}
        value={form.photo_credit}
        onChange={(value) => onChange("photo_credit", value)}
        error={errors?.photo_credit}
      />
    </div>
  );
}