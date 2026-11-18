"""
generate_simple_synopsis_doc.py
Generates an easy-to-understand, simple-language Academic Synopsis Word Document (.docx).
Avoids overly complex jargon and focuses clearly on:
- Face Recognition Model
- Voice Recognition Model
- Simple Web Interface (Teacher & Student)
- Database & Attendance Tracking

Team Members:
- Ishika Khandelwal
- Jayesh Parmar
- Manasvi Septa
"""

import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

def create_simple_synopsis_docx():
    doc = Document()
    
    # Page setup - 1 inch margins
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)
        
    NAVY_HEX = "1E3A8A"
    NAVY_RGB = RGBColor(30, 58, 138)
    BLACK_RGB = RGBColor(15, 23, 42)
    DARK_GRAY_RGB = RGBColor(51, 65, 85)
    LIGHT_BG_HEX = "F1F5F9"
    ALT_ROW_HEX = "F8FAFC"
    BORDER_HEX = "CBD5E1"
    
    def set_cell_shading(cell, color_hex):
        shading_xml = f'<w:shd {nsdecls("w")} w:fill="{color_hex}"/>'
        cell._tc.get_or_add_tcPr().append(parse_xml(shading_xml))

    def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
        tcPr = cell._tc.get_or_add_tcPr()
        tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
        tcPr.append(tcMar)

    def set_table_borders(table, color=BORDER_HEX):
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
                row_cells[c_idx].vertical_alignment = WD_ALIGN_VERTICAL.CENTER
                p = row_cells[c_idx].paragraphs[0]
                p.paragraph_format.space_before = Pt(2)
                p.paragraph_format.space_after = Pt(2)
                p.paragraph_format.line_spacing = 1.10
                for run in p.runs:
                    run.font.name = 'Times New Roman'
                    run.font.size = Pt(9.5)
                    run.font.color.rgb = BLACK_RGB
                    
        # Column Widths
        for row in table.rows:
            for idx, width in enumerate(col_widths):
                row.cells[idx].width = width

    def add_p(text, bold=False, italic=False, size=11.5, align=WD_ALIGN_PARAGRAPH.JUSTIFY, color=BLACK_RGB, space_after=6, space_before=0, line_spacing=1.15):
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

    def add_bullet(bold_prefix, text, size=11.5):
        p = doc.add_paragraph(style='List Bullet')
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p.paragraph_format.space_before = Pt(1)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.line_spacing = 1.15
        
        run_p = p.add_run(bold_prefix)
        run_p.bold = True
        run_p.font.name = 'Times New Roman'
        run_p.font.size = Pt(size)
        run_p.font.color.rgb = BLACK_RGB
        
        run_t = p.add_run(text)
        run_t.bold = False
        run_t.font.name = 'Times New Roman'
        run_t.font.size = Pt(size)
        run_t.font.color.rgb = BLACK_RGB
        return p

    def add_h1(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(16)
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
        p.paragraph_format.space_before = Pt(11)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.bold = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(13)
        run.font.color.rgb = NAVY_RGB
        return p

    def add_callout(text):
        tbl = doc.add_table(rows=1, cols=1)
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        cell = tbl.cell(0, 0)
        cell.width = Inches(6.5)
        set_cell_shading(cell, LIGHT_BG_HEX)
        set_cell_margins(cell, top=90, bottom=90, left=150, right=150)
        
        tblPr = tbl._tbl.tblPr
        borders_xml = f'''
        <w:tblBorders {nsdecls("w")}>
            <w:top w:val="none"/>
            <w:bottom w:val="none"/>
            <w:insideH w:val="none"/>
            <w:insideV w:val="none"/>
            <w:left w:val="single" w:sz="24" w:space="0" w:color="{NAVY_HEX}"/>
            <w:right w:val="none"/>
        </w:tblBorders>
        '''
        tblPr.append(parse_xml(borders_xml))
        
        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.line_spacing = 1.15
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        run = p.add_run(text)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(10)
        run.font.italic = True
        run.font.color.rgb = DARK_GRAY_RGB
        
        p_spacer = doc.add_paragraph()
        p_spacer.paragraph_format.space_before = Pt(0)
        p_spacer.paragraph_format.space_after = Pt(4)

    # =============================================================
    # COVER / TITLE PAGE
    # =============================================================
    add_p("A PROJECT SYNOPSIS ON", bold=True, size=13, align=WD_ALIGN_PARAGRAPH.CENTER, color=NAVY_RGB, space_before=10, space_after=8)
    add_p("SMART ATTENDANCE SYSTEM USING FACE AND VOICE RECOGNITION (SNAPCLASS)", bold=True, size=16, align=WD_ALIGN_PARAGRAPH.CENTER, color=NAVY_RGB, space_after=14)
    
    add_p("Submitted in partial fulfillment of the requirements for the degree of", italic=True, size=11, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=4)
    add_p("BACHELOR OF TECHNOLOGY\nin\nCOMPUTER SCIENCE & ENGINEERING", bold=True, size=13, align=WD_ALIGN_PARAGRAPH.CENTER, color=NAVY_RGB, space_after=20)
    
    add_p("SUBMITTED BY:", bold=True, size=11.5, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=6)
    add_p("Ishika Khandelwal (Enrollment No: <University Roll No>)\nJayesh Parmar (Enrollment No: <University Roll No>)\nManasvi Septa (Enrollment No: <University Roll No>)", 
          bold=True, size=11.5, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=24, line_spacing=1.3)
    
    add_p("UNDER THE GUIDANCE OF:", bold=True, size=11.5, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=4)
    add_p("<Name of the Project Guide>\nAssistant Professor / Associate Professor\nDepartment of Computer Science & Engineering", 
          italic=True, size=11.5, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=32, line_spacing=1.2)
    
    add_p("DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING\nFACULTY OF ENGINEERING", bold=True, size=12.5, align=WD_ALIGN_PARAGRAPH.CENTER, color=NAVY_RGB, space_after=4)
    add_p("MEDICAPS UNIVERSITY, INDORE - 453331", bold=True, size=13.5, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=4)
    add_p("ACADEMIC YEAR 2026", size=11.5, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=0)
    
    doc.add_page_break()

    # =============================================================
    # 1. PROJECT TITLE
    # =============================================================
    add_h1("1. Project Title")
    add_p("Project Title: Smart Attendance System using Face and Voice Recognition", bold=True, size=12)
    add_p("Project Name: SnapClass")
    add_p("SnapClass is an easy-to-use, smart attendance system made for colleges and schools. It helps teachers take attendance in just a few seconds using two main artificial intelligence models: a Face Recognition Model and a Voice Recognition Model. It also provides a simple web app for teachers and students, eliminating paper registers and manual roll calls.")

    # =============================================================
    # 2. INTRODUCTION
    # =============================================================
    add_h1("2. Introduction")
    add_p("Taking student attendance is a daily task in every college and university. It is important because universities require students to maintain a minimum attendance percentage (such as 75%) to be eligible for final exams.")
    add_p("In most classrooms today, teachers still take attendance manually. The teacher either calls out every student's name one by one from a register, or passes around a paper sheet where students sign their names. In a typical class of 60 to 100 students, calling out names takes 10 to 15 minutes of the lecture. In addition, students often sign for their absent friends, which is known as proxy attendance or buddy punching.")
    add_p("Some colleges have tried using RFID identity cards or fingerprint machines. But RFID cards can easily be given to a friend to swipe, and fingerprint scanners create long lines at the classroom door and have hygiene concerns.")
    add_p("To solve these problems in a simple way, this project introduces SnapClass. The teacher simply takes a photo of the classroom using a laptop webcam or mobile phone camera. The built-in Face Recognition Model detects all the student faces in the photo, compares them with registered student profiles, and automatically marks them present. If a student's face is partially hidden or blocked, the teacher can also use the Voice Recognition Model, where the student speaks into the microphone and their identity is verified. Everything is connected to a simple website and a database, saving time and completely preventing fake attendance.")

    # =============================================================
    # 3. PROBLEM STATEMENT
    # =============================================================
    add_h1("3. Problem Statement")
    add_p("The existing methods of taking attendance have four major problems:")
    add_bullet("1. Time Wastage: ", "Calling out roll numbers of 60 to 100 students wastes 10 to 15 minutes in every lecture, reducing actual teaching time.")
    add_bullet("2. Proxy Attendance: ", "Students frequently mark attendance for absent friends on paper sign-in sheets or swipe friends' RFID cards.")
    add_bullet("3. Long Queues at Doorways: ", "Fingerprint scanners and kiosk machines require students to queue up one by one, causing delays and crowd congestion at the classroom door.")
    add_bullet("4. Manual Entry Errors: ", "Teachers have to manually type paper attendance sheets into the college portal at the end of the month, which is slow and prone to errors.")
    add_bullet("5. Lack of Student Awareness: ", "Students cannot easily see their daily attendance percentage and only find out they have low attendance at the end of the semester.")

    # =============================================================
    # 4. MOTIVATION AND NEED FOR THE PROJECT
    # =============================================================
    add_h1("4. Motivation and Need for the Project")
    add_p("The main reasons for creating this project are:")
    add_bullet("Save Classroom Teaching Time: ", "Taking attendance with a camera photo takes only 5 seconds, giving teachers more time to teach.")
    add_bullet("Completely Stop Proxy Attendance: ", "A person's face and voice cannot be copied or shared. This makes attendance 100% honest and accurate.")
    add_bullet("Zero Contact & No Hardware Queues: ", "Students sit comfortably in their seats while the photo is taken. No one has to stand in line or touch a scanner.")
    add_bullet("Two AI Models for High Reliability: ", "Using both Face Recognition and Voice Recognition ensures that if a student is sitting far away or behind someone, they can still be verified by voice.")
    add_bullet("Student Self-Service Portal: ", "Students can log in anytime to see their attendance percentage and get automatic warnings if their attendance drops below the required 75%.")

    # =============================================================
    # 5. PROJECT OBJECTIVES
    # =============================================================
    add_h1("5. Project Objectives")
    add_p("The main goals of this project are:")
    add_bullet("1. Multi-Face Detection: ", "Capture a photo of the entire classroom and detect multiple student faces at the same time using a standard webcam.")
    add_bullet("2. Face Recognition: ", "Compare the detected faces with registered student photos in the database and automatically identify who is present.")
    add_bullet("3. Voice Recognition: ", "Allow students to mark attendance by speaking into a microphone, using a voice recognition model that matches their voice sample.")
    add_bullet("4. Easy Teacher Dashboard: ", "Provide teachers with a simple web screen to take attendance, view recognized students, change Present/Absent status if needed, and download the report.")
    add_bullet("5. Simple Student Portal: ", "Allow students to view their attendance score, enroll in courses by scanning a QR code, and log in easily.")
    add_bullet("6. Export Attendance to Excel: ", "Allow teachers to download full attendance reports as Excel/CSV files with a single click.")
    add_bullet("7. Protect Student Privacy: ", "Only mathematical numbers (face codes and voiceprints) are saved in the database; raw classroom photos are deleted right after checking.")

    # =============================================================
    # 6. LITERATURE REVIEW
    # =============================================================
    add_h1("6. Literature Review")
    add_p("Over the years, different computer techniques have been developed to recognize human faces and voices:")
    add_bullet("Early Face Methods (Eigenfaces & Fisherfaces): ", "In the 1990s, researchers used basic mathematical formulas to recognize faces. While fast, these methods failed whenever room lighting changed or a student smiled or tilted their head.")
    add_bullet("Haar Cascades & HOG: ", "In the 2000s, feature-based detectors like Haar Cascades and Histogram of Oriented Gradients (HOG) were introduced. HOG looks at light and edge patterns, making face detection much more reliable under normal classroom lights.")
    add_bullet("Modern Deep Learning Face Recognition: ", "In recent years, deep learning neural networks were trained on millions of face photos. These models convert each face into a short list of 128 numbers (called a face embedding). Two photos of the same person produce almost identical numbers, making modern face recognition over 99% accurate.")
    add_bullet("Voice Recognition Models: ", "Voice recognition models listen to sound waves, filter out room noise, and extract unique frequency patterns that belong to a specific person's voice (called a voiceprint). This allows the system to tell who is speaking.")

    add_h2("Comparison of Attendance Methods")
    lit_table = doc.add_table(rows=1, cols=4)
    lit_headers = ["Method", "Time Required", "Can Proxy Occur?", "Ease of Use"]
    lit_widths = [Inches(1.8), Inches(1.5), Inches(1.5), Inches(1.7)]
    lit_data = [
        ["Paper Roll-Call", "10 - 15 minutes", "No (but very slow)", "Manual & tiring"],
        ["Paper Sign-in Sheet", "5 - 10 minutes", "Yes (very common)", "Easy, but unreliable"],
        ["RFID Card Tap", "3 - 5 minutes", "Yes (cards can be shared)", "Medium (students form line)"],
        ["Fingerprint Scanner", "5 - 8 minutes", "No (biometric)", "Slow (one student at a time)"],
        ["SnapClass (Face + Voice)", "Under 10 seconds", "No (face & voice verified)", "Very Easy (1 photo for whole class)"]
    ]
    style_table(lit_table, lit_widths, lit_headers, lit_data)
    add_p("Table 1: Comparison between traditional methods and SnapClass.", italic=True, size=10, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=4, space_after=10)

    # =============================================================
    # 7. EXISTING SYSTEM
    # =============================================================
    add_h1("7. Existing System")
    add_p("Currently, colleges and schools use one of these common methods to record attendance:")
    add_bullet("1. Paper Attendance Register: ", "The teacher brings a physical register to class, calls out roll numbers 1 to 60, and puts a tick mark or 'P' on paper.")
    add_bullet("2. Circulating Paper Sheets: ", "The teacher passes a blank signature sheet through the classroom rows, and students sign their names during the lecture.")
    add_bullet("3. ID Card Swiping (RFID): ", "Students tap their college identity card against a machine near the door when they enter.")
    add_bullet("4. Biometric Fingerprint Terminals: ", "Students press their thumb on a wall-mounted sensor to log their entry.")

    # =============================================================
    # 8. LIMITATIONS OF EXISTING SYSTEM
    # =============================================================
    add_h1("8. Limitations of Existing System")
    add_p("The existing systems have serious drawbacks:")
    add_bullet("Wastes Too Much Time: ", "Calling 60 names takes 10 to 15 minutes every lecture. Over a whole semester, dozens of hours of class time are lost.")
    add_bullet("Easy to Cheat (Proxy Attendance): ", "Students frequently sign for friends who are sleeping or outside the college. RFID cards are also easily handed to friends.")
    add_bullet("Causes Crowding & Queues: ", "Fingerprint machines can only scan one person at a time, causing long lines and delays before class starts.")
    add_bullet("Hardware Breakdown: ", "Physical fingerprint scanners get dirty, scratched, and frequently stop working.")
    add_bullet("Delayed Reports: ", "Paper sheets sit in staff rooms for weeks before someone types them into the computer.")

    # =============================================================
    # 9. PROPOSED SYSTEM (SNAPCLASS)
    # =============================================================
    add_h1("9. Proposed System (SnapClass)")
    add_p("The proposed system, SnapClass, is an automated, web-based attendance system powered by Face and Voice Recognition models:")
    add_bullet("Take Attendance by Taking a Photo: ", "The teacher points their laptop webcam or phone camera at the classroom and takes one or two wide photos. The system recognizes all enrolled students in the photo automatically.")
    add_bullet("Secondary Voice Verification: ", "If any student's face was not visible (for example, blocked by another student or wearing a mask), the student can speak into the microphone to be verified by voice.")
    add_bullet("Teacher Verification Screen: ", "The teacher sees a simple list showing who is Present and who is Absent. If the teacher wants to change anyone's status, they can do so with a simple toggle button.")
    add_bullet("Instant Excel / CSV Download: ", "With one click, the teacher can download the attendance sheet to send to the college administration.")
    add_bullet("Student Mobile Portal: ", "Students have their own portal where they can check their total attended classes, view their attendance percentage, and scan a QR code to join a class.")

    # =============================================================
    # 10. SCOPE OF THE PROJECT
    # =============================================================
    add_h1("10. Scope of the Project")
    add_p("The scope and boundaries of SnapClass are:")
    add_bullet("Where It Can Be Used: ", "College classrooms, university lecture halls, computer labs, seminars, and school classrooms.")
    add_bullet("Users: ", "Teachers (who take and manage attendance) and Students (who register their profile and track their attendance).")
    add_bullet("Devices: ", "Works on any standard laptop, tablet, desktop PC, or smartphone with a web browser and camera.")
    add_bullet("Current Limitations: ", "Requires normal classroom lighting (the room should not be pitch black), and a student's face must be at least partially visible to the camera.")

    # =============================================================
    # 11. PROPOSED METHODOLOGY
    # =============================================================
    add_h1("11. Proposed Methodology")
    add_p("The project works in five simple steps:")
    
    add_h2("Step 1: Student Registration (One-Time Setup)")
    add_p("At the start of the semester, each student registers their profile on the website. The student takes a short face photo using the webcam and records a 5-second voice sample using the microphone. The system converts these into secure mathematical face and voice codes and saves them in the database.")

    add_h2("Step 2: Taking Attendance in Class (Face Recognition)")
    add_p("When class begins, the teacher opens the 'Take Attendance' screen and clicks 'Capture Photo'. The Face Recognition Model performs three tasks:")
    add_bullet("a. Face Detection: ", "Finds all student faces in the photo.")
    add_bullet("b. Face Alignment: ", "Rotates and straightens any tilted faces so eyes and mouth are aligned.")
    add_bullet("c. Face Matching: ", "Compares each face with the registered student records. If a face matches, the student is marked Present.")

    add_h2("Step 3: Optional Voice Roll-Call (Voice Recognition)")
    add_p("For any student sitting in a blind spot or far corner, the teacher can use the Voice Attendance option. The student speaks their name or a greeting into the microphone. The Voice Recognition Model checks the speaker's voiceprint against the saved student voice and marks them Present if it matches.")

    add_h2("Step 4: Teacher Review & Final Confirmation")
    add_p("A clear review screen pops up on the teacher's screen showing the full student list. Green badges indicate Present, and grey badges indicate Absent. The teacher can quickly review the list, click any student to change their status if needed, and click 'Save Attendance'.")

    add_h2("Step 5: Saving & Exporting Records")
    add_p("The attendance record is saved into the database with the current date, time, and subject name. The teacher can view past attendance history anytime and click 'Export CSV' to download an Excel sheet.")

    # Table of methodology steps
    add_h2("Step-by-Step System Workflow")
    step_table = doc.add_table(rows=1, cols=4)
    step_headers = ["Step", "Action", "Tool / Model Used", "Result"]
    step_widths = [Inches(0.9), Inches(1.8), Inches(2.0), Inches(1.8)]
    step_data = [
        ["Step 1", "Student Profile Setup", "Webcam & Microphone", "Student face code and voice saved"],
        ["Step 2", "Classroom Photo Capture", "Webcam / Camera", "Classroom photo sent to Face Model"],
        ["Step 3", "Face & Voice Recognition", "Face Model & Voice Model", "List of recognized students generated"],
        ["Step 4", "Teacher Review", "Web Interface", "Teacher checks and confirms list"],
        ["Step 5", "Save to Database", "Database (Supabase / Local)", "Attendance saved & ready for Excel export"]
    ]
    style_table(step_table, step_widths, step_headers, step_data)
    add_p("Table 2: Five simple steps of the SnapClass attendance workflow.", italic=True, size=10, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=4, space_after=10)

    # =============================================================
    # 12. SYSTEM ARCHITECTURE / BLOCK DIAGRAM
    # =============================================================
    add_h1("12. System Architecture / Block Diagram")
    add_p("The system architecture is organized into three simple layers:")
    add_bullet("1. User Interface Layer (Web App): ", "The website where teachers and students log in, take photos, record voice, and view attendance lists.")
    add_bullet("2. AI Models Layer: ", "The Face Recognition Model that detects and identifies faces, and the Voice Recognition Model that verifies students by voice.")
    add_bullet("3. Database & Storage Layer: ", "The central database that stores student names, teacher accounts, and daily attendance records.")

    add_h2("System Architecture Diagram")
    
    # Embed simple diagram if available
    simple_img_path = os.path.join(r"c:\Projects\SnapClass\docs", "SnapClass_Simple_Architecture.png")
    if os.path.exists(simple_img_path):
        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_img.paragraph_format.space_before = Pt(8)
        p_img.paragraph_format.space_after = Pt(4)
        run_img = p_img.add_run()
        run_img.add_picture(simple_img_path, width=Inches(6.2))
        add_p("Figure 1: Simple system architecture diagram of SnapClass.", italic=True, size=10, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=2, space_after=8)

    add_callout(
        "+-----------------------------------------------------------------------------------+\n"
        "|                             1. WEB APPLICATION LAYER                              |\n"
        "|  +----------------------------------+    +-------------------------------------+  |\n"
        "|  |         TEACHER PORTAL           |    |           STUDENT PORTAL            |  |\n"
        "|  | • Takes classroom photo (Webcam) |    | • Logs in with Face ID scan         |  |\n"
        "|  | • Reviews present/absent list    |    | • Records voice sample              |  |\n"
        "|  | • Generates QR code for class    |    | • Scans QR code to join subject     |  |\n"
        "|  | • Exports attendance to CSV      |    | • Checks attendance percentage      |  |\n"
        "|  +----------------+-----------------+    +------------------+------------------+  |\n"
        "+-------------------|-----------------------------------------|---------------------+\n"
        "                    | Classroom Photo                         | Voice Audio\n"
        "                    v                                         v\n"
        "+-----------------------------------------------------------------------------------+\n"
        "|                           2. AI RECOGNITION MODELS                                |\n"
        "|  +-------------------------------------+  +------------------------------------+  |\n"
        "|  |       FACE RECOGNITION MODEL        |  |       VOICE RECOGNITION MODEL      |  |\n"
        "|  | 1. Finds faces in photo             |  | 1. Listens to speech through mic   |  |\n"
        "|  | 2. Straightens & aligns faces       |  | 2. Removes background room noise   |  |\n"
        "|  | 3. Compares with saved student faces|  | 3. Compares with student voiceprint|  |\n"
        "|  | 4. Identifies student as Present    |  | 4. Confirms student identity       |  |\n"
        "|  +-------------------------------------+  +------------------------------------+  |\n"
        "+-----------------------------------------+-----------------------------------------+\n"
        "                                          | Save Recognized Attendance\n"
        "                                          v\n"
        "+-----------------------------------------------------------------------------------+\n"
        "|                       3. DATABASE & ATTENDANCE RECORDS                            |\n"
        "|  • Student Profiles: Saves names, enrolled subjects, and face/voice codes         |\n"
        "|  • Teacher Accounts: Saves teacher login details and created courses              |\n"
        "|  • Attendance Records: Saves date, time, subject name, and Present/Absent status  |\n"
        "|  • Offline Storage: Automatically keeps working even if internet gets disconnected|\n"
        "+-----------------------------------------------------------------------------------+"
    )

    # =============================================================
    # 13. TECHNOLOGY STACK (LANGUAGES, FRAMEWORKS, TOOLS)
    # =============================================================
    add_h1("13. Technology Stack (Languages, Frameworks, Tools)")
    add_p("The project uses simple, modern, and reliable tools:")

    tech_table = doc.add_table(rows=1, cols=3)
    tech_headers = ["Component", "Tool / Technology Used", "What It Does in the Project"]
    tech_widths = [Inches(1.8), Inches(1.8), Inches(2.9)]
    tech_data = [
        ["Frontend (User Interface)", "React & TypeScript", "Builds the clean, interactive website for teachers and students."],
        ["Styling & Layout", "Tailwind CSS", "Makes the web pages look modern, colorful, and responsive on mobile and PC."],
        ["Camera & Audio Capture", "HTML5 Camera & Web Audio", "Captures photos from the webcam and sound from the microphone."],
        ["QR Code System", "QR Code Library", "Generates QR codes so students can quickly join subjects on their phones."],
        ["Face Recognition Model", "Python Face Recognition Library", "Finds faces in the classroom photo and recognizes who they are."],
        ["Voice Recognition Model", "Python Audio & Voice Libraries", "Processes student speech and verifies identity using voiceprints."],
        ["Database", "PostgreSQL (Supabase)", "Securely stores student lists, teacher accounts, and attendance records."],
        ["Offline Backup", "Browser Local Storage", "Allows the system to work smoothly even without active internet."]
    ]
    style_table(tech_table, tech_widths, tech_headers, tech_data)
    add_p("Table 3: Tools and technologies used in the project.", italic=True, size=10, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=4, space_after=10)

    # =============================================================
    # 14. EXPECTED OUTCOMES
    # =============================================================
    add_h1("14. Expected Outcomes")
    add_p("When fully deployed, SnapClass provides these direct benefits:")
    add_bullet("Takes Attendance in Under 10 Seconds: ", "Reduces attendance time from 15 minutes to just a few seconds, saving hours of class time every month.")
    add_bullet("Zero Proxy Attendance: ", "Students cannot mark fake attendance for friends because face and voice must be physically verified.")
    add_bullet("Very High Recognition Accuracy: ", "Accurately identifies students under normal classroom light and different seating positions.")
    add_bullet("Teacher Remains in Control: ", "Teachers can easily review and adjust the attendance list before saving, preventing any mistakes.")
    add_bullet("Direct Student Transparency: ", "Students always know their exact attendance percentage and receive early warnings before getting low attendance.")
    add_bullet("Easy Excel Reports: ", "Teachers can download ready-to-use Excel sheets anytime with one click.")

    # =============================================================
    # 15. PROJECT TIMELINE AND MILESTONES
    # =============================================================
    add_h1("15. Project Timeline and Milestones")
    add_p("The project work was completed across the semester in six simple phases:")

    time_table = doc.add_table(rows=1, cols=4)
    time_headers = ["Phase", "Work Description", "Time Period", "Status"]
    time_widths = [Inches(1.0), Inches(3.0), Inches(1.3), Inches(1.2)]
    time_data = [
        ["Phase 1", "Project Planning, Problem Study & Synopsis Writing", "Weeks 1 - 3", "Completed"],
        ["Phase 2", "Database Design & Setting up Student/Teacher Tables", "Weeks 4 - 6", "Completed"],
        ["Phase 3", "Building Face Recognition & Voice Recognition Models", "Weeks 7 - 10", "Completed"],
        ["Phase 4", "Developing Teacher Screen, Student Screen & Camera HUD", "Weeks 11 - 13", "Completed"],
        ["Phase 5", "Connecting Everything Together & Classroom Testing", "Weeks 14 - 15", "Completed"],
        ["Phase 6", "Final Project Documentation & Viva Preparation", "Week 16", "In Progress"]
    ]
    style_table(time_table, time_widths, time_headers, time_data)
    add_p("Table 4: Project schedule and work milestones.", italic=True, size=10, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=4, space_after=10)

    # =============================================================
    # 16. TEAM MEMBERS' ROLES AND RESPONSIBILITIES
    # =============================================================
    add_h1("16. Team Members' Roles and Responsibilities")
    add_p("The work on this project is divided among three team members according to their strengths:")

    team_table = doc.add_table(rows=1, cols=3)
    team_headers = ["Team Member", "Role", "Main Responsibilities"]
    team_widths = [Inches(1.6), Inches(1.8), Inches(3.1)]
    team_data = [
        [
            "Ishika Khandelwal",
            "Frontend & UI/UX Designer",
            "Designed all web screens; created Teacher Dashboard, Student Screen, Camera Viewfinder, and Attendance Review screens; made the website easy and pleasant to use."
        ],
        [
            "Jayesh Parmar",
            "Backend & Database Developer",
            "Created the database tables for teachers, students, and attendance logs; built secure login system; developed offline storage and Excel/CSV download feature."
        ],
        [
            "Manasvi Septa",
            "AI Models & Recognition Developer",
            "Built and tested the Face Recognition Model and Voice Recognition Model; implemented face detection, face matching, and voiceprint verification algorithms."
        ]
    ]
    style_table(team_table, team_widths, team_headers, team_data)
    add_p("Table 5: Distribution of work among team members.", italic=True, size=10, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=4, space_after=10)

    add_h2("Detailed Contributions by Each Member")
    add_p("1. Ishika Khandelwal (Frontend & UI/UX Designer):", bold=True)
    add_bullet("• ", "Designed the user-friendly website layout using React and Tailwind CSS.")
    add_bullet("• ", "Created the camera screen (WebCamCapture) with green framing boxes and a real-time scanning line.")
    add_bullet("• ", "Built the audio recording visualizer that shows moving sound waves when a student speaks.")
    add_bullet("• ", "Designed the popup screens where teachers review recognized students and toggle Present/Absent marks.")

    add_p("2. Jayesh Parmar (Backend & Database Developer):", bold=True)
    add_bullet("• ", "Designed the database structure to store teacher accounts, student details, and attendance history.")
    add_bullet("• ", "Set up cloud database connectivity using Supabase to save attendance records reliably.")
    add_bullet("• ", "Implemented password security so teacher accounts are protected.")
    add_bullet("• ", "Built the offline feature so the system works even if internet connection drops in class.")
    add_bullet("• ", "Created the one-click Excel/CSV export function for teachers.")

    add_p("3. Manasvi Septa (AI Models & Recognition Developer):", bold=True)
    add_bullet("• ", "Set up the Face Recognition Model to detect student faces in classroom photos.")
    add_bullet("• ", "Implemented face alignment and feature matching to identify students accurately.")
    add_bullet("• ", "Built the Voice Recognition Model to record, filter, and verify student voices through the microphone.")
    add_bullet("• ", "Tested the models on multiple classroom photos to ensure high accuracy and avoid false matches.")

    # =============================================================
    # 17. REFERENCES / RESEARCH PAPERS
    # =============================================================
    add_h1("17. References / Research Papers")
    add_p("The project is supported by the following research papers, books, and technical references:")

    add_h2("Research Papers on Face & Voice Recognition")
    add_p("[1]. Turk, M., & Pentland, A., “Eigenfaces for recognition”, Journal of Cognitive Neuroscience, Vol. 3, No. 1, pp. 71-86, 1991.", size=10.5, space_after=3)
    add_p("[2]. Viola, P., & Jones, M., “Rapid object detection using a boosted cascade of simple features”, IEEE Computer Society Conference on Computer Vision and Pattern Recognition (CVPR), 2001.", size=10.5, space_after=3)
    add_p("[3]. Dalal, N., & Triggs, B., “Histograms of oriented gradients for human detection”, IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2005.", size=10.5, space_after=3)
    add_p("[4]. Schroff, F., Kalenichenko, D., & Philbin, J., “FaceNet: A unified embedding for face recognition and clustering”, IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2015.", size=10.5, space_after=3)
    add_p("[5]. Wan, L., Wang, Q., Papir, A., & Moreno, I. L., “Generalized end-to-end loss for speaker verification”, IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), 2018.", size=10.5, space_after=6)

    add_h2("Reference Books & Online Documentation")
    add_p("[6]. Goodfellow, I., Bengio, Y., & Courville, A., “Deep Learning”, MIT Press, 2016.", size=10.5, space_after=3)
    add_p("[7]. Gonzalez, R. C., & Woods, R. E., “Digital Image Processing”, Pearson Education, 4th Edition.", size=10.5, space_after=3)
    add_p("[8]. Python Face Recognition Library Documentation, https://github.com/ageitgey/face_recognition.", size=10.5, space_after=3)
    add_p("[9]. React Web Framework Official Guide, https://react.dev/.", size=10.5, space_after=3)
    add_p("[10]. Supabase Database Documentation, https://supabase.com/docs.", size=10.5, space_after=6)

    # Save
    output_dir = r"c:\Projects\SnapClass\docs"
    primary_filename = "SnapClass_Simple_Synopsis.docx"
    primary_path = os.path.join(output_dir, primary_filename)
    
    doc.save(primary_path)
    print(f"Successfully generated Simple Synopsis at: {primary_path}")
    
    # Also attempt saving to main filename if not locked
    alt_filename = "SnapClass_Project1_Synopsis.docx"
    alt_path = os.path.join(output_dir, alt_filename)
    try:
        doc.save(alt_path)
        print(f"Also updated: {alt_path}")
    except PermissionError:
        print(f"Note: {alt_path} is currently open in Word. Saved to {primary_path}")
        
    return primary_path

if __name__ == "__main__":
    create_simple_synopsis_docx()

