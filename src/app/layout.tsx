import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Familier - The Private Digital Hub for Modern Families",
  description: "Stay perfectly synchronized with a shared smart calendar, secure real-time locator, collaborative chore boards, and a private encrypted document vault. Secure, fast, and designed exclusively for your family.",
  metadataBase: new URL("https://familierapp.com"),
  keywords: ["family organizer", "shared family calendar", "family locator app", "private social network", "shared grocery list", "chore tracker kids", "secure document vault"],
  openGraph: {
    title: "Familier - The Private Digital Hub for Modern Families",
    description: "Keep your family perfectly connected and synchronized. Features a smart shared calendar, family locator, gamified chores, and a highly secure vault.",
    url: "https://familierapp.com",
    siteName: "Familier App",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Familier Mobile App - Shared Calendar and Locator Mockup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Familier - The Private Digital Hub for Modern Families",
    description: "Keep your family perfectly connected. Features a smart calendar, real-time family locator, shared grocery lists, and gamified chore charts.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jakarta.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#060608] text-[#f8fafc] antialiased">
        {children}
      </body>
    </html>
  );
}

