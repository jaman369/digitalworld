# Digital World - Next.js 15 Migration

This is a premium, pixel-perfect transition of the Digital World website into Next.js 15 (App Router), TypeScript, and Tailwind CSS.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Runtime / Language**: React 19, TypeScript
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Folder Structure
- `app/` - App router pages, routes, metadata config, and layouts
- `components/` - Reusable UI components (header, footer, mega-menu, section modules)
- `hooks/` - Custom client hooks (e.g. useCountUp, useScroll)
- `lib/` - Shared utility scripts
- `constants/` - Color systems, menu paths, and fixed values
- `data/` - Static JSON files representing services, stats, countries
- `types/` - Core TypeScript typing definitions
- `public/` - Static assets, images, icons, and resumed PDF attachments

## How to Run

Follow these steps to run the project locally.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

### 3. Build for Production
```bash
npm run build
```

### 4. Start Production Server
```bash
npm start
```
