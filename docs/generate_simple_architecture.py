"""
generate_simple_architecture.py
Generates a clean, simple, easy-to-understand System Architecture Diagram in PNG format.
Uses plain, clear terminology without complex technical jargon.
"""

import os
from PIL import Image, ImageDraw, ImageFont

def create_simple_architecture():
    W, H = 2000, 1250
    img = Image.new("RGBA", (W, H), (248, 250, 252, 255))
    draw = ImageDraw.Draw(img)

    FONT_DIR = "C:/Windows/Fonts/"
    try:
        font_title = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 38)
        font_sub = ImageFont.truetype(os.path.join(FONT_DIR, "segoeui.ttf"), 20)
        font_box_title = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 22)
        font_body = ImageFont.truetype(os.path.join(FONT_DIR, "segoeui.ttf"), 16)
        font_bold = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 17)
        font_arrow = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 15)
        font_footer = ImageFont.truetype(os.path.join(FONT_DIR, "segoeui.ttf"), 16)
    except Exception:
        font_title = font_sub = font_box_title = font_body = font_bold = font_arrow = font_footer = ImageFont.load_default()

    def draw_box(xy, fill, outline, title, title_color, items, badge_text=""):
        x0, y0, x1, y1 = xy
        # Shadow
        for off, a in [(3, 20), (2, 30), (1, 40)]:
            draw.rounded_rectangle([x0 + off, y0 + off, x1 + off, y1 + off], radius=14, fill=(0, 0, 0, a))
        draw.rounded_rectangle(xy, radius=14, fill=fill, outline=outline, width=2)
        
        # Header banner
        draw.rounded_rectangle([x0, y0, x1, y0 + 52], radius=14, fill=title_color)
        draw.rectangle([x0, y0 + 36, x1, y0 + 52], fill=title_color)
        draw.text((x0 + 20, y0 + 12), title, fill=(255, 255, 255), font=font_box_title)
        
        if badge_text:
            bbox = draw.textbbox((0, 0), badge_text, font=font_arrow)
            bw = (bbox[2] - bbox[0]) + 16
            draw.rounded_rectangle([x1 - bw - 16, y0 + 12, x1 - 16, y0 + 40], radius=8, fill=(255, 255, 255))
            draw.text((x1 - bw - 8, y0 + 16), badge_text, fill=title_color, font=font_arrow)
            
        # Items list
        cy = y0 + 72
        for bold_txt, norm_txt in items:
            draw.text((x0 + 20, cy), f"• {bold_txt}:", fill=(15, 23, 42), font=font_bold)
            draw.text((x0 + 20, cy + 24), norm_txt, fill=(71, 85, 105), font=font_body)
            cy += 54

    def draw_arrow(x0, y0, x1, y1, text="", color=(59, 130, 246)):
        draw.line([(x0, y0), (x1, y1)], fill=color, width=4)
        if x0 == x1: # Vertical down
            draw.polygon([(x1, y1), (x1 - 8, y1 - 14), (x1 + 8, y1 - 14)], fill=color)
            if text:
                bbox = draw.textbbox((0, 0), text, font=font_arrow)
                lw, lh = bbox[2] - bbox[0], bbox[3] - bbox[1]
                ymid = (y0 + y1) // 2
                draw.rounded_rectangle([x0 - lw//2 - 10, ymid - lh//2 - 4, x0 + lw//2 + 10, ymid + lh//2 + 4], radius=6, fill=(255, 255, 255), outline=color, width=1)
                draw.text((x0 - lw//2, ymid - lh//2), text, fill=color, font=font_arrow)
        elif y0 == y1: # Horizontal right
            draw.polygon([(x1, y1), (x1 - 14, y1 - 8), (x1 - 14, y1 + 8)], fill=color)
            if text:
                bbox = draw.textbbox((0, 0), text, font=font_arrow)
                lw, lh = bbox[2] - bbox[0], bbox[3] - bbox[1]
                xmid = (x0 + x1) // 2
                draw.rounded_rectangle([xmid - lw//2 - 10, y0 - lh - 10, xmid + lw//2 + 10, y0 - 2], radius=6, fill=(255, 255, 255), outline=color, width=1)
                draw.text((xmid - lw//2, y0 - lh - 6), text, fill=color, font=font_arrow)

    # Header
    draw.rounded_rectangle([50, 30, W - 50, 125], radius=16, fill=(255, 255, 255), outline=(226, 232, 240), width=2)
    draw.rounded_rectangle([50, 30, W - 50, 40], radius=16, fill=(30, 58, 138))
    draw.rectangle([50, 36, W - 50, 40], fill=(30, 58, 138))
    draw.text((80, 50), "SNAPCLASS: SIMPLE SYSTEM ARCHITECTURE", fill=(15, 23, 42), font=font_title)
    draw.text((80, 92), "Smart Attendance System using Face & Voice Recognition", fill=(100, 116, 139), font=font_sub)

    # -------------------------------------------------------------
    # STAGE 1: USERS & INPUT (Top: y = 160 to 450)
    # -------------------------------------------------------------
    teacher_items = [
        ("Webcam / Camera", "Takes photos of the classroom to detect all students"),
        ("Attendance Review", "Views matched students, can change Present/Absent status"),
        ("Subject & QR Code", "Creates subjects and generates QR codes for student joining"),
        ("Export Reports", "Downloads final attendance records in Excel/CSV format")
    ]
    draw_box([80, 160, 960, 450], (255, 255, 255), (191, 219, 254), "1. TEACHER PORTAL", (30, 58, 138), teacher_items, "Instructor")

    student_items = [
        ("Face ID Login", "Logs into student profile using webcam face scan"),
        ("Voice Registration", "Records voice sample using microphone for roll-call"),
        ("Scan QR Code", "Scans course QR code to automatically enroll in class"),
        ("Attendance Tracker", "Checks personal attendance percentage and warning alerts")
    ]
    draw_box([1040, 160, 1920, 450], (255, 255, 255), (191, 219, 254), "2. STUDENT PORTAL", (37, 99, 235), student_items, "Student")

    # Arrows Down to AI Models
    draw_arrow(520, 450, 520, 530, "Classroom Photo", (30, 58, 138))
    draw_arrow(1480, 450, 1480, 530, "Voice Audio Clip", (37, 99, 235))

    # -------------------------------------------------------------
    # STAGE 2: AI RECOGNITION MODELS (Middle: y = 530 to 820)
    # -------------------------------------------------------------
    face_items = [
        ("Step 1: Face Detection", "Finds all student faces inside the classroom photo"),
        ("Step 2: Face Alignment", "Straightens tilted faces so eyes and nose align properly"),
        ("Step 3: Feature Extraction", "Converts each face into a unique mathematical face code"),
        ("Step 4: Student Matching", "Compares face code with registered student database to identify student")
    ]
    draw_box([80, 530, 960, 820], (255, 255, 255), (233, 213, 255), "3. FACE RECOGNITION MODEL", (124, 58, 237), face_items, "Vision AI")

    voice_items = [
        ("Step 1: Audio Input", "Listens to student speech through the microphone"),
        ("Step 2: Noise Removal", "Removes background silence and keeps active speaking parts"),
        ("Step 3: Voice Feature Extraction", "Creates a unique voiceprint code for the student's voice"),
        ("Step 4: Speaker Verification", "Compares voiceprint with saved voice to confirm student identity")
    ]
    draw_box([1040, 530, 1920, 820], (255, 255, 255), (254, 243, 199), "4. VOICE RECOGNITION MODEL", (217, 119, 6), voice_items, "Audio AI")

    # Arrows Down to Database
    draw_arrow(520, 820, 520, 900, "Recognized Students", (124, 58, 237))
    draw_arrow(1480, 820, 1480, 900, "Verified Voice ID", (217, 119, 6))

    # -------------------------------------------------------------
    # STAGE 3: DATABASE & ATTENDANCE RECORDS (Bottom: y = 900 to 1170)
    # -------------------------------------------------------------
    db_items = [
        ("Student Profiles", "Stores student names, registered face codes, and voiceprints"),
        ("Teacher Accounts", "Stores login details and subjects taught by each teacher"),
        ("Attendance Records", "Saves date, time, subject, and student attendance (Present/Absent)"),
        ("Offline Storage", "Saves data locally on browser if internet is disconnected")
    ]
    draw_box([80, 900, 1920, 1170], (255, 255, 255), (167, 243, 208), "5. DATABASE & ATTENDANCE RECORDS (SUPABASE / LOCAL)", (5, 150, 105), db_items, "Storage")

    # Footer
    draw.text((80, 1190), "SnapClass • Easy Attendance System using Face & Voice Recognition", fill=(100, 116, 139), font=font_footer)
    draw.text((1520, 1190), "Team: Ishika • Jayesh • Manasvi", fill=(30, 58, 138), font=font_footer)

    out_path = os.path.join(r"c:\Projects\SnapClass\docs", "SnapClass_Simple_Architecture.png")
    img.save(out_path, format="PNG", dpi=(300, 300))
    print(f"Generated Simple Architecture Diagram: {out_path}")
    return out_path

if __name__ == "__main__":
    create_simple_architecture()

