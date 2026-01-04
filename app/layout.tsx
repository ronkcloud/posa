import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LayoutGrid, Store, Logs } from 'lucide-react'
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
        { icon: <LayoutGrid size={32} strokeWidth={2} />, label: "Home" },
        { icon: <Store size={32} strokeWidth={2} />, label: "Products" },
        { icon: <Logs size={32} strokeWidth={2} />, label: "Transactions" },
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
