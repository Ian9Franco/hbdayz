import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "../styles/globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Birthday Reminder",
  description: "A simple birthday reminder app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`antialiased ${inter.className}`}>{children}</body>
    </html>
  );
}