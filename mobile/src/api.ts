// // src/api.ts
// import { Platform } from "react-native";

// // // 💡 Always use your deployed backend when running on the web
// // const AZURE_URL = "https://jobtracker-backend-cwaqbbb8hnehhvgq.westus2-01.azurewebsites.net";

// // const LOCAL_ANDROID = "http://10.0.2.2:8080";
// // const LOCAL_IOS = "http://localhost:8080";

// // // Force web builds to use Azure
// // export const BASE_URL =
// //   Platform.OS === "web"
// //     ? AZURE_URL
// //     : Platform.OS === "android"
// //     ? LOCAL_ANDROID
// //     : LOCAL_IOS;

// // console.log("🌐 BASE_URL in use:", BASE_URL);
// export const BASE_URL =
//   "https://jobtracker-backend-cwaqbbb8hnehhvgq.westus2-01.azurewebsites.net";

// console.log("🌐 Using Azure backend:", BASE_URL);

// export type ExternalJob = {
//   title: string;
//   company: string;
//   location: string;
//   applyUrl: string | null;
// };

// export async function searchJobs(keyword: string): Promise<ExternalJob[]> {
//   const url = `${BASE_URL}/api/jobs/external/search2?keyword=${encodeURIComponent(keyword)}&page=1&numPages=1`;
//   const res = await fetch(url);
//   if (!res.ok) throw new Error(`HTTP ${res.status}`);
//   return res.json();
// }
import { Platform } from "react-native";

const AZURE_URL = "https://jobtracker-backend-cwaqbbb8hnehhvgq.westus2-01.azurewebsites.net";
const LOCAL_ANDROID = "http://10.0.2.2:8080";
const LOCAL_IOS = "http://localhost:8080";
const LOCAL_WEB = "http://localhost:8080";

// ✅ Detect build environment
const isProduction = process.env.NODE_ENV === "production";

// ✅ Pick backend URL based on platform + environment
export const BASE_URL =
  Platform.OS === "web"
    ? isProduction
      ? AZURE_URL
      : LOCAL_WEB
    : Platform.OS === "android"
    ? LOCAL_ANDROID
    : LOCAL_IOS;

console.log("🌐 BASE_URL in use:", BASE_URL);

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
