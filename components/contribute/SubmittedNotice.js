import Link from "next/link";
import { colors, fonts } from "../../lib/theme.js";

const styles = {
  block: {
    padding: "48px 24px",
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
    textAlign: "center",
  },
  en: {
    fontFamily: fonts.serif,
    fontSize: 20,
    fontWeight: 700,
    color: colors.gold,
    lineHeight: 1.5,
    margin: "0 0 12px",
  },
  km: {
    fontFamily: fonts.khmer,
    fontSize: 16,
    color: colors.text,
    lineHeight: 1.7,
    margin: "0 0 24px",
  },
  link: {
    display: "inline-block",
    padding: "12px 20px",
    borderRadius: 8,
    fontFamily: fonts.sans,
    fontWeight: 700,
    fontSize: 14,
    color: colors.bg,
    backgroundColor: colors.gold,
    textDecoration: "none",
  },
};

// Shown in place of the contribute form after a new entry is saved. The Khmer
// text is first-class content — exact copy as provided, never edit it.
export default function SubmittedNotice() {
  return (
    <div style={styles.block}>
      <p style={styles.en}>Thank you. Your entry is waiting for review and will appear once a reviewer reads it.</p>
      <p style={styles.km}>សូមអរគុណ។ អត្ថបទរបស់អ្នកកំពុងរង់ចាំការពិនិត្យ ហើយនឹងបង្ហាញឡើងនៅពេលដែលអ្នកពិនិត្យបានអានវា។</p>
      <Link style={styles.link} href="/my-entries">
        See my entries
      </Link>
    </div>
  );
}
