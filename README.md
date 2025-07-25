# Job Application Tracker

A full-stack backend application built with **Java** and **Spring Boot** to help users **track job applications** during their job search. The project is designed with clean, modular structure and follows RESTful API principles. Future versions will support automated job searches and frontend integration.

---

## 🚀 Features

- ✅ Add new job applications (POST)
- ✅ View all job applications (GET)
- ✅ Update an existing job (PUT)
- ✅ Delete a job (DELETE)
- ✅ H2 in-memory database for development
- ✅ Basic search by company, position, or status (GET)
- ✅ External job search via JSearch (RapidAPI)
- 🛠️ Future: Frontend integration and deployment to cloud. 

---

## 🧰 Tech Stack

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

---

## 📁 Project Structure

```
src/
├── main/
│   └── java/
│       └── com/jerome/jobtracker/
│           ├── model/
│           ├── repository/
│           ├── service/
│           ├── controller/
│           └── JobTrackerApplication.java
```

---

## 💡 Why This Project?

As part of my journey in the **Microsoft Software & Systems Academy (MSSA)**, I’m building this project to:

- Apply backend development skills in Java
- Practice clean code and object-oriented programming
- Learn real-world tools like Git, Postman, and H2
- Showcase my ability to build and explain full-stack systems from scratch
- Prepare for software engineering interviews by implementing CRUD functionality and RESTful APIs

---

## 🔄 API Usage Examples // Added

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
GET http://localhost:8080/api/jobs/external/search?keyword=java
---

## 🔜 Roadmap

- [x] Implement CRUD endpoints (Spring Boot)
- [x] Test using Postman and H2 console
- [x] Add basic search functionality (by company, position, status)
- [x] External job search API using RapidAPI (GET /api/jobs/external/search?keyword=...)
- [ ] Improve external API output formatting
- [ ] Implement pagination and sorting
- [ ] Add unit tests and validation logic
- [ ] Build frontend using React or React Native
- [ ] Deploy to cloud (Azure or AWS)

---

## 🛠️ Setup

To run locally:

```bash
./mvnw spring-boot:run
```

Once running, access the API in your browser or Postman:

```
http://localhost:8080/api/jobs
```

---

## 📫 Contact

Created by **Jerome Cagado**  
GitHub: [jeromecagado](https://github.com/jeromecagado)

> ⭐ *Feel free to fork or contribute!*
