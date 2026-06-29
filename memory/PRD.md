# PrarthnaOS — Portfolio Site (PRD)

## Original Problem Statement
Build a 2000s pixelated desktop portfolio for Prarthna Tiwari. Pastel pink + black,
gaming + fashion vibe. Apps include AI Investor Dashboard, Gaming Console, Secret-Life
Book, Contact widget, plus a cartoon-pixel character of Prarthna. Iteration 2 (Dec 2025)
added: ThinkingCharacter that surfaces project rationale, replaced the Photo Gallery
with a Pinky Player chiptune music app, richer FM-bell click sounds, and toned down
all "AI generated" cringy copy.

## Architecture
- Frontend: React (CRA) · Tailwind · Shadcn primitives (sonner Toaster only) ·
  WebAudio for live synth music & UI clicks · Gemini Nano Banana (used once, offline)
  to generate the cartoon avatar variants at /frontend/public/avatars/.
- Backend: FastAPI + Motor + MongoDB. Endpoints: /api/, /api/status (legacy),
  /api/contact (POST + GET), /api/guestbook (POST + GET).
- Mobile: <768px viewport renders a Tamagotchi-shell view with the same app windows
  inlined.

## User Personas
- Recruiters / hiring managers (primary)
- Hackathon orgs and collaborators
- Designers + friends (secondary — they enjoy the OS)

## Core Requirements (static)
- Boot screen → desktop with draggable, minimisable, maximisable, closeable windows
- Pastel-pink + black pixel art aesthetic; chunky borders, dithered shadows, CRT scanlines
- All copy must reflect the real resume — no hallucinated achievements
- Apps: My Computer, AI Investor Dashboard, Prarthna-Arcade, About-Me Book,
  Contact Messenger, Pinky Player (music), Dress-Up
- Contact form posts to MongoDB
- ThinkingCharacter shows project rationale (the "why") for the active window
- Mobile-friendly fallback view

## What's Been Implemented (Dec 2025)
- Iteration 1: full PrarthnaOS desktop with 7 apps + boot + taskbar + start menu +
  draggable windows + AI-generated pixel avatars (main, gamer, book) + mobile
  Tamagotchi + contact form persistence in MongoDB + Photo Gallery (later removed).
- Iteration 2:
  - Removed Photo Gallery (Unsplash stock looked too generic / AI-y)
  - Added Pinky Player music app with synthesised 4-bar chord loop (F-Am-Bb-C)
  - Upgraded UI click to two-oscillator FM bell + square-wave pop (richer/tactile)
  - Added ThinkingCharacter widget bottom-right: speech bubble surfaces the
    project rationale ("why") for whichever window is active, idle thoughts cycle otherwise
  - Toned down copy across Boot, MyComputer, Contact, Investor, Arcade, Book, Dress-Up
  - Tightened desktop icon labels (single-line, whitespace-nowrap)
  - Fixed Window pointer-capture bug so close/minimize/max clicks are never swallowed
  - QA: backend 6/6 pytest pass; frontend ~98% (all 13 feature checks)

## Backlog / Next Tasks
- P1: Add Easter-egg recycle bin animation (currently inert)
- P1: Persist sound preference + active track in localStorage
- P2: Resume preview window (inline PDF viewer instead of just download)
- P2: Guestbook desktop app reading /api/guestbook
- P2: 2000s screen-saver mode triggered after 60s of inactivity
- P3: Drag-and-drop window snapping (left half / right half / maximise via edge drag)
- P3: Theme switcher (pastel-pink ↔ midnight-pink dark mode)
