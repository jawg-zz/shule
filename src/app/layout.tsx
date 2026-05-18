import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shule - School Management System",
  description: "Advanced school management system for Kenyan schools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
