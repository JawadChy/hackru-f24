import type { Metadata } from "next";
import localFont from "next/font/local";
import {Gamja_Flower, Merriweather}  from "next/font/google"
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-merriweather',
});
const gamjaFlower = Gamja_Flower({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-gamja-flower',
});
export const metadata: Metadata = {
  title: "Music",
  description: "best music app oat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${geistSans.variable} ${geistMono.variable}  ${merriweather.className} antialiased`}
      >
          {children}
          <div className="h-screen bg-black absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      </body>
    </html>
  );
}