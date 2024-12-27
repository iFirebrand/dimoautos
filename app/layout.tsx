// app/layout.tsx
import "./globals.css";

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dimo Autos",
  description: "The app to learn about your car.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
