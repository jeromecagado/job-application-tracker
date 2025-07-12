# Job Application Tracker

A full-stack backend application built with **Java** and **Spring Boot** to help users **track job applications** during their job search. The project is designed with clean, modular structure and follows RESTful API principles. Future versions will support automated job searches and frontend integration.

---

## 🚀 Features

- ✅ Add new job applications (POST)
- ✅ View all job applications (GET)
- ✅ Update an existing job (PUT)
- ✅ Delete a job (DELETE)
- ✅ H2 in-memory database for development
- 🛠️ Future: API-based job search and frontend UI

---

## 🧰 Tech Stack

| Layer         | Tech                 |
|---------------|----------------------|
| Language      | Java 17              |
| Framework     | Spring Boot          |
| Database      | H2 (in-memory)       |
| ORM           | Spring Data JPA      |
| API Testing   | Postman              |
| Version Control | Git + GitHub       |

---

## 📁 Project Structure

```
src/
├── main/
│   └── java/
│       └── com/jerome/jobtracker/
│           ├── model/
│           ├── repository/
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

## 🔜 Roadmap

- [x] Implement CRUD endpoints (Spring Boot)
- [x] Test using Postman and H2 console
- [ ] Add job search via external API (Indeed, LinkedIn, etc.)
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
