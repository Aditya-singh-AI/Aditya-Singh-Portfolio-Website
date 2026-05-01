# Aditya Singh — Premium Portfolio Website

Welcome to the repository for my personal portfolio website! This project is a highly interactive, beautifully designed, and performant web application that showcases my skills, experience, and recent projects. It is built with modern web technologies and focuses on premium aesthetics, dynamic animations, and responsive design.

![Portfolio Preview](/public/Hero%20image.png)

## 🚀 Live Demo
Visit the live site: [Aditya Singh Portfolio](https://aditya-singh-portfolio-website.vercel.app/)

---

## 🛠️ Tech Stack & Technologies

- **Framework**: [React.js](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: React Router DOM

---

## 🏗️ Project Structure

The project follows a modular, component-driven architecture for maintainability and scalability.

```text
📦 Aditya-Singh-Portfolio-Website
 ┣ 📂 public/              # Static assets (images, PDFs, SVGs)
 ┣ 📂 src/                 # Main source code
 ┃ ┣ 📂 components/        # Reusable UI and Section components
 ┃ ┃ ┣ 📜 HeroSection.tsx      # Landing hero with mesh gradients & typewriter
 ┃ ┃ ┣ 📜 AboutSection.tsx     # Personal details, stats, and background
 ┃ ┃ ┣ 📜 SkillsSection.tsx    # Technical skills breakdown
 ┃ ┃ ┣ 📜 ProjectsSection.tsx  # Featured and past projects with 3D tilt effects
 ┃ ┃ ┣ 📜 ExperienceSection.tsx# Timeline of work history and education
 ┃ ┃ ┣ 📜 ContactSection.tsx   # Interactive contact form and social links
 ┃ ┃ ┣ 📜 Navigation.tsx       # Smart sticky navigation bar
 ┃ ┃ ┣ 📜 CursorFollower.tsx   # Custom animated cursor for desktop
 ┃ ┃ ┣ 📜 FloatingParticles.tsx# Ambient background canvas particles
 ┃ ┃ ┗ 📂 ui/                  # Shadcn UI primitives (Buttons, Inputs, etc.)
 ┃ ┣ 📂 pages/             # Route level components (Index.tsx, NotFound.tsx)
 ┃ ┣ 📂 lib/               # Utility functions and helpers
 ┃ ┣ 📂 hooks/             # Custom React hooks
 ┃ ┣ 📜 App.tsx            # Root application component & routing
 ┃ ┣ 📜 main.tsx           # React DOM rendering entry point
 ┃ ┗ 📜 index.css          # Global styles, Tailwind directives, & keyframes
 ┣ 📜 package.json         # Project metadata and dependencies
 ┣ 📜 tailwind.config.ts   # Tailwind theme and plugin configuration
 ┗ 📜 vite.config.ts       # Vite bundler configuration
```

---

## 🌊 Application Flow & User Experience

The portfolio is designed as a seamless, single-page-like experience with smooth scrolling and engaging micro-interactions.

1. **Immersive Entry**: The site begins with a sleek `LoadingScreen` that builds anticipation before revealing the main content.
2. **Hero Section (`HeroSection.tsx`)**: Users are greeted with an animated mesh gradient background, a dynamic typewriter effect highlighting my roles, and quick access to my resume and social links.
3. **About Me (`AboutSection.tsx`)**: Provides a quick overview of my background, location, and core philosophies (Clean Code, Creative Design, Performance), accompanied by animated glow cards.
4. **Skills Breakdown (`SkillsSection.tsx`)**: My technical proficiencies are categorized (Frontend, Backend, Tools) with interactive, animated progress bars.
5. **Project Showcase (`ProjectsSection.tsx`)**: Highlights my best work (e.g., DeepScanX, Badminton Tournament System). Features 3D tilt cards on hover and direct links to live demos and GitHub repositories.
6. **Experience Timeline (`ExperienceSection.tsx`)**: A vertical timeline layout detailing my educational background and professional journey.
7. **Contact & Footer (`ContactSection.tsx`, `Footer.tsx`)**: A fully functional contact form utilizing `react-hook-form` and `zod` for validation, along with final calls-to-action.

### 🎨 Visual Enhancements
- **Custom Cursor**: The `CursorFollower.tsx` creates a magnetic, expanding custom cursor that reacts to interactive elements (disabled on mobile for performance).
- **Background Particles**: `FloatingParticles.tsx` renders a lightweight canvas of connected nodes. (Intelligently disabled on mobile devices to prevent lag and battery drain).
- **Scroll Progress**: A top progress bar tracks the user's journey down the page.

---

## 💻 Running the Project Locally

If you want to explore the code or run the portfolio locally, follow these steps:

**Prerequisites:** Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

1. **Clone the repository**
   ```sh
   git clone https://github.com/Aditya-singh-AI/Aditya-Singh-Portfolio-Website.git
   ```

2. **Navigate to the project directory**
   ```sh
   cd Aditya-Singh-Portfolio-Website
   ```

3. **Install dependencies**
   ```sh
   npm install
   ```

4. **Start the development server**
   ```sh
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173` in your web browser.

---

## 📝 License
Designed and developed by **Aditya Singh**. All rights reserved.
