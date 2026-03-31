import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nakula - Design Studio",
  description: "Nakula is a bold, professional Framer template for portfolios and agencies. Built for creatives who want to launch their website fast and attract more clients.",
  openGraph: {
    type: "website",
    title: "Nakula - Design Studio",
    description: "Nakula is a bold, professional Framer template for portfolios and agencies. Built for creatives who want to launch their website fast and attract more clients.",
    images: ["https://framerusercontent.com/images/QZ6xojOagMCasqxHNc04ZSLq2rA.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nakula - Design Studio",
    description: "Nakula is a bold, professional Framer template for portfolios and agencies. Built for creatives who want to launch their website fast and attract more clients.",
    images: ["https://framerusercontent.com/images/QZ6xojOagMCasqxHNc04ZSLq2rA.jpg"],
  },
  icons: {
    icon: [
      { url: "https://framerusercontent.com/images/2sznOEVxj0bokuQNMQgxZgtPrF8.jpg", media: "(prefers-color-scheme: light)" },
      { url: "https://framerusercontent.com/images/2sznOEVxj0bokuQNMQgxZgtPrF8.jpg", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "https://framerusercontent.com/images/i5BYHObaJfF9q7lByXHr6wqCTVM.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis lenis-autoToggle">
      <body>
        <div id="main">
          {children}
        </div>
      </body>
    </html>
  );
}
