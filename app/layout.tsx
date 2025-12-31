import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Settings, Bell, Lamp } from 'lucide-react'
import { SidePanel } from "./components/side-panel";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "POSA",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const sidebarItems = [
        { icon: <Bell size={20} />, label: "Notifications" },
        { icon: <Settings size={20} />, label: "Settings" },
        { icon: <Lamp size={20} />, label: "Ideas" },
  ]

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidePanel items={sidebarItems} />
        {children}
      </body>
    </html>
  );
}
