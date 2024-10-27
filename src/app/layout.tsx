import localFont from "next/font/local";
import { Gamja_Flower, Merriweather } from "next/font/google"
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

export const metadata = {
  title: "Feelin It - Get Songs for Your Mood",
  description: "With Feelin It, you can get songs for your mood. Just upload a picture and get song recommendations based on your mood.",
  keywords: "Feelin It, Songs, Mood, Music, Recommendations, AI, Spotify",
  author: "Feelin It Team",
  robots: "index, follow",
  "og:title": "Feelin It - Get Songs for Your Mood",
  "og:description": "With Feelin It, you can get songs for your mood. Just upload a picture and get song recommendations based on your mood.",
  "og:type": "website",
  applicationName: "Feelin It",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
      { rel: "icon", type: "image/svg+xml", url: "/favicon.svg" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-black ${geistSans.variable} ${geistMono.variable} ${merriweather.variable} ${gamjaFlower.variable} ${merriweather.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}