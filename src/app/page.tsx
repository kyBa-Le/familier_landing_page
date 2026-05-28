'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Static image imports for reliable subpath resolution on GitHub Pages
import dashboardImg from '../../public/familier_dashboard.png';
import locatorImg from '../../public/familier_locator.png';
import tasksImg from '../../public/familier_tasks.png';

// Safe hydration wrapper pattern from our nextjs-landing-page skill
function SafeHydration({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#060608] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-10 w-32 bg-neutral-900 rounded-full" />
          <div className="h-4 w-48 bg-neutral-900 rounded" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function Home() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Feature showcase tab state
  const [activeTab, setActiveTab] = useState<'calendar' | 'locator' | 'tasks'>('calendar');

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Email submission state
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  const tabsInfo = {
    calendar: {
      title: "Shared Smart Calendar",
      badge: "Stay in Sync",
      description: "No more scheduling conflicts. Sync school runs, pediatric visits, sports schedules, and dynamic family events in a single, high-fidelity timeline with instant family push notifications.",
      image: dashboardImg,
      alt: "Familier app dashboard showing the shared family calendar with upcoming events and a beautiful dark UI.",
      bullets: [
        "Color-coded events for each family member",
        "Automated reminders sent to responsible parents",
        "Import schedules from school portals and external calendars",
        "Dynamic weather alerts attached to outdoor event cards"
      ],
      color: "from-indigo-500/20 to-indigo-600/5",
      borderColor: "border-indigo-500/30"
    },
    locator: {
      title: "Real-Time Locator & Safe Zones",
      badge: "Peace of Mind",
      description: "Securely share real-time locations with your family. Create custom 'Safe Zones' (like school, home, or soccer practice) and receive automated notifications when your child arrives or leaves.",
      image: locatorImg,
      alt: "Familier app locator interface showing family members' locations on a premium dark theme map with geofenced safety alerts.",
      bullets: [
        "End-to-end encrypted location data for absolute privacy",
        "Geofenced Safe Zones with automated arrival alerts",
        "Battery-optimized background tracking that doesn't drain devices",
        "Instant 'Help Request' SOS button with precise GPS routing for emergency contacts"
      ],
      color: "from-emerald-500/20 to-emerald-600/5",
      borderColor: "border-emerald-500/30"
    },
    tasks: {
      title: "Collaborative Lists & Chores",
      badge: "Gamified Responsibility",
      description: "Turn boring daily chores into a fun game. Assign tasks to your children, set up reward milestones, track weekly habits, and update shared grocery lists in real-time as a family unit.",
      image: tasksImg,
      alt: "Familier app chore management screen displaying gamified family checklists, progress wheels, and children reward point badges.",
      bullets: [
        "Real-time synchronized grocery and shopping checklists",
        "Gamified chore boards with customizable point systems and physical rewards",
        "Recurring chore schedules for weekend cleaning or school homework preparation",
        "Approval loops for parents to verify completed tasks before points are awarded"
      ],
      color: "from-rose-500/20 to-rose-600/5",
      borderColor: "border-rose-500/30"
    }
  };

  return (
    <SafeHydration>
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 right-0 h-[100vh] ambient-glow-indigo pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-[180vh] left-0 right-0 h-[100vh] ambient-glow-rose pointer-events-none -z-10" />

      {/* Floating Header */}
      <header className="sticky top-0 z-50 glass-header w-full transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-rose-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              F
            </div>
            <span className="font-display font-bold text-2xl tracking-tight bg-gradient-to-r from-white via-[#f8fafc] to-[#94a3b8] bg-clip-text text-transparent">
              Familier
            </span>
          </a>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-[#94a3b8] hover:text-white transition-colors">Features</a>
            <a href="#showcase" className="text-sm font-medium text-[#94a3b8] hover:text-white transition-colors">Interactive Demo</a>
            <a href="#security" className="text-sm font-medium text-[#94a3b8] hover:text-white transition-colors">Privacy & Vault</a>
            <a href="#faq" className="text-sm font-medium text-[#94a3b8] hover:text-white transition-colors">FAQs</a>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#download" 
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-neutral-200 transition-colors"
            >
              Get Familier Free
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#94a3b8] hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-[#0e0f14] border-b border-white/5 px-6 py-8 flex flex-col gap-6 animate-fade-in-up">
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-[#94a3b8] hover:text-white transition-colors"
            >
              Features
            </a>
            <a 
              href="#showcase" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-[#94a3b8] hover:text-white transition-colors"
            >
              Interactive Demo
            </a>
            <a 
              href="#security" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-[#94a3b8] hover:text-white transition-colors"
            >
              Privacy & Vault
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-[#94a3b8] hover:text-white transition-colors"
            >
              FAQs
            </a>
            <div className="h-[1px] bg-white/5 w-full my-2" />
            <a 
              href="#download"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-full text-center font-semibold bg-white text-black hover:bg-neutral-200 transition-colors"
            >
              Get Familier Free
            </a>
          </div>
        )}
      </header>

      <main className="flex-1 w-full overflow-hidden">
        {/* HERO SECTION */}
        <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 flex flex-col items-start gap-8 text-left max-w-2xl">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold tracking-wide text-indigo-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              PRIVACY-FIRST FAMILY COORDINATOR
            </div>

            {/* Main H1 Title */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight bg-gradient-to-b from-white via-[#f8fafc] to-[#94a3b8] bg-clip-text text-transparent">
              Reconnect Your Family's Daily World
            </h1>

            {/* Description */}
            <p className="text-lg text-[#94a3b8] leading-relaxed max-w-xl">
              Familier is a private, secure social space and utility workspace designed strictly for your household. Manage dynamic schedules, locate children safely, gamify daily chores, and organize files in an encrypted digital sanctuary.
            </p>

            {/* App Store/Play Store Download Badges */}
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <a 
                href="#download" 
                className="flex items-center gap-3 bg-[#0e0f14] border border-white/5 hover:border-white/20 hover:bg-[#14161f] px-5 py-3 rounded-2xl transition-all duration-300 group shadow-md"
              >
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C16 1.04 14.9 1.6 14.24 2.38C13.68 3.04 13.19 4.14 13.34 5.39C14.39 5.47 15.4 4.88 15.97 4.17Z" />
                </svg>
                <div className="text-left">
                  <span className="block text-[10px] text-[#64748b] uppercase tracking-wider font-semibold">Download on the</span>
                  <span className="block text-sm font-bold text-white leading-tight">App Store</span>
                </div>
              </a>

              <a 
                href="#download" 
                className="flex items-center gap-3 bg-[#0e0f14] border border-white/5 hover:border-white/20 hover:bg-[#14161f] px-5 py-3 rounded-2xl transition-all duration-300 group shadow-md"
              >
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5,3.14L16.2,14.3l3.6-3.6L5,3.14z M3,3.86V20.1l12-12L3,3.86z M16.91,15.01L5.86,20.54L16.91,15.01z M17.62,14.3l4.63-2.65 c0.54-0.31,0.54-1.09,0-1.4L17.62,9.3l-4.14,4.14L17.62,14.3z" />
                </svg>
                <div className="text-left">
                  <span className="block text-[10px] text-[#64748b] uppercase tracking-wider font-semibold">Get it on</span>
                  <span className="block text-sm font-bold text-white leading-tight">Google Play</span>
                </div>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5 w-full max-w-md">
              <div>
                <span className="block text-2xl font-bold text-white font-display">99.8%</span>
                <span className="block text-xs text-[#64748b] mt-0.5">Uptime Sync Rate</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-white font-display">4.9★</span>
                <span className="block text-xs text-[#64748b] mt-0.5">App Rating</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-white font-display">256-bit</span>
                <span className="block text-xs text-[#64748b] mt-0.5">Vault Encryption</span>
              </div>
            </div>
          </div>

          {/* Floating Phone Dashboard Mockup */}
          <div className="flex-1 w-full relative flex items-center justify-center lg:justify-end animate-float">
            {/* Glow Background */}
            <div className="absolute w-72 h-72 bg-indigo-500/20 rounded-full blur-[80px] -z-10" />
            <div className="absolute w-60 h-60 bg-rose-500/10 rounded-full blur-[100px] -z-10 translate-x-20 translate-y-20" />
            
            {/* Phone Container */}
            <div className="relative w-[280px] sm:w-[320px] aspect-[9/18.5] bg-[#0c0d12] rounded-[48px] p-3 shadow-2xl border-[6px] border-white/10 overflow-hidden ring-1 ring-white/5">
              {/* Camera Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#000] rounded-b-2xl z-30 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 ml-1" />
              </div>
              
              {/* Dynamic screen content */}
              <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-[#060608]">
                <Image
                  src={dashboardImg}
                  alt="Familier Mobile App dashboard screen showing the shared family calendar and scheduled events list."
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 280px, 320px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CORE FEATURES LIST */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-20 md:py-28 border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-semibold tracking-wider text-rose-400">
              ELEVATED ORGANIZATION
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight">
              One Workspace, Complete Peace of Mind
            </h2>
            <p className="text-[#94a3b8] text-base sm:text-lg">
              Say goodbye to scattered group chats, lost calendar invites, and messy coordinate notes. Familier centralizes everything beautifully.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-8 rounded-3xl flex flex-col gap-6 accent-glow-card">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl text-white">Smart Unified Schedule</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                Connect and aggregate all member calendars (school, sports, doctors, work) in one highly visual interface. Know exactly who needs to be where, when.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-8 rounded-3xl flex flex-col gap-6 accent-glow-card">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl text-white">Encrypted Locator map</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                Real-time positioning with battery-optimized tracking. Stay alerted automatically as kids reach home or check into school, protected by local device encryption.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-8 rounded-3xl flex flex-col gap-6 accent-glow-card">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl text-white">Interactive Chore Charts</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                Empower children by assigning chores and tracking milestones on a dynamic game-like board. Accumulate redeemable custom reward points easily.
              </p>
            </div>
          </div>
        </section>

        {/* INTERACTIVE SHOWCASE SECTION */}
        <section id="showcase" className="max-w-7xl mx-auto px-6 py-20 md:py-28 border-t border-white/5">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Column: Interactive Swappers */}
            <div className="flex-1 flex flex-col gap-8 text-left max-w-xl">
              <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold tracking-wider text-indigo-400 self-start">
                INTERACTIVE PREVIEW
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Designed to Fit Seamlessly in Hand
              </h2>
              <p className="text-[#94a3b8] text-base leading-relaxed">
                Click on the feature nodes below to watch how the interface responds, offering elegant controls that make coordinate management effortless.
              </p>

              {/* Selector Tabs */}
              <div className="flex flex-col gap-4">
                {(Object.keys(tabsInfo) as Array<'calendar' | 'locator' | 'tasks'>).map((key) => {
                  const isActive = activeTab === key;
                  const item = tabsInfo[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                        isActive 
                          ? `bg-[#0e0f14] ${item.borderColor} shadow-xl scale-[1.02]` 
                          : "bg-transparent border-white/5 hover:border-white/10 hover:bg-[#0c0d12]/50"
                      }`}
                    >
                      <div>
                        <span className={`block text-[10px] uppercase font-bold tracking-wider mb-1 ${
                          isActive ? "text-indigo-400" : "text-[#64748b]"
                        }`}>
                          {item.badge}
                        </span>
                        <span className="block font-display font-bold text-lg text-white">
                          {item.title}
                        </span>
                      </div>
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        isActive ? "bg-indigo-500/10 text-indigo-400" : "bg-white/5 text-[#64748b]"
                      }`}>
                        →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Phone Screen Viewport */}
            <div className="flex-1 w-full flex items-center justify-center">
              <div className="relative w-full max-w-[450px] aspect-[4/5] rounded-[32px] p-1 border border-white/5 glass-card overflow-hidden">
                
                {/* Active Tab Preview Layer */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tabsInfo[activeTab].color} transition-colors duration-500 pointer-events-none`} />
                
                <div className="relative z-10 w-full h-full p-8 flex flex-col sm:flex-row items-center gap-8 justify-center">
                  {/* Phone Preview Render */}
                  <div className="relative w-[180px] sm:w-[200px] aspect-[9/18.5] bg-[#0c0d12] rounded-[36px] p-2 shadow-2xl border-[4px] border-white/10 overflow-hidden ring-1 ring-white/5 flex-shrink-0 animate-float">
                    <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-[#060608]">
                      <Image
                        src={tabsInfo[activeTab].image}
                        alt={tabsInfo[activeTab].alt}
                        fill
                        className="object-cover transition-opacity duration-500"
                        sizes="(max-width: 768px) 180px, 200px"
                      />
                    </div>
                  </div>

                  {/* Bullet description text */}
                  <div className="flex flex-col gap-4 text-left">
                    <span className="inline-flex px-2.5 py-0.5 rounded bg-white/5 text-xs text-[#f8fafc] font-semibold self-start border border-white/10">
                      {tabsInfo[activeTab].badge}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-white">
                      {tabsInfo[activeTab].title}
                    </h3>
                    <p className="text-xs text-[#94a3b8] leading-relaxed">
                      {tabsInfo[activeTab].description}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {tabsInfo[activeTab].bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-[#f8fafc]/90">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECURITY & VAULT SECTION */}
        <section id="security" className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 border-t border-white/5 overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px] -z-10" />
          
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Visual Graphic Representation */}
            <div className="flex-1 w-full flex items-center justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-[450px] aspect-video rounded-3xl border border-white/5 glass-card p-8 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                
                {/* Visual Lock Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-[#94a3b8] font-mono tracking-wider">AES-256 ENCRYPTED CHANNEL</span>
                  </div>
                  <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 11.37h15.668a1 1 0 001-1V5.03a1 1 0 00-1-1H2.166a1 1 0 00-1 1v5.34a1 1 0 001 1zm0 4.59h15.668a1 1 0 001-1v-2.34a1 1 0 00-1-1H2.166a1 1 0 00-1 1v2.34a1 1 0 001 1z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Simulated Document List */}
                <div className="flex flex-col gap-3 my-6">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">📄</span>
                      <div className="text-left">
                        <span className="block text-xs font-semibold text-white">Emergency_Medical_SOPs.pdf</span>
                        <span className="block text-[10px] text-[#64748b]">Encrypted Family Document</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">Secured</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">🔑</span>
                      <div className="text-left">
                        <span className="block text-xs font-semibold text-white">Home_WIFI_Keycard.env</span>
                        <span className="block text-[10px] text-[#64748b]">Shared Family Credentials</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">Secured</span>
                  </div>
                </div>

                {/* Secure Badge footer */}
                <span className="text-[11px] text-[#64748b] leading-normal text-left">
                  * All data stays locally synced using zero-knowledge architectures. Familier servers never read your locations, document vaults, or dynamic schedule files.
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="flex-1 flex flex-col gap-6 text-left max-w-2xl order-1 lg:order-2">
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold tracking-wider text-emerald-400 self-start">
                MILITARY-GRADE PRIVACY
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Your Vault, Uncompromised Security
              </h2>
              <p className="text-[#94a3b8] text-base sm:text-lg leading-relaxed">
                Families store sensitive details: passport scans, house keys, pediatric health histories, and live coordinates. Familier employs rigorous end-to-end device encryption protocols so that your private information remains strictly yours.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                    🔐
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Zero-Knowledge Storage</h4>
                    <p className="text-xs text-[#94a3b8] mt-1">Files and medical lists are encrypted locally before hitting databases. We hold absolutely no access keys.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Opt-in Locator Syncing</h4>
                    <p className="text-xs text-[#94a3b8] mt-1">Each family member maintains robust control. Instantly toggle location sharing details or limit access times.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECURITY & METRICS COUNTER */}
        <section className="bg-[#0c0d12]/50 border-t border-b border-white/5 py-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <span className="block text-4xl sm:text-5xl font-extrabold font-display bg-gradient-to-r from-indigo-400 to-rose-400 bg-clip-text text-transparent">
                250k+
              </span>
              <span className="block text-sm text-[#94a3b8] mt-2 font-medium">Synchronized Families</span>
            </div>

            <div className="text-center">
              <span className="block text-4xl sm:text-5xl font-extrabold font-display bg-gradient-to-r from-indigo-400 to-rose-400 bg-clip-text text-transparent">
                4.2 Hours
              </span>
              <span className="block text-sm text-[#94a3b8] mt-2 font-medium">Saved per Family Weekly</span>
            </div>

            <div className="text-center">
              <span className="block text-4xl sm:text-5xl font-extrabold font-display bg-gradient-to-r from-indigo-400 to-rose-400 bg-clip-text text-transparent">
                12M+
              </span>
              <span className="block text-sm text-[#94a3b8] mt-2 font-medium">Chores Completed Games</span>
            </div>

            <div className="text-center">
              <span className="block text-4xl sm:text-5xl font-extrabold font-display bg-gradient-to-r from-indigo-400 to-rose-400 bg-clip-text text-transparent">
                100%
              </span>
              <span className="block text-sm text-[#94a3b8] mt-2 font-medium">Zero-Ad-Network Policy</span>
            </div>
          </div>
        </section>

        {/* INTERACTIVE FAQ SECTION */}
        <section id="faq" className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-16 flex flex-col items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold tracking-wider text-indigo-400">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Got Questions? We’ve Got Answers
            </h2>
            <p className="text-[#94a3b8] text-base max-w-xl">
              Everything you need to know about setting up Familier for your household's daily activities.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                q: "Is Familier really ad-free and privacy-first?",
                a: "Absolutely. Familier does not sell data, track actions outside our portal, or serve any third-party ads. We earn revenue exclusively through our premium subscription tier, which unlocks advanced locator options, document attachments, and integrated calendar history vaults."
              },
              {
                q: "How does the real-time family locator work?",
                a: "Familier connects to device GPS sensors using a battery-optimized background thread. Location updates sync seamlessly inside your private family cloud, which you can turn off at any time using robust toggle rules."
              },
              {
                q: "Can I sync Familier with external school calendars?",
                a: "Yes. Familier has custom integrations allowing schedules, events, and rosters to be pulled directly via standard iCal URLs and Google, Apple, or Outlook APIs."
              },
              {
                q: "Is there a limit to how many family members I can add?",
                a: "No. The standard free tier of Familier supports up to 8 family members, making it perfect for small, large, or multi-generational households."
              },
              {
                q: "What tools exist to keep my kids engaged in chores?",
                a: "Our gamified Chore Board lets children log completed tasks, which rewards them with point balances that parents approve. Children can redeem these points for customizable physical rewards (like playground hours or video game points) set up by you."
              }
            ].map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="glass-card rounded-2xl border border-white/5 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-6 flex items-center justify-between font-display font-bold text-white hover:bg-white/[0.02] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-xl transform transition-transform duration-300 ${isOpen ? 'rotate-45 text-rose-400' : 'text-[#64748b]'}`}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-[#94a3b8] leading-relaxed border-t border-white/5 pt-4 animate-fade-in-up">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* NEWSLETTER & DOWNLOAD CALL-TO-ACTION */}
        <section id="download" className="max-w-7xl mx-auto px-6 pb-24 pt-12">
          <div className="relative w-full rounded-[40px] p-8 md:p-16 border border-indigo-500/20 bg-gradient-to-br from-[#0c0d12] via-[#12131b] to-[#1a1b24] overflow-hidden text-center flex flex-col items-center gap-8">
            <div className="absolute top-0 left-0 w-full h-full ambient-glow-indigo pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl flex flex-col items-center gap-6">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold tracking-wider text-indigo-400">
                GET STARTED TODAY
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl leading-tight bg-gradient-to-b from-white to-[#94a3b8] bg-clip-text text-transparent">
                Bring Your Family Closer Together
              </h2>
              <p className="text-[#94a3b8] text-base sm:text-lg max-w-xl">
                Join over 250,000+ happy households using Familier to coordinate schedules, stay safe, and enjoy life's synchronized moments.
              </p>
            </div>

            {/* Live Interactive Newsletter Capture */}
            <div className="relative z-10 w-full max-w-md">
              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-semibold animate-fade-in-up">
                  🎉 Thank you for subscribing! Your invite link is heading to your inbox!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full">
                  <input
                    type="email"
                    required
                    placeholder="Enter your family email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-4 rounded-full bg-black/40 border border-white/10 text-white placeholder-[#64748b] text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-full font-semibold bg-white text-black hover:bg-neutral-200 transition-colors text-sm flex-shrink-0"
                  >
                    Receive Beta Access
                  </button>
                </form>
              )}
            </div>

            {/* Quick Badge checklist */}
            <div className="relative z-10 flex flex-wrap justify-center gap-6 text-xs text-[#94a3b8] pt-4">
              <span className="flex items-center gap-2">🛡️ Private Syncing</span>
              <span className="flex items-center gap-2">🚫 Zero Advertisements</span>
              <span className="flex items-center gap-2">🔄 Instant Offline Support</span>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER SECTION */}
      <footer className="w-full bg-[#060608] border-t border-white/5 py-12 md:py-16 text-left">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Logo Column */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                F
              </div>
              <span className="font-display font-bold text-xl text-white">Familier</span>
            </div>
            <p className="text-xs text-[#64748b] leading-relaxed max-w-[240px]">
              Familier is a secure, cloud-synced, privacy-first mobile hub designed exclusively for private family circles. Stay organized, together.
            </p>
            <span className="text-[10px] text-[#64748b] mt-4 block">
              © {new Date().getFullYear()} Familier Technologies, Inc. All rights reserved.
            </span>
          </div>

          {/* Links Column 1: App */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Features</h4>
            <ul className="flex flex-col gap-3 text-xs text-[#64748b]">
              <li><a href="#showcase" className="hover:text-white transition-colors">Shared Calendar</a></li>
              <li><a href="#showcase" className="hover:text-white transition-colors">Family Tracker</a></li>
              <li><a href="#showcase" className="hover:text-white transition-colors">Habits & Chores</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Document Vault</a></li>
            </ul>
          </div>

          {/* Links Column 2: Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Safety & Privacy</h4>
            <ul className="flex flex-col gap-3 text-xs text-[#64748b]">
              <li><a href="#security" className="hover:text-white transition-colors">End-to-End Encryption</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Charter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Child Safety Policy</a></li>
            </ul>
          </div>

          {/* Links Column 3: Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Support & Trust</h4>
            <ul className="flex flex-col gap-3 text-xs text-[#64748b]">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Audits</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Partnerships</a></li>
              <li><a href="mailto:support@familier.com" className="hover:text-white transition-colors">Email Support</a></li>
            </ul>
          </div>

        </div>
      </footer>
    </SafeHydration>
  );
}
