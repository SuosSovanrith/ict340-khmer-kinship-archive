// Contribute form styles — shared inline style objects, matching the
// EntryCardStyles.js pattern. Colors/fonts come from lib/theme.js only.
import { colors, fonts } from "../../lib/theme.js";

const control = {
  width: "100%",
  padding: "12px 14px",
  fontSize: 15,
  fontWeight: 400,
  color: colors.text,
  backgroundColor: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: 8,
  fontFamily: fonts.sans,
  outline: "none",
  boxSizing: "border-box",
};

export const styles = {
  wrap: { maxWidth: 760, margin: "0 auto", padding: "80px 24px" },
  kicker: { fontFamily: fonts.mono, color: colors.emerald, fontSize: 14, letterSpacing: 1 },
  title: {
    fontFamily: fonts.serif,
    fontSize: 40,
    fontWeight: 700,
    color: colors.gold,
    margin: "16px 0 12px",
    lineHeight: 1.1,
  },
  sub: { fontSize: 16, color: colors.muted, lineHeight: 1.6, margin: "0 0 40px" },

  form: { display: "block", margin: 0 },
  field: { margin: "0 0 20px" },
  label: { display: "block", fontFamily: fonts.mono, fontSize: 12, color: colors.muted, margin: "0 0 8px" },
  required: { color: colors.gold },
  hint: { fontSize: 12, color: colors.faint, margin: "6px 0 0", lineHeight: 1.5 },

  input: control,
  textarea: { ...control, minHeight: 96, resize: "vertical", lineHeight: 1.5 },
  select: { ...control, padding: "12px 12px" },
  inputError: { border: `1px solid ${colors.gold}` },
  errorText: { color: colors.gold, fontSize: 12, margin: "6px 0 0", fontFamily: fonts.mono },

  section: {
    margin: "28px 0",
    padding: "18px 20px",
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    borderLeft: `3px solid ${colors.gold}`,
  },
  sectionLabel: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.gold,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    margin: "0 0 14px",
  },

  genBlock: { padding: "14px 0", borderTop: `1px solid ${colors.border}` },
  genBlockTitle: { fontFamily: fonts.serif, fontSize: 18, fontWeight: 700, color: colors.text, margin: "0 0 14px" },

  tagRow: { display: "flex", gap: 8, alignItems: "center", marginBottom: 8 },
  tagInput: { flex: 1, ...control, padding: "10px 12px" },

  button: {
    padding: "14px 20px",
    fontSize: 16,
    fontWeight: 700,
    color: colors.bg,
    backgroundColor: colors.gold,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: fonts.sans,
  },
  buttonDisabled: { opacity: 0.6, cursor: "default" },
  smallButton: {
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 700,
    color: colors.bg,
    backgroundColor: colors.emerald,
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontFamily: fonts.sans,
  },
  removeButton: {
    padding: "8px 11px",
    fontSize: 13,
    color: colors.faint,
    backgroundColor: "transparent",
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    cursor: "pointer",
    fontFamily: fonts.mono,
  },

  message: { color: colors.gold, fontSize: 14, margin: "0 0 20px" },

  loginPrompt: {
    padding: "48px 24px",
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
    textAlign: "center",
  },
  loginTitle: { fontFamily: fonts.serif, fontSize: 20, color: colors.gold, margin: "0 0 12px" },
  loginBody: { fontSize: 15, color: colors.muted, lineHeight: 1.6, margin: "0 0 20px" },
  linkRow: { display: "flex", gap: 12, justifyContent: "center" },
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

  footer: {
    marginTop: 64,
    paddingTop: 24,
    borderTop: `1px solid ${colors.border}`,
    fontSize: 13,
    color: colors.faint,
  },
};