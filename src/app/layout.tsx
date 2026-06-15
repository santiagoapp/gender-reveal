import type { Metadata } from "next";
import "./globals.css";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: `${config.event.title} · ${config.event.hosts}`,
  description: config.event.intro,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Quicksand:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <main className="bg-reveal min-h-screen w-full">{children}</main>
      </body>
    </html>
  );
}
