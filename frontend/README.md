# SnapClass Frontend 🚀

AI-Powered Smart Attendance & Classroom Management System built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**.

---

## ✨ Features

### 🎓 Student Portal
- **Biometric FaceID Login**: Real-time webcam viewfinder with face alignment HUD, target reticles, and scanning laser line.
- **Voice Enrollment**: Audio recorder with live animated frequency waveform visualizer via HTML5 Canvas & Web Audio API.
- **Course Enrollment**: Manual subject code entry or auto-enrollment via deep links (`?join-code=CS101`) & QR codes.
- **Attendance Tracker**: Live attendance percentage score, good standing badges (`✅ Good` / `⚠️ Low`), and total vs attended classes.
- **1-Click Unenroll**: Easily manage course participation with instant confirmation.

### 👨‍🏫 Teacher Portal
- **Faculty Authentication**: Secure login & registration with preloaded demo profile (Prof. Ananya Roy).
- **Take AI Attendance**:
  - Multi-photo classroom gallery (webcam angle snapshots + batch file upload).
  - Deep face analysis simulation with student recognition & confidence match sources.
  - Classroom voice roll call analysis.
  - Review & edit modal with instant Present/Absent toggles and confetti celebration (`canvas-confetti`).
- **Manage Subjects**:
  - Neo-brutalist course cards with student & class counters.
  - Subject creator modal.
  - Live QR code generator (`qrcode.react`), copyable direct link, and WhatsApp group sharing.
- **Attendance Records**:
  - Historical session logbook grouped by date and class.
  - Attendance rates, interactive session breakdown modal.
  - 1-click CSV export.

---

## 🛠️ Quick Start

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Start the development server
npm run dev

# 3. Build for production
npm run build
```

---

## 🎨 Visual Identity & Styling
- **Neo-Brutalist Aesthetic**: Bold 2px black borders, offset box shadows, rounded cards (`rounded-3xl`), and responsive layouts.
- **Color Palette**:
  - Primary Purple: `#5865F2`
  - Accent Pink: `#EB459E`
  - Soft Lavender: `#E0E3FF`
  - Dark Slate: `#12142B`
- **Typography**: `Climate Crisis` & `Outfit` fonts.
