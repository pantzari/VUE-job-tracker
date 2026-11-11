# 🍓 Job Tracker for Desktop

A desktop application designed to help job seekers organize, manage, and track their job applications in real time. Built with **Vue 3** and **Vite**, packaged for the desktop with **Electron**, and styled with a custom aesthetic and native frameless window controls.

---

## ୨ৎ Overview

**Job Tracker** combines the reactive UI of modern web technologies with native desktop integration. It allows users to quickly log job applications, monitor pipeline statuses (Applied, Interview, Offer, Rejected), and retain all data locally between application launches.

---

## ୨ৎ Features

- **Application Tracking**: Log applications with company name, job role, submission date, and current status.
- **Visual Status Indicators**: Color-coded badges for quick pipeline triage (`Applied`, `Interview`, `Offer`, `Rejected`).
- **Data Persistence**: Automatic client-side synchronization with `localStorage`—no external database setup or internet connection required.
- **Custom Desktop Experience**: Frameless window design with customized native Windows titlebar controls and custom application iconography.
- **Standalone Installer**: Distributed as a standalone Windows NSIS installer (`.exe`) with start menu and desktop shortcut generation.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **Build Tool**: [Vite](https://vite.dev/) (Fast HMR & optimized production bundling)
- **Desktop Runtime**: [Electron](https://www.electronjs.org/)
- **Packaging & Distribution**: [electron-builder](https://www.electron.build/) (NSIS Windows targets)
- **Styling**: Modern CSS3 (Custom design system, CSS variables, Google Fonts)

### 🔒 Security & Architecture Highlights
- **Process Separation**: Leverages Electron's multi-process architecture with `contextIsolation: true` and `nodeIntegration: false`.
- **Preload Bridge**: Safe communication between the renderer process and main process via a scoped `contextBridge` (`preload.cjs`).
- **Relative Asset Resolution**: Configured Vite base paths for seamless offline protocol (`file://`) loading within packaged Electron `.asar` bundles.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22+ or LTS recommended)
- `npm` (comes with Node.js)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/job-tracker.git
   cd job-tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

---

## 💻 Running the App

### Development Mode

Run the Vite local development server:
```bash
npm run dev
```

In a separate terminal, launch the Electron window:
```bash
npm run electron
```

### Production Build & Packaging

Compile the Vue frontend and package the Windows NSIS installer:
```bash
npm run dist
```

The resulting standalone installer will be output to:
```text
dist/Job Tracker Setup 1.0.0.exe
```
