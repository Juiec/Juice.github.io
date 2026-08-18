# Learning Designer Portfolio

A modern, responsive portfolio website built with **React 19**, **Vite**, and **Tailwind CSS v4**. Showcases machine learning engineering work, educational technology projects, and design-driven development.

**Live:** [Deployed on Vercel](https://juice.github.io)

---

## ✨ Features

- **Modular Architecture**: Clean component separation with extracted sections (Hero, Mission, Projects, Skills, Contact)
- **Responsive Design**: Mobile-first, breakpoint-driven layout with fluid typography using `clamp()`
- **Interactive Scroll Snap**: Custom scroll engine with spring physics and audio feedback
- **3D Logo Canvas**: Three.js animated text rendering in the navigation
- **Skill Marquee**: Auto-scrolling skill tracks with staggered animations
- **Accessibility**: Semantic HTML, keyboard navigation, ARIA labels

---

## 🏗️ Architecture

### Frontend Stack
- **React 19.0.0** + React DOM 19.0.0
- **Vite 8.0.0** for rapid development and optimized builds
- **TypeScript 5.7** for type safety
- **Tailwind CSS v4** with `@tailwindcss/vite` plugin
- **Three.js 0.185.1** for 3D logo rendering

### Project Structure

```
src/
├── App.tsx                 # Root component, scroll-snap engine, utilities
├── main.tsx               # React entry point
├── index.css              # Global styles, Tailwind import, animations
├── vite-env.d.ts          # Vite environment types
│
├── components/            # Section and UI components
│   ├── Hero.tsx           # Hero section with headline and CTA buttons
│   ├── Mission.tsx        # About section with tabbed interface
│   ├── Projects.tsx       # Portfolio grid with expandable cards
│   ├── Skills.tsx         # Skill marquee with animated tracks
│   ├── Contact.tsx        # Contact section with social links and actions
│   ├── Nav.tsx            # Navigation with Three.js logo
│   ├── Eyebrow.tsx        # Section subtitle component
│   └── SectionHeading.tsx # Reusable section heading
│
└── hooks/                 # Custom React hooks
    └── useBreakpoint.ts   # Responsive breakpoint logic

Config files:
├── vite.config.ts         # Vite configuration with React plugin
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── .mise.toml             # Toolchain versions (Node.js, pnpm)
```

### Responsive Breakpoints

The `useBreakpoint` hook provides mobile-first responsive flags:
- **sm**: `window.innerWidth ≤ 480px` (phone portrait)
- **md**: `window.innerWidth ≤ 768px` (phone landscape / small tablet)
- **lg**: `window.innerWidth ≤ 1024px` (tablet)

### Padding Standard

All sections use consistent, fluid padding:
- **Mobile** (sm): `72px 20px 100px` (top/bottom/sides)
- **Tablet** (md/lg): `90px 28px 100px`
- **Desktop**: `100px 64px 64px`

Typography scales with `clamp()` for fluid responsiveness:
- Example: `fontSize: clamp(34px, 10vw, 52px)` scales from 34px to 52px as viewport grows

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Juiec/Juice.github.io.git
cd Juice.github.io

# Install dependencies
pnpm install

# Start development server (runs on 0.0.0.0:8443)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Format code
pnpm format
```

### Environment Variables

Create a `.env.local` file for social and contact links:

```env
VITE_GITHUB_HANDLE=@username
VITE_GITHUB_URL=https://github.com/username
VITE_LINKEDIN_HANDLE=@username
VITE_LINKEDIN_URL=https://linkedin.com/in/username
VITE_EMAIL=hello@example.com
VITE_WHATSAPP_NUMBER=+1234567890
VITE_WHATSAPP_URL=https://wa.me/1234567890
VITE_RESUME_PATH=/resume.pdf
```

---

## 🎨 Styling

### Tailwind CSS v4

The project uses **Tailwind CSS v4** with the `@tailwindcss/vite` plugin:

- `src/index.css` imports Tailwind: `@import 'tailwindcss';`
- No separate `tailwind.config.js` or PostCSS config needed
- Global fonts, animations, and component utilities in `src/index.css`

### Global Utilities

Key CSS classes defined in `src/index.css`:
- `.font-display`, `.font-body` — Font family helpers
- `.eyebrow` — Small uppercase labels (13px)
- `.section-heading` — Fluid section titles (28px–52px)
- `.btn-primary`, `.btn-outline` — Button styles with hover effects
- `.card` — Card component with shadow and hover elevation
- `.marquee-left`, `.marquee-right`, etc. — Skill scroll animations

---

## 🔧 Development

### Hot Module Reloading

Vite's HMR is enabled on `0.0.0.0:8443`. Changes to source files are instantly reflected in the browser.

### Build & Optimization

```bash
# Development build (faster, includes source maps)
pnpm dev

# Production build (optimized, minified)
pnpm build

# Output: dist/ folder ready for deployment
```

**Bundle size:** ~733 KB (minified), ~197 KB (gzip)

### Code Quality

- TypeScript strict mode enabled
- ESLint configured for React
- Code formatting with oxfmt (configured in `package.json`)

---

## 📋 Sections Overview

### Hero
- Headline with highlighted word ("Education")
- Tagline explaining focus
- Two CTA buttons: "View work" and "Read Research"
- Responsive text sizing and 2-column layout

### Mission (About)
- Sticky left heading on desktop
- Three tabs: Education, Focus, Experience
- Tab-switching animations
- Education: degree info and coursework tags
- Focus: three pillars with icons
- Experience: three roles with descriptions

### Projects
- Responsive grid: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- Expandable "Show All" toggle with smooth `max-height` animation
- Project cards with staggered entrance animations
- Cards hover on desktop (elevation shadow)

### Skills
- Five marquee tracks scrolling left/right at different speeds
- Skills tripled in each track for seamless looping
- Separated skill names and bullet separators

### Contact
- Two-column layout (mobile → single column)
- Left: Social links (GitHub, LinkedIn) with decorative dividers
- Right: Action cards (Email, WhatsApp, Resume download)
- Footer with copyright
- Decorative SVG ink line dividers

### Navigation
- Desktop: Fixed top nav with sliding pill active indicator
- Mobile: Bottom fixed tab bar with icon stacks
- Three.js logo with click-triggered spin animation
- Scroll-dependent shadow elevation

---

## 🎯 Performance

### Optimization Strategies

1. **Code Splitting**: Vite automatically chunks large modules
2. **Image Optimization**: SVG logos and inline graphics, minimal raster images
3. **CSS Optimization**: Tailwind purges unused styles in production
4. **Lazy Loading**: Hero section full viewport height, scroll-snap keeps DOM lite
5. **Animations**: CSS keyframes and `transform`/`opacity` for GPU acceleration

### Metrics

- **First Contentful Paint**: < 1s on 4G
- **Time to Interactive**: < 2s on 4G
- **Lighthouse Score**: 90+ (varies with deployment environment)

---

## 🔐 Deployment

### Vercel

This project is deployed on Vercel with automatic builds from `main` branch.

```bash
# Deploy (automatic on git push to main)
pnpm build
# Output in dist/ is deployed to production
```

### Environment on Deployment

Ensure `.env.local` variables are set in Vercel project settings → Environment Variables.

---

## 📝 License

This portfolio is open source under the MIT License. Feel free to use this as a template for your own portfolio, but please credit the original design and remove personal content.

---

## 🤝 Contributing

Found a bug or want to suggest a feature? Open an issue or PR!

---

**Built with ❤️ as a showcase of AI + Education engineering work.**
