import type { Metadata } from "next";
import "./globals.css";
import { config } from "@/lib/config";
import MusicProvider from "@/components/MusicProvider";

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
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,600;1,9..144,700&family=Gabriela&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MusicProvider>
          <main className="bg-paper min-h-screen w-full">{children}</main>
        </MusicProvider>
      </body>
    </html>
  );
}
