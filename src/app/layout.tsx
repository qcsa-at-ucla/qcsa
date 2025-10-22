import type { Metadata } from "next";
import { Kantumruy_Pro } from "next/font/google";

import "./globals.css";

const kantumruy = Kantumruy_Pro({
  subsets: ["latin"],
  weight: ["400", "700"], // choose what you need
  variable: "--font-kantumruy",
});


export const metadata: Metadata = {
  title: "QCSA - Quantum Computing Student Association at UCLA",
  description: "The premier quantum science and technology organization at UCLA. Join us in building the quantum future through education, innovation, and community.",
  openGraph: {
    title: "QCSA - Quantum Computing Student Association at UCLA",
    description: "The premier quantum science and technology organization at UCLA. Join us in building the quantum future through education, innovation, and community.",
    images: [{
      url: "/images/V1_QCSA_Logo-18.png",
      width: 1200,
      height: 630,
      alt: "QCSA Logo",
    }],
    siteName: "QCSA at UCLA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QCSA - Quantum Computing Student Association at UCLA",
    description: "The premier quantum science and technology organization at UCLA. Join us in building the quantum future through education, innovation, and community.",
    images: ["/images/V1_QCSA_Logo-18.png"],
  },
  metadataBase: new URL("https://qcsa-ucla.org"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            .skip-link {
              position: absolute;
              top: -40px;
              left: 6px;
              background: #000;
              color: #fff;
              padding: 8px;
              text-decoration: none;
              z-index: 1000;
            }
            .skip-link:focus {
              top: 6px;
            }
          `
        }} />
      </head>
      <body
        className={kantumruy.variable}
      >
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <a href="#footer" className="skip-link">Skip to footer</a>
        {children}
      </body>
    </html>
  );
}
