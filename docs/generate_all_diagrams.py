"""
generate_all_diagrams.py
Generates high-resolution PNG diagrams for:
1. AI Biometric Recognition Pipeline (Face + Voice)
2. Database Entity-Relationship Diagram (3NF ERD)
3. End-to-End Attendance Execution Flowchart
"""

import os
from PIL import Image, ImageDraw, ImageFont

FONT_DIR = "C:/Windows/Fonts/"
try:
    font_title = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 36)
    font_subtitle = ImageFont.truetype(os.path.join(FONT_DIR, "segoeui.ttf"), 20)
    font_box_title = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 20)
    font_box_sub = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 16)
    font_box_body = ImageFont.truetype(os.path.join(FONT_DIR, "segoeui.ttf"), 15)
    font_code = ImageFont.truetype(os.path.join(FONT_DIR, "consola.ttf"), 15)
    font_badge = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 14)
    font_arrow = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 14)
    font_footer = ImageFont.truetype(os.path.join(FONT_DIR, "segoeui.ttf"), 16)
except Exception:
    font_title = font_subtitle = font_box_title = font_box_sub = font_box_body = font_code = font_badge = font_arrow = font_footer = ImageFont.load_default()

def draw_card(draw, xy, fill, outline=None, width=1, radius=14, shadow=True):
    x0, y0, x1, y1 = xy
    if shadow:
        for offset, alpha in [(3, 20), (2, 30), (1, 40)]:
            draw.rounded_rectangle(
                [x0 + offset, y0 + offset, x1 + offset, y1 + offset],
                radius=radius, fill=(0, 0, 0, alpha)
            )
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)

def draw_h_arrow(draw, x_start, x_end, y, label="", color=(99, 102, 241)):
    draw.line([(x_start, y), (x_end, y)], fill=color, width=4)
    draw.polygon([(x_end, y), (x_end - 12, y - 7), (x_end - 12, y + 7)], fill=color)
    if label:
        bbox = draw.textbbox((0, 0), label, font=font_arrow)
        lw, lh = bbox[2] - bbox[0], bbox[3] - bbox[1]
        xmid = (x_start + x_end) // 2
        draw.rounded_rectangle([xmid - lw//2 - 8, y - lh - 12, xmid + lw//2 + 8, y - 2], radius=6, fill=(255, 255, 255, 230), outline=color, width=1)
        draw.text((xmid - lw//2, y - lh - 8), label, fill=color, font=font_arrow)

def draw_v_arrow(draw, x, y_start, y_end, label="", color=(99, 102, 241)):
    draw.line([(x, y_start), (x, y_end)], fill=color, width=4)
    draw.polygon([(x, y_end), (x - 7, y_end - 12), (x + 7, y_end - 12)], fill=color)
    if label:
        bbox = draw.textbbox((0, 0), label, font=font_arrow)
        lw, lh = bbox[2] - bbox[0], bbox[3] - bbox[1]
        ymid = (y_start + y_end) // 2
        draw.rounded_rectangle([x + 10, ymid - lh//2 - 4, x + lw + 24, ymid + lh//2 + 4], radius=6, fill=(255, 255, 255, 230), outline=color, width=1)
        draw.text((x + 16, ymid - lh//2), label, fill=color, font=font_arrow)

# =====================================================================
# DIAGRAM 1: AI BIOMETRIC RECOGNITION PIPELINE (Face + Voice)
# =====================================================================
def generate_ai_pipeline_diagram():
    W, H = 2200, 1300
    img = Image.new("RGBA", (W, H), (248, 250, 252, 255))
    draw = ImageDraw.Draw(img)

    # Header
    draw_card(draw, [40, 30, W - 40, 130], fill=(255, 255, 255), outline=(226, 232, 240), radius=16)
    draw.rounded_rectangle([40, 30, W - 40, 42], radius=16, fill=(79, 70, 229))
    draw.rectangle([40, 38, W - 40, 42], fill=(79, 70, 229))
    draw.text((70, 52), "SNAPCLASS: MULTIMODAL AI BIOMETRIC INFERENCE PIPELINE", fill=(15, 23, 42), font=font_title)
    draw.text((70, 96), "Dual-Stream Face Recognition (Dlib ResNet-34) & Acoustic Voice Verification (Resemblyzer LSTM)", fill=(100, 116, 139), font=font_subtitle)

    # STREAM 1: FACIAL BIOMETRIC PIPELINE (Top Half)
    draw_card(draw, [40, 155, W - 40, 680], fill=(245, 243, 255), outline=(221, 214, 254), radius=16)
    draw.rounded_rectangle([60, 175, 480, 215], radius=10, fill=(109, 40, 217))
    draw.text((76, 182), "PRIMARY STREAM: FACIAL RECOGNITION PIPELINE", fill=(255, 255, 255), font=font_box_title)

    face_stages = [
        ("1. Image Capture", "WebCamCapture.tsx", "HTML5 MediaDevices API\n60 FPS Viewfinder HUD\nClassroom Base64 JPEGs", (238, 242, 255), (67, 56, 202)),
        ("2. Face Detection", "Dlib HOG Detector", "Sliding window with 1x upsample\nExtracts multi-face bounding\nrectangles simultaneously", (243, 232, 255), (109, 40, 217)),
        ("3. Landmark Alignment", "68-Point Shape Predictor", "Detects eyes, nose bridge, jaw\nComputes affine matrix\nNormalizes pose & roll angle", (254, 242, 242), (185, 28, 28)),
        ("4. Deep Embeddings", "ResNet-34 Deep CNN", "29-layer residual architecture\nTriplet Loss metric mapping\n128-D vector on unit sphere", (254, 243, 199), (180, 83, 9)),
        ("5. Classification & L2", "Linear SVC + Distance", "SVC candidate filtering\nEuclidean norm d <= 0.60\nReject intruder if d > 0.60", (236, 253, 245), (5, 150, 105))
    ]

    bx_w = 340
    bx_h = 390
    cur_x = 70
    by = 240
    for idx, (stitle, salgo, sdesc, sbg, scol) in enumerate(face_stages):
        draw_card(draw, [cur_x, by, cur_x + bx_w, by + bx_h], fill=(255, 255, 255), outline=(221, 214, 254), radius=12)
        # Stage header
        draw.rounded_rectangle([cur_x, by, cur_x + bx_w, by + 50], radius=12, fill=scol)
        draw.rectangle([cur_x, by + 35, cur_x + bx_w, by + 50], fill=scol)
        draw.text((cur_x + 16, by + 12), stitle, fill=(255, 255, 255), font=font_box_title)
        
        # Algorithm badge
        draw.rounded_rectangle([cur_x + 16, by + 66, cur_x + bx_w - 16, by + 104], radius=8, fill=sbg)
        draw.text((cur_x + 24, by + 74), salgo, fill=scol, font=font_box_sub)
        
        # Description
        draw.text((cur_x + 16, by + 125), sdesc, fill=(51, 65, 85), font=font_box_body)
        
        # Metrics / Formula box at bottom
        if idx == 3:
            draw.rounded_rectangle([cur_x + 16, by + 260, cur_x + bx_w - 16, by + 360], radius=8, fill=(248, 250, 252), outline=(226, 232, 240), width=1)
            draw.text((cur_x + 24, by + 270), "Formula:", fill=(15, 23, 42), font=font_badge)
            draw.text((cur_x + 24, by + 295), "v_face in R^128\n||v_face||_2 = 1.0\nAccuracy: 99.38% LFW", fill=(100, 116, 139), font=font_code)
        elif idx == 4:
            draw.rounded_rectangle([cur_x + 16, by + 260, cur_x + bx_w - 16, by + 360], radius=8, fill=(248, 250, 252), outline=(226, 232, 240), width=1)
            draw.text((cur_x + 24, by + 270), "Threshold Rule:", fill=(15, 23, 42), font=font_badge)
            draw.text((cur_x + 24, by + 295), "d = ||e_reg - v_face||_2\nMatch if d <= 0.60\nIntruder if d > 0.60", fill=(5, 150, 105), font=font_code)
            
        # Arrow to next
        if idx < len(face_stages) - 1:
            draw_h_arrow(draw, cur_x + bx_w + 6, cur_x + bx_w + 64, by + bx_h // 2, "", (109, 40, 217))
        cur_x += bx_w + 70

    # STREAM 2: ACOUSTIC VOICE ROLL-CALL (Bottom Half)
    draw_card(draw, [40, 705, W - 40, 1225], fill=(255, 251, 235), outline=(254, 243, 199), radius=16)
    draw.rounded_rectangle([60, 725, 490, 765], radius=10, fill=(180, 83, 9))
    draw.text((76, 732), "SECONDARY STREAM: ACOUSTIC VOICE VERIFICATION", fill=(255, 255, 255), font=font_box_title)

    voice_stages = [
        ("1. Audio Ingestion", "AudioRecorder.tsx", "HTML5 Web Audio API\nCanvas animated waveform\n16 kHz Mono Sampling", (254, 243, 199), (180, 83, 9)),
        ("2. Voice Segmentation", "Librosa top-dB Split", "Energy threshold: 30 dB\nRemoves ambient silence\nExtracts speech utterances", (254, 242, 242), (225, 29, 72)),
        ("3. Speaker Embedding", "Resemblyzer LSTM", "3-Layer recurrent network\nGE2E Generalized Loss\n256-D Speaker Vector", (245, 243, 255), (124, 58, 237)),
        ("4. Cosine Metric Test", "Vector Cosine Similarity", "Dot product comparison\ncos(theta) = (u . v)/(||u|| ||v||)\nAccepted if tau >= 0.65", (236, 253, 245), (5, 150, 105)),
        ("5. Fusion & Commit", "Override Table & DB", "Combines Face & Voice score\nFaculty review & override\nAtomic session commit", (240, 249, 255), (2, 132, 199))
    ]

    cur_x = 70
    by2 = 790
    bx_h2 = 390
    for idx, (stitle, salgo, sdesc, sbg, scol) in enumerate(voice_stages):
        draw_card(draw, [cur_x, by2, cur_x + bx_w, by2 + bx_h2], fill=(255, 255, 255), outline=(254, 243, 199), radius=12)
        draw.rounded_rectangle([cur_x, by2, cur_x + bx_w, by2 + 50], radius=12, fill=scol)
        draw.rectangle([cur_x, by2 + 35, cur_x + bx_w, by2 + 50], fill=scol)
        draw.text((cur_x + 16, by2 + 12), stitle, fill=(255, 255, 255), font=font_box_title)
        
        draw.rounded_rectangle([cur_x + 16, by2 + 66, cur_x + bx_w - 16, by2 + 104], radius=8, fill=sbg)
        draw.text((cur_x + 24, by2 + 74), salgo, fill=scol, font=font_box_sub)
        draw.text((cur_x + 16, by2 + 125), sdesc, fill=(51, 65, 85), font=font_box_body)
        
        if idx == 2:
            draw.rounded_rectangle([cur_x + 16, by2 + 260, cur_x + bx_w - 16, by2 + 360], radius=8, fill=(248, 250, 252), outline=(226, 232, 240), width=1)
            draw.text((cur_x + 24, by2 + 270), "Acoustic Spec:", fill=(15, 23, 42), font=font_badge)
            draw.text((cur_x + 24, by2 + 295), "v_voice in R^256\n3-Layer LSTM (GE2E)\nSampling: 16 kHz Mono", fill=(124, 58, 237), font=font_code)
        elif idx == 3:
            draw.rounded_rectangle([cur_x + 16, by2 + 260, cur_x + bx_w - 16, by2 + 360], radius=8, fill=(248, 250, 252), outline=(226, 232, 240), width=1)
            draw.text((cur_x + 24, by2 + 270), "Cosine Rule:", fill=(15, 23, 42), font=font_badge)
            draw.text((cur_x + 24, by2 + 295), "cos_sim >= 0.65 -> Present\ncos_sim < 0.65 -> Fail\nText-Independent", fill=(5, 150, 105), font=font_code)
            
        if idx < len(voice_stages) - 1:
            draw_h_arrow(draw, cur_x + bx_w + 6, cur_x + bx_w + 64, by2 + bx_h2 // 2, "", (180, 83, 9))
        cur_x += bx_w + 70

    # Save
    out_path = os.path.join(r"c:\Projects\SnapClass\docs", "SnapClass_AI_Biometric_Pipeline.png")
    img.save(out_path, format="PNG", dpi=(300, 300))
    print(f"Generated AI Biometric Pipeline diagram: {out_path}")
    return out_path

# =====================================================================
# DIAGRAM 2: DATABASE ENTITY-RELATIONSHIP DIAGRAM (3NF ERD)
# =====================================================================
def generate_database_erd():
    W, H = 2200, 1200
    img = Image.new("RGBA", (W, H), (248, 250, 252, 255))
    draw = ImageDraw.Draw(img)

    # Header
    draw_card(draw, [40, 30, W - 40, 130], fill=(255, 255, 255), outline=(226, 232, 240), radius=16)
    draw.rounded_rectangle([40, 30, W - 40, 42], radius=16, fill=(5, 150, 105))
    draw.rectangle([40, 38, W - 40, 42], fill=(5, 150, 105))
    draw.text((70, 52), "SNAPCLASS: DATABASE ENTITY-RELATIONSHIP DIAGRAM (3NF SCHEMA)", fill=(15, 23, 42), font=font_title)
    draw.text((70, 96), "PostgreSQL Relational Schema with Foreign Key Relationships, Cardinalities, & Biometric Arrays", fill=(100, 116, 139), font=font_subtitle)

    # Entities and positions
    # TEACHERS (top-left)
    draw_card(draw, [70, 200, 470, 560], fill=(255, 255, 255), outline=(203, 213, 225), radius=12)
    draw.rounded_rectangle([70, 200, 470, 250], radius=12, fill=(30, 58, 138))
    draw.rectangle([70, 230, 470, 250], fill=(30, 58, 138))
    draw.text((90, 212), "ENTITY: teachers", fill=(255, 255, 255), font=font_box_title)
    t_cols = [
        ("id", "UUID", "PRIMARY KEY"),
        ("username", "VARCHAR(64)", "UNIQUE, NOT NULL"),
        ("password", "TEXT", "Bcrypt Hashed"),
        ("name", "VARCHAR(128)", "Faculty Full Name"),
        ("created_at", "TIMESTAMPTZ", "DEFAULT NOW()")
    ]
    cy = 270
    for name, dtype, note in t_cols:
        draw.text((90, cy), name, fill=(185, 28, 28) if "KEY" in note else (15, 23, 42), font=font_code)
        draw.text((220, cy), dtype, fill=(2, 132, 199), font=font_code)
        draw.text((90, cy + 20), f"// {note}", fill=(100, 116, 139), font=font_badge)
        cy += 54

    # SUBJECTS (center-left)
    draw_card(draw, [620, 200, 1020, 560], fill=(255, 255, 255), outline=(203, 213, 225), radius=12)
    draw.rounded_rectangle([620, 200, 1020, 250], radius=12, fill=(2, 132, 199))
    draw.rectangle([620, 230, 1020, 250], fill=(2, 132, 199))
    draw.text((640, 212), "ENTITY: subjects", fill=(255, 255, 255), font=font_box_title)
    s_cols = [
        ("id", "UUID", "PRIMARY KEY"),
        ("subject_code", "VARCHAR(32)", "Course Code (CS101)"),
        ("name", "VARCHAR(128)", "Subject Title"),
        ("section", "VARCHAR(16)", "Section/Batch"),
        ("teacher_id", "UUID", "FOREIGN KEY -> teachers(id)")
    ]
    cy = 270
    for name, dtype, note in s_cols:
        draw.text((640, cy), name, fill=(185, 28, 28) if "PRIMARY" in note else ((124, 58, 237) if "FOREIGN" in note else (15, 23, 42)), font=font_code)
        draw.text((790, cy), dtype, fill=(2, 132, 199), font=font_code)
        draw.text((640, cy + 20), f"// {note}", fill=(100, 116, 139), font=font_badge)
        cy += 54

    # SUBJECT_STUDENTS (Junction Table, center)
    draw_card(draw, [1170, 200, 1570, 560], fill=(255, 255, 255), outline=(203, 213, 225), radius=12)
    draw.rounded_rectangle([1170, 200, 1570, 250], radius=12, fill=(109, 40, 217))
    draw.rectangle([1170, 230, 1570, 250], fill=(109, 40, 217))
    draw.text((1190, 212), "ENTITY: subject_students", fill=(255, 255, 255), font=font_box_title)
    ss_cols = [
        ("id", "UUID", "PRIMARY KEY"),
        ("subject_id", "UUID", "FK -> subjects(id)"),
        ("student_id", "UUID", "FK -> students(id)"),
        ("enrolled_at", "TIMESTAMPTZ", "DEFAULT NOW()"),
        ("[Constraint]", "UNIQUE", "(subject_id, student_id)")
    ]
    cy = 270
    for name, dtype, note in ss_cols:
        draw.text((1190, cy), name, fill=(185, 28, 28) if "PRIMARY" in note else ((124, 58, 237) if "FK" in note else (15, 23, 42)), font=font_code)
        draw.text((1340, cy), dtype, fill=(2, 132, 199), font=font_code)
        draw.text((1190, cy + 20), f"// {note}", fill=(100, 116, 139), font=font_badge)
        cy += 54

    # STUDENTS (top-right)
    draw_card(draw, [1720, 200, 2130, 560], fill=(255, 255, 255), outline=(203, 213, 225), radius=12)
    draw.rounded_rectangle([1720, 200, 2130, 250], radius=12, fill=(225, 29, 72))
    draw.rectangle([1720, 230, 2130, 250], fill=(225, 29, 72))
    draw.text((1740, 212), "ENTITY: students", fill=(255, 255, 255), font=font_box_title)
    st_cols = [
        ("id", "UUID", "PRIMARY KEY"),
        ("name", "VARCHAR(128)", "Student Full Name"),
        ("face_embedding", "FLOAT[128]", "Dlib ResNet-34 Vector"),
        ("voice_embedding", "FLOAT[256]", "Resemblyzer LSTM Vector"),
        ("created_at", "TIMESTAMPTZ", "DEFAULT NOW()")
    ]
    cy = 270
    for name, dtype, note in st_cols:
        draw.text((1740, cy), name, fill=(185, 28, 28) if "PRIMARY" in note else (15, 23, 42), font=font_code)
        draw.text((1910, cy), dtype, fill=(2, 132, 199), font=font_code)
        draw.text((1740, cy + 20), f"// {note}", fill=(100, 116, 139), font=font_badge)
        cy += 54

    # ATTENDANCE_LOGS (bottom-center)
    draw_card(draw, [870, 680, 1370, 1080], fill=(255, 255, 255), outline=(203, 213, 225), radius=12)
    draw.rounded_rectangle([870, 680, 1370, 730], radius=12, fill=(5, 150, 105))
    draw.rectangle([870, 710, 1370, 730], fill=(5, 150, 105))
    draw.text((890, 692), "ENTITY: attendance_logs", fill=(255, 255, 255), font=font_box_title)
    al_cols = [
        ("id", "UUID", "PRIMARY KEY"),
        ("subject_id", "UUID", "FOREIGN KEY -> subjects(id)"),
        ("student_id", "UUID", "FOREIGN KEY -> students(id)"),
        ("timestamp", "TIMESTAMPTZ", "Session ISO 8601 Timestamp"),
        ("status", "BOOLEAN", "TRUE = Present, FALSE = Absent"),
        ("source", "VARCHAR(32)", "Photo #1 / Voice / Manual Override")
    ]
    cy = 750
    for name, dtype, note in al_cols:
        draw.text((890, cy), name, fill=(185, 28, 28) if "PRIMARY" in note else ((124, 58, 237) if "FOREIGN" in note else (15, 23, 42)), font=font_code)
        draw.text((1050, cy), dtype, fill=(2, 132, 199), font=font_code)
        draw.text((890, cy + 20), f"// {note}", fill=(100, 116, 139), font=font_badge)
        cy += 50

    # RELATIONSHIP CONNECTORS & CARDINALITIES
    # 1. teachers(1) -> subjects(N)
    draw.line([(470, 380), (620, 380)], fill=(30, 58, 138), width=3)
    draw.text((485, 350), "1", fill=(30, 58, 138), font=font_box_title)
    draw.text((585, 350), "N", fill=(30, 58, 138), font=font_box_title)
    draw.text((505, 388), "teaches", fill=(100, 116, 139), font=font_badge)

    # 2. subjects(1) -> subject_students(N)
    draw.line([(1020, 380), (1170, 380)], fill=(109, 40, 217), width=3)
    draw.text((1035, 350), "1", fill=(109, 40, 217), font=font_box_title)
    draw.text((1140, 350), "N", fill=(109, 40, 217), font=font_box_title)
    draw.text((1060, 388), "enrolled in", fill=(100, 116, 139), font=font_badge)

    # 3. students(1) -> subject_students(N)
    draw.line([(1720, 380), (1570, 380)], fill=(225, 29, 72), width=3)
    draw.text((1690, 350), "1", fill=(225, 29, 72), font=font_box_title)
    draw.text((1590, 350), "N", fill=(225, 29, 72), font=font_box_title)
    draw.text((1610, 388), "registers", fill=(100, 116, 139), font=font_badge)

    # 4. subjects(1) -> attendance_logs(N)
    draw.line([(820, 560), (820, 880), (870, 880)], fill=(2, 132, 199), width=3)
    draw.text((830, 580), "1", fill=(2, 132, 199), font=font_box_title)
    draw.text((840, 850), "N", fill=(2, 132, 199), font=font_box_title)

    # 5. students(1) -> attendance_logs(N)
    draw.line([(1925, 560), (1925, 880), (1370, 880)], fill=(225, 29, 72), width=3)
    draw.text((1935, 580), "1", fill=(225, 29, 72), font=font_box_title)
    draw.text((1390, 850), "N", fill=(225, 29, 72), font=font_box_title)

    # Legend Card (bottom-left)
    draw_card(draw, [70, 680, 570, 1080], fill=(255, 255, 255), outline=(203, 213, 225), radius=12)
    draw.rounded_rectangle([70, 680, 570, 730], radius=12, fill=(15, 23, 42))
    draw.rectangle([70, 710, 570, 730], fill=(15, 23, 42))
    draw.text((90, 692), "Schema Normalization Notes (3NF)", fill=(255, 255, 255), font=font_box_title)
    leg_items = [
        "1NF: Atomic attributes; embedding vectors stored as continuous floating-point arrays.",
        "2NF: No partial dependency; all non-key fields functionally depend on entire primary key.",
        "3NF: No transitive dependencies; faculty credentials separated from subject sessions.",
        "Integrity: ON DELETE CASCADE applied to subject_students and attendance_logs foreign keys.",
        "Privacy: Raw face/voice files NEVER stored; strictly mathematical 128-D & 256-D vectors."
    ]
    cy = 750
    for item in leg_items:
        draw.text((90, cy), f"✓ {item[:5]}", fill=(5, 150, 105), font=font_badge)
        draw.text((90, cy + 22), item[5:], fill=(51, 65, 85), font=font_box_body)
        cy += 60

    # Save
    out_path = os.path.join(r"c:\Projects\SnapClass\docs", "SnapClass_Database_ER_Diagram.png")
    img.save(out_path, format="PNG", dpi=(300, 300))
    print(f"Generated Database ER Diagram: {out_path}")
    return out_path

if __name__ == "__main__":
    generate_ai_pipeline_diagram()
    generate_database_erd()

