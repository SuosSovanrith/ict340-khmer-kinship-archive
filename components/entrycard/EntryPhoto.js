import { styles } from "./EntryCardStyles.js";

// Renders the entry's photo if it has one; a photo is optional (confirmed
// with the professor); per this archive's policy (see entry-sketch.md) it is
// never an identifiable portrait — the default is a hand-written image of
// the word itself in Khmer script — so there is no per-photo consent to
// check here; renders nothing when photo_url is empty.
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