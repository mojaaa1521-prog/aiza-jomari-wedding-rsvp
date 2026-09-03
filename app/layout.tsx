import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/provider/ThemeProvider";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
});

const body = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Aiza & Jomari | Wedding Invitation",
  description:
    "Join Aiza & Jomari as they celebrate their wedding on December 17, 2026.",

  openGraph: {
    title: "Aiza & Jomari | Wedding Invitation",
    description:
      "Join us as we celebrate our special day on December 17, 2026.",
    url: "https://aiza-jomari-wedding-rsvp.vercel.app/",
    siteName: "Aiza & Jomari Wedding",
    images: [
      {
        url: "https://aiza-jomari-wedding-rsvp.vercel.app/og-image.png",
        width: 1388,
        height: 720,
        alt: "Aiza & Jomari Wedding Invitation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${heading.variable} ${body.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}