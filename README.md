# Job Application Tracker
📱 A full-stack application that helps users track, search, and manage job applications — built with Spring Boot (Java) and React Native (TypeScript + Expo).

![Java](https://img.shields.io/badge/Java-17-blue?logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3-green?logo=springboot)
![React Native](https://img.shields.io/badge/React%20Native-Expo-61DAFB?logo=react)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Maven](https://img.shields.io/badge/Maven-3.9.6-C71A36?logo=apachemaven)
![Expo](https://img.shields.io/badge/Expo-Go-black?logo=expo)
---

## 🎥 Demo

[![Job Tracker Demo](https://img.youtube.com/vi/vXMh6BkV6XM/0.jpg)](https://youtu.be/vXMh6BkV6XM)

## 🚀 Overview
The Job Application Tracker is a cross-platform solution that lets users:
	•	🔍 Search real-time job listings via the JSearch API (RapidAPI)
	•	💾 Save interesting jobs to a local database
	•	✅ Mark jobs as “Applied” or “Saved”
	•	📊 Filter and search by company, position, or application status
	•	☁️ Deploy backend to Azure App Service with database integration
	•	📱 Access from iOS, Android, and Web through a unified React Native front end

## ✨ Key Features

🖥️ Backend (Spring Boot)
	•	Full CRUD operations for job applications
	•	External job search via JSearch (RapidAPI)
	•	Local persistence with SQLite
	•	RESTful API design with clean endpoints
	•	Error handling using ResponseStatusException
	•	Tested via Postman and Swagger UI
	•	Deployed to Azure Web App

📱 Frontend (React Native + Expo)
	•	Job search interface with pagination
	•	Tabs for Search, Saved, and Applied views
	•	Integration with backend REST endpoints
	•	Responsive layout for web, iOS, and Android
	•	(Planned) Filters by location, skills, and experience level
	•	(Planned) UI enhancements and dark mode

## 🧠 Architecture

Frontend (React Native + Expo)
        ↓
Backend API (Spring Boot)
        ↓
JSearch API (RapidAPI) — External job data
        ↓
SQLite Database — Saved/Applied jobs

---

## 🧰 Tech Stack Backend

| Layer           | Tech                 |
|-----------------|----------------------|
| Language        | Java 17              |
| Framework       | Spring Boot          |
| Database        | SQLite               |
| ORM             | Spring Data JPA      |
| API Testing     | Postman/Swager       |
| External API    | RapidAPI (JSearch)   |
| Cloud           | Azure App Service    |
| Documentation   | Markdown (README.md) |
| Version Control | Git + GitHub         |

## 🧰 Tech Stack Frontend
| Layer           | Tech                 |
|-----------------|----------------------|
| Language        | TypeScript           |
| Framework       | React Native         |
| Build Tool      | Expo                 |
| API Connection  | Expo                 |
| Platform        | Web, Android, iOS    |
---

## 📁 Project Structure

job-application-tracker/
├── backend-api/
│   ├── src/main/java/com/jerome/jobtracker/
│   │   ├── controller/        → REST endpoints
│   │   ├── service/           → Business logic, API calls
│   │   ├── model/             → Entities (JobApplication)
│   │   ├── repository/        → Spring Data JPA interfaces
│   │   └── JobTrackerApplication.java
│   └── resources/
│       ├── application.properties
│       └── schema.sql
└── mobile/
    ├── App.tsx
    ├── components/
    └── screens/

---

## 💡 Why This Project?

As part of my journey in the **Microsoft Software & Systems Academy (MSSA)**, I’m building this project to:

- Apply backend development skills in Java
- Practice clean code and object-oriented programming
- Learn real-world tools like Git, Postman, and H2
- Showcase my ability to build and explain full-stack systems from scratch
- Prepare for software engineering interviews by implementing CRUD functionality and RESTful APIs

---
## 📱 Frontend Demo
- Built with React Native + Expo
- Allows searching real job listings via the backend API
- Supports pagination (Next/Prev)
- Works on iOS simulator, Android emulator, and web

<img width="847" height="772" alt="JobTracherUI" src="https://github.com/user-attachments/assets/fbb74420-232d-4c49-81ca-3fe24fc6c614" />
Figure: React Native UI showing live job search results from backend API.

## 🔄 API Usage Examples // 
### ➕ Add a Job Application (POST)
```json
{
  "company": "Microsoft",
  "position": "Software Engineer",
  "status": "Applied",
  "notes": "Sent resume."
}
```

### 🔍 Search by Company (GET)
GET http://localhost:8080/api/jobs/search/company?company=google

### 🌐 External Job Search (GET)
GET http://localhost:8080/api/jobs/external/search2?keyword=java&page=1&numPages=1
---

## 🔜 Roadmap

### Backend
- [x] CRUD endpoints
- [x] External job search via RapidAPI
- [x] Pagination & sorting
- [x] Cloud deployment (Azure/AWS)

### Frontend
- [x] React Native app with keyword search
- [x] Pagination (Next/Prev)
- [x] Input fields for location, filters
- [ ] UI polish (cards, dark mode)

---

## ⚙️ How It Works
- User enters a job search in the React Native app.
- Request hits the backend (`/api/jobs/external/search2`).
- Backend calls the JSearch API (RapidAPI) and returns normalized results.
- Results are rendered in the mobile/web frontend with pagination controls.

## 🛠️ Setup

To run locally:

### Prereqs
	•	Java 17 (SDKMAN or Homebrew on macOS)
	•	Maven Wrapper (included: ./mvnw)
	•	Node.js LTS + npm (install via nvm recommended)
	•	Expo CLI (handled by npx expo start)
	•	Optional: Xcode (iOS Simulator) or Android Studio (Android Emulator)

⸻

### Backend (Spring Boot)
Set RapidAPI env vars (for external job search via JSearch).
Create a .env-style entry in your shell profile or export in terminal:
export JSEARCH_API_KEY=your_rapidapi_key_here
The app reads it via:
external.jsearch.key=${JSEARCH_API_KEY:}

```bash
./mvnw spring-boot:run
```
Backend will start on http://localhost:8080

### Frontend (React Native + Expo)
# macOS
brew install nvm
mkdir -p ~/.nvm
# add to ~/.zshrc:
# export NVM_DIR="$HOME/.nvm"
# [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && . "/opt/homebrew/opt/nvm/nvm.sh"

# reload shell, then:
nvm install --lts
nvm use --lts


cd mobile
npx expo start
Press i to open iOS Simulator(Xcode needed)
Press a for Android emulator(Android Studio needed)
Press w for web (first time use = npx expo install react-dom react-native-web @expo/metro-runtime)

Connectivity:
const BASE_URL =
  Platform.OS === "android" ? "http://10.0.2.2:8080" : "http://localhost:8080";

iOS simulator -> http://localhost:8080
Android Emulator -> http://10.0.2.2:8080

Quick Test:
Backend health:
curl http://localhost:8080/actuator/health
# => {"status":"UP"}

External Search:
curl "http://localhost:8080/api/jobs/external/search2?keyword=java&page=1&numPages=1"

---

## 📜 License
This project is licensed under the MIT License.  

## 📫 Contact

Created by **Jerome Cagado**  
GitHub: [jeromecagado](https://github.com/jeromecagado)

> ⭐ *Feel free to fork or contribute!*
