import { BASE_URL } from "../api";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Platform, Linking, Alert } from "react-native";
import JobCard from "../components/JobCard";
import styles from "../styles/SearchStyles";

export default function SavedJobsScreen() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [viewType, setViewType] = useState<"saved" | "applied">("saved");
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/jobs/${viewType}`);
      const json = await res.json();
      setJobs(json);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: number) => {
  console.log("🧹 deleting job id:", id);
  try {
    const res = await fetch(`${BASE_URL}/api/jobs/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    setJobs((prev) => prev.filter((j) => j.id !== id));
  } catch (e: any) {
    console.error("Delete failed:", e);
  }
};
 const applyJob = async (job: any) => {
  try {
    const res = await fetch(`${BASE_URL}/api/jobs/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: job.id,
        position: job.title,
        company: job.company,
        location: job.location,
        applyUrl: job.applyUrl,
        status: "Applied",
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // remove job from "saved" tab once applied
    setJobs((prev) => prev.filter((j) => j.id !== job.id));

    console.log("✅ Job applied:", job.title);
  } catch (err) {
    console.error("❌ Failed to apply job:", err);
  }
};

  useEffect(() => {
    fetchJobs();
  }, [viewType]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your {viewType === "saved" ? "Saved" : "Applied"} Jobs</Text>

      {/* Toggle Buttons */}
      <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 10, gap: 8 }}>
        <TouchableOpacity
          style={{
            backgroundColor: viewType === "saved" ? "#0ea5e9" : "#e5e7eb",
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 8,
          }}
          onPress={() => setViewType("saved")}
        >
          <Text style={{ color: viewType === "saved" ? "white" : "black", fontWeight: "600" }}>
            Saved
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: viewType === "applied" ? "#0ea5e9" : "#e5e7eb",
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 8,
          }}
          onPress={() => setViewType("applied")}
        >
          <Text style={{ color: viewType === "applied" ? "white" : "black", fontWeight: "600" }}>
            Applied
          </Text>
        </TouchableOpacity>
      </View>

      {/* Job List */}
      {loading ? (
        <Text>Loading...</Text>
      ) : jobs.length === 0 ? (
        <Text>No {viewType} jobs found.</Text>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item, idx) => `${item.applyUrl ?? item.id}-${idx}`}
          renderItem={({ item }) => (
            <JobCard
              item={{
                id: item.id,
                title: item.position,
                company: item.company,
                location: item.location,
                applyUrl: item.applyUrl,
              }}
              onOpen={(url) => Linking.openURL(url)}
              onDelete={() => deleteJob(item.id)}
              onApplyAndSave={() => applyJob(item)}
              showDelete
              showApply
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}