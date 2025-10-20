// src/styles/SearchStyles.ts
import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
    backgroundColor: "#fff",
    paddingTop: Platform.select({ ios: 0, android: StatusBar.currentHeight ?? 0 }),
  },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center", marginTop: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  button: { backgroundColor: "#1e40af", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  buttonText: { color: "white", fontWeight: "600" },
  navBtn: { backgroundColor: "#e5e7eb", paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8 },
  navBtnDisabled: { opacity: 0.5 },
  navText: { fontWeight: "600" },
  pageLabel: { marginHorizontal: 8, fontWeight: "700" },
  error: { color: "#b91c1c", fontWeight: "600" },
  muted: { color: "#6b7280" },
  hint: { marginTop: 8, color: "#64748b", textAlign: "center" },
});