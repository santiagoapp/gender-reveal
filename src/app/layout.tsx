import type { Metadata, Viewport } from "next";
import "./globals.css";
import { config } from "@/lib/config";
import MusicProvider from "@/components/MusicProvider";

export const metadata: Metadata = {
  title: `${config.event.title} · ${config.event.hosts}`,
  description: config.event.intro,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
          href="https://fonts.googleapis.com/css2?family=Agbalumo&family=Arimo:ital,wght@0,400;0,700;1,400;1,700&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* Browser extensions inject attributes into <body> before React
          hydrates; ignore attribute mismatches on this element only. */}
      <body suppressHydrationWarning>
        <MusicProvider>
          <main className="bg-paper min-h-screen w-full">{children}</main>
        </MusicProvider>
      </body>
    </html>
  );
}
