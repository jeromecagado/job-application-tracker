import { useMemo, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Linking,
} from "react-native";

type ExternalJobDto = {
  title: string | null;
  company: string | null;
  location: string | null;
  applyUrl: string | null;
};

const BASE_URL =
  Platform.OS === "android" ? "http://10.0.2.2:8080" : "http://localhost:8080";

export default function App() {
  const [keyword, setKeyword] = useState("software engineer");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [results, setResults] = useState<ExternalJobDto[]>([]);

  // Build the URL
  const searchUrl = useMemo(() => {
    const params = new URLSearchParams({
      keyword,
      page: String(page),
      numPages: "1", // fetch one page at a time
    });
    return `${BASE_URL}/api/jobs/external/search2?${params.toString()}`;
  }, [keyword, page]);

  const search = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(searchUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: ExternalJobDto[] = await res.json();
      setResults(json ?? []);
    } catch (err: any) {
      setErrorMsg(err?.message ?? String(err));
      setResults([]);
    } finally {
      setLoading(false);
    }
  };
 
  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));

  // When keyword changes, reset to page 1
  const onChangeKeyword = (text: string) => {
    setKeyword(text);
    setPage(1);
  };

  const openApply = (url?: string | null) => {
    if (!url) return;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JobTracker — Search</Text>

      {/* Keyword input */}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={keyword}
          onChangeText={onChangeKeyword}
          placeholder="Search keyword (e.g., software engineer)"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={search} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Searching..." : "Search"}</Text>
        </TouchableOpacity>
      </View>

      {/* Pagination controls */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.navBtn, page === 1 && styles.navBtnDisabled]}
          onPress={prevPage}
          disabled={page === 1 || loading}
        >
          <Text style={styles.navText}>Prev</Text>
        </TouchableOpacity>

        <Text style={styles.pageLabel}>Page {page}</Text>

        <TouchableOpacity style={styles.navBtn} onPress={nextPage} disabled={loading}>
          <Text style={styles.navText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Error / empty states */}
      {errorMsg ? <Text style={styles.error}>Error: {errorMsg}</Text> : null}
      {!errorMsg && !loading && results.length === 0 ? (
        <Text style={styles.muted}>No results on this page.</Text>
      ) : null}

      {/* Results list */}
      <FlatList
        data={results}
        keyExtractor={(item, idx) => `${item.applyUrl ?? item.title}-${idx}`}
        contentContainerStyle={{ paddingVertical: 8 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title ?? "(no title)"}</Text>
            <Text style={styles.cardSub}>
              {item.company ?? "(company unknown)"} · {item.location ?? "—"}
            </Text>
            {item.applyUrl ? (
              <TouchableOpacity onPress={() => openApply(item.applyUrl)} style={styles.applyBtn}>
                <Text style={styles.applyText}>Apply</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      />
      <Text style={styles.hint}>
        Base URL: {BASE_URL}{"\n"}(iOS Simulator uses localhost; Android Emulator uses 10.0.2.2)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: "#fff" },
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
  button: {
    backgroundColor: "#1e40af",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: { color: "white", fontWeight: "600" },
  navBtn: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  navBtnDisabled: { opacity: 0.5 },
  navText: { fontWeight: "600" },
  pageLabel: { marginHorizontal: 8, fontWeight: "700" },
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  cardTitle: { fontSize: 16, fontWeight: "700" },
  cardSub: { color: "#6b7280", marginTop: 2, marginBottom: 8 },
  applyBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#0ea5e9",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  applyText: { color: "white", fontWeight: "600" },
  error: { color: "#b91c1c", fontWeight: "600" },
  muted: { color: "#6b7280" },
  hint: { marginTop: 8, color: "#64748b", textAlign: "center" },
});