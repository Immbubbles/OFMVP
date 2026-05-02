import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/nav/top-nav";

const sans = Inter({
  variable: "--font-sans-app",
  subsets: ["latin"],
  display: "swap",
});

const display = Instrument_Serif({
  variable: "--font-display-app",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumen — Where creators rise",
  description:
    "A premium creator platform. Subscribe to your favorites, climb the leaderboards, earn tier rewards.",
  applicationName: "Lumen",
};

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <TopNav />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
