# AI-BASED INTELLIGENT ATTENDANCE SYSTEM USING FACIAL RECOGNITION (SNAPCLASS)

**A Project Synopsis for Bachelor of Technology in Computer Science & Engineering**  
**Department of Computer Science & Engineering, Faculty of Engineering**  
**Medi-Caps University, Indore - 453331**  
**Academic Year 2026**

---

### Submitted By:
- **Ishika Khandelwal** (Enrollment No: `<University Roll No>`)
- **Jayesh Parmar** (Enrollment No: `<University Roll No>`)
- **Manasvi Septa** (Enrollment No: `<University Roll No>`)

### Under the Guidance of:
**<Name of the Project Guide>**  
Assistant Professor / Associate Professor  
Department of Computer Science & Engineering

---

## 1. Project Title
- **Full Project Title:** AI-Based Intelligent Attendance System Using Facial Recognition
- **System Acronym & Working Designator:** SnapClass (Smart Attendance Platform)

The project title encapsulates an enterprise-grade, privacy-preserving automated attendance tracking platform specifically designed for tertiary educational institutions, universities, and polytechnic institutes. The system synergistically combines cutting-edge deep metric computer vision algorithms, acoustic speaker recognition, and reactive cloud-native web engineering to replace obsolete, paper-based manual roll calls with an instantaneous, multi-student biometric audit ledger.

---

## 2. Introduction
In contemporary higher education institutions, student attendance tracking represents an indispensable administrative, regulatory, and pedagogical process. Cumulative attendance metrics are directly correlated with academic accountability, continuous internal assessment (CIA) grading, institutional accreditation (such as NAAC and NBA), and student retention analytics. Despite massive technological transformations in digital classroom pedagogies—such as smart interactive whiteboards, cloud learning management systems (LMS), and hybrid classrooms—attendance administration continues to remain tethered to archaic, manual, and error-prone procedures.

Conventional methods typically rely on verbal roll calls from paper registers or circulating physical sign-in sheets. In typical college lecture sections accommodating 60 to 120 students, manual call-outs squander between 10 and 15 minutes of dedicated instructional time per class hour. Extrapolated across an entire semester comprising hundreds of lecture sessions, this inefficiency results in substantial erosion of active syllabus delivery and faculty productivity. Furthermore, sign-in sheets suffer from rampant proxy marking, colloquially termed "buddy punching", wherein students record presence on behalf of absent peers.

While several contemporary electronic alternatives have been introduced—including Radio Frequency Identification (RFID) smart cards and optical biometric fingerprint scanners—they introduce severe operational friction. RFID cards lack biometric validation and are frequently loaned to classmates, completely subverting institutional presence verification. Fingerprint terminals require single-file queues, creating physical bottlenecks at lecture hall doorways, introducing hygiene concerns in post-pandemic environments, and delaying the scheduled commencement of classes.

To definitively eliminate these compounding bottlenecks, this project, entitled **"AI-Based Intelligent Attendance System Using Facial Recognition"** (**SnapClass**), proposes an intelligent, non-intrusive, and multimodal automated attendance infrastructure. By capturing one or more wide-angle classroom photographs using standard webcams or mobile devices, SnapClass executes automated multi-face localization, landmark geometric alignment, and deep metric feature extraction using an optimized 29-layer ResNet-34 deep convolutional neural network. Visual features are mapped into 128-dimensional unit hypersphere vectors and verified against registered student profiles via a high-speed Linear Support Vector Classifier (SVC) and strict Euclidean distance validation. Additionally, SnapClass incorporates an acoustic roll-call pipeline utilizing 256-dimensional Long Short-Term Memory (LSTM) speaker embeddings for multimodal redundancy, delivering an automated, tamper-proof, and seamless attendance management ecosystem.

---

## 3. Problem Statement
The administration of student attendance across colleges and universities is plagued by fundamental structural, operational, and technical shortcomings that undermine instructional productivity and data integrity:

1. **Severe Instructional Latency:** Conducting manual oral roll calls in lecture halls containing 60 to 120 students consumes between 15% and 25% of total scheduled instructional duration, eroding academic timelines and syllabus coverage.
2. **Rampant Proxy Attendance & Buddy Punching:** Paper signature sheets and portable electronic tokens (RFID smart cards) fail to enforce physical biometric binding, allowing absent students to be marked present by confederates.
3. **Physical Bottlenecks & Operational Delays:** Standalone biometric hardware (such as optical fingerprint scanners or single-user facial kiosks) requires sequential, one-by-one verification, creating long physical queues and door congestion at class transition intervals.
4. **Administrative Overhead & Transcription Errors:** Paper records necessitate manual clerical transcription into university Enterprise Resource Planning (ERP) databases, introducing human errors, misplaced rosters, and delayed deficiency reporting.
5. **Opaque Student Visibility:** Students lack real-time transparency regarding their cumulative attendance percentages and deficiency warnings, frequently learning of exam disqualifications only at the end of the semester.

---

## 4. Motivation and Need for the Project
The motivation behind SnapClass stems from the urgent necessity to digitize, modernize, and safeguard the educational environment through artificial intelligence, driven by the following core imperatives:

- **Instructional Time Reclamation:** By replacing 10-15 minute manual call-outs with a rapid 5-second photographic scan, instructors can reclaim up to 40 hours of valuable instructional time per academic department each semester.
- **Biometric Integrity & Tamper Prevention:** Deep metric facial recognition ensures authentic physical presence that cannot be forged, delegated, or duplicated, thereby restoring accountability to institutional attendance records.
- **Zero-Friction, Non-Intrusive Workflow:** Wide-angle classroom snapshot capture enables simultaneous, parallel recognition of dozens of students without requiring them to queue up, touch physical hardware, or disrupt instructional focus.
- **Multimodal Acoustic Redundancy:** In scenarios where students may experience optical occlusions (e.g., seated behind tall peers, medical face masks, or adverse glare), acoustic voice roll-call verification provides an immediate secondary biometric pathway.
- **Biometric Privacy Governance by Design:** Addressing contemporary surveillance and privacy concerns, the system enforces in-memory processing where raw photographs are permanently discarded immediately following inference, persisting only mathematical floating-point feature vectors.
- **Real-Time Student Empowerment:** Empowering students with an interactive self-service dashboard to monitor their cumulative attendance percentages, inspect attendance health meters, and self-enroll in courses via dynamic vector QR codes.

---

## 5. Project Objectives
The overarching objective of the SnapClass platform is to design, implement, and validate an end-to-end, privacy-compliant intelligent attendance tracking system. The specific functional and technical objectives are:

- **Objective 1: Multi-Face Photographic Acquisition** — Develop an intuitive web interface utilizing HTML5 MediaDevices API to capture wide-angle classroom snapshots from standard HD webcams and mobile cameras without specialized hardware.
- **Objective 2: Facial Localization & 68-Point Landmark Alignment** — Implement Dlib's Histogram of Oriented Gradients (HOG) detector combined with a 68-point facial landmark shape predictor to locate faces and geometrically normalize pose, pitch, and roll angles.
- **Objective 3: Deep Metric 128-Dimensional Embedding Extraction** — Extract compact, invariant 128-dimensional facial descriptors using an optimized pre-trained 29-layer ResNet-34 deep convolutional neural network trained on millions of facial crops.
- **Objective 4: Two-Tier Hybrid Identification Engine** — Engineer a hybrid classifier combining a balanced Linear Support Vector Classifier (SVC) for rapid candidate retrieval with Euclidean distance ($L_2$ norm) thresholding ($\le 0.60$) for biometric identity confirmation.
- **Objective 5: Multimodal Acoustic Voice Verification** — Integrate a secondary voice roll-call verification module utilizing 256-dimensional Generalized End-to-End (GE2E) Long Short-Term Memory (LSTM) voice embeddings and cosine similarity ($\ge 0.65$).
- **Objective 6: Faculty Oversight & Manual Override Audit Modal** — Provide instructors with an interactive roster review modal displaying detected student confidence scores, present/absent toggles, and manual override tracking prior to transactional database commit.
- **Objective 7: Cloud-Native Relational Persistence & CSV Audit Export** — Persist attendance sessions in a 3NF normalized PostgreSQL database hosted on Supabase, complemented by W3C LocalStorage offline fallback and 1-click comma-separated values (CSV) gradebook export.
- **Objective 8: Dynamic Student QR Auto-Enrollment & Portal** — Provide dynamic SVG QR codes and deep links (`?join-code=...`) for frictionless student course enrollment, paired with an individual attendance tracking portal.

---

## 6. Literature Review
The technological evolution of automated human identification using visual biometrics spans four decades, progressing from classical linear statistical approximations to modern deep metric convolutional neural architectures:

Early computational approaches relied on linear subspace projections. Turk and Pentland [1] introduced the seminal Eigenfaces framework utilizing Principal Component Analysis (PCA) to represent face images as linear combinations of orthogonal eigenvectors. Although computationally efficient, Eigenfaces proved hypersensitive to variations in ambient illumination, facial expressions, and out-of-plane head rotations. Belhumeur et al. [2] proposed Fisherfaces based on Linear Discriminant Analysis (LDA), which maximized between-class scatter while minimizing within-class scatter. While Fisherfaces offered greater robustness to illumination gradients, they suffered catastrophic degradation when handling partial facial occlusions and arbitrary head orientations.

In 2001, Viola and Jones [3] achieved a major breakthrough in real-time face detection by introducing Haar-like rectangular feature cascades evaluated via Integral Images and AdaBoost classifiers. However, Haar Cascades exhibited unacceptable false-positive rates under non-uniform illumination and struggled with off-angle poses. Dalal and Triggs [4] addressed these limitations through Histograms of Oriented Gradients (HOG) coupled with Support Vector Machines (SVM). HOG captures local edge and gradient orientation distributions, offering high invariance to photometric lighting shifts and subtle geometric facial deformations.

The paradigm of computer vision biometrics was revolutionized by Deep Convolutional Neural Networks (CNNs). Taigman et al. [5] introduced DeepFace, demonstrating that 9-layer CNNs trained on large-scale datasets achieved near-human accuracy (97.35%) on unconstrained face verification. Schroff et al. [5] pioneered FaceNet, introducing the Triplet Loss objective function to directly map face images into a 128-dimensional Euclidean space where squared $L_2$ distances directly correspond to facial dissimilarity. He et al. [6] introduced Deep Residual Learning (ResNet), utilizing residual shortcut skip connections to train ultra-deep networks without vanishing gradients. Davis King [6] adapted this architecture into an optimized 29-layer ResNet-34 inside the Dlib toolkit, achieving an empirical accuracy of 99.38% on the Labeled Faces in the Wild (LFW) benchmark.

In acoustic biometric processing, Wan et al. [7] formulated the Generalized End-to-End (GE2E) loss architecture for speaker verification, operationalized in the Resemblyzer framework. This deep LSTM network compresses variable-length speech waveforms into compact 256-dimensional speaker embeddings, enabling robust text-independent voice verification.

### Comparative Summary of Facial Biometric Methodologies

| Methodology | Key Algorithms | Feature Representation | Accuracy (LFW) | Classroom Suitability |
| :--- | :--- | :--- | :--- | :--- |
| **Eigenfaces (1991) [1]** | PCA, Covariance Matrix | Statistical Eigenvectors | ~75.0% | Unsuitable (High lighting sensitivity) |
| **Fisherfaces (1997) [2]** | LDA, Class Scatter | Fisher Projection Vectors | ~82.5% | Poor (Fails on unconstrained poses) |
| **Haar Cascades (2001) [3]**| AdaBoost, Integral Images | Haar-like rectangular features | ~86.0% | Moderate (High false-positive rate) |
| **HOG + SVM (2005) [4]** | Histogram of Gradients | Gradient Orientation Vectors | ~92.0% | Good (Robust for face detection) |
| **Deep Metric ResNet-34 [6]**| Residual CNN, Triplet Loss | 128-D Unit Hypersphere Vectors | **99.38%** | **Optimal (Invariant to pose, lighting & scale)** |

---

## 7. Existing System
Collegiate and university institutions currently employ one or more of four prevailing attendance administration models:
1. **Manual Paper Register Call-Out:** The instructor reads student names sequentially from a paper roll-call ledger, verbally marking 'P' (Present) or 'A' (Absent) adjacent to each student's name.
2. **Circulating Signature Rosters:** A paper sheet containing student names and enrollment numbers is circulated through lecture hall rows, allowing students to manually sign beside their respective names during lecture delivery.
3. **RFID Smart Card Tap Systems:** Electronic RFID proximity readers mounted at classroom entrances allow students to tap their institutional radio-frequency identity cards upon entering.
4. **Standalone Optical Biometric Hardware:** Dedicated wall-mounted fingerprint scanners or single-user biometric kiosk turnstiles stationed at departmental entrance doors.

---

## 8. Limitations of Existing System
Each of the existing attendance tracking approaches is characterized by critical operational, security, and administrative limitations:
- **Massive Time Wastage:** Manual roll calls squander 10-15 minutes of every lecture hour. For a course meeting 45 times a semester, over 9 hours of instructional time are completely lost to clerical accounting.
- **Vulnerability to Fraud & Proxy Attendance:** Circulating sheets encourage rampant buddy punching where attendees sign for absent friends. Similarly, RFID cards can easily be given to peers to tap, completely lacking biometric authentication.
- **Physical Congestion & Doorway Bottlenecks:** Optical fingerprint scanners and single-user kiosks force 60-100 students into single-file queues, causing severe hallway congestion and class commencement delays.
- **Hardware Maintenance & High Capital Expense:** Specialized biometric terminals require expensive proprietary hardware, ongoing sensory recalibration, wiring infrastructure, and physical repairs.
- **Hygiene & Disease Transmission Risks:** Physical touch-based fingerprint readers raise significant public hygiene concerns in post-pandemic institutional settings where hundreds of students press against identical optical glass platen.
- **Delayed Institutional Reporting & Disconnect:** Paper logs must be manually digitized into institutional ERP software at month-end, introducing human data entry errors and delaying student deficiency notifications.

---

## 9. Proposed System (SnapClass)
To overcome the compounding failures of traditional and first-generation electronic systems, this project presents **SnapClass**: an intelligent, zero-contact, multimodal attendance and classroom management platform built upon modern artificial intelligence, high-performance web standards, and secure cloud persistence:

- **Non-Intrusive Multi-Face Capture:** The instructor simply captures wide-angle snapshots of the classroom using any connected standard webcam, laptop camera, or mobile device. Multiple camera angles can be staged simultaneously to ensure 100% visual coverage of large lecture halls.
- **Automated Multi-Student Identification:** Within seconds, the Dlib ResNet-34 deep metric pipeline detects, aligns, and identifies all enrolled students appearing in the photographic frames simultaneously.
- **Secondary Acoustic Voice Roll-Call:** For students partially occluded or seated beyond optical range, an auxiliary voice verification module enables rapid spoken responses to be verified via 256-D LSTM voice embeddings.
- **Instructor Verification & Override Interface:** Results are displayed in a clean visual roster featuring confidence indicators, detected image thumbnails, and one-click manual override toggles (Present/Absent) to prevent false negatives.
- **Cloud-Native Relational Ledger:** Session logs are committed atomically to a normalized PostgreSQL database hosted on Supabase, complete with instant CSV audit exports for direct import into university ERP software.
- **Self-Service Student Ecosystem:** Students enjoy a dedicated portal equipped with real-time attendance score meters, good standing badges, FaceID profile registration, and 1-click course enrollment via dynamic QR codes.

---

## 10. Scope of the Project
The operational, functional, and organizational boundaries of the SnapClass project encompass the following dimensions:
- **Functional Scope:** Encompasses classroom multi-face visual roll call, acoustic voice roll call, instructor course and session lifecycle management, dynamic QR code course sharing, student self-service dashboards, and automated CSV gradebook reporting.
- **Technical Scope:** Covers a decoupled, cloud-enabled web platform utilizing React 19, TypeScript, and Tailwind CSS on the frontend; Dlib, Scikit-Learn, and Resemblyzer on the AI inference tier; and PostgreSQL (Supabase) with LocalStorage offline fallback on the data tier.
- **Deployment Scope:** Engineered for higher education environments including college lecture halls, tutorial rooms, research laboratories, and university auditorium sessions.
- **System Boundaries & Assumptions:** Requires standard indoor lecture hall illumination (>200 lux) and modern browser connectivity. Extreme facial occlusions exceeding 70% (e.g., heavy winter garments covering eyes and nose) are mitigated through instructor override or acoustic voice backup.

---

## 11. Proposed Methodology
The technical execution methodology of SnapClass is structured into five cohesive algorithmic phases, transitioning from raw sensory ingestion to verified database commit:

### Phase 1: Classroom Imagery Acquisition & Geometric Pose Normalization
The instructor accesses the "Take Attendance" module in the React 19 web application. Classroom frames are captured via HTML5 MediaDevices API (`navigator.mediaDevices.getUserMedia`) or uploaded as high-resolution image files. Captured frames are converted into in-memory NumPy tensors. Dlib's frontal face detector (`dlib.get_frontal_face_detector()`), operating with Histograms of Oriented Gradients (HOG) upsampled by a factor of 1, identifies all student facial bounding boxes. Dlib's 68-point landmark shape predictor (`dlib.shape_predictor`) then identifies structural coordinates across eyes, nose bridge, lips, and chin, computing an affine transformation matrix that normalizes pitch, roll, and yaw tilts into centered 150x150 pixel crops.

### Phase 2: Deep Metric Visual & Acoustic Feature Extraction
Normalized facial crops are passed into Dlib's deep face recognition model (`dlib.face_recognition_model_v1`), structured as a 29-layer ResNet-34 deep neural network. The model projects facial traits onto a 128-dimensional dense floating-point vector space: $\mathbf{v}_{face} \in \mathbb{R}^{128}$, constrained to a unit hypersphere ($\|\mathbf{v}_{face}\|_2 = 1$). In acoustic verification mode, classroom audio captured via the browser Web Audio API is resampled to 16 kHz using Librosa. Non-silent speech segments are isolated using top-dB energy splitting (`librosa.effects.split(audio, top_db=30)`). Resemblyzer's pre-trained 3-layer LSTM VoiceEncoder transforms the speech waveforms into 256-dimensional speaker embeddings: $\mathbf{v}_{voice} \in \mathbb{R}^{256}$.

### Phase 3: Hybrid Two-Tier Classification & Metric Distance Thresholding
Student identification employs a high-precision two-tier verification strategy:
1. **Candidate Prediction:** A supervised Support Vector Classifier (`sklearn.svm.SVC`) with a linear kernel and balanced class weights is dynamically fitted over the enrolled baseline vectors of students registered in the subject:
   $$\text{predicted\_id} = \text{clf.predict}([\mathbf{v}_{face}])[0]$$
2. **Metric Distance Thresholding:** To prevent intruder misclassification or out-of-class imposters, the Euclidean distance ($L_2$ norm) between the candidate's registered baseline embedding $\mathbf{e}_{reg}$ and the query embedding $\mathbf{v}_{face}$ is computed:
   $$d = \|\mathbf{e}_{reg} - \mathbf{v}_{face}\|_2 = \sqrt{\sum_{i=1}^{128} (e_i - v_i)^2}$$
3. The system enforces an empirical threshold $\tau_{face} = 0.60$. If $d \le 0.60$, the identity match is verified and the student is marked Present. If $d > 0.60$, the candidate prediction is rejected as an intruder. For acoustic verification, cosine similarity is evaluated with an acceptance threshold $\tau_{voice} \ge 0.65$.

### Phase 4: Faculty Roster Review & Manual Override Audit
Classification outputs are returned to the React frontend, populating the interactive `AttendanceResultModal`. The instructor is presented with a complete roster table displaying student avatars, names, enrollment IDs, detected confidence sources (e.g., "Photo #1 (Confidence: 98.4%)"), and match status. Instructors retain ultimate editorial authority to toggle any student's status between Present and Absent with full audit logging, preventing edge-case false rejections.

### Phase 5: Transactional Batch Persistence & Institutional Gradebook Sync
Upon instructor confirmation, the client formats an array of log records containing student IDs, subject ID, a unified ISO 8601 session timestamp (`timestamp = new Date().toISOString()`), and attendance booleans. These are atomically committed into the PostgreSQL database. Instructors can immediately inspect historical session records and generate 1-click CSV files ready for university ERP upload.

### Pipeline Execution Stages Architecture Table

| Pipeline Stage | Primary Module | Inputs & Core Algorithms | Output Artifacts |
| :--- | :--- | :--- | :--- |
| **1. Acquisition** | `WebCamCapture.tsx` | HTML5 Video stream, canvas rasterization | Classroom Image Buffers (Base64) |
| **2. Alignment** | `face_pipeline.py` | Dlib HOG Detector, 68-Point Shape Predictor | Normalized Face Crops (150x150) |
| **3. Embedding** | `face_pipeline.py` | Dlib ResNet-34 Deep CNN (Triplet Loss) | 128-D Unit Hypersphere Vectors |
| **4. Verification** | `face_pipeline.py` | Linear SVM + Euclidean Distance ($\le 0.60$) | Matched Student Identification |
| **5. Persistence** | `storage.ts` / `db.py` | Instructor Override Table, Supabase PostgREST | 3NF Attendance Session Logs & CSV |

---

## 12. System Architecture / Block Diagram
SnapClass is architected across a decoupled three-tier system architecture engineered for maximum modularity, fault tolerance, and responsive user experience:
1. **Client Presentation Tier (Frontend UI):** Built using React 19, TypeScript, and Tailwind CSS v4. Manages the responsive user interface, camera viewfinder HUD with face alignment reticles, Web Audio API frequency waveform visualizer, course cards, and attendance modals.
2. **AI / Biometric Inference Engine:** Executes computer vision and deep learning tasks in Python 3.11. Coordinates Dlib's HOG face detection, 68-point facial landmark pose alignment, 29-layer ResNet-34 128-D descriptor generation, Linear Support Vector Classification, and Resemblyzer 256-D LSTM acoustic processing.
3. **Data Persistence & Cloud Storage Tier:** Powered by a Third Normal Form (3NF) relational PostgreSQL database hosted on Supabase Cloud, exposed via secure PostgREST APIs and Bcrypt password authentication, paired with an offline LocalStorage synchronization layer.

### System Architecture Block Diagram

```
+-----------------------------------------------------------------------------------+
|                             SNAPCLASS CLIENT TIER                                 |
|  +-----------------------------+         +-------------------------------------+  |
|  |   Teacher Portal (React 19) |         |     Student Portal (React 19)       |  |
|  | - WebCamCapture HUD (60 FPS)|         | - Biometric FaceID Login            |  |
|  | - Multi-Photo Upload Gallery|         | - Audio Visualizer Enrollment       |  |
|  | - Attendance Review Modal   |         | - Real-Time Attendance Health Meter |  |
|  | - Manage Subjects & QR Code |         | - Dynamic QR Course Auto-Enrollment |  |
|  +--------------+--------------+         +------------------+------------------+  |
+-----------------|-------------------------------------------|---------------------+
                  | Base64 Image Frames / Audio Waveforms      | Auth & Queries
                  v                                           v
+-----------------------------------------------------------------------------------+
|                          AI & BIOMETRIC INFERENCE ENGINE                          |
|  +-----------------------------------------------------------------------------+  |
|  | Facial Biometrics: Dlib HOG Detector -> 68-Point Landmark Alignment         |  |
|  | -> ResNet-34 128-D Embedding -> Linear SVC + Euclidean Threshold (<= 0.60) |  |
|  +-----------------------------------------------------------------------------+  |
|  | Acoustic Biometrics: Web Audio API -> Librosa Top-dB Segmentation           |  |
|  | -> Resemblyzer 256-D LSTM Voice Encoder -> Cosine Similarity (>= 0.65)      |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------+-----------------------------------------+
                                          | Structured Identifications & Verification
                                          v
+-----------------------------------------------------------------------------------+
|                         PERSISTENCE & CLOUD STORAGE TIER                          |
|  +-----------------------------------------------------------------------------+  |
|  | Supabase Cloud PostgreSQL (3NF Schema):                                     |  |
|  | [teachers] <--- [subjects] <--- [subject_students] ---> [students]          |  |
|  |                      |                                      |               |  |
|  |                      +------------> [attendance_logs] <-----+               |  |
|  +-----------------------------------------------------------------------------+  |
|  | LocalStorage Service Layer (Offline Fallback) & Instant CSV Gradebook Export|  |
+-----------------------------------------------------------------------------------+
```

---

## 13. Technology Stack (Languages, Frameworks, Tools)

| Layer / Domain | Technology / Framework | Version / Tool | Specific Role in SnapClass |
| :--- | :--- | :--- | :--- |
| **Frontend UI** | React (Single Page Application) | 19.0.0 | Reactive user interface and state management. |
| **Frontend Language** | TypeScript | 5.8.0 | Type-safe interface contracts and models. |
| **Styling & CSS** | Tailwind CSS | v4.0.9 | Neo-brutalist styling, layout, and responsive UI. |
| **Build System** | Vite | 6.2.0 | Lightning-fast HMR and optimized production bundling. |
| **Icons & Visuals** | Lucide React, Canvas Confetti | Latest | Vector iconography and celebration animations. |
| **QR Code Engine** | qrcode.react | 4.2.0 | Dynamic vector SVG course enrollment QR codes. |
| **AI & Computer Vision** | Dlib C++ Toolkit (Python) | 19.24.2 | HOG face detection, 68-point shape alignment, ResNet-34. |
| **Machine Learning** | Scikit-Learn | 1.4.0+ | Linear Support Vector Classification (SVC). |
| **Audio Processing** | Librosa, Resemblyzer | 0.10.1 / Latest | Speech segmentation & 256-D LSTM voice embeddings. |
| **Database Tier** | PostgreSQL / Supabase | 15.0+ | Normalized 3NF relational data store and PostgREST. |
| **Security & Crypto** | Bcrypt | 4.0.1+ | Salted password hashing for faculty authentication. |
| **Hardware APIs** | HTML5 MediaDevices & Web Audio | W3C Standards | Real-time webcam video and audio stream capture. |

---

## 14. Expected Outcomes
The successful implementation and deployment of SnapClass delivers several tangible, quantifiable, and transformative operational outcomes:
- **95% Reduction in Roll-Call Duration:** Decreasing classroom attendance logging time from 10-15 minutes to under 5 seconds per lecture, reclaiming up to 40 hours of instructional time per department each semester.
- **Elimination of Proxy Attendance:** Achieving 0% buddy punching and proxy marking through deep metric biometric face verification and secondary acoustic confirmation.
- **High Accuracy Under Real Classroom Conditions:** Attaining over 98.5% recognition accuracy on enrolled student cohorts under standard lecture hall lighting and varied head orientations.
- **Complete Faculty Editorial Control:** Providing instructors with 100% auditable manual override authority, ensuring zero false-negative attendance penalties for students.
- **Transparent Student Health Tracking:** Empowering students with immediate, real-time access to their attendance percentages, good standing badges, and shortfall warnings.
- **Instantaneous Institutional ERP Integration:** Generating standardized 1-click CSV audit logs ready for direct ingestion into college ERP and student information databases.

---

## 15. Project Timeline and Milestones

| Phase | Milestone / Work Package | Time Duration | Key Deliverables | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Phase 1** | Literature Review & Feasibility Study | Weeks 1 - 3 | Synopsis, SRS Draft, Problem Definition | Completed |
| **Phase 2** | Schema Architecture & Cloud Setup | Weeks 4 - 6 | 3NF PostgreSQL Tables, Supabase Auth | Completed |
| **Phase 3** | AI Pipeline & Embedding Engine | Weeks 7 - 10 | ResNet-34 Face Pipeline, Voice Module | Completed |
| **Phase 4** | Frontend Engineering & Webcam HUD | Weeks 11 - 13 | React 19 SPA, Modals, Audio Visualizer | Completed |
| **Phase 5** | System Integration & Rigorous Testing | Weeks 14 - 15 | End-to-End Testing, Accuracy Benchmarking | Completed |
| **Phase 6** | Final Documentation & Defense | Week 16 | Project Report, Final Presentation, Viva | In Progress |

---

## 16. Team Members' Roles and Responsibilities

| Team Member Name | Assigned Project Role | Primary Technical Modules | Specific Engineering Responsibilities |
| :--- | :--- | :--- | :--- |
| **Ishika Khandelwal** | Frontend Architect & UI/UX Engineer | React 19 SPA, Tailwind CSS v4, WebCamCapture HUD, AudioRecorder | Architected client SPA structure; developed responsive Neo-Brutalist design system; engineered WebCamCapture viewfinder HUD with alignment reticles; built HTML5 Canvas audio waveform visualizer; developed interactive review modals. |
| **Jayesh Parmar** | Backend Architect & Database Engineer | PostgreSQL (Supabase), PostgREST, Bcrypt, LocalStorage Sync, CSV | Designed 3NF normalized relational database schema; integrated Supabase PostgREST client; implemented Bcrypt salted authentication; built offline LocalStorage synchronization layer; implemented transactional batch commit and CSV export engine. |
| **Manasvi Septa** | AI/ML & Computer Vision Engineer | Dlib ResNet-34, 68-Point Landmark Predictor, Linear SVC, Resemblyzer | Implemented Dlib HOG face detector and 68-point landmark pose normalizer; integrated 29-layer ResNet-34 for 128-D metric embeddings; engineered hybrid Linear SVC and Euclidean thresholding algorithm; built Resemblyzer 256-D LSTM voice pipeline. |

### Detailed Individual Contributions

1. **Ishika Khandelwal (Frontend Architect & UI/UX Engineer):**
   - Engineered the modern Single Page Application (SPA) utilizing React 19 and TypeScript, ensuring strict component modularity, high performance, and rapid client-side routing.
   - Formulated the Neo-Brutalist visual design language using Tailwind CSS v4, creating distinct high-contrast card borders, tactile button offsets, and vibrant status badges.
   - Developed the real-time `WebCamCapture` HUD component incorporating a 60 FPS scanning laser bar animation, facial framing reticles, and multi-angle staging gallery.
   - Built the `AudioRecorder` module featuring a real-time frequency spectrum visualizer powered by HTML5 Canvas and the Web Audio API.
   - Engineered modal dialogues (`AttendanceResultModal`, `CreateSubjectModal`, `ShareSubjectModal`) with dynamic present/absent toggles and `canvas-confetti` animations.

2. **Jayesh Parmar (Backend Architect & Database Engineer):**
   - Designed the Third Normal Form (3NF) relational database schema spanning five core entities: `teachers`, `students`, `subjects`, `subject_students`, and `attendance_logs`.
   - Integrated Supabase cloud PostgreSQL with secure PostgREST endpoints, ensuring low-latency data access and relational integrity via foreign key cascades.
   - Implemented robust user security and credential protection utilizing Bcrypt salted password hashing, neutralizing unauthorized access risks.
   - Architected the dual-mode offline persistence layer (`storage.ts`), enabling seamless offline operation via W3C Web LocalStorage when cloud connectivity is unavailable.
   - Engineered the transactional attendance session batch-insertion routine and implemented the instant CSV gradebook export functionality.

3. **Manasvi Septa (AI/ML & Computer Vision Engineer):**
   - Developed the facial preprocessing pipeline using Dlib's HOG-based frontal face detector and 68-point facial landmark shape predictor to geometrically normalize facial pose tilts.
   - Integrated Dlib's pre-trained 29-layer ResNet-34 deep convolutional neural network to project visual facial traits onto a compact 128-dimensional unit hypersphere embedding space.
   - Formulated the two-tier classification strategy combining a balanced Linear Support Vector Classifier (SVC) for fast candidate prediction with Euclidean distance thresholding ($d \le 0.60$).
   - Constructed the secondary acoustic voice verification pipeline using Librosa audio segmentation and Resemblyzer's 3-layer LSTM VoiceEncoder for 256-dimensional speaker embeddings.
   - Conducted rigorous empirical accuracy benchmarks on unconstrained classroom photographs, evaluating false acceptance rates (FAR) and false rejection rates (FRR).

---

## 17. References / Research Papers

### Peer-Reviewed Journal Papers
- **[1]** Turk, M., & Pentland, A. (1991). “Eigenfaces for recognition”. *Journal of Cognitive Neuroscience*, 3(1), 71-86.
- **[2]** Belhumeur, P. N., Hespanha, J. P., & Kriegman, D. J. (1997). “Eigenfaces vs. Fisherfaces: Recognition using class specific linear projection”. *IEEE Transactions on Pattern Analysis and Machine Intelligence*, 19(7), 711-720.
- **[3]** King, D. E. (2009). “Dlib-ml: A Machine Learning Toolkit”. *Journal of Machine Learning Research*, 10, 1755-1758.
- **[4]** Wright, J., Yang, A. Y., Ganesh, A., Sastry, S. S., & Ma, Y. (2009). “Robust face recognition via sparse representation”. *IEEE Transactions on Pattern Analysis and Machine Intelligence*, 31(2), 210-227.

### International Conference Proceedings
- **[5]** Viola, P., & Jones, M. (2001). “Rapid object detection using a boosted cascade of simple features”. In *Proceedings of the 2001 IEEE Computer Society Conference on Computer Vision and Pattern Recognition (CVPR)* (Vol. 1, pp. 511-518).
- **[6]** Dalal, N., & Triggs, B. (2005). “Histograms of oriented gradients for human detection”. In *IEEE Computer Society Conference on Computer Vision and Pattern Recognition (CVPR)* (Vol. 1, pp. 886-893).
- **[7]** Taigman, Y., Yang, M., Ranzato, M. A., & Wolf, L. (2014). “DeepFace: Closing the gap to human-level performance in face verification”. In *IEEE Conference on Computer Vision and Pattern Recognition (CVPR)* (pp. 1701-1708).
- **[8]** Schroff, F., Kalenichenko, D., & Philbin, J. (2015). “FaceNet: A unified embedding for face recognition and clustering”. In *IEEE Conference on Computer Vision and Pattern Recognition (CVPR)* (pp. 815-823).
- **[9]** He, K., Zhang, X., Ren, S., & Sun, J. (2016). “Deep residual learning for image recognition”. In *IEEE Conference on Computer Vision and Pattern Recognition (CVPR)* (pp. 770-778).
- **[10]** Wan, L., Wang, Q., Papir, A., & Moreno, I. L. (2018). “Generalized end-to-end loss for speaker verification”. In *IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)* (pp. 4879-4883).

### Authoritative Books & Academic Treatises
- **[11]** Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*. MIT Press, Cambridge, MA, pp. 326-366.
- **[12]** Gonzalez, R. C., & Woods, R. E. (2018). *Digital Image Processing* (4th ed.). Pearson Education, New York, NY.

### Technical Specifications & Web Resources
- **[13]** Dlib C++ Scientific Machine Learning Toolkit Documentation, http://dlib.net/face_recognition.py.html, accessed on October 2026.
- **[14]** React 19 Official Documentation & Concurrent Architecture, https://react.dev/, accessed on October 2026.
- **[15]** Supabase PostgreSQL Relational Platform Documentation, https://supabase.com/docs, accessed on October 2026.
