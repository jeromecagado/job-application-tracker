import { BASE_URL } from "../api";
import { useMemo, useEffect, useState, useCallback } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Linking,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import JobCard from "../components/JobCard";
import styles from "../styles/SearchStyles";
import type { ExternalJobDto, ApplyJobRequest } from "../types";

export default function SearchScreen({ navigation }: any) {
  const [keyword, setKeyword] = useState("software engineer");
  const [page, setPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [results, setResults] = useState<ExternalJobDto[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);

  // helpers
  const showAlert = useCallback((title: string, message: string) => {
    Alert.alert(title, message);
  }, []);
  const itemKey = useCallback(
    (item: ExternalJobDto) => `${item.applyUrl ?? item.title ?? ""}`,
    []
  );

  const buildPayload = useCallback((item: ExternalJobDto): ApplyJobRequest => ({
    position: item.title ?? null,
    company: item.company ?? null,
    location: item.location ?? null,
    applyUrl: item.applyUrl ?? null,
    notes: null,
    source: "JSEARCH",
  }), []);

  const apiPost = useCallback(async (path: string, body: unknown) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await res.text().catch(() => "");
    let json: any = undefined;
    try { json = text ? JSON.parse(text) : undefined; } catch {}
    return { ok: res.ok, status: res.status, json, raw: text };
  }, []);

  // search + pagination
  const searchUrl = useMemo(() => {
    const params = new URLSearchParams({
      keyword,
      page: String(page),
      numPages: "1",
    });
    return `${BASE_URL}/api/jobs/external/search2?${params.toString()}`;
  }, [keyword, page]);

  const fetchResults = useCallback(async () => {
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
  }, [searchUrl]);

  useEffect(() => {
    if (hasSearched) fetchResults();
  }, [page, hasSearched, fetchResults]);

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const onChangeKeyword = (text: string) => setKeyword(text.trimStart());

  // save/apply actions
  const saveJob = useCallback(async (item: ExternalJobDto) => {
    const key = itemKey(item);
    setSavingId(key);
    try {
      const payload = buildPayload(item);
      const { ok, status, raw } = await apiPost("/api/jobs/save", payload);
      if (ok) {
        showAlert("Saved", "Job saved.");
      } else if (status === 409) {
        showAlert("Already saved", "You saved this job earlier.");
      } else {
        showAlert("Error", `Save failed (HTTP ${status}) ${raw ?? ""}`);
      }
    } catch (e: any) {
      showAlert("Error", e?.message ?? "Failed to save job");
    } finally {
      setSavingId(null);
    }
  }, [apiPost, buildPayload, itemKey, showAlert]);

  const applyAndSave = useCallback(async (item: ExternalJobDto) => {
    const key = itemKey(item);
    setSavingId(key);
    try {
      const payload = buildPayload(item);
      const { ok, status, raw } = await apiPost("/api/jobs/apply", payload);
      if (ok) {
        if (item.applyUrl) Linking.openURL(item.applyUrl);
      } else if (status === 409) {
        showAlert("Already applied", "You already applied to this job.");
      } else {
        showAlert("Error", `Apply failed (HTTP ${status}) ${raw ?? ""}`);
      }
    } catch (e: any) {
      showAlert("Error", e?.message ?? "Failed to apply");
    } finally {
      setSavingId(null);
    }
  }, [apiPost, buildPayload, itemKey, showAlert]);

  const isSaving = useCallback(
    (item: ExternalJobDto) => savingId === itemKey(item),
    [savingId, itemKey]
  );

  const onOpenLink = useCallback(async (url: string) => {
    const ok = await Linking.canOpenURL(url);
    if (ok) Linking.openURL(url);
    else showAlert("Can't open link", url);
  }, [showAlert])

  const search = async () => {
  const k = keyword.trim();
  if (!k) {
    showAlert("Enter a keyword", "Type something to search.");
    return;
  }
  setHasSearched(true);
  setPage(1);
};

  // UI
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>JobTracker — Search</Text>
      <View style= {{ alignItems: "center", marginBottom: 8 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#0ea5e9",
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 8,
            alignSelf: "center",
            minWidth: 160,
          }}
          onPress={() => navigation.navigate("Saved")}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>Go to Saved Jobs</Text>
        </TouchableOpacity>
      </View>

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

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.navBtn, (loading || page === 1) && styles.navBtnDisabled]}
          onPress={prevPage}
          disabled={loading || page === 1}
        >
          <Text style={styles.navText}>Prev</Text>
        </TouchableOpacity>

        <Text style={styles.pageLabel}>Page {page}</Text>

        <TouchableOpacity
          style={[styles.navBtn, loading && styles.navBtnDisabled]}
          onPress={nextPage}
          disabled={loading}
        >
          <Text style={styles.navText}>Next</Text>
        </TouchableOpacity>
      </View>

      {errorMsg ? <Text style={styles.error}>Error: {errorMsg}</Text> : null}
      {!errorMsg && !loading && results.length === 0 ? (
        <Text style={styles.muted}>No results on this page.</Text>
      ) : null}

      <FlatList
        data={results}
        keyExtractor={(item, idx) => `${item.applyUrl ?? item.title}-${idx}`}
        contentContainerStyle={{ paddingVertical: 8 }}
        renderItem={({ item }) => (
          <JobCard
            item={item}
            isSaving={isSaving(item)}
            onSave={saveJob}
            onApplyAndSave={applyAndSave}
            onOpen={onOpenLink}
          />
        )}
      />

      <Text style={styles.hint}>
        Base URL: {BASE_URL}{"\n"}(iOS Simulator uses localhost; Android Emulator uses 10.0.2.2)
      </Text>
    </SafeAreaView>
  );
}

