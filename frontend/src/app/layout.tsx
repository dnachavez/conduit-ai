import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sfProDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/SF-Pro-Display-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro-display",
});

const sfProText = localFont({
  src: [
    {
      path: "../../public/fonts/SF-Pro-Text-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Text-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Text-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro-text",
});

const sfPro = localFont({
  src: "../../public/fonts/SF-Pro.ttf",
  variable: "--font-sf-pro",
});

export const metadata: Metadata = {
  title: {
    template: '%s - Conduit AI',
    default: 'Conduit AI',
  },
  description: "Revolutionizing how businesses connect with their customers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${sfProDisplay.variable} ${sfProText.variable} ${sfPro.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}