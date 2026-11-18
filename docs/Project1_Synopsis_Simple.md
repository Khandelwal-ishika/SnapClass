# SMART ATTENDANCE SYSTEM USING FACE AND VOICE RECOGNITION (SNAPCLASS)

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
- **Project Title:** Smart Attendance System using Face and Voice Recognition
- **Project Name:** SnapClass

SnapClass is an easy-to-use, smart attendance system made for colleges and schools. It helps teachers take attendance in just a few seconds using two main artificial intelligence models: a **Face Recognition Model** and a **Voice Recognition Model**. It also provides a simple web app for teachers and students, eliminating paper registers and manual roll calls.

---

## 2. Introduction
Taking student attendance is a daily task in every college and university. It is important because universities require students to maintain a minimum attendance percentage (such as 75%) to be eligible for final exams.

In most classrooms today, teachers still take attendance manually. The teacher either calls out every student's name one by one from a register, or passes around a paper sheet where students sign their names. In a typical class of 60 to 100 students, calling out names takes 10 to 15 minutes of the lecture. In addition, students often sign for their absent friends, which is known as proxy attendance or buddy punching.

Some colleges have tried using RFID identity cards or fingerprint machines. But RFID cards can easily be given to a friend to swipe, and fingerprint scanners create long lines at the classroom door and have hygiene concerns.

To solve these problems in a simple way, this project introduces **SnapClass**. The teacher simply takes a photo of the classroom using a laptop webcam or mobile phone camera. The built-in **Face Recognition Model** detects all the student faces in the photo, compares them with registered student profiles, and automatically marks them present. If a student's face is partially hidden or blocked, the teacher can also use the **Voice Recognition Model**, where the student speaks into the microphone and their identity is verified. Everything is connected to a simple website and a database, saving time and completely preventing fake attendance.

---

## 3. Problem Statement
The existing methods of taking attendance have four major problems:
1. **Time Wastage:** Calling out roll numbers of 60 to 100 students wastes 10 to 15 minutes in every lecture, reducing actual teaching time.
2. **Proxy Attendance:** Students frequently mark attendance for absent friends on paper sign-in sheets or swipe friends' RFID cards.
3. **Long Queues at Doorways:** Fingerprint scanners and kiosk machines require students to queue up one by one, causing delays and crowd congestion at the classroom door.
4. **Manual Entry Errors:** Teachers have to manually type paper attendance sheets into the college portal at the end of the month, which is slow and prone to errors.
5. **Lack of Student Awareness:** Students cannot easily see their daily attendance percentage and only find out they have low attendance at the end of the semester.

---

## 4. Motivation and Need for the Project
The main reasons for creating this project are:
- **Save Classroom Teaching Time:** Taking attendance with a camera photo takes only 5 seconds, giving teachers more time to teach.
- **Completely Stop Proxy Attendance:** A person's face and voice cannot be copied or shared. This makes attendance 100% honest and accurate.
- **Zero Contact & No Hardware Queues:** Students sit comfortably in their seats while the photo is taken. No one has to stand in line or touch a scanner.
- **Two AI Models for High Reliability:** Using both Face Recognition and Voice Recognition ensures that if a student is sitting far away or behind someone, they can still be verified by voice.
- **Student Self-Service Portal:** Students can log in anytime to see their attendance percentage and get automatic warnings if their attendance drops below the required 75%.

---

## 5. Project Objectives
The main goals of this project are:
1. **Multi-Face Detection:** Capture a photo of the entire classroom and detect multiple student faces at the same time using a standard webcam.
2. **Face Recognition:** Compare the detected faces with registered student photos in the database and automatically identify who is present.
3. **Voice Recognition:** Allow students to mark attendance by speaking into a microphone, using a voice recognition model that matches their voice sample.
4. **Easy Teacher Dashboard:** Provide teachers with a simple web screen to take attendance, view recognized students, change Present/Absent status if needed, and download the report.
5. **Simple Student Portal:** Allow students to view their attendance score, enroll in courses by scanning a QR code, and log in easily.
6. **Export Attendance to Excel:** Allow teachers to download full attendance reports as Excel/CSV files with a single click.
7. **Protect Student Privacy:** Only mathematical numbers (face codes and voiceprints) are saved in the database; raw classroom photos are deleted right after checking.

---

## 6. Literature Review
Over the years, different computer techniques have been developed to recognize human faces and voices:
- **Early Face Methods (Eigenfaces & Fisherfaces):** In the 1990s, researchers used basic mathematical formulas to recognize faces. While fast, these methods failed whenever room lighting changed or a student smiled or tilted their head.
- **Haar Cascades & HOG:** In the 2000s, feature-based detectors like Haar Cascades and Histogram of Oriented Gradients (HOG) were introduced. HOG looks at light and edge patterns, making face detection much more reliable under normal classroom lights.
- **Modern Deep Learning Face Recognition:** In recent years, deep learning neural networks were trained on millions of face photos. These models convert each face into a short list of 128 numbers (called a face embedding). Two photos of the same person produce almost identical numbers, making modern face recognition over 99% accurate.
- **Voice Recognition Models:** Voice recognition models listen to sound waves, filter out room noise, and extract unique frequency patterns that belong to a specific person's voice (called a voiceprint). This allows the system to tell who is speaking.

### Comparison of Attendance Methods

| Method | Time Required | Can Proxy Occur? | Ease of Use |
| :--- | :--- | :--- | :--- |
| **Paper Roll-Call** | 10 - 15 minutes | No (but very slow) | Manual & tiring |
| **Paper Sign-in Sheet** | 5 - 10 minutes | Yes (very common) | Easy, but unreliable |
| **RFID Card Tap** | 3 - 5 minutes | Yes (cards can be shared) | Medium (students form line) |
| **Fingerprint Scanner** | 5 - 8 minutes | No (biometric) | Slow (one student at a time) |
| **SnapClass (Face + Voice)** | **Under 10 seconds** | **No (face & voice verified)** | **Very Easy (1 photo for whole class)** |

---

## 7. Existing System
Currently, colleges and schools use one of these common methods to record attendance:
1. **Paper Attendance Register:** The teacher brings a physical register to class, calls out roll numbers 1 to 60, and puts a tick mark or 'P' on paper.
2. **Circulating Paper Sheets:** The teacher passes a blank signature sheet through the classroom rows, and students sign their names during the lecture.
3. **ID Card Swiping (RFID):** Students tap their college identity card against a machine near the door when they enter.
4. **Biometric Fingerprint Terminals:** Students press their thumb on a wall-mounted sensor to log their entry.

---

## 8. Limitations of Existing System
The existing systems have serious drawbacks:
- **Wastes Too Much Time:** Calling 60 names takes 10 to 15 minutes every lecture. Over a whole semester, dozens of hours of class time are lost.
- **Easy to Cheat (Proxy Attendance):** Students frequently sign for friends who are sleeping or outside the college. RFID cards are also easily handed to friends.
- **Causes Crowding & Queues:** Fingerprint machines can only scan one person at a time, causing long lines and delays before class starts.
- **Hardware Breakdown:** Physical fingerprint scanners get dirty, scratched, and frequently stop working.
- **Delayed Reports:** Paper sheets sit in staff rooms for weeks before someone types them into the computer.

---

## 9. Proposed System (SnapClass)
The proposed system, **SnapClass**, is an automated, web-based attendance system powered by **Face and Voice Recognition models**:
- **Take Attendance by Taking a Photo:** The teacher points their laptop webcam or phone camera at the classroom and takes one or two wide photos. The system recognizes all enrolled students in the photo automatically.
- **Secondary Voice Verification:** If any student's face was not visible (for example, blocked by another student or wearing a mask), the student can speak into the microphone to be verified by voice.
- **Teacher Verification Screen:** The teacher sees a simple list showing who is Present and who is Absent. If the teacher wants to change anyone's status, they can do so with a simple toggle button.
- **Instant Excel / CSV Download:** With one click, the teacher can download the attendance sheet to send to the college administration.
- **Student Mobile Portal:** Students have their own portal where they can check their total attended classes, view their attendance percentage, and scan a QR code to join a class.

---

## 10. Scope of the Project
The scope and boundaries of SnapClass are:
- **Where It Can Be Used:** College classrooms, university lecture halls, computer labs, seminars, and school classrooms.
- **Users:** Teachers (who take and manage attendance) and Students (who register their profile and track their attendance).
- **Devices:** Works on any standard laptop, tablet, desktop PC, or smartphone with a web browser and camera.
- **Current Limitations:** Requires normal classroom lighting (the room should not be pitch black), and a student's face must be at least partially visible to the camera.

---

## 11. Proposed Methodology
The project works in five simple steps:

### Step 1: Student Registration (One-Time Setup)
At the start of the semester, each student registers their profile on the website. The student takes a short face photo using the webcam and records a 5-second voice sample using the microphone. The system converts these into secure mathematical face and voice codes and saves them in the database.

### Step 2: Taking Attendance in Class (Face Recognition)
When class begins, the teacher opens the 'Take Attendance' screen and clicks 'Capture Photo'. The Face Recognition Model performs three tasks:
1. **Face Detection:** Finds all student faces in the photo.
2. **Face Alignment:** Rotates and straightens any tilted faces so eyes and mouth are aligned.
3. **Face Matching:** Compares each face with the registered student records. If a face matches, the student is marked Present.

### Step 3: Optional Voice Roll-Call (Voice Recognition)
For any student sitting in a blind spot or far corner, the teacher can use the Voice Attendance option. The student speaks their name or a greeting into the microphone. The Voice Recognition Model checks the speaker's voiceprint against the saved student voice and marks them Present if it matches.

### Step 4: Teacher Review & Final Confirmation
A clear review screen pops up on the teacher's screen showing the full student list. Green badges indicate Present, and grey badges indicate Absent. The teacher can quickly review the list, click any student to change their status if needed, and click 'Save Attendance'.

### Step 5: Saving & Exporting Records
The attendance record is saved into the database with the current date, time, and subject name. The teacher can view past attendance history anytime and click 'Export CSV' to download an Excel sheet.

### Step-by-Step System Workflow Table

| Step | Action | Tool / Model Used | Result |
| :--- | :--- | :--- | :--- |
| **Step 1** | Student Profile Setup | Webcam & Microphone | Student face code and voice saved |
| **Step 2** | Classroom Photo Capture | Webcam / Camera | Classroom photo sent to Face Model |
| **Step 3** | Face & Voice Recognition | Face Model & Voice Model | List of recognized students generated |
| **Step 4** | Teacher Review | Web Interface | Teacher checks and confirms list |
| **Step 5** | Save to Database | Database (Supabase / Local) | Attendance saved & ready for Excel export |

---

## 12. System Architecture / Block Diagram
The system architecture is organized into three simple layers:
1. **User Interface Layer (Web App):** The website where teachers and students log in, take photos, record voice, and view attendance lists.
2. **AI Models Layer:** The Face Recognition Model that detects and identifies faces, and the Voice Recognition Model that verifies students by voice.
3. **Database & Storage Layer:** The central database that stores student names, teacher accounts, and daily attendance records.

### Architecture Block Diagram

```
+-----------------------------------------------------------------------------------+
|                             1. WEB APPLICATION LAYER                              |
|  +----------------------------------+    +-------------------------------------+  |
|  |         TEACHER PORTAL           |    |           STUDENT PORTAL            |  |
|  | • Takes classroom photo (Webcam) |    | • Logs in with Face ID scan         |  |
|  | • Reviews present/absent list    |    | • Records voice sample              |  |
|  | • Generates QR code for class    |    | • Scans QR code to join subject     |  |
|  | • Exports attendance to CSV      |    | • Checks attendance percentage      |  |
|  +----------------+-----------------+    +------------------+------------------+  |
+-------------------|-----------------------------------------|---------------------+
                    | Classroom Photo                         | Voice Audio
                    v                                         v
+-----------------------------------------------------------------------------------+
|                           2. AI RECOGNITION MODELS                                |
|  +-------------------------------------+  +------------------------------------+  |
|  |       FACE RECOGNITION MODEL        |  |       VOICE RECOGNITION MODEL      |  |
|  | 1. Finds faces in photo             |  | 1. Listens to speech through mic   |  |
|  | 2. Straightens & aligns faces       |  | 2. Removes background room noise   |  |
|  | 3. Compares with saved student faces|  | 3. Compares with student voiceprint|  |
|  | 4. Identifies student as Present    |  | 4. Confirms student identity       |  |
|  +-------------------------------------+  +------------------------------------+  |
+-----------------------------------------+-----------------------------------------+\
                                          | Save Recognized Attendance
                                          v
+-----------------------------------------------------------------------------------+
|                       3. DATABASE & ATTENDANCE RECORDS                            |
|  • Student Profiles: Saves names, enrolled subjects, and face/voice codes         |
|  • Teacher Accounts: Saves teacher login details and created courses              |
|  • Attendance Records: Saves date, time, subject name, and Present/Absent status  |
|  • Offline Storage: Automatically keeps working even if internet gets disconnected|
+-----------------------------------------------------------------------------------+
```

---

## 13. Technology Stack (Languages, Frameworks, Tools)

| Component | Tool / Technology Used | What It Does in the Project |
| :--- | :--- | :--- |
| **Frontend (User Interface)** | React & TypeScript | Builds the clean, interactive website for teachers and students. |
| **Styling & Layout** | Tailwind CSS | Makes the web pages look modern, colorful, and responsive on mobile and PC. |
| **Camera & Audio Capture** | HTML5 Camera & Web Audio | Captures photos from the webcam and sound from the microphone. |
| **QR Code System** | QR Code Library | Generates QR codes so students can quickly join subjects on their phones. |
| **Face Recognition Model** | Python Face Recognition Library | Finds faces in the classroom photo and recognizes who they are. |
| **Voice Recognition Model** | Python Audio & Voice Libraries | Processes student speech and verifies identity using voiceprints. |
| **Database** | PostgreSQL (Supabase) | Securely stores student lists, teacher accounts, and attendance records. |
| **Offline Backup** | Browser Local Storage | Allows the system to work smoothly even without active internet. |

---

## 14. Expected Outcomes
When fully deployed, SnapClass provides these direct benefits:
- **Takes Attendance in Under 10 Seconds:** Reduces attendance time from 15 minutes to just a few seconds, saving hours of class time every month.
- **Zero Proxy Attendance:** Students cannot mark fake attendance for friends because face and voice must be physically verified.
- **Very High Recognition Accuracy:** Accurately identifies students under normal classroom light and different seating positions.
- **Teacher Remains in Control:** Teachers can easily review and adjust the attendance list before saving, preventing any mistakes.
- **Direct Student Transparency:** Students always know their exact attendance percentage and receive early warnings before getting low attendance.
- **Easy Excel Reports:** Teachers can download ready-to-use Excel sheets anytime with one click.

---

## 15. Project Timeline and Milestones

| Phase | Work Description | Time Period | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Project Planning, Problem Study & Synopsis Writing | Weeks 1 - 3 | Completed |
| **Phase 2** | Database Design & Setting up Student/Teacher Tables | Weeks 4 - 6 | Completed |
| **Phase 3** | Building Face Recognition & Voice Recognition Models | Weeks 7 - 10 | Completed |
| **Phase 4** | Developing Teacher Screen, Student Screen & Camera HUD | Weeks 11 - 13 | Completed |
| **Phase 5** | Connecting Everything Together & Classroom Testing | Weeks 14 - 15 | Completed |
| **Phase 6** | Final Project Documentation & Viva Preparation | Week 16 | In Progress |

---

## 16. Team Members' Roles and Responsibilities

| Team Member | Role | Main Responsibilities |
| :--- | :--- | :--- |
| **Ishika Khandelwal** | Frontend & UI/UX Designer | Designed all web screens; created Teacher Dashboard, Student Screen, Camera Viewfinder, and Attendance Review screens; made the website easy and pleasant to use. |
| **Jayesh Parmar** | Backend & Database Developer | Created the database tables for teachers, students, and attendance logs; built secure login system; developed offline storage and Excel/CSV download feature. |
| **Manasvi Septa** | AI Models & Recognition Developer | Built and tested the Face Recognition Model and Voice Recognition Model; implemented face detection, face matching, and voiceprint verification algorithms. |

### Detailed Contributions by Each Member

1. **Ishika Khandelwal (Frontend & UI/UX Designer):**
   - Designed the user-friendly website layout using React and Tailwind CSS.
   - Created the camera screen (`WebCamCapture`) with green framing boxes and a real-time scanning line.
   - Built the audio recording visualizer that shows moving sound waves when a student speaks.
   - Designed the popup screens where teachers review recognized students and toggle Present/Absent marks.

2. **Jayesh Parmar (Backend & Database Developer):**
   - Designed the database structure to store teacher accounts, student details, and attendance history.
   - Set up cloud database connectivity using Supabase to save attendance records reliably.
   - Implemented password security so teacher accounts are protected.
   - Built the offline feature so the system works even if internet connection drops in class.
   - Created the one-click Excel/CSV export function for teachers.

3. **Manasvi Septa (AI Models & Recognition Developer):**
   - Set up the Face Recognition Model to detect student faces in classroom photos.
   - Implemented face alignment and feature matching to identify students accurately.
   - Built the Voice Recognition Model to record, filter, and verify student voices through the microphone.
   - Tested the models on multiple classroom photos to ensure high accuracy and avoid false matches.

---

## 17. References / Research Papers

### Research Papers on Face & Voice Recognition
- **[1]** Turk, M., & Pentland, A., “Eigenfaces for recognition”, *Journal of Cognitive Neuroscience*, Vol. 3, No. 1, pp. 71-86, 1991.
- **[2]** Viola, P., & Jones, M., “Rapid object detection using a boosted cascade of simple features”, *IEEE Computer Society Conference on Computer Vision and Pattern Recognition (CVPR)*, 2001.
- **[3]** Dalal, N., & Triggs, B., “Histograms of oriented gradients for human detection”, *IEEE Conference on Computer Vision and Pattern Recognition (CVPR)*, 2005.
- **[4]** Schroff, F., Kalenichenko, D., & Philbin, J., “FaceNet: A unified embedding for face recognition and clustering”, *IEEE Conference on Computer Vision and Pattern Recognition (CVPR)*, 2015.
- **[5]** Wan, L., Wang, Q., Papir, A., & Moreno, I. L., “Generalized end-to-end loss for speaker verification”, *IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)*, 2018.

### Reference Books & Online Documentation
- **[6]** Goodfellow, I., Bengio, Y., & Courville, A., *Deep Learning*, MIT Press, 2016.
- **[7]** Gonzalez, R. C., & Woods, R. E., *Digital Image Processing*, Pearson Education, 4th Edition.
- **[8]** Python Face Recognition Library Documentation, https://github.com/ageitgey/face_recognition.
- **[9]** React Web Framework Official Guide, https://react.dev/.
- **[10]** Supabase Database Documentation, https://supabase.com/docs.

