// mobile/src/api.ts
import { Platform } from "react-native";

export const BASE_URL =
  Platform.OS === "android" ? "http://10.0.2.2:8080" : "http://localhost:8080";

export type ExternalJob = {
  title: string;
  company: string;
  location: string;
  applyUrl: string | null;
};

export async function searchJobs(keyword: string): Promise<ExternalJob[]> {
  const url = `${BASE_URL}/api/jobs/external/search2?keyword=${encodeURIComponent(keyword)}&page=1&numPages=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}