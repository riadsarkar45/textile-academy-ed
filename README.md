## ⏳ Cold Start Notice

The backend of Textile Academy is hosted on **Render (Free Tier)**.

Due to free-tier limitations:
- The server may take **30–60 seconds** to respond on the first request
- This happens when the server is waking up from an idle state
- Subsequent requests will be fast once the server is active

> ⚠️ This is a hosting limitation, not a performance issue in the application itself.

For production and large-scale usage, the backend is designed to be deployed on paid or dedicated infrastructure.


# 🧵 Textile Academy

**Textile Academy** is a textile-focused online examination and live competitive practice platform designed for students and teachers in the textile domain.

Unlike generic exam platforms, Textile Academy combines **official verified exams** with **community-driven live practice**, allowing learners to both assess their skills formally and improve through real-time competition with friends.

---

## 🚀 Core Vision

To build a **credible, scalable, and learning-first competitive ecosystem** exclusively for textile education.

Textile Academy focuses on:
- Authority through **official, verified exams**
- Engagement through **live community practice**
- Growth through **students + teachers collaboration**

---

## ✨ Key Features

### 🎓 Official Textile Exams
- Created and managed by **verified teachers and admins**
- Textile-specific subjects and structured assessments
- Reliable scoring and result tracking
- Designed for serious evaluation, not casual practice

---

### ⚡ Live Competitive Practice (Community Mode)
- Students and teachers can create **live practice exams**
- Friends can join private or public rooms
- **Real-time leaderboard** during exams
- Ideal for group study, mock tests, and skill improvement

> ⚠️ Community exams are clearly marked as **Practice / Unverified** unless approved.

---

### 🧠 Question System
- Single unified question bank
- Supports both **Official** and **Practice** exams
- Difficulty level, subject mapping, and analytics-ready
- Competitive exam features (negative marking, sections) supported

---

### 👥 Role & Trust System
Roles and trust are treated separately:

**Roles**
- Student
- Teacher
- Admin

**Trust Levels**
- UNVERIFIED
- TRUSTED
- VERIFIED

> A student or teacher can become VERIFIED based on contribution and approval.

---

### 📊 Analytics & Reporting
- Subject-wise performance tracking
- Attempt history
- Correct vs wrong answer analysis
- Designed for future insights and recommendations

---

### 🔌 Real-Time Architecture
- Live rooms powered by Socket.IO
- In-memory room and user tracking
- Designed to scale with Redis when needed
- Optimized for performance without premature complexity

---

## 🧩 Tech Stack

- **Backend:** Node.js, TypeScript
- **Database:** Prisma ORM (SQL-based)
- **Real-time:** Socket.IO
- **Caching (future):** Redis
- **Architecture:** Modular, scalable, exam-first design

---

## 🛡️ Quality & Safety Measures
- Question rate limits
- Trust-based visibility
- Report and moderation system
- Clear separation between Official and Community exams

---

## 🔍 How Textile Academy is Different

| Feature | Generic Platforms | Textile Academy |
|------|------------------|----------------|
| Domain focus | Mixed | Textile-only |
| Live exams | Official only | Official + Community |
| Question creators | Verified only | Students + Teachers |
| Learning style | Exam-centric | Learning + Competition |
| Growth model | Closed | Community-driven |

---

## 📌 Project Status
🚧 Actively under development  
Built and maintained with a strong focus on correctness, performance, and long-term scalability.

---

## 🤝 Contribution
Teachers and trusted contributors will be able to:
- Create high-quality questions
- Participate in verified exam creation
- Help grow a strong textile learning community

---

## 📜 License
This project is private and proprietary.  
Usage and redistribution are restricted.

---

**Textile Academy** is not just an exam system —  
it is a **practice-driven competitive ecosystem for textile education**.
