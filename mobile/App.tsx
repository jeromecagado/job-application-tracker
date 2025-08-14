import { useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:8080" // Android emulator -> host machine
    : "http://localhost:8080"; // iOS simulator -> host machine

export default function App() {
  const [result, setResult] = useState<string>("(no response yet)");

  const ping = async () => {
    try {
      const res = await fetch(`${BASE_URL}/actuator/health`);
      const json = await res.json();
      setResult(JSON.stringify(json, null, 2));
    } catch (err: any) {
      setResult(`Error: ${err?.message ?? String(err)}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JobTracker - Connectivity Test</Text>

      <TouchableOpacity onPress={ping} style={styles.button}>
        <Text style={styles.buttonText}>Ping Backend</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Response:</Text>
      <Text style={styles.output}>{result}</Text>

      <Text style={styles.hint}>
        Base URL: {BASE_URL} {"\n"}
        (iOS Simulator uses localhost; Android Emulator uses 10.0.2.2)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: "center", justifyContent: "center", gap: 16 },
  title: { fontSize: 20, fontWeight: "600" },
  button: { backgroundColor: "#1e40af", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  buttonText: { color: "white", fontWeight: "600" },
  label: { marginTop: 8, fontWeight: "600" },
  output: { fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }), marginTop: 4 },
  hint: { marginTop: 16, color: "#64748b", textAlign: "center" }
});