import { styles } from "./EntryCardStyles.js";

// Renders the entry's required photo (skeleton: text + at least one photo
// per entry). Per this archive's policy (see entry-sketch.md), the photo
// is always of a place, object, or the script itself — never an
// identifiable portrait — so there's no per-photo consent to check here.
// Renders nothing until a real photo_url is set.
export default function EntryPhoto({ entry }) {
  if (!entry.photo_url) return null;

  return (
    <figure style={styles.photoFigure}>
      <img
        src={entry.photo_url}
        alt={entry.photo_caption || entry.term_romanized}
        style={styles.photoImage}
      />
      <figcaption style={styles.photoCaption}>
        {entry.photo_caption}
        {entry.photo_credit && ` — ${entry.photo_credit}`}
      </figcaption>
    </figure>
  );
}