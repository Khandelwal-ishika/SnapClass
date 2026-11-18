"""
generate_srs.py
Generates the comprehensive, professional Software Requirements Specification (SRS)
in Word (.docx) format according to Medi-Caps University & IEEE-830 standards.
"""

import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

def create_srs_document():
    doc = Document()
    
    # 1 inch margins
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)
        
    NAVY_HEX = "1E3A8A"
    NAVY_RGB = RGBColor(30, 58, 138)
    BLACK_RGB = RGBColor(15, 23, 42)
    GRAY_RGB = RGBColor(100, 116, 139)
    ALT_ROW_HEX = "F8FAFC"
    
    def set_cell_shading(cell, color_hex):
        shading_xml = f'<w:shd {nsdecls("w")} w:fill="{color_hex}"/>'
        cell._tc.get_or_add_tcPr().append(parse_xml(shading_xml))

    def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
        tcPr = cell._tc.get_or_add_tcPr()
        tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
        tcPr.append(tcMar)

    def set_table_borders(table, color="CBD5E1"):
        tblPr = table._tbl.tblPr
        borders_xml = f'''
        <w:tblBorders {nsdecls("w")}>
            <w:top w:val="single" w:sz="6" w:space="0" w:color="{color}"/>
            <w:bottom w:val="single" w:sz="6" w:space="0" w:color="{color}"/>
            <w:insideH w:val="single" w:sz="4" w:space="0" w:color="{color}"/>
            <w:insideV w:val="none"/>
            <w:left w:val="none"/>
            <w:right w:val="none"/>
        </w:tblBorders>
        '''
        tblPr.append(parse_xml(borders_xml))

    def style_table(table, col_widths, headers, rows_data):
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        set_table_borders(table)
        
        # Header Row
        hdr_cells = table.rows[0].cells
        for i, title in enumerate(headers):
            hdr_cells[i].text = title
            set_cell_shading(hdr_cells[i], NAVY_HEX)
            set_cell_margins(hdr_cells[i], top=120, bottom=120, left=150, right=150)
            hdr_cells[i].vertical_alignment = WD_ALIGN_VERTICAL.CENTER
            p = hdr_cells[i].paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            for run in p.runs:
                run.font.name = 'Times New Roman'
                run.font.size = Pt(10)
                run.font.bold = True
                run.font.color.rgb = RGBColor(255, 255, 255)
                
        # Data Rows
        for r_idx, row_values in enumerate(rows_data):
            row_cells = table.add_row().cells
            bg_hex = ALT_ROW_HEX if r_idx % 2 == 1 else "FFFFFF"
            for c_idx, val in enumerate(row_values):
                row_cells[c_idx].text = str(val)
                set_cell_shading(row_cells[c_idx], bg_hex)
                set_cell_margins(row_cells[c_idx], top=80, bottom=80, left=150, right=150)
                p = row_cells[c_idx].paragraphs[0]
                p.paragraph_format.space_after = Pt(2)
                p.paragraph_format.line_spacing = 1.05
                for run in p.runs:
                    run.font.name = 'Times New Roman'
                    run.font.size = Pt(9.5)
                    
        # Column Widths
        for row in table.rows:
            for idx, width in enumerate(col_widths):
                row.cells[idx].width = width

    def add_p(text, bold=False, italic=False, size=12, align=WD_ALIGN_PARAGRAPH.JUSTIFY, color=BLACK_RGB, space_after=6, space_before=0, line_spacing=1.15):
        p = doc.add_paragraph()
        p.alignment = align
        p.paragraph_format.space_before = Pt(space_before)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = line_spacing
        run = p.add_run(text)
        run.bold = bold
        run.italic = italic
        run.font.name = 'Times New Roman'
        run.font.size = Pt(size)
        run.font.color.rgb = color
        return p

    def add_h1(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(14)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.bold = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(15)
        run.font.color.rgb = NAVY_RGB
        return p

    def add_h2(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(10)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.bold = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(13)
        run.font.color.rgb = NAVY_RGB
        return p

    def add_h3(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(6)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.bold = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(11.5)
        return p

    # ==========================================
    # COVER PAGE
    # ==========================================
    add_p("SOFTWARE REQUIREMENTS SPECIFICATION (SRS)", bold=True, size=18, align=WD_ALIGN_PARAGRAPH.CENTER, color=NAVY_RGB, space_before=24, space_after=14)
    add_p("for\nAI-BASED INTELLIGENT ATTENDANCE SYSTEM USING FACIAL RECOGNITION\n(SnapClass Platform)", bold=True, size=14, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=20)
    add_p("Version 1.0 Release", bold=False, italic=True, size=12, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=28)
    
    add_p("PREPARED BY:", bold=True, size=12, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=6)
    add_p("Ishika Khandelwal (Enrollment No: <University Roll No>)\nJayesh Parmar (Enrollment No: <University Roll No>)\nManasvi Septa (Enrollment No: <University Roll No>)", bold=False, size=12, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=24, line_spacing=1.3)
    
    add_p("Under the Guidance of", bold=True, size=12, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=6)
    add_p("<Name of the Guide(s)>\nAssistant Professor / Associate Professor\nDepartment of Computer Science & Engineering", italic=True, size=12, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=32, line_spacing=1.2)
    
    add_p("Department of Computer Science & Engineering\nFaculty of Engineering", bold=True, size=13, align=WD_ALIGN_PARAGRAPH.CENTER, color=NAVY_RGB, space_after=4)
    add_p("MEDICAPS UNIVERSITY, INDORE - 453331", bold=True, size=14, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=4)
    add_p("Academic Year: 2026 - 2027", size=12, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=0)
    
    doc.add_page_break()

    # Document Control Table
    add_h2("Document Control & Revision History")
    rev_table = doc.add_table(rows=1, cols=5)
    rev_widths = [Inches(1.0), Inches(1.2), Inches(1.5), Inches(1.3), Inches(1.5)]
    rev_headers = ["Version", "Primary Author", "Date", "Status", "Description of Changes"]
    rev_data = [
        ["0.1", "Ishika, Jayesh, Manasvi", "15/08/2026", "Draft", "Initial requirement gathering and scope definition."],
        ["0.5", "Ishika, Jayesh, Manasvi", "10/09/2026", "Under Review", "Added Dlib ResNet-34 biometric pipeline & schema."],
        ["1.0", "Ishika, Jayesh, Manasvi", "11/10/2026", "Approved", "Finalized SRS matching verified working implementation."]
    ]
    style_table(rev_table, rev_widths, rev_headers, rev_data)
    add_p("Table i: Document revision and control record.", italic=True, size=10, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=4, space_after=14)

    # ==========================================
    # 1. INTRODUCTION
    # ==========================================
    add_h1("1. Introduction")
    
    add_h2("1.1 Purpose")
    add_p("This Software Requirements Specification (SRS) document details the complete functional and non-functional requirements for the 'AI-Based Intelligent Attendance System Using Facial Recognition' (SnapClass), Release Version 1.0. This specification establishes a definitive contract between academic project stakeholders (course instructors, academic mentors, evaluators, and system architects) and the engineering implementation team. It describes all behavioral capabilities, hardware-software interfaces, biometric pipeline algorithms, data constraints, and performance parameters verified against the working codebase.")

    add_h2("1.2 Document Conventions")
    add_p("This document strictly adheres to IEEE Standard 830-1998 for Recommended Practice for Software Requirements Specifications. The following typographical conventions are followed throughout:")
    add_p("• Bold font signifies section headings, core terminology, database table names, and user interface controls.")
    add_p("• Courier New font or monospaced styling designates code identifiers, source files, and database columns (e.g., `attendance_logs`, `face_embedding`).")
    add_p("• Requirement tags are uniquely enumerated using the format REQ-X for traceability across features.")
    add_p("• Requirements priorities are designated as High, Medium, or Low, where High denotes essential functionality required for minimum viable deployment.")

    add_h2("1.3 Intended Audience and Reading Suggestions")
    add_p("This document is structured for various institutional stakeholders:")
    add_p("• Academic Guides and Examiners: Should review Section 1 (Introduction), Section 2 (Overall Description), and Section 4 (System Features) for scope alignment and project assessment.")
    add_p("• Software Developers & Engineers: Should examine Section 3 (External Interfaces), Section 4 (Detailed Feature Requirements), and Section 5 (Nonfunctional Requirements) for implementation, testing, and deployment.")
    add_p("• Academic Quality Auditors: Should consult Section 5 (Nonfunctional Requirements) and Section 6 (Project Plan) to evaluate verification standards, privacy compliance, and team division.")

    add_h2("1.4 Product Scope")
    add_p("SnapClass is an intelligent classroom management and automated attendance platform designed to eliminate manual roll calls, prevent buddy-punching, and automate academic gradebook synchronization. The system captures wide-angle classroom photographs and oral responses, processing them through a 128-dimensional deep metric face recognition pipeline and a 256-dimensional acoustic voice encoder. The software provides role-specific portals for instructors and students, real-time attendance health meters, SVG QR code course enrollments, and 1-click CSV audit logging.")

    # ==========================================
    # 2. OVERALL DESCRIPTION
    # ==========================================
    add_h1("2. Overall Description")
    
    add_h2("2.1 Product Perspective")
    add_p("SnapClass is a self-contained, cloud-enabled web platform operating across a multi-tier decoupled architecture:")
    add_p("1. Client Presentation Tier: Developed as a responsive Single Page Application (SPA) using React 19, TypeScript 5.8, Vite 6.2, and Tailwind CSS v4, interacting with client hardware via HTML5 MediaDevices and Web Audio APIs.")
    add_p("2. Relational Persistence Tier: Backed by PostgreSQL hosted on Supabase Cloud, queried via PostgREST and normalized to Third Normal Form (3NF), with an offline fallback storage layer powered by W3C Web LocalStorage.")
    add_p("3. AI/ML Computational Tier: Standalone Python 3.11 deep learning pipelines leveraging Dlib (HOG face detection, 68-point landmark shape predictor, ResNet-34 128-D embedding extractor), Scikit-Learn (Linear SVC), Resemblyzer (LSTM 256-D voice encoder), and Librosa.")

    add_h2("2.2 Product Functions")
    add_p("The major operational functions provided by SnapClass include:")
    add_p("• Faculty Authentication & Role Access: Secure registration and credential validation using salted Bcrypt.")
    add_p("• Subject Lifecycle Management: Creation of academic courses, automated join link generation, and vector SVG QR code rendering.")
    add_p("• Multi-Angle Classroom Capture: Camera snapshot streaming and multi-file image uploading for comprehensive lecture hall coverage.")
    add_p("• Biometric Facial Recognition: Automated face detection, 68-point landmark alignment, 128-D descriptor generation, Linear SVM classification, and Euclidean distance verification (threshold $\\le 0.6$).")
    add_p("• Acoustic Voice Roll Call: Speech segmentation via Librosa and 256-D speaker identification via Resemblyzer (threshold $\\ge 0.65$).")
    add_p("• Instructor Verification & Manual Override: Live detection review table with Present/Absent toggles before committing records.")
    add_p("• Transactional Session Logging & CSV Export: Batch insertion of timestamped logs and instant CSV audit generation.")
    add_p("• Student Self-Service Dashboard: Biometric FaceID authentication, 1-click QR auto-enrollment, course unenrollment, and attendance percentage health score tracking.")

    add_h2("2.3 User Classes and Characteristics")
    user_table = doc.add_table(rows=1, cols=4)
    user_widths = [Inches(1.5), Inches(1.8), Inches(1.7), Inches(1.5)]
    user_headers = ["User Class", "Technical Literacy", "Access Privileges", "Frequency of Use"]
    user_data = [
        ["Teacher (Faculty)", "Moderate. Familiar with standard web portals and webcams.", "Full subject creation, roll-call execution, override toggles, CSV export.", "High (Multiple daily lectures)."],
        ["Student (Learner)", "Moderate to High. Fluent with mobile browsers and QR codes.", "Read-only attendance stats, profile enrollment, FaceID login.", "Moderate (Daily tracking)."],
        ["AI Processing Module", "Autonomous software agent.", "In-memory image ingestion, feature extraction, classification.", "System execution per roll call."]
    ]
    style_table(user_table, user_widths, user_headers, user_data)
    add_p("Table 1: User classes and operational characteristics.", italic=True, size=10, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=4, space_after=12)

    add_h2("2.4 Operating Environment")
    add_p("• Client Devices: Desktop PCs, laptops, tablets, or smartphones equipped with standard modern web browsers (Chrome $\\ge 110$, Firefox $\\ge 110$, Safari $\\ge 16$, Edge $\\ge 110$).")
    add_p("• Optical Hardware: Integrated webcams or USB cameras supporting 720p (1280x720) or 1080p resolution.")
    add_p("• Acoustic Hardware: Standard integrated or external microphone array.")
    add_p("• Backend Execution Node: Python 3.11.9 64-bit environment with C++ build tools (for Dlib native binaries) and PyTorch tensor backend.")
    add_p("• Database Server: Cloud-hosted Supabase PostgreSQL 15 instance accessible over HTTPS/TLS.")

    add_h2("2.5 Design and Implementation Constraints")
    add_p("• Language and Framework Constraints: Frontend must be authored in TypeScript utilizing React 19 and Tailwind CSS v4; Backend algorithms must execute under Python 3.11.")
    add_p("• Privacy and Storage Constraints: In accordance with biometric data privacy guidelines, raw classroom photographs must never be saved permanently to database tables; only mathematical vector embeddings may be persisted.")
    add_p("• LocalStorage Capacity: The offline demonstration fallback relies on browser LocalStorage, constrained to approximately 5 MB per domain.")
    add_p("• Model Weight Constraints: Pre-trained Dlib ResNet-34 face recognition weights and Resemblyzer LSTM weights must be loaded locally to avoid external API per-call costs.")

    add_h2("2.6 User Documentation")
    add_p("The system ships with the following user documentation deliverables:")
    add_p("• Faculty User Manual: Step-by-step instructions for course creation, QR code distribution, camera staging, and attendance overriding.")
    add_p("• Student Self-Help Guide: Walkthrough for camera FaceID login, deep-link enrollment, and attendance percentage interpretation.")
    add_p("• Developer and Setup Guide: Full installation documentation detailed in `frontend/README.md` and `requirements.txt`.")

    add_h2("2.7 Assumptions and Dependencies")
    add_p("• Assumption 1: Classroom lecture halls provide ambient lighting sufficient for optical feature extraction (minimum 150 lux).")
    add_p("• Assumption 2: Students do not intentionally obstruct or mask their facial features (e.g., wearing full face coverings during photo capture).")
    add_p("• Dependency 1: Client web browser grants runtime camera and microphone permissions via standard W3C MediaDevices dialogues.")
    add_p("• Dependency 2: Stable outbound internet connectivity for querying Supabase Cloud database tables, with automatic fallback to local persistence during network outages.")

    # ==========================================
    # 3. EXTERNAL INTERFACE REQUIREMENTS
    # ==========================================
    add_h1("3. External Interface Requirements")
    
    add_h2("3.1 User Interfaces")
    add_p("SnapClass implements an institutional dark-mode visual interface (`#0B0F19` background) styled via Tailwind CSS v4 with the following major screens:")
    add_p("1. Home Landing Screen (`HomeScreen.tsx`): Features a hero value proposition, platform metrics, and dual portal launch cards for Student Access and Faculty Access.")
    add_p("2. Faculty Authentication Screen (`TeacherLogin.tsx`): Institutional sign-in and registration form with username, password, and a 'Fill Demo Account' helper.")
    add_p("3. Take Attendance Screen (`TakeAttendanceTab.tsx`): Course selector dropdown, classroom photo staging gallery, and AI execution action buttons.")
    add_p("4. Camera & Upload Staging Modal (`AddPhotosModal.tsx`): Live video viewfinder and drag-and-drop multi-file upload container with thumbnail deletion.")
    add_p("5. AI Verification Modal (`AttendanceResultModal.tsx`): Roster table displaying student avatars, match confidence sources, and Present/Absent toggle switches, triggering confetti upon confirmation.")
    add_p("6. Course Management Screen (`ManageSubjectsTab.tsx`): Grid of course cards displaying enrolled student counts and recorded class sessions.")
    add_p("7. QR Sharing Modal (`ShareSubjectModal.tsx`): Displays dynamic vector SVG QR code, copyable join URL, and WhatsApp direct share link.")
    add_p("8. Attendance Records Logbook (`AttendanceRecordsTab.tsx`): Chronological ledger of historical sessions with search filtering, attendance percentage badges, and 1-click CSV download.")
    add_p("9. Student Dashboard (`StudentDashboard.tsx`): Student greeting banner, Attendance Health score meter (Good Standing $\\ge 75\\%$ vs Low Attendance alert), enrolled course cards, and unenroll button.")

    add_h2("3.2 Hardware Interfaces")
    add_p("• Optical Camera Interface: Interfaced via W3C Media Capture API (`navigator.mediaDevices.getUserMedia({ video: true })`). Captures video frames at 30 FPS, rendering them onto a hidden HTML5 canvas element for Base64 DataURL rasterization.")
    add_p("• Microphone Audio Interface: Interfaced via W3C Web Audio API (`AudioContext`, `AnalyserNode`) and MediaStream Recording API. Visualizes real-time frequency waveforms on canvas and outputs standard WAV/Blob audio clips.")

    add_h2("3.3 Software Interfaces")
    add_p("• Supabase PostgREST Client Interface: Communicates over HTTPS/TLS with Supabase PostgreSQL, executing CRUD operations against `teachers`, `students`, `subjects`, `subject_students`, and `attendance_logs` tables.")
    add_p("• Python Dlib & Torch Subsystem: Ingests image arrays via Pillow and NumPy, executing C++ optimized facial detection, landmark alignment, and ResNet-34 descriptor computation.")
    add_p("• Operating System Environment: Compatible with Windows 10/11, macOS, and Ubuntu Linux through cross-platform Node.js and Python runtimes.")

    add_h2("3.4 Communications Interfaces")
    add_p("• Protocol: Standard HTTPS (Hypertext Transfer Protocol Secure) utilizing TLS 1.3 encryption for all client-to-database communications.")
    add_p("• Data Serialization: All payloads exchanged between components and stored in database tables are formatted as strict JavaScript Object Notation (JSON).")
    add_p("• External URL Schemes: Generates direct deep links formatted as `${origin}?join-code=${subject_code}` and interfaces with WhatsApp Web API via `https://api.whatsapp.com/send?text=...`.")

    # ==========================================
    # 4. SYSTEM FEATURES
    # ==========================================
    add_h1("4. System Features")

    # Feature 4.1
    add_h2("4.1 Feature 1: Faculty Authentication & Session Management")
    add_p("4.1.1 Description & Priority: Enables academic instructors to securely register faculty profiles and authenticate into the institutional portal. Priority: High.")
    add_p("4.1.2 Stimulus/Response Sequences:\n• Stimulus: Teacher enters username and password, clicks 'Sign In'.\n• Response: System verifies credentials against stored Bcrypt hash in database. On success, sets active session in AuthContext and redirects to TeacherScreen dashboard. On failure, displays inline error alert.")
    add_p("4.1.3 Functional Requirements:\nREQ-1: The system shall validate unique faculty usernames during registration.\nREQ-2: The system shall hash all passwords using salted Bcrypt before persistent storage.\nREQ-3: The system shall persist active instructor session state in browser local storage until explicit sign out.")

    # Feature 4.2
    add_h2("4.2 Feature 2: Course & Roster Management with Dynamic QR Code Generation")
    add_p("4.2.1 Description & Priority: Allows instructors to create academic subjects, manage course details, and generate dynamic enrollment QR codes. Priority: High.")
    add_p("4.2.2 Stimulus/Response Sequences:\n• Stimulus: Teacher clicks 'Create New Course', enters Subject Code, Title, and Section.\n• Response: System creates subject linked to instructor ID and renders course card.\n• Stimulus: Teacher clicks 'Share QR Code & Join Link'.\n• Response: System renders SVG QR code and direct registration URL.")
    add_p("4.2.3 Functional Requirements:\nREQ-4: The system shall create subject records storing code, name, section, and instructor ID.\nREQ-5: The system shall dynamically generate vector SVG QR codes encoding direct enrollment URLs.\nREQ-6: The system shall provide direct integration to launch WhatsApp Web with pre-formatted registration invitations.")

    # Feature 4.3
    add_h2("4.3 Feature 3: Student Enrollment & Biometric FaceID Registration")
    add_p("4.3.1 Description & Priority: Facilitates student self-enrollment into courses via codes/QR links and biometric FaceID profile registration. Priority: High.")
    add_p("4.3.2 Stimulus/Response Sequences:\n• Stimulus: Student scans course QR code or accesses URL with ?join-code=CS101.\n• Response: System auto-detects code, switches to student portal, and displays AutoEnrollModal.\n• Stimulus: Student confirms enrollment.\n• Response: System links student ID to subject ID in junction table and fires confetti.")
    add_p("4.3.3 Functional Requirements:\nREQ-7: The system shall parse URL query parameters to auto-trigger enrollment dialogues.\nREQ-8: The system shall block duplicate enrollments for students already registered in a course.\nREQ-9: The system shall provide biometric FaceID authentication via live webcam viewfinder.")

    # Feature 4.4
    add_h2("4.4 Feature 4: Classroom Group Image Staging & Multi-Angle Capture")
    add_p("4.4.1 Description & Priority: Enables instructors to capture and stage multiple wide-angle classroom photographs before executing AI roll call. Priority: High.")
    add_p("4.4.2 Stimulus/Response Sequences:\n• Stimulus: Teacher clicks 'Add Classroom Snapshots' and selects Camera or Upload.\n• Response: System streams live webcam or accepts multi-file JPG/PNG uploads.\n• Stimulus: Teacher captures frames.\n• Response: Staged images render in a thumbnail gallery with individual deletion controls.")
    add_p("4.4.3 Functional Requirements:\nREQ-10: The system shall support live webcam frame acquisition and local file uploading.\nREQ-11: The system shall maintain an in-memory staging gallery of multiple classroom angles.\nREQ-12: The system shall permit instructors to remove individual snapshots or clear the gallery.")

    # Feature 4.5
    add_h2("4.5 Feature 5: AI Biometric Facial Recognition Attendance Processing")
    add_p("4.5.1 Description & Priority: Core computer vision engine that detects faces, extracts 128-D descriptors, and verifies student identities against enrolled rosters. Priority: High.")
    add_p("4.5.2 Stimulus/Response Sequences:\n• Stimulus: Teacher clicks 'Run AI Face Recognition'.\n• Response: System passes staged images to Dlib pipeline, detects all faces, extracts 128-D embeddings, classifies candidates via Linear SVM, verifies Euclidean distance (threshold <= 0.6), and opens review modal with detection results.")
    add_p("4.5.3 Functional Requirements:\nREQ-13: The system shall detect human faces using Dlib HOG feature detectors upsampled by factor 1.\nREQ-14: The system shall normalize facial poses using 68-point landmark shape prediction.\nREQ-15: The system shall compute 128-dimensional biometric embeddings using pre-trained ResNet-34 models.\nREQ-16: The system shall classify student identity using a Linear SVM and verify using Euclidean distance (distance <= 0.60).")

    # Feature 4.6
    add_h2("4.6 Feature 6: Acoustic Voice Roll Call Verification")
    add_p("4.6.1 Description & Priority: Provides multimodal acoustic speaker verification using deep voice embeddings from classroom audio responses. Priority: Medium.")
    add_p("4.6.2 Stimulus/Response Sequences:\n• Stimulus: Teacher records oral roll-call audio and clicks 'Analyze Audio & Mark Attendance'.\n• Response: System resamples audio to 16 kHz, isolates speech via Librosa, extracts 256-D voice embeddings via Resemblyzer, matches speakers via cosine similarity (threshold >= 0.65), and routes results to review modal.")
    add_p("4.6.3 Functional Requirements:\nREQ-17: The system shall capture classroom audio waveforms and display live canvas frequency bars.\nREQ-18: The system shall extract 256-D speaker embeddings from speech segments using Resemblyzer LSTM.\nREQ-19: The system shall identify speakers using dot-product cosine similarity with threshold >= 0.65.")

    # Feature 4.7
    add_h2("4.7 Feature 7: Attendance Review, Verification & Instructor Manual Override")
    add_p("4.7.1 Description & Priority: Audit interface enabling instructors to verify AI detection sources and manually override false positives or false negatives before persistent database commitment. Priority: High.")
    add_p("4.7.2 Stimulus/Response Sequences:\n• Stimulus: Instructor reviews detection table and clicks a student's status badge.\n• Response: Status flips between Present and Absent, with detection source updated to 'Manual Override'.\n• Stimulus: Instructor clicks 'Confirm & Sync Session'.\n• Response: System batch-inserts attendance logs, triggers celebration confetti, and closes modal.")
    add_p("4.7.3 Functional Requirements:\nREQ-20: The system shall render all enrolled students in a review table displaying detection source.\nREQ-21: The system shall allow instructors to toggle Present/Absent status with immediate recalculation of attendance percentage.\nREQ-22: The system shall batch-insert verified records with a unified ISO8601 session timestamp.")

    # Feature 4.8
    add_h2("4.8 Feature 8: Historical Attendance Logbook & CSV Audit Export")
    add_p("4.8.1 Description & Priority: Manages historical attendance sessions grouped by date and course, providing search filtering and downloadable CSV reports. Priority: High.")
    add_p("4.8.2 Stimulus/Response Sequences:\n• Stimulus: Teacher enters search term or clicks 'Export to CSV'.\n• Response: System filters session rows in real-time or generates formatted `.csv` file download.")
    add_p("4.8.3 Functional Requirements:\nREQ-23: The system shall aggregate attendance logs by session timestamp and subject ID.\nREQ-24: The system shall provide real-time search filtering across course codes, names, and session dates.\nREQ-25: The system shall generate RFC 4180 compliant CSV exports for external university ERP ingestion.")

    # Feature 4.9
    add_h2("4.9 Feature 9: Student Attendance Health Tracking & Dashboard Self-Service")
    add_p("4.9.1 Description & Priority: Provides students with personalized dashboards displaying course rosters, attendance progress bars, health standing badges, and unenrollment controls. Priority: Medium.")
    add_p("4.9.2 Stimulus/Response Sequences:\n• Stimulus: Authenticated student views dashboard.\n• Response: System calculates overall attendance percentage and renders Good Standing (>=75%) or Low Attendance alert badges.\n• Stimulus: Student clicks 'Unenroll from Course' and confirms browser dialogue.\n• Response: System removes enrollment record and updates dashboard.")
    add_p("4.9.3 Functional Requirements:\nREQ-26: The system shall compute real-time course attendance percentages (Attended Classes / Total Classes).\nREQ-27: The system shall display Good Standing badges for attendance >= 75% and warning alerts for attendance < 75%.\nREQ-28: The system shall permit authenticated students to unenroll from courses with confirmation safeguards.")

    # ==========================================
    # 5. NONFUNCTIONAL REQUIREMENTS
    # ==========================================
    add_h1("5. Nonfunctional Requirements")
    
    add_h2("5.1 Performance Requirements")
    add_p("• Facial Inference Latency: Face detection, landmark alignment, and 128-D embedding extraction shall process in under 2.0 seconds for classroom images containing up to 60 student faces on standard multi-core CPUs.")
    add_p("• UI Frame Rendering: The client user interface, webcam viewfinder, and Web Audio API canvas visualizer shall maintain a smooth rendering performance of 60 frames per second (FPS) without UI thread blocking.")
    add_p("• Client Application Bundle: The production build generated by Vite shall maintain an initial bundle size under 350 KB gzipped to ensure rapid page load times (< 1.5s) over standard campus Wi-Fi networks.")

    add_h2("5.2 Safety Requirements")
    add_p("• Transactional Atomicity: Attendance session batch inserts shall execute as atomic database transactions; in the event of network disruption during commit, partial records shall roll back to prevent corrupted roll-call ledgers.")
    add_p("• Memory Safety & Resource Disposal: Hardware video and audio streams (`MediaStream`) must be explicitly released via `track.stop()` upon component unmount to prevent camera lockouts and memory leaks.")

    add_h2("5.3 Security Requirements")
    add_p("• Password Hashing: All user passwords must be salted and hashed using Bcrypt (`gensalt()` with default cost factor). Plaintext passwords must never be logged or stored in database tables.")
    add_p("• SQL Injection & XSS Immunity: Database operations must utilize parameterized PostgREST interfaces provided by the Supabase SDK. React JSX auto-escaping shall neutralize cross-site scripting (XSS) vectors.")
    add_p("• Biometric Privacy Governance: Raw classroom photographs must be processed in memory and discarded immediately following verification. Database tables shall store exclusively mathematical vector embeddings and attendance booleans, satisfying institutional biometric privacy standards.")

    add_h2("5.4 Software Quality Attributes")
    add_p("• Availability: The platform shall ensure 99.5% operational uptime during standard academic instructional hours (08:00 to 18:00 IST), supported by cloud database replication.")
    add_p("• Reliability & Fault Tolerance: The application is wrapped in a top-level React `<ErrorBoundary>`, catching unexpected runtime exceptions and providing a safe 'Reset & Reload' recovery mechanism.")
    add_p("• Portability: The frontend application shall execute identically across modern evergreen browsers without requiring platform-specific plugins, extensions, or native client installations.")
    add_p("• Usability: The interface adheres to modern institutional SaaS ergonomics, providing high-contrast text, clear typography (Plus Jakarta Sans, JetBrains Mono), responsive layouts, and immediate visual feedback (toasts, loading spinners, and confetti).")

    # ==========================================
    # 6. PROJECT PLAN
    # ==========================================
    add_h1("6. Project Plan")
    
    add_h2("6.1 Team Members")
    add_p("The project is executed by a dedicated team of three final-year undergraduate engineering students from the Department of Computer Science & Engineering, Medi-Caps University:")
    add_p("1. Ishika Khandelwal (Enrollment No: <University Roll No>)")
    add_p("2. Jayesh Parmar (Enrollment No: <University Roll No>)")
    add_p("3. Manasvi Septa (Enrollment No: <University Roll No>)")

    add_h2("6.2 Division of Work")
    team_table = doc.add_table(rows=1, cols=3)
    team_widths = [Inches(1.8), Inches(2.2), Inches(2.5)]
    team_headers = ["Team Member", "Primary Project Role", "Assigned Engineering Modules"]
    team_data = [
        ["Ishika Khandelwal", "Frontend Architect & UI/UX Engineer", "React 19 SPA, Tailwind CSS v4 design, WebCamCapture HUD, AudioRecorder canvas visualizer, modals & responsive views."],
        ["Jayesh Parmar", "Backend Architect & Database Engineer", "PostgreSQL schema design (3NF), Supabase client integration, LocalStorage service layer, Bcrypt authentication & CSV export."],
        ["Manasvi Septa", "AI/ML & Computer Vision Engineer", "Dlib HOG face detector, 68-point landmark alignment, ResNet-34 128-D embeddings, Linear SVM classifier & Resemblyzer voice pipeline."]
    ]
    style_table(team_table, team_widths, team_headers, team_data)
    add_p("Table 2: Division of work and individual module responsibilities.", italic=True, size=10, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=4, space_after=12)

    add_h2("6.3 Time Schedule (Milestone Schedule)")
    time_table = doc.add_table(rows=1, cols=4)
    time_widths = [Inches(1.2), Inches(2.3), Inches(1.5), Inches(1.5)]
    time_headers = ["Phase", "Milestone Description", "Duration", "Status"]
    time_data = [
        ["Phase 1", "Requirement gathering, literature survey & synopsis authoring", "Weeks 1 - 3", "Completed"],
        ["Phase 2", "Relational database schema design (3NF) & Supabase setup", "Weeks 4 - 6", "Completed"],
        ["Phase 3", "Implementation of Dlib face recognition & voice pipelines", "Weeks 7 - 10", "Completed"],
        ["Phase 4", "React 19 frontend development, webcam integration & UI modals", "Weeks 11 - 13", "Completed"],
        ["Phase 5", "System integration, error boundaries & end-to-end testing", "Weeks 14 - 15", "Completed"],
        ["Phase 6", "SRS documentation, academic report writing & viva preparation", "Week 16", "In Progress"]
    ]
    style_table(time_table, time_widths, time_headers, time_data)
    add_p("Table 3: Project lifecycle time schedule and milestone tracking.", italic=True, size=10, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=4, space_after=14)

    # ==========================================
    # APPENDICES
    # ==========================================
    add_h1("Appendix A: Glossary")
    gloss_table = doc.add_table(rows=1, cols=2)
    gloss_widths = [Inches(1.8), Inches(4.7)]
    gloss_headers = ["Term / Acronym", "Definition & Contextual Meaning in SnapClass"]
    gloss_data = [
        ["Biometric Embedding", "A compact 128-dimensional dense vector of floating-point numbers output by the ResNet-34 deep network, encoding unique geometrical facial traits."],
        ["Dlib", "A high-performance C++ scientific toolkit providing pre-trained HOG face detectors, 68-point facial landmark predictors, and ResNet face recognition models."],
        ["Euclidean Distance", "The straight-line metric distance ($L_2$ norm) calculated between two 128-D embedding vectors: $d = \\sqrt{\\sum(x_i - y_i)^2}$."],
        ["HOG", "Histogram of Oriented Gradients; a computer vision feature extraction method counting occurrences of gradient orientation in localized image portions."],
        ["PostgREST", "A standalone web server that automatically translates a PostgreSQL database schema directly into a secure RESTful API."],
        ["Resemblyzer", "A deep learning acoustic toolkit utilizing a 3-layer LSTM to extract 256-dimensional speaker embeddings from audio waveforms."],
        ["ResNet-34", "A 34-layer Residual Neural Network architecture utilizing skip connections to extract high-level visual facial descriptors without vanishing gradients."],
        ["SPA", "Single Page Application; a web application that interacts with the user by dynamically rewriting the current web page rather than loading entire new pages from a server."],
        ["SVM", "Support Vector Machine; a supervised learning algorithm that constructs hyperplanes in multi-dimensional space to categorize data points into classes."],
        ["3NF", "Third Normal Form; a relational database standard requiring 1NF, 2NF, and no transitive functional dependencies of non-key attributes on primary keys."]
    ]
    style_table(gloss_table, gloss_widths, gloss_headers, gloss_data)
    add_p("Table A.1: Technical acronyms and glossary definitions.", italic=True, size=10, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=4, space_after=14)

    add_h1("Appendix B: To Be Determined (TBD) List")
    tbd_table = doc.add_table(rows=1, cols=3)
    tbd_widths = [Inches(1.0), Inches(3.2), Inches(2.3)]
    tbd_headers = ["Item No.", "Open Requirement / Topic", "Target Milestone for Resolution"]
    tbd_data = [
        ["TBD-1", "Integration with university LDAP / Single Sign-On (SSO) directory.", "Future institutional enterprise phase."],
        ["TBD-2", "Automated SMS / Email notification delivery for students with low attendance.", "Project-2 implementation phase."],
        ["TBD-3", "Active 3D liveness detection (blink & head motion challenge-response).", "Project-2 security enhancement phase."]
    ]
    style_table(tbd_table, tbd_widths, tbd_headers, tbd_data)
    add_p("Table B.1: Open items and to-be-determined roadmap.", italic=True, size=10, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=4, space_after=14)

    # Save
    out_path = os.path.join(r"c:\Projects\SnapClass\docs", "SnapClass_Project1_SRS.docx")
    doc.save(out_path)
    print(f"Successfully generated: {out_path}")

if __name__ == "__main__":
    create_srs_document()
