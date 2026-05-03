import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Landlord Tax Helper",
  description: "Upload rental CSV data and get a simple income and expense summary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
