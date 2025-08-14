import { useState } from "react";
import { ActivityIndicator, FlatList, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BASE_URL, searchJobs, ExternalJob } from "./src/api";

export default function App() {
  const [keyword, setKeyword] = useState("software engineer");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [data, setData] = useState<ExternalJob[]>([]);

  const runSearch = async () => {
    setLoading(true);
    setErr(null);
    try {
      const jobs = await searchJobs(keyword);
      setData(jobs);
    } catch (e: any) {
      setErr(e?.message ?? String(e));
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JobTracker – Search</Text>

      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="keyword (e.g., software engineer)"
        autoCapitalize="none"
        style={styles.input}
      />

      <TouchableOpacity onPress={runSearch} style={styles.button}>
        <Text style={styles.buttonText}>{loading ? "Searching..." : "Search"}</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>Backend: {BASE_URL}</Text>

      {loading && <ActivityIndicator size="small" />}

      {!!err && <Text style={styles.error}>Error: {err}</Text>}

      <FlatList
        data={data}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ paddingTop: 12, gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title ?? "(no title)"}</Text>
            <Text style={styles.cardSub}>{item.company ?? "(no company)"} • {item.location || "—"}</Text>
            {item.applyUrl ? (
              <TouchableOpacity onPress={() => Linking.openURL(item.applyUrl!)}>
                <Text style={styles.link}>Apply</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.muted}>No apply link</Text>
            )}
          </View>
        )}
        ListEmptyComponent={!loading && !err ? <Text style={styles.muted}>No results yet</Text> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, gap: 10 },
  title: { fontSize: 22, fontWeight: "700" },
  input: { borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 10 },
  button: { backgroundColor: "#1e40af", paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "700" },
  hint: { color: "#64748b", marginTop: 6 },
  error: { color: "#b91c1c", marginTop: 6 },
  card: { borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 10, padding: 12 },
  cardTitle: { fontWeight: "700" },
  cardSub: { color: "#334155", marginTop: 2 },
  link: { color: "#2563eb", marginTop: 6 },
  muted: { color: "#64748b", marginTop: 6 }
});