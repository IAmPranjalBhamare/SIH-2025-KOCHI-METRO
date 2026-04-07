# Kochi Metro Decision Support Dashboard

A modern React + TypeScript dashboard for Kochi Metro operations, built with Vite.  
Provides fleet monitoring, maintenance planning, worker motivation, and AI-powered decision support.

---

## 🚀 Project Summary

Kochi Metro Decision Support Dashboard is a complete front-end system with:

- Admin and worker login flows
- Fleet overview, trainset details, and maintenance scheduling
- Decision support UI panel
- Goal-based worker dashboards and gamification
- Multi-language support (language selector)
- Reusable UI component library (`src/components/ui/*`)
- AI/unique features modules in `src/components/unique-features/*`
- Production site output in `build/`

---

## 🧩 Tech Stack

- React 18
- TypeScript
- Vite
- CSS + custom UI components
- Google auth + custom login modules
- Build output: `build/`

---

## 📁 Folder Structure

- `src/main.tsx` & `src/App.tsx` — app bootstrap
- `src/components/` — feature modules (AdminLogin, Dashboard, WorkerDashboard, etc.)
- `src/components/ui/` — shared components (button, card, table, dialog, etc.)
- `src/components/unique-features/` — AI-enabled features
- `src/contexts/LanguageContext.tsx` — language context
- `src/styles/globals.css` — global styles
- `src/tsconfig.json` / `vite.config.ts` — build config

---

## ▶️ Setup

```bash
npm install
npm run dev
