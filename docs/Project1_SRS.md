# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
## AI-Based Intelligent Attendance System Using Facial Recognition (SnapClass)

**Version:** 1.0 Release  
**Date:** October 2026  
**Authors:**  
- **Ishika Khandelwal** (Enrollment No: `<University Roll No>`)  
- **Jayesh Parmar** (Enrollment No: `<University Roll No>`)  
- **Manasvi Septa** (Enrollment No: `<University Roll No>`)  

**Under the Guidance of:** `<Name of the Guide(s)>`  
**Department of Computer Science & Engineering, Faculty of Engineering**  
**MEDICAPS UNIVERSITY, INDORE - 453331**

---

### Document Control & Revision History

| Version | Primary Author | Date | Status | Description of Changes |
| :--- | :--- | :--- | :--- | :--- |
| **0.1** | Ishika, Jayesh, Manasvi | 15/08/2026 | Draft | Initial requirement gathering and scope definition. |
| **0.5** | Ishika, Jayesh, Manasvi | 10/09/2026 | Under Review | Added Dlib ResNet-34 biometric pipeline & schema. |
| **1.0** | Ishika, Jayesh, Manasvi | 11/10/2026 | Approved | Finalized SRS matching verified working implementation. |

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) document details the complete functional and non-functional requirements for the **AI-Based Intelligent Attendance System Using Facial Recognition (SnapClass)**, Release Version 1.0. This specification establishes a definitive contract between academic project stakeholders (course instructors, academic mentors, evaluators, and system architects) and the engineering implementation team. It describes all behavioral capabilities, hardware-software interfaces, biometric pipeline algorithms, data constraints, and performance parameters verified against the working codebase.

### 1.2 Document Conventions
This document strictly adheres to IEEE Standard 830-1998 for Recommended Practice for Software Requirements Specifications. The following typographical conventions are followed throughout:
- **Bold font** signifies section headings, core terminology, database table names, and user interface controls.
- `Code font` designates code identifiers, source files, and database columns (e.g., `attendance_logs`, `face_embedding`).
- Requirement tags are uniquely enumerated using the format **REQ-X** for traceability across features.
- Requirements priorities are designated as **High**, **Medium**, or **Low**, where High denotes essential functionality required for minimum viable deployment.

### 1.3 Intended Audience and Reading Suggestions
This document is structured for various institutional stakeholders:
- **Academic Guides and Examiners:** Should review Section 1 (Introduction), Section 2 (Overall Description), and Section 4 (System Features) for scope alignment and project assessment.
- **Software Developers & Engineers:** Should examine Section 3 (External Interfaces), Section 4 (Detailed Feature Requirements), and Section 5 (Nonfunctional Requirements) for implementation, testing, and deployment.
- **Academic Quality Auditors:** Should consult Section 5 (Nonfunctional Requirements) and Section 6 (Project Plan) to evaluate verification standards, privacy compliance, and team division.

### 1.4 Product Scope
SnapClass is an intelligent classroom management and automated attendance platform designed to eliminate manual roll calls, prevent buddy-punching, and automate academic gradebook synchronization. The system captures wide-angle classroom photographs and oral responses, processing them through a 128-dimensional deep metric face recognition pipeline and a 256-dimensional acoustic voice encoder. The software provides role-specific portals for instructors and students, real-time attendance health meters, SVG QR code course enrollments, and 1-click CSV audit logging.

---

## 2. Overall Description

### 2.1 Product Perspective
SnapClass is a self-contained, cloud-enabled web platform operating across a multi-tier decoupled architecture:
1. **Client Presentation Tier:** Developed as a responsive Single Page Application (SPA) using React 19, TypeScript 5.8, Vite 6.2, and Tailwind CSS v4, interacting with client hardware via HTML5 MediaDevices and Web Audio APIs.
2. **Relational Persistence Tier:** Backed by PostgreSQL hosted on Supabase Cloud, queried via PostgREST and normalized to Third Normal Form (3NF), with an offline fallback storage layer powered by W3C Web LocalStorage.
3. **AI/ML Computational Tier:** Standalone Python 3.11 deep learning pipelines leveraging Dlib (HOG face detection, 68-point landmark shape predictor, ResNet-34 128-D embedding extractor), Scikit-Learn (Linear SVC), Resemblyzer (LSTM 256-D voice encoder), and Librosa.

### 2.2 Product Functions
The major operational functions provided by SnapClass include:
- **Faculty Authentication & Role Access:** Secure registration and credential validation using salted Bcrypt.
- **Subject Lifecycle Management:** Creation of academic courses, automated join link generation, and vector SVG QR code rendering.
- **Multi-Angle Classroom Capture:** Camera snapshot streaming and multi-file image uploading for comprehensive lecture hall coverage.
- **Biometric Facial Recognition:** Automated face detection, 68-point landmark alignment, 128-D descriptor generation, Linear SVM classification, and Euclidean distance verification (threshold $\le 0.6$).
- **Acoustic Voice Roll Call:** Speech segmentation via Librosa and 256-D speaker identification via Resemblyzer (threshold $\ge 0.65$).
- **Instructor Verification & Manual Override:** Live detection review table with Present/Absent toggles before committing records.
- **Transactional Session Logging & CSV Export:** Batch insertion of timestamped logs and instant CSV audit generation.
- **Student Self-Service Dashboard:** Biometric FaceID authentication, 1-click QR auto-enrollment, course unenrollment, and attendance percentage health score tracking.

### 2.3 User Classes and Characteristics

| User Class | Technical Literacy | Access Privileges | Frequency of Use |
| :--- | :--- | :--- | :--- |
| **Teacher (Faculty)** | Moderate. Familiar with standard web portals and webcams. | Full subject creation, roll-call execution, override toggles, CSV export. | High (Multiple daily lectures). |
| **Student (Learner)** | Moderate to High. Fluent with mobile browsers and QR codes. | Read-only attendance stats, profile enrollment, FaceID login. | Moderate (Daily tracking). |
| **AI Processing Module** | Autonomous software agent. | In-memory image ingestion, feature extraction, classification. | System execution per roll call. |

### 2.4 Operating Environment
- **Client Devices:** Desktop PCs, laptops, tablets, or smartphones equipped with standard modern web browsers (Chrome $\ge 110$, Firefox $\ge 110$, Safari $\ge 16$, Edge $\ge 110$).
- **Optical Hardware:** Integrated webcams or USB cameras supporting 720p (1280x720) or 1080p resolution.
- **Acoustic Hardware:** Standard integrated or external microphone array.
- **Backend Execution Node:** Python 3.11.9 64-bit environment with C++ build tools (for Dlib native binaries) and PyTorch tensor backend.
- **Database Server:** Cloud-hosted Supabase PostgreSQL 15 instance accessible over HTTPS/TLS.

### 2.5 Design and Implementation Constraints
- **Language and Framework Constraints:** Frontend must be authored in TypeScript utilizing React 19 and Tailwind CSS v4; Backend algorithms must execute under Python 3.11.
- **Privacy and Storage Constraints:** In accordance with biometric data privacy guidelines, raw classroom photographs must never be saved permanently to database tables; only mathematical vector embeddings may be persisted.
- **LocalStorage Capacity:** The offline demonstration fallback relies on browser LocalStorage, constrained to approximately 5 MB per domain.
- **Model Weight Constraints:** Pre-trained Dlib ResNet-34 face recognition weights and Resemblyzer LSTM weights must be loaded locally to avoid external API per-call costs.

### 2.6 User Documentation
The system ships with the following user documentation deliverables:
- **Faculty User Manual:** Step-by-step instructions for course creation, QR code distribution, camera staging, and attendance overriding.
- **Student Self-Help Guide:** Walkthrough for camera FaceID login, deep-link enrollment, and attendance percentage interpretation.
- **Developer and Setup Guide:** Full installation documentation detailed in `frontend/README.md` and `requirements.txt`.

### 2.7 Assumptions and Dependencies
- **Assumption 1:** Classroom lecture halls provide ambient lighting sufficient for optical feature extraction (minimum 150 lux).
- **Assumption 2:** Students do not intentionally obstruct or mask their facial features (e.g., wearing full face coverings during photo capture).
- **Dependency 1:** Client web browser grants runtime camera and microphone permissions via standard W3C MediaDevices dialogues.
- **Dependency 2:** Stable outbound internet connectivity for querying Supabase Cloud database tables, with automatic fallback to local persistence during network outages.

---

## 3. External Interface Requirements

### 3.1 User Interfaces
SnapClass implements an institutional dark-mode visual interface (`#0B0F19` background) styled via Tailwind CSS v4 with the following major screens:
1. **Home Landing Screen (`HomeScreen.tsx`):** Features a hero value proposition, platform metrics, and dual portal launch cards for Student Access and Faculty Access.
2. **Faculty Authentication Screen (`TeacherLogin.tsx`):** Institutional sign-in and registration form with username, password, and a 'Fill Demo Account' helper.
3. **Take Attendance Screen (`TakeAttendanceTab.tsx`):** Course selector dropdown, classroom photo staging gallery, and AI execution action buttons.
4. **Camera & Upload Staging Modal (`AddPhotosModal.tsx`):** Live video viewfinder and drag-and-drop multi-file upload container with thumbnail deletion.
5. **AI Verification Modal (`AttendanceResultModal.tsx`):** Roster table displaying student avatars, match confidence sources, and Present/Absent toggle switches, triggering confetti upon confirmation.
6. **Course Management Screen (`ManageSubjectsTab.tsx`):** Grid of course cards displaying enrolled student counts and recorded class sessions.
7. **QR Sharing Modal (`ShareSubjectModal.tsx`):** Displays dynamic vector SVG QR code, copyable join URL, and WhatsApp direct share link.
8. **Attendance Records Logbook (`AttendanceRecordsTab.tsx`):** Chronological ledger of historical sessions with search filtering, attendance percentage badges, and 1-click CSV download.
9. **Student Dashboard (`StudentDashboard.tsx`):** Student greeting banner, Attendance Health score meter (Good Standing $\ge 75\%$ vs Low Attendance alert), enrolled course cards, and unenroll button.

### 3.2 Hardware Interfaces
- **Optical Camera Interface:** Interfaced via W3C Media Capture API (`navigator.mediaDevices.getUserMedia({ video: true })`). Captures video frames at 30 FPS, rendering them onto a hidden HTML5 canvas element for Base64 DataURL rasterization.
- **Microphone Audio Interface:** Interfaced via W3C Web Audio API (`AudioContext`, `AnalyserNode`) and MediaStream Recording API. Visualizes real-time frequency waveforms on canvas and outputs standard WAV/Blob audio clips.

### 3.3 Software Interfaces
- **Supabase PostgREST Client Interface:** Communicates over HTTPS/TLS with Supabase PostgreSQL, executing CRUD operations against `teachers`, `students`, `subjects`, `subject_students`, and `attendance_logs` tables.
- **Python Dlib & Torch Subsystem:** Ingests image arrays via Pillow and NumPy, executing C++ optimized facial detection, landmark alignment, and ResNet-34 descriptor computation.
- **Operating System Environment:** Compatible with Windows 10/11, macOS, and Ubuntu Linux through cross-platform Node.js and Python runtimes.

### 3.4 Communications Interfaces
- **Protocol:** Standard HTTPS (Hypertext Transfer Protocol Secure) utilizing TLS 1.3 encryption for all client-to-database communications.
- **Data Serialization:** All payloads exchanged between components and stored in database tables are formatted as strict JavaScript Object Notation (JSON).
- **External URL Schemes:** Generates direct deep links formatted as `${origin}?join-code=${subject_code}` and interfaces with WhatsApp Web API via `https://api.whatsapp.com/send?text=...`.

---

## 4. System Features

### 4.1 Feature 1: Faculty Authentication & Session Management
- **4.1.1 Description & Priority:** Enables academic instructors to securely register faculty profiles and authenticate into the institutional portal. **Priority: High.**
- **4.1.2 Stimulus/Response Sequences:**
  - *Stimulus:* Teacher enters username and password, clicks "Sign In".
  - *Response:* System verifies credentials against stored Bcrypt hash in database. On success, sets active session in `AuthContext` and redirects to `TeacherScreen` dashboard. On failure, displays inline error alert.
- **4.1.3 Functional Requirements:**
  - **REQ-1:** The system shall validate unique faculty usernames during registration.
  - **REQ-2:** The system shall hash all passwords using salted Bcrypt before persistent storage.
  - **REQ-3:** The system shall persist active instructor session state in browser local storage until explicit sign out.

### 4.2 Feature 2: Academic Course Management & QR Enrollment Generation
- **4.2.1 Description & Priority:** Allows instructors to create academic subjects, manage course details, and generate dynamic enrollment QR codes. **Priority: High.**
- **4.2.2 Stimulus/Response Sequences:**
  - *Stimulus:* Teacher clicks "Create New Course", enters Subject Code, Title, and Section.
  - *Response:* System creates subject linked to instructor ID and renders course card.
  - *Stimulus:* Teacher clicks "Share QR Code & Join Link".
  - *Response:* System renders SVG QR code and direct registration URL.
- **4.2.3 Functional Requirements:**
  - **REQ-4:** The system shall create subject records storing code, name, section, and instructor ID.
  - **REQ-5:** The system shall dynamically generate vector SVG QR codes encoding direct enrollment URLs.
  - **REQ-6:** The system shall provide direct integration to launch WhatsApp Web with pre-formatted registration invitations.

### 4.3 Feature 3: Student Enrollment & Biometric FaceID Registration
- **4.3.1 Description & Priority:** Facilitates student self-enrollment into courses via codes/QR links and biometric FaceID profile registration. **Priority: High.**
- **4.3.2 Stimulus/Response Sequences:**
  - *Stimulus:* Student scans course QR code or accesses URL with `?join-code=CS101`.
  - *Response:* System auto-detects code, switches to student portal, and displays `AutoEnrollModal`.
  - *Stimulus:* Student confirms enrollment.
  - *Response:* System links student ID to subject ID in junction table and fires confetti.
- **4.3.3 Functional Requirements:**
  - **REQ-7:** The system shall parse URL query parameters to auto-trigger enrollment dialogues.
  - **REQ-8:** The system shall block duplicate enrollments for students already registered in a course.
  - **REQ-9:** The system shall provide biometric FaceID authentication via live webcam viewfinder.

### 4.4 Feature 4: Classroom Group Image Staging & Multi-Angle Capture
- **4.4.1 Description & Priority:** Enables instructors to capture and stage multiple wide-angle classroom photographs before executing AI roll call. **Priority: High.**
- **4.4.2 Stimulus/Response Sequences:**
  - *Stimulus:* Teacher clicks "Add Classroom Snapshots" and selects Camera or Upload.
  - *Response:* System streams live webcam or accepts multi-file JPG/PNG uploads.
  - *Stimulus:* Teacher captures frames.
  - *Response:* Staged images render in a thumbnail gallery with individual deletion controls.
- **4.4.3 Functional Requirements:**
  - **REQ-10:** The system shall support live webcam frame acquisition and local file uploading.
  - **REQ-11:** The system shall maintain an in-memory staging gallery of multiple classroom angles.
  - **REQ-12:** The system shall permit instructors to remove individual snapshots or clear the gallery.

### 4.5 Feature 5: AI Biometric Facial Recognition Attendance Processing
- **4.5.1 Description & Priority:** Core computer vision engine that detects faces, extracts 128-D descriptors, and verifies student identities against enrolled rosters. **Priority: High.**
- **4.5.2 Stimulus/Response Sequences:**
  - *Stimulus:* Teacher clicks "Run AI Face Recognition".
  - *Response:* System passes staged images to Dlib pipeline, detects all faces, extracts 128-D embeddings, classifies candidates via Linear SVM, verifies Euclidean distance (threshold $\le 0.6$), and opens review modal with detection results.
- **4.5.3 Functional Requirements:**
  - **REQ-13:** The system shall detect human faces using Dlib HOG feature detectors upsampled by factor 1.
  - **REQ-14:** The system shall normalize facial poses using 68-point landmark shape prediction.
  - **REQ-15:** The system shall compute 128-dimensional biometric embeddings using pre-trained ResNet-34 models.
  - **REQ-16:** The system shall classify student identity using a Linear SVM and verify using Euclidean distance (distance $\le 0.60$).

### 4.6 Feature 6: Acoustic Voice Roll Call Verification
- **4.6.1 Description & Priority:** Provides multimodal acoustic speaker verification using deep voice embeddings from classroom audio responses. **Priority: Medium.**
- **4.6.2 Stimulus/Response Sequences:**
  - *Stimulus:* Teacher records oral roll-call audio and clicks "Analyze Audio & Mark Attendance".
  - *Response:* System resamples audio to 16 kHz, isolates speech via Librosa, extracts 256-D voice embeddings via Resemblyzer, matches speakers via cosine similarity (threshold $\ge 0.65$), and routes results to review modal.
- **4.6.3 Functional Requirements:**
  - **REQ-17:** The system shall capture classroom audio waveforms and display live canvas frequency bars.
  - **REQ-18:** The system shall extract 256-D speaker embeddings from speech segments using Resemblyzer LSTM.
  - **REQ-19:** The system shall identify speakers using dot-product cosine similarity with threshold $\ge 0.65$.

### 4.7 Feature 7: Attendance Review, Verification & Instructor Manual Override
- **4.7.1 Description & Priority:** Audit interface enabling instructors to verify AI detection sources and manually override false positives or false negatives before persistent database commitment. **Priority: High.**
- **4.7.2 Stimulus/Response Sequences:**
  - *Stimulus:* Instructor reviews detection table and clicks a student's status badge.
  - *Response:* Status flips between Present and Absent, with detection source updated to "Manual Override".
  - *Stimulus:* Instructor clicks "Confirm & Sync Session".
  - *Response:* System batch-inserts attendance logs, triggers celebration confetti, and closes modal.
- **4.7.3 Functional Requirements:**
  - **REQ-20:** The system shall render all enrolled students in a review table displaying detection source.
  - **REQ-21:** The system shall allow instructors to toggle Present/Absent status with immediate recalculation of attendance percentage.
  - **REQ-22:** The system shall batch-insert verified records with a unified ISO8601 session timestamp.

### 4.8 Feature 8: Historical Attendance Logbook & CSV Audit Export
- **4.8.1 Description & Priority:** Manages historical attendance sessions grouped by date and course, providing search filtering and downloadable CSV reports. **Priority: High.**
- **4.8.2 Stimulus/Response Sequences:**
  - *Stimulus:* Teacher enters search term or clicks "Export to CSV".
  - *Response:* System filters session rows in real-time or generates formatted `.csv` file download.
- **4.8.3 Functional Requirements:**
  - **REQ-23:** The system shall aggregate attendance logs by session timestamp and subject ID.
  - **REQ-24:** The system shall provide real-time search filtering across course codes, names, and session dates.
  - **REQ-25:** The system shall generate RFC 4180 compliant CSV exports for external university ERP ingestion.

### 4.9 Feature 9: Student Attendance Health Tracking & Dashboard Self-Service
- **4.9.1 Description & Priority:** Provides students with personalized dashboards displaying course rosters, attendance progress bars, health standing badges, and unenrollment controls. **Priority: Medium.**
- **4.9.2 Stimulus/Response Sequences:**
  - *Stimulus:* Authenticated student views dashboard.
  - *Response:* System calculates overall attendance percentage and renders Good Standing ($\ge 75\%$) or Low Attendance alert badges.
  - *Stimulus:* Student clicks "Unenroll from Course" and confirms browser dialogue.
  - *Response:* System removes enrollment record and updates dashboard.
- **4.9.3 Functional Requirements:**
  - **REQ-26:** The system shall compute real-time course attendance percentages (Attended Classes / Total Classes).
  - **REQ-27:** The system shall display Good Standing badges for attendance $\ge 75\%$ and warning alerts for attendance $< 75\%$.
  - **REQ-28:** The system shall permit authenticated students to unenroll from courses with confirmation safeguards.

---

## 5. Nonfunctional Requirements

### 5.1 Performance Requirements
- **Facial Inference Latency:** Face detection, landmark alignment, and 128-D embedding extraction shall process in under 2.0 seconds for classroom images containing up to 60 student faces on standard multi-core CPUs.
- **UI Frame Rendering:** The client user interface, webcam viewfinder, and Web Audio API canvas visualizer shall maintain a smooth rendering performance of 60 frames per second (FPS) without UI thread blocking.
- **Client Application Bundle:** The production build generated by Vite shall maintain an initial bundle size under 350 KB gzipped to ensure rapid page load times (< 1.5s) over standard campus Wi-Fi networks.

### 5.2 Safety Requirements
- **Transactional Atomicity:** Attendance session batch inserts shall execute as atomic database transactions; in the event of network disruption during commit, partial records shall roll back to prevent corrupted roll-call ledgers.
- **Memory Safety & Resource Disposal:** Hardware video and audio streams (`MediaStream`) must be explicitly released via `track.stop()` upon component unmount to prevent camera lockouts and memory leaks.

### 5.3 Security Requirements
- **Password Hashing:** All user passwords must be salted and hashed using Bcrypt (`gensalt()` with default cost factor). Plaintext passwords must never be logged or stored in database tables.
- **SQL Injection & XSS Immunity:** Database operations must utilize parameterized PostgREST interfaces provided by the Supabase SDK. React JSX auto-escaping shall neutralize cross-site scripting (XSS) vectors.
- **Biometric Privacy Governance:** Raw classroom photographs must be processed in memory and discarded immediately following verification. Database tables shall store exclusively mathematical vector embeddings and attendance booleans, satisfying institutional biometric privacy standards.

### 5.4 Software Quality Attributes
- **Availability:** The platform shall ensure 99.5% operational uptime during standard academic instructional hours (08:00 to 18:00 IST), supported by cloud database replication.
- **Reliability & Fault Tolerance:** The application is wrapped in a top-level React `<ErrorBoundary>`, catching unexpected runtime exceptions and providing a safe 'Reset & Reload' recovery mechanism.
- **Portability:** The frontend application shall execute identically across modern evergreen browsers without requiring platform-specific plugins, extensions, or native client installations.
- **Usability:** The interface adheres to modern institutional SaaS ergonomics, providing high-contrast text, clear typography (Plus Jakarta Sans, JetBrains Mono), responsive layouts, and immediate visual feedback (toasts, loading spinners, and confetti).

---

## 6. Project Plan

### 6.1 Team Members
The project is executed by a dedicated team of three final-year undergraduate engineering students from the Department of Computer Science & Engineering, Medi-Caps University:
1. **Ishika Khandelwal** (Enrollment No: `<University Roll No>`)
2. **Jayesh Parmar** (Enrollment No: `<University Roll No>`)
3. **Manasvi Septa** (Enrollment No: `<University Roll No>`)

### 6.2 Division of Work

| Team Member | Primary Project Role | Assigned Engineering Modules |
| :--- | :--- | :--- |
| **Ishika Khandelwal** | Frontend Architect & UI/UX Engineer | React 19 SPA, Tailwind CSS v4 design, WebCamCapture HUD, AudioRecorder canvas visualizer, modals & responsive views. |
| **Jayesh Parmar** | Backend Architect & Database Engineer | PostgreSQL schema design (3NF), Supabase client integration, LocalStorage service layer, Bcrypt authentication & CSV export. |
| **Manasvi Septa** | AI/ML & Computer Vision Engineer | Dlib HOG face detector, 68-point landmark alignment, ResNet-34 128-D embeddings, Linear SVM classifier & Resemblyzer voice pipeline. |

### 6.3 Time Schedule (Milestone Schedule)

| Phase | Milestone Description | Duration | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Requirement gathering, literature survey & synopsis authoring | Weeks 1 - 3 | Completed |
| **Phase 2** | Relational database schema design (3NF) & Supabase setup | Weeks 4 - 6 | Completed |
| **Phase 3** | Implementation of Dlib face recognition & voice pipelines | Weeks 7 - 10 | Completed |
| **Phase 4** | React 19 frontend development, webcam integration & UI modals | Weeks 11 - 13 | Completed |
| **Phase 5** | System integration, error boundaries & end-to-end testing | Weeks 14 - 15 | Completed |
| **Phase 6** | SRS documentation, academic report writing & viva preparation | Week 16 | In Progress |

---

## Appendix A: Glossary

| Term / Acronym | Definition & Contextual Meaning in SnapClass |
| :--- | :--- |
| **Biometric Embedding** | A compact 128-dimensional dense vector of floating-point numbers output by the ResNet-34 deep network, encoding unique geometrical facial traits. |
| **Dlib** | A high-performance C++ scientific toolkit providing pre-trained HOG face detectors, 68-point facial landmark predictors, and ResNet face recognition models. |
| **Euclidean Distance** | The straight-line metric distance ($L_2$ norm) calculated between two 128-D embedding vectors: $d = \sqrt{\sum(x_i - y_i)^2}$. |
| **HOG** | Histogram of Oriented Gradients; a computer vision feature extraction method counting occurrences of gradient orientation in localized image portions. |
| **PostgREST** | A standalone web server that automatically translates a PostgreSQL database schema directly into a secure RESTful API. |
| **Resemblyzer** | A deep learning acoustic toolkit utilizing a 3-layer LSTM to extract 256-dimensional speaker embeddings from audio waveforms. |
| **ResNet-34** | A 34-layer Residual Neural Network architecture utilizing skip connections to extract high-level visual facial descriptors without vanishing gradients. |
| **SPA** | Single Page Application; a web application that interacts with the user by dynamically rewriting the current web page rather than loading entire new pages from a server. |
| **SVM** | Support Vector Machine; a supervised learning algorithm that constructs hyperplanes in multi-dimensional space to categorize data points into classes. |
| **3NF** | Third Normal Form; a relational database standard requiring 1NF, 2NF, and no transitive functional dependencies of non-key attributes on primary keys. |

---

## Appendix B: To Be Determined (TBD) List

| Item No. | Open Requirement / Topic | Target Milestone for Resolution |
| :--- | :--- | :--- |
| **TBD-1** | Integration with university LDAP / Single Sign-On (SSO) directory. | Future institutional enterprise phase. |
| **TBD-2** | Automated SMS / Email notification delivery for students with low attendance. | Project-2 implementation phase. |
| **TBD-3** | Active 3D liveness detection (blink & head motion challenge-response). | Project-2 security enhancement phase. |
