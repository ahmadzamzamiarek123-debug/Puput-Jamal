import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Puput & Jamal Wedding",
  description: "Undangan Pernikahan Digital Puput & Jamal - 06 April 2026",
  keywords: ["wedding", "invitation", "puput", "jamal", "pernikahan"],
  authors: [{ name: "Puput & Jamal" }],
  openGraph: {
    title: "Puput & Jamal Wedding",
    description: "Kami mengundang Anda untuk hadir di hari bahagia kami",
    type: "website",
    images: ["/dino-happy.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-cream-50 text-sage-800 antialiased">
        {children}
      </body>
    </html>
  );
}
