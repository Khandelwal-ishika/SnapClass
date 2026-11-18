"""
generate_architecture_image.py
Generates an ultra-crisp, publication-grade PNG system architecture diagram for SnapClass.
"""

import os
from PIL import Image, ImageDraw, ImageFont

def create_system_architecture_diagram():
    # Dimensions (High DPI: 2400 x 1520)
    W, H = 2400, 1520
    img = Image.new("RGBA", (W, H), (248, 250, 252, 255)) # Slate 50
    draw = ImageDraw.Draw(img)

    # Fonts
    FONT_DIR = "C:/Windows/Fonts/"
    try:
        font_title = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 44)
        font_subtitle = ImageFont.truetype(os.path.join(FONT_DIR, "segoeui.ttf"), 22)
        font_tier_title = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 26)
        font_tier_badge = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 17)
        font_card_title = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 21)
        font_card_body = ImageFont.truetype(os.path.join(FONT_DIR, "segoeui.ttf"), 17)
        font_card_code = ImageFont.truetype(os.path.join(FONT_DIR, "consola.ttf"), 16)
        font_card_badge = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 15)
        font_arrow = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 16)
        font_footer = ImageFont.truetype(os.path.join(FONT_DIR, "segoeui.ttf"), 18)
    except Exception:
        # Fallback to default
        font_title = font_subtitle = font_tier_title = font_card_title = font_card_body = font_arrow = ImageFont.load_default()

    # Color Palette
    NAVY_DARK = (15, 23, 42)
    NAVY_BLUE = (30, 58, 138)
    TEXT_MAIN = (30, 41, 59)
    TEXT_MUTED = (100, 116, 139)
    BORDER_LIGHT = (226, 232, 240)
    
    # Helper to draw rounded rectangle with optional border and shadow
    def draw_card(xy, fill, outline=None, width=1, radius=16, shadow=True):
        x0, y0, x1, y1 = xy
        if shadow:
            # Simple soft drop shadow
            for offset, alpha in [(4, 20), (3, 25), (2, 35), (1, 45)]:
                draw.rounded_rectangle(
                    [x0 + offset, y0 + offset, x1 + offset, y1 + offset],
                    radius=radius,
                    fill=(0, 0, 0, alpha)
                )
        draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)

    def draw_badge(x, y, text, bg_color, text_color, font=font_card_badge, px=12, py=5, radius=10):
        bbox = draw.textbbox((x, y), text, font=font)
        bw = (bbox[2] - bbox[0]) + px * 2
        bh = (bbox[3] - bbox[1]) + py * 2
        draw.rounded_rectangle([x, y, x + bw, y + bh], radius=radius, fill=bg_color)
        draw.text((x + px, y + py), text, fill=text_color, font=font)
        return bw, bh

    def draw_down_arrow(x, y_start, y_end, label="", color=(99, 102, 241)):
        draw.line([(x, y_start), (x, y_end)], fill=color, width=4)
        # Arrowhead
        draw.polygon([(x, y_end), (x - 8, y_end - 16), (x + 8, y_end - 16)], fill=color)
        if label:
            l_bbox = draw.textbbox((0, 0), label, font=font_arrow)
            lw = l_bbox[2] - l_bbox[0]
            lh = l_bbox[3] - l_bbox[1]
            ymid = (y_start + y_end) // 2
            draw.rounded_rectangle([x - lw//2 - 12, ymid - lh//2 - 5, x + lw//2 + 12, ymid + lh//2 + 5], radius=6, fill=(255, 255, 255, 240), outline=color, width=2)
            draw.text((x - lw//2, ymid - lh//2 - 2), label, fill=color, font=font_arrow)

    def draw_bidirectional_arrow(x1, y1, x2, y2, label="", color=(16, 185, 129)):
        draw.line([(x1, y1), (x2, y2)], fill=color, width=4)
        # Arrowhead at end
        draw.polygon([(x2, y2), (x2 - 8, y2 - 16), (x2 + 8, y2 - 16)], fill=color)
        # Arrowhead at start
        draw.polygon([(x1, y1), (x1 - 8, y1 + 16), (x1 + 8, y1 + 16)], fill=color)
        if label:
            l_bbox = draw.textbbox((0, 0), label, font=font_arrow)
            lw = l_bbox[2] - l_bbox[0]
            lh = l_bbox[3] - l_bbox[1]
            ymid = (y1 + y2) // 2
            draw.rounded_rectangle([x1 - lw//2 - 12, ymid - lh//2 - 5, x1 + lw//2 + 12, ymid + lh//2 + 5], radius=6, fill=(255, 255, 255, 240), outline=color, width=2)
            draw.text((x1 - lw//2, ymid - lh//2 - 2), label, fill=color, font=font_arrow)

    # =========================================================
    # HEADER BANNER (Top: 0 to 120)
    # =========================================================
    # Header card
    draw_card([50, 30, 2350, 130], fill=(255, 255, 255, 255), outline=BORDER_LIGHT, width=2, radius=18)
    # Gradient accent bar at top of header
    draw.rounded_rectangle([50, 30, 2350, 42], radius=18, fill=NAVY_BLUE)
    draw.rectangle([50, 38, 2350, 42], fill=NAVY_BLUE)
    
    # Title & Subtitle
    draw.text((80, 50), "SNAPCLASS: SYSTEM ARCHITECTURE & DATAFLOW DIAGRAM", fill=NAVY_DARK, font=font_title)
    draw.text((80, 98), "AI-Based Intelligent Attendance System Using Facial Recognition | Decoupled Multi-Tier Cloud Architecture", fill=TEXT_MUTED, font=font_subtitle)
    
    # Header Badges on Right
    bx = 1860
    bx += draw_badge(bx, 62, "React 19 SPA", (238, 242, 255), (79, 70, 229))[0] + 16
    bx += draw_badge(bx, 62, "ResNet-34 AI", (245, 243, 255), (124, 58, 237))[0] + 16
    bx += draw_badge(bx, 62, "Supabase 3NF", (236, 253, 245), (5, 150, 105))[0]

    # =========================================================
    # TIER 1: CLIENT PRESENTATION TIER (160 to 520)
    # =========================================================
    t1_y0, t1_y1 = 160, 540
    # Tier container
    draw_card([50, t1_y0, 2350, t1_y1], fill=(240, 247, 255, 255), outline=(191, 219, 254), width=2, radius=18)
    
    # Tier Header Bar
    draw.rounded_rectangle([70, t1_y0 + 16, 480, t1_y0 + 56], radius=10, fill=(30, 64, 175))
    draw.text((88, t1_y0 + 22), "TIER 1: CLIENT PRESENTATION TIER", fill=(255, 255, 255), font=font_tier_title)
    draw_badge(500, t1_y0 + 18, "React 19 + TypeScript + Vite 6 + Tailwind CSS v4", (219, 234, 254), (30, 58, 138), font=font_tier_badge)

    # Sub-Card 1A: Teacher Portal
    c1a_x0, c1a_y0, c1a_x1, c1a_y1 = 80, 230, 1170, 515
    draw_card([c1a_x0, c1a_y0, c1a_x1, c1a_y1], fill=(255, 255, 255), outline=(191, 219, 254), width=2, radius=14)
    # Title bar
    draw.text((c1a_x0 + 20, c1a_y0 + 18), "Faculty Portal (TeacherScreen & Components)", fill=NAVY_DARK, font=font_card_title)
    draw_badge(c1a_x1 - 200, c1a_y0 + 14, "Instructor UI", (224, 231, 255), (67, 56, 202))
    draw.line([(c1a_x0 + 20, c1a_y0 + 54), (c1a_x1 - 20, c1a_y0 + 54)], fill=BORDER_LIGHT, width=1)
    
    # Features inside Teacher Portal
    t_items = [
        ("TakeAttendanceTab", "Multi-photo classroom gallery, angle snapshot staging, deep-scan trigger."),
        ("WebCamCapture HUD", "60 FPS viewfinder, facial framing reticles, real-time laser scanning line."),
        ("AttendanceResultModal", "Confidence source indicator, Present/Absent toggles, manual override audit."),
        ("ManageSubjectsTab", "Course creator, live SVG QR codes, WhatsApp group direct join links."),
        ("AttendanceRecordsTab", "Historical session logbook, aggregated attendance rates, 1-click CSV export.")
    ]
    cur_y = c1a_y0 + 64
    for code, desc in t_items:
        draw.text((c1a_x0 + 25, cur_y), f"• {code}:", fill=(30, 58, 138), font=font_card_title)
        draw.text((c1a_x0 + 280, cur_y + 2), desc, fill=TEXT_MAIN, font=font_card_body)
        cur_y += 39

    # Sub-Card 1B: Student Portal
    c1b_x0, c1b_y0, c1b_x1, c1b_y1 = 1230, 230, 2320, 515
    draw_card([c1b_x0, c1b_y0, c1b_x1, c1b_y1], fill=(255, 255, 255), outline=(191, 219, 254), width=2, radius=14)
    # Title bar
    draw.text((c1b_x0 + 20, c1b_y0 + 18), "Student Portal (StudentScreen & Components)", fill=NAVY_DARK, font=font_card_title)
    draw_badge(c1b_x1 - 180, c1b_y0 + 14, "Learner UI", (224, 231, 255), (67, 56, 202))
    draw.line([(c1b_x0 + 20, c1b_y0 + 54), (c1b_x1 - 20, c1b_y0 + 54)], fill=BORDER_LIGHT, width=1)
    
    # Features inside Student Portal
    s_items = [
        ("Biometric FaceID Login", "Webcam viewfinder with facial alignment HUD for secure zero-password login."),
        ("Voice Enrollment Module", "AudioRecorder with HTML5 Canvas live animated waveform frequency visualizer."),
        ("Course Auto-Enrollment", "Deep link parser (?join-code=CS101) & vector QR code camera scanning."),
        ("Attendance Tracker", "Live course percentage score, good standing badges (✅ Good / ⚠️ Shortage)."),
        ("1-Click Unenroll", "Instant course withdrawal confirmation modal with immediate profile sync.")
    ]
    cur_y = c1b_y0 + 64
    for code, desc in s_items:
        draw.text((c1b_x0 + 25, cur_y), f"• {code}:", fill=(67, 56, 202), font=font_card_title)
        draw.text((c1b_x0 + 285, cur_y + 2), desc, fill=TEXT_MAIN, font=font_card_body)
        cur_y += 39

    # =========================================================
    # CONNECTING ARROWS BETWEEN TIER 1 AND TIER 2
    # =========================================================
    # Arrow 1: Base64 Classroom Imagery
    draw_down_arrow(450, 540, 610, "Base64 Image Tensors (H x W x 3)", (99, 102, 241))
    # Arrow 2: Web Audio Waveforms
    draw_down_arrow(950, 540, 610, "16 kHz PCM Audio Waveforms", (168, 85, 247))
    # Arrow 3: Verification Results & Confidence Scores Back to Teacher
    draw.line([(1600, 610), (1600, 540)], fill=(16, 185, 129), width=4)
    draw.polygon([(1600, 540), (1592, 556), (1608, 556)], fill=(16, 185, 129))
    draw.rounded_rectangle([1430, 563, 1770, 592], radius=6, fill=(255, 255, 255, 240), outline=(16, 185, 129), width=2)
    draw.text((1445, 568), "Identified Students & Confidences", fill=(16, 185, 129), font=font_arrow)

    # =========================================================
    # TIER 2: AI & BIOMETRIC INFERENCE ENGINE (610 to 1010)
    # =========================================================
    t2_y0, t2_y1 = 610, 1020
    draw_card([50, t2_y0, 2350, t2_y1], fill=(250, 245, 255, 255), outline=(233, 213, 255), width=2, radius=18)
    
    # Tier Header Bar
    draw.rounded_rectangle([70, t2_y0 + 16, 560, t2_y0 + 56], radius=10, fill=(109, 40, 217))
    draw.text((88, t2_y0 + 22), "TIER 2: AI & BIOMETRIC INFERENCE ENGINE", fill=(255, 255, 255), font=font_tier_title)
    draw_badge(580, t2_y0 + 18, "Python 3.11 + Dlib ResNet-34 + Scikit-Learn + Resemblyzer + Librosa", (243, 232, 255), (109, 40, 217), font=font_tier_badge)

    # Sub-Card 2A: Deep Metric Facial Recognition Pipeline (Dlib ResNet-34)
    c2a_x0, c2a_y0, c2a_x1, c2a_y1 = 80, 680, 1550, 995
    draw_card([c2a_x0, c2a_y0, c2a_x1, c2a_y1], fill=(255, 255, 255), outline=(233, 213, 255), width=2, radius=14)
    draw.text((c2a_x0 + 20, c2a_y0 + 18), "Deep Metric Computer Vision Pipeline (face_pipeline.py)", fill=NAVY_DARK, font=font_card_title)
    draw_badge(c2a_x1 - 280, c2a_y0 + 14, "Primary Biometric Stream", (237, 233, 254), (109, 40, 217))
    draw.line([(c2a_x0 + 20, c2a_y0 + 54), (c2a_x1 - 20, c2a_y0 + 54)], fill=BORDER_LIGHT, width=1)

    # 4 Steps of Face Pipeline as connected boxes
    f_boxes = [
        ("Step 1: Detection", "Dlib HOG Frontal Detector", "Sliding window with 1x upsampling.\nLocates all multi-face bounding boxes.", (240, 245, 255), (30, 58, 138)),
        ("Step 2: Alignment", "68-Point Pose Predictor", "Maps anatomical landmarks across eyes,\nnose, lips. Performs affine rotation.", (245, 243, 255), (109, 40, 217)),
        ("Step 3: Embedding", "29-Layer ResNet-34 CNN", "Deep metric triplet loss network.\nExtracts 128-D vector on unit hypersphere.", (254, 242, 242), (185, 28, 28)),
        ("Step 4: Classification", "Linear SVC + L2 Threshold", "Dynamic Support Vector Classifier +\nEuclidean distance test: d <= 0.60.", (236, 253, 245), (5, 150, 105))
    ]
    fb_w = 330
    fb_h = 220
    cur_fb_x = c2a_x0 + 20
    for idx, (stitle, salgo, sdesc, sbg, stcol) in enumerate(f_boxes):
        draw_card([cur_fb_x, c2a_y0 + 70, cur_fb_x + fb_w, c2a_y0 + 70 + fb_h], fill=sbg, outline=BORDER_LIGHT, width=1, radius=10, shadow=False)
        draw.text((cur_fb_x + 14, c2a_y0 + 82), stitle, fill=stcol, font=font_card_title)
        draw.text((cur_fb_x + 14, c2a_y0 + 114), salgo, fill=NAVY_DARK, font=font_card_badge)
        draw.text((cur_fb_x + 14, c2a_y0 + 145), sdesc, fill=TEXT_MAIN, font=font_card_body)
        
        # Draw connector arrow between boxes
        if idx < 3:
            arr_x = cur_fb_x + fb_w + 5
            arr_y = c2a_y0 + 70 + fb_h // 2
            draw.line([(arr_x, arr_y), (arr_x + 22, arr_y)], fill=(124, 58, 237), width=3)
            draw.polygon([(arr_x + 22, arr_y), (arr_x + 14, arr_y - 6), (arr_x + 14, arr_y + 6)], fill=(124, 58, 237))
        cur_fb_x += fb_w + 35

    # Sub-Card 2B: Acoustic Voice Roll-Call Pipeline (Resemblyzer)
    c2b_x0, c2b_y0, c2b_x1, c2b_y1 = 1600, 680, 2320, 995
    draw_card([c2b_x0, c2b_y0, c2b_x1, c2b_y1], fill=(255, 255, 255), outline=(233, 213, 255), width=2, radius=14)
    draw.text((c2b_x0 + 20, c2b_y0 + 18), "Acoustic Voice Pipeline (voice_pipeline.py)", fill=NAVY_DARK, font=font_card_title)
    draw_badge(c2b_x1 - 250, c2b_y0 + 14, "Secondary Biometric Stream", (254, 243, 199), (180, 83, 9))
    draw.line([(c2b_x0 + 20, c2b_y0 + 54), (c2b_x1 - 20, c2b_y0 + 54)], fill=BORDER_LIGHT, width=1)

    v_items = [
        ("Librosa Audio Ingestion", "Resamples input signal to 16 kHz standardized mono channel."),
        ("Energy-Based Splitting", "Top-dB segmentation (top_db=30) isolates active spoken utterances."),
        ("3-Layer LSTM VoiceEncoder", "Resemblyzer deep recurrent model outputs 256-D speaker embeddings."),
        ("Cosine Similarity Metric", "Dot-product angular comparison with baseline vectors (tau >= 0.65).")
    ]
    cur_vy = c2b_y0 + 74
    for vtitle, vdesc in v_items:
        draw_badge(c2b_x0 + 20, cur_vy, vtitle, (243, 232, 255), (109, 40, 217))
        draw.text((c2b_x0 + 25, cur_vy + 32), vdesc, fill=TEXT_MAIN, font=font_card_body)
        cur_vy += 68

    # =========================================================
    # CONNECTING ARROWS BETWEEN TIER 2 AND TIER 3
    # =========================================================
    draw_bidirectional_arrow(600, 1020, 600, 1090, "Enrolled Baseline Vectors (128-D & 256-D)", (16, 185, 129))
    draw_down_arrow(1800, 1020, 1090, "Transactional Session Logs (timestamp, student_id, Present)", (5, 150, 105))

    # =========================================================
    # TIER 3: DATA PERSISTENCE & STORAGE TIER (1090 to 1420)
    # =========================================================
    t3_y0, t3_y1 = 1090, 1430
    draw_card([50, t3_y0, 2350, t3_y1], fill=(236, 253, 245, 255), outline=(167, 243, 208), width=2, radius=18)
    
    # Tier Header Bar
    draw.rounded_rectangle([70, t3_y0 + 16, 580, t3_y0 + 56], radius=10, fill=(4, 120, 87))
    draw.text((88, t3_y0 + 22), "TIER 3: PERSISTENCE & CLOUD STORAGE TIER", fill=(255, 255, 255), font=font_tier_title)
    draw_badge(600, t3_y0 + 18, "PostgreSQL 15 (Supabase Cloud) + PostgREST + LocalStorage Sync", (209, 250, 229), (6, 95, 70), font=font_tier_badge)

    # 5 Database Entity Cards (3NF Schema)
    tables = [
        ("teachers", ["id: UUID [PK]", "username: VARCHAR (Unique)", "password: TEXT (Bcrypt)", "name: VARCHAR", "created_at: TIMESTAMPTZ"], (240, 253, 250), (13, 148, 136)),
        ("subjects", ["id: UUID [PK]", "subject_code: VARCHAR", "name: VARCHAR", "section: VARCHAR", "teacher_id: UUID [FK]"], (240, 249, 255), (2, 132, 199)),
        ("subject_students", ["id: UUID [PK]", "subject_id: UUID [FK]", "student_id: UUID [FK]", "enrolled_at: TIMESTAMPTZ", "[Unique(subject, student)]"], (238, 242, 255), (79, 70, 229)),
        ("students", ["id: UUID [PK]", "name: VARCHAR", "face_embedding: FLOAT[128]", "voice_embedding: FLOAT[256]", "created_at: TIMESTAMPTZ"], (254, 242, 242), (225, 29, 72)),
        ("attendance_logs", ["id: UUID [PK]", "subject_id: UUID [FK]", "student_id: UUID [FK]", "timestamp: TIMESTAMPTZ", "status: BOOLEAN (Present)"], (245, 243, 255), (147, 51, 234))
    ]
    
    tb_w = 340
    tb_h = 240
    cur_tx = 80
    for tname, cols, tbg, tcol in tables:
        draw_card([cur_tx, t3_y0 + 70, cur_tx + tb_w, t3_y0 + 70 + tb_h], fill=(255, 255, 255), outline=(167, 243, 208), width=2, radius=12, shadow=False)
        # Header of table
        draw.rounded_rectangle([cur_tx, t3_y0 + 70, cur_tx + tb_w, t3_y0 + 110], radius=12, fill=tcol)
        draw.rectangle([cur_tx, t3_y0 + 95, cur_tx + tb_w, t3_y0 + 110], fill=tcol)
        draw.text((cur_tx + 16, t3_y0 + 78), f"Table: {tname}", fill=(255, 255, 255), font=font_card_title)
        
        # Columns
        cur_cy = t3_y0 + 120
        for col in cols:
            is_pk = "[PK]" in col
            is_fk = "[FK]" in col
            col_color = (185, 28, 28) if is_pk else ((3, 105, 161) if is_fk else TEXT_MAIN)
            draw.text((cur_tx + 16, cur_cy), f"• {col}", fill=col_color, font=font_card_code)
            cur_cy += 23
            
        cur_tx += tb_w + 30

    # Offline Fallback & CSV Export Card on the right
    c3b_x0 = cur_tx
    c3b_x1 = 2320
    draw_card([c3b_x0, t3_y0 + 70, c3b_x1, t3_y0 + 70 + tb_h], fill=(255, 255, 255), outline=(167, 243, 208), width=2, radius=12, shadow=False)
    draw.rounded_rectangle([c3b_x0, t3_y0 + 70, c3b_x1, t3_y0 + 110], radius=12, fill=(5, 150, 105))
    draw.rectangle([c3b_x0, t3_y0 + 95, c3b_x1, t3_y0 + 110], fill=(5, 150, 105))
    draw.text((c3b_x0 + 16, t3_y0 + 78), "Offline Layer & ERP Sync", fill=(255, 255, 255), font=font_card_title)

    off_items = [
        ("LocalStorage Service", "W3C Web Storage offline fallback when Supabase is disconnected."),
        ("Bcrypt Cryptography", "Salted password hashing for faculty authentication."),
        ("Instant CSV Export", "Direct CSV audit log generation for university ERP upload."),
        ("Zero-Photo Retention", "Photographs discarded post-inference; only vectors saved.")
    ]
    cur_oy = t3_y0 + 120
    for otitle, odesc in off_items:
        draw.text((c3b_x0 + 16, cur_oy), f"✓ {otitle}:", fill=(4, 120, 87), font=font_card_badge)
        draw.text((c3b_x0 + 16, cur_oy + 20), odesc, fill=TEXT_MAIN, font=font_card_body)
        cur_oy += 54

    # =========================================================
    # FOOTER BAR (Bottom: 1450 to 1500)
    # =========================================================
    draw.text((80, 1460), "SnapClass Project Architecture | Department of Computer Science & Engineering | Medi-Caps University, Indore", fill=TEXT_MUTED, font=font_footer)
    draw.text((1780, 1460), "Team: Ishika Khandelwal • Jayesh Parmar • Manasvi Septa", fill=NAVY_BLUE, font=font_footer)

    # Save High-Resolution Image
    out_dir = r"c:\Projects\SnapClass\docs"
    out_path = os.path.join(out_dir, "SnapClass_System_Architecture.png")
    img.save(out_path, format="PNG", dpi=(300, 300))
    print(f"Successfully generated High-Resolution PNG at: {out_path}")
    return out_path

if __name__ == "__main__":
    create_system_architecture_diagram()

