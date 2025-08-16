# Job Application Tracker
📌 A full-stack project to track and search jobs — built with Spring Boot & React Native.

![Java](https://img.shields.io/badge/Java-17-blue?logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3-green?logo=springboot)
![React Native](https://img.shields.io/badge/React%20Native-Expo-61DAFB?logo=react)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Maven](https://img.shields.io/badge/Maven-3.9.6-C71A36?logo=apachemaven)
![Expo](https://img.shields.io/badge/Expo-Go-black?logo=expo)
---

## 🚀 Features

- ✅ Add new job applications (POST)
- ✅ View all job applications (GET)
- ✅ Update an existing job (PUT)
- ✅ Delete a job (DELETE)
- ✅ H2 in-memory database for development
- ✅ Basic search by company, position, or status (GET)
- ✅ External job search via JSearch (RapidAPI)
- ✅ Frontend integration
- 🛠️ Deployment to cloud/Database. 

---

## 🧰 Tech Stack Backend

| Layer           | Tech                 |
|-----------------|----------------------|
| Language        | Java 17              |
| Framework       | Spring Boot          |
| Database        | H2 (in-memory)       |
| ORM             | Spring Data JPA      |
| API Testing     | Postman              |
| External API    | RapidAPI (JSearch)   |
| Documentation   | Markdown (README.md) |
| Version Control | Git + GitHub         |

## 🧰 Tech Stack Frontend
| Layer           | Tech                 |
|-----------------|----------------------|
| Language        | TypeScript           |
| Framework       | React Native         |
| Testing         | Expo                 |
---

## 📁 Project Structure

backend-api/
└── src/
    └── main/java/com/jerome/jobtracker/
        ├── model/
        ├── repository/
        ├── service/
        ├── controller/
        └── JobTrackerApplication.java

mobile/
└── App.tsx

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
- [ ] Pagination & sorting
- [ ] Cloud deployment (Azure/AWS)

### Frontend
- [x] React Native app with keyword search
- [x] Pagination (Next/Prev)
- [ ] Input fields for location, filters
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
