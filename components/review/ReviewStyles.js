// Review queue styles — shared inline style objects for the /review page, its
// per-entry wrapper, and the reviewer actions. Colors/fonts from lib/theme.js.
import { colors, fonts } from "../../lib/theme.js";

const control = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  fontSize: 14,
  color: colors.text,
  backgroundColor: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: 6,
  fontFamily: fonts.sans,
  outline: "none",
};

export const styles = {
  // --- page frame (same header pattern as the other pages) ---
  wrap: { maxWidth: 760, margin: "0 auto", padding: "80px 24px" },
  kicker: { fontFamily: fonts.mono, color: colors.emerald, fontSize: 14, letterSpacing: 1 },
  title: { fontFamily: fonts.serif, fontSize: 40, fontWeight: 700, color: colors.gold, margin: "16px 0 12px", lineHeight: 1.1 },
  sub: { fontSize: 16, color: colors.muted, lineHeight: 1.6, margin: "0 0 40px" },

  // "Reviewers only", "could not load", and "nothing pending" all share this block.
  noticeBlock: { padding: "48px 24px", backgroundColor: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 10, textAlign: "center" },
  noticeText: { fontSize: 15, color: colors.muted, lineHeight: 1.6, margin: 0 },

  // --- one pending entry: submitted-by line + card + actions ---
  item: { marginBottom: 32 },
  meta: { fontFamily: fonts.mono, fontSize: 12, color: colors.muted, margin: "0 0 8px" },

  // --- reviewer actions ---
  actionsBar: { marginTop: 16, paddingTop: 12, borderTop: `1px solid ${colors.border}` },
  buttonsRow: { display: "flex", gap: 10, alignItems: "center" },
  buttonPublish: { fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: colors.bg, backgroundColor: colors.gold, border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer" },
  buttonReturn: { fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: colors.emerald, backgroundColor: "transparent", border: `1px solid ${colors.emeraldDeep}`, borderRadius: 6, padding: "8px 16px", cursor: "pointer" },
  buttonDisabled: { opacity: 0.55, cursor: "default" },

  noteBlock: { backgroundColor: colors.surfaceAlt, border: `1px solid ${colors.border}`, borderRadius: 8, padding: 16 },
  noteLabel: { display: "block", fontFamily: fonts.mono, fontSize: 12, color: colors.muted, margin: "0 0 8px" },
  noteTextarea: { ...control, minHeight: 80, resize: "vertical", lineHeight: 1.5 },
  noteButtons: { display: "flex", gap: 10, marginTop: 12 },
  sendBack: { fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: colors.bg, backgroundColor: colors.emerald, border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer" },
  cancel: { fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: colors.text, backgroundColor: "transparent", border: `1px solid ${colors.muted}`, borderRadius: 6, padding: "8px 16px", cursor: "pointer" },
  message: { marginTop: 12, padding: "10px 12px", backgroundColor: colors.surfaceAlt, border: `1px solid ${colors.border}`, borderRadius: 6, color: colors.gold, fontSize: 13, lineHeight: 1.5 },
};
