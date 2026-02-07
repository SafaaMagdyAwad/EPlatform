# 🎓 Online Learning Platform

A full-featured **online learning platform** that supports recorded courses, live classes, and role-based access for **Students**, **Instructors**, and **Admins**. The system is designed to be scalable, secure, and production-ready.

---

## 🚀 Features Overview

### 👨‍🏫 Instructor

* Register / Login
* Create and manage courses
* Upload recorded videos
* Upload files (PDF / Word)
* Schedule live classes
* Set live class limits (time & max students)
* Manage enrolled students
* View course & live session statistics

### 👨‍🎓 Student

* Register / Login
* Enroll in courses
* Watch recorded videos
* Download course files
* Join live classes (if slots available)
* Track learning progress

### 👨‍💼 Admin

* Manage instructors
* Review and approve courses
* Enable / disable user accounts
* Control platform settings
* Monitor overall statistics

---

## 📚 Course Structure

```
Course
 ├── Sections
 │    ├── Video Lessons
 │    ├── Files (PDF / Docs)
 │    ├── Live Session
```

### Course Content Types

* 🎥 Video on Demand (Recorded)
* 📄 Downloadable files
* 🔴 Live classes (scheduled, limited capacity)

---

## 🔴 Live Classes

### Instructor Can:

* Schedule live sessions
* Set date, time, duration
* Set maximum number of students
* Start / end live sessions
* View attendance list

### Student Can:

* Join live sessions if slots are available
* Cannot join after session ends

### Live Integration Options

> Recommended: Use a ready-made service for stability and speed

* Zoom SDK
* Agora
* Jitsi
* Daily.co

---

## 🏗️ System Architecture

### Frontend

* React / Next.js
* Separate dashboards:

  * Instructor Dashboard
  * Student Dashboard
  * Admin Dashboard

### Backend

* Node.js + NestJS
* REST API or GraphQL
* Authentication with JWT
* Role-based authorization

### Database

* PostgreSQL / MySQL (relational data)
* MongoDB (flexible content)
* Redis (sessions, live capacity handling)

### Media Storage

❌ Do NOT store videos on the server

✅ Use:

* AWS S3
* Cloudinary
* Bunny.net

With:

* Video streaming
* Signed URLs
* Expiring links

---

## 🗄️ Database Structure (Simplified)

### Users

* id
* name
* email
* role (student / instructor / admin)

### Courses

* id
* title
* description
* instructorId
* price
* status

### Sections

* id
* courseId
* title
* order

### Lessons

* id
* sectionId
* type (video / file / live)
* title
* contentUrl
* duration
* order

### LiveSessions

* id
* courseId
* startTime
* duration
* maxStudents
* currentStudents
* status (scheduled / live / ended)

### Enrollments

* studentId
* courseId
* progress

---

## 🔐 Authentication & Authorization

* JWT Access Token
* Refresh Token
* Role-based middleware:

  * Instructor: manage content
  * Student: consume content
  * Admin: full control

---

## 🛡️ Content Protection

* Signed video URLs
* Expiring access links
* Dynamic watermarking
* View tracking per user

> ⚠️ Note: 100% video protection is impossible, but theft can be minimized significantly.

---

## 🛣️ Development Roadmap

### Phase 1 – MVP

* Authentication & roles
* Course creation
* Video uploads
* Content consumption

### Phase 2

* Live classes
* Capacity & time limits
* Notifications
* Progress tracking

### Phase 3

* Analytics & reports
* Certificates
* Performance optimization
* AI-powered learning assistant (future)

---

## 💡 Notes

* The system is designed to scale as a SaaS platform
* Payment integration (Stripe / Paymob) can be added later
* Architecture supports future AI and recommendation features

---

## 📌 Tech Stack Summary

* Frontend: React / Next.js
* Backend: NestJS
* Database: PostgreSQL / MongoDB
* Cache: Redis
* Storage: AWS S3 / Cloudinary
* Live: Zoom / Agora / Jitsi

---

### 👏 Built for scalability, security, and real-world use
تمام 🔥
دي **كل الـ API Routes المتوقعة** لمنصّة التعليم، مترتبة ومنظمة كأنها **Production-ready Backend**.
ينفع تتحط مباشرة في README أو تستخدمها كـ blueprint للتنفيذ.

---

# 🌐 API Routes – Online Learning Platform

## 🔐 Auth & Users

### Auth

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
GET    /api/auth/me
```

### Users

```
GET    /api/users/me
PATCH  /api/users/me
```

---

## 👨‍🏫 Instructor Routes

### Instructor Profile

```
GET    /api/instructors/me
PATCH  /api/instructors/me
```

### Courses (Instructor)

```
POST   /api/instructor/courses
GET    /api/instructor/courses
GET    /api/instructor/courses/:courseId
PATCH  /api/instructor/courses/:courseId
DELETE /api/instructor/courses/:courseId
```

---

## 📚 Courses (Public / Student)

```
GET    /api/courses
GET    /api/courses/:courseId
GET    /api/courses/:courseId/sections
```

### Enrollment

```
POST   /api/courses/:courseId/enroll
GET    /api/courses/:courseId/progress
```

---

## 📦 Sections & Lessons

### Sections

```
POST   /api/courses/:courseId/sections
PATCH  /api/sections/:sectionId
DELETE /api/sections/:sectionId
```

### Lessons

```
POST   /api/sections/:sectionId/lessons
GET    /api/lessons/:lessonId
PATCH  /api/lessons/:lessonId
DELETE /api/lessons/:lessonId
```

### Lesson Types

```
GET    /api/lessons/:lessonId/video
GET    /api/lessons/:lessonId/file
```

---

## 🎥 Video Streaming

```
GET    /api/videos/:lessonId/stream
POST   /api/videos/:lessonId/track
```

---

## 🔴 Live Sessions

### Instructor

```
POST   /api/live-sessions
PATCH  /api/live-sessions/:id
POST   /api/live-sessions/:id/start
POST   /api/live-sessions/:id/end
GET    /api/live-sessions/:id/attendance
```

### Student

```
POST   /api/live-sessions/:id/join
GET    /api/live-sessions/:id/status
```

---

## 📈 Progress & Tracking

```
POST   /api/progress/lesson/:lessonId/complete
GET    /api/progress/course/:courseId
```

---

## 🔔 Notifications

```
GET    /api/notifications
POST   /api/notifications/read/:id
```

---

## 💳 Payments (Optional / Phase 2)

```
POST   /api/payments/checkout
POST   /api/payments/webhook
GET    /api/payments/history
```

---

## 👨‍💼 Admin Routes

### Users Management

```
GET    /api/admin/users
PATCH  /api/admin/users/:id/ban
PATCH  /api/admin/users/:id/activate
```

### Courses Moderation

```
GET    /api/admin/courses
PATCH  /api/admin/courses/:id/approve
PATCH  /api/admin/courses/:id/reject
```

### Analytics

```
GET    /api/admin/stats
GET    /api/admin/revenue
```

---

## 🛡️ Security & Utilities

```
POST   /api/uploads/signed-url
GET    /api/health
```

---

## 🧠 Roles Access Summary

| Route Type      | Student | Instructor | Admin |
| --------------- | ------- | ---------- | ----- |
| Auth            | ✅       | ✅          | ✅     |
| Courses view    | ✅       | ✅          | ✅     |
| Course creation | ❌       | ✅          | ❌     |
| Live manage     | ❌       | ✅          | ❌     |
| Enrollment      | ✅       | ❌          | ❌     |
| Admin panel     | ❌       | ❌          | ✅     |

---

## 💡 ملاحظات معمارية

* كل routes محمية بـ JWT
* Role Guard قبل أي action
* Streaming عبر Signed URLs
* Redis لإدارة live capacity
* Soft delete للكورسات


