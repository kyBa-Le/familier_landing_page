---
name: nextjs-landing-page
description: Develop stunning, highly performant, fully responsive, and absolutely bug-free Next.js landing pages. This skill ensures strict TypeScript adherence, Next.js App Router best practices, proper image and font optimization, hydration mismatch elimination, premium visual aesthetics, and solid SEO implementation.
---

This skill equips agents with highly efficient, copy-pasteable architectural patterns, configurations, and verification checklists to build resilient, premium Next.js landing pages with zero bugs.

---

## 🛠️ 1. Hydration Mismatch Resolution (Zero-Bug Hydration)

Hydration warnings indicate server-client markup differences. Use these two plug-and-play strategies to instantly resolve them:

### A. Dynamic Imports (No SSR)
For client-side interactive widgets (calculators, user timezones, local storage state, sliders):
```tsx
import dynamic from 'next/dynamic';

const InteractiveWidget = dynamic(
  () => import('@/components/InteractiveWidget').then((m) => m.InteractiveWidget),
  { ssr: false, loading: () => <WidgetSkeleton /> }
);
```

### B. Safe Client-Only Hook
For stateful, client-side only sections, use this custom hook to defer rendering:
```tsx
// hooks/use-mounted.ts
import { useEffect, useState } from 'react';

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
```

**Usage:**
```tsx
'use client';
import { useMounted } from '@/hooks/use-mounted';

export function ClientOnlySection() {
  const mounted = useMounted();
  if (!mounted) return <SectionSkeleton />;
  return <RealSection />;
}
```

---

## 🖼️ 2. High-Performance Image Patterns (`next/image`)

To avoid layout shifts (CLS) and maximize Core Web Vitals performance:

### Pattern A: Known Aspect Ratio
Always specify explicit sizes to reserve space during page loads:
```tsx
import Image from 'next/image';

export function FeatureCardImage() {
  return (
    <Image
      src="/assets/feature.png"
      alt="Interactive analytics dashboard preview"
      width={600}
      height={400}
      className="rounded-xl object-cover"
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    />
  );
}
```

### Pattern B: Hero / Responsive Backgrounds
For header sections and background meshes, use `fill` with parent `position: relative`:
```tsx
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden">
      <Image
        src="/assets/hero-glow.webp"
        alt="Premium metallic tech background with glowing nodes"
        fill
        priority // Preloads the hero asset immediately
        className="object-cover pointer-events-none"
        sizes="100vw"
      />
      <div className="relative z-10">Hero Content</div>
    </section>
  );
}
```

---

## 🧭 3. App Router Architecture & SEO Best Practices

To leverage React Server Components (RSC) performance, organize your landing page layout and metadata precisely.

### Layout Setup (`app/layout.tsx`)
```tsx
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import '@/styles/globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0a0a0c',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Premium SaaS Platform - Elevate Your Workflow',
  description: 'Deploy lightning-fast interfaces with absolute precision and premium dark aesthetic.',
  metadataBase: new URL('https://yourdomain.com'),
  openGraph: {
    title: 'Premium SaaS Platform',
    description: 'Deploy lightning-fast interfaces with absolute precision.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="antialiased bg-[#0a0a0c] text-[#f8fafc]">
        {children}
      </body>
    </html>
  );
}
```

---

## 🎨 4. CSS Design System (Vanilla CSS / Tailwind)

Implement a robust aesthetic theme using structural variables:

```css
/* app/globals.css */
@layer base {
  :root {
    --font-display: var(--font-display), sans-serif;
    --font-body: var(--font-body), sans-serif;

    /* Theme Palette */
    --color-bg-base: #060608;
    --color-bg-card: #0c0d12;
    --color-border: rgba(255, 255, 255, 0.08);
    --color-accent: #6366f1;
    --color-accent-rgb: 99, 102, 241;
    --color-text-primary: #f8fafc;
    --color-text-secondary: #94a3b8;
    
    /* Animation Easing */
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  }
}

/* Glassmorphism Card Utility */
.glass-card {
  background: rgba(12, 13, 18, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
}

/* Accent Glow Utility */
.glow-effect {
  position: relative;
}
.glow-effect::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 0 40px rgba(var(--color-accent-rgb), 0.15);
  opacity: 0;
  transition: opacity 0.4s var(--ease-out-expo);
  pointer-events: none;
}
.glow-effect:hover::after {
  opacity: 1;
}
```

---

## ⚡ 5. Verification Commands & Diagnostics

To guarantee a completely bug-free build before declaring completion:

1. **Strict TypeScript & Build Check**:
   ```bash
   npm run build
   ```
   *Ensure there are no compilation errors, missing dependencies, or warning outputs.*

2. **Linter Validation**:
   ```bash
   npm run lint
   ```
   *Fix any invalid `next/image` usage, unescaped quote characters, or unused variables.*

3. **Checklist for Local Hydration Check**:
   - Run the development server: `npm run dev`.
   - Open browser developer tools and check the console.
   - Inspect the logs. If a red hydration warning occurs, immediately locate the component causing it and wrap it in the `useMounted` hook or load it via a `dynamic` client import.
