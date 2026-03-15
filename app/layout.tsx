import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Riyon — Designer & Developer",
  description:
    "Portfolio of Riyon, a designer and developer crafting brands between logic and emotion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
