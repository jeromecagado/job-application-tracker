// components/JobCard.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { ExternalJobDto} from "../types";

type Props = {
  item: ExternalJobDto;
  isSaving: boolean;
  onSave: (item: ExternalJobDto) => void;
  onApplyAndSave: (item: ExternalJobDto) => void;
  onOpen: (url: string) => void;
};

export default function JobCard({
  item,
  isSaving,
  onSave,
  onApplyAndSave,
  onOpen,
}: Props) {
  const hasUrl = Boolean(item.applyUrl);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title ?? "(no title)"}</Text>
      <Text style={styles.cardSub}>
        {item.company ?? "(company unknown)"} · {item.location ?? "—"}
      </Text>

      <View style={styles.row}>
        {/* Save only */}
        <TouchableOpacity
          onPress={() => onSave(item)}
          disabled={isSaving}
          style={[styles.btn, isSaving && { opacity: 0.6 }]}
        >
          <Text style={styles.btnText}>{isSaving ? "Saving..." : "Save"}</Text>
        </TouchableOpacity>

        {/* Apply & Save */}
        {hasUrl ? (
          <TouchableOpacity
            onPress={() => onApplyAndSave(item)}
            disabled={isSaving}
            style={[styles.btn, isSaving && { opacity: 0.6 }]}
          >
            <Text style={styles.btnText}>
              {isSaving ? "Saving..." : "Apply & Save"}
            </Text>
          </TouchableOpacity>
        ) : null}

        {/* Open without saving */}
        {hasUrl ? (
          <TouchableOpacity
            onPress={() => onOpen(item.applyUrl!)}
            style={[styles.btn, { backgroundColor: "#10b981" }]}
          >
            <Text style={styles.btnText}>Open</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  cardTitle: { fontSize: 16, fontWeight: "700" },
  cardSub: { color: "#6b7280", marginTop: 2, marginBottom: 8 },
  row: { flexDirection: "row", gap: 8 },
  btn: {
    alignSelf: "flex-start",
    backgroundColor: "#0ea5e9",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnText: { color: "white", fontWeight: "600" },
});