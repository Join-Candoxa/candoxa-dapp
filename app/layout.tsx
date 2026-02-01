import type { Metadata } from "next";
import localFont from "next/font/local"
import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import Image from "next/image";
import BackgroundImageDApp from '@/public/images/Background.png'
import BackgroundGridImageDApp from '@/public/images/Background_Grid.png'

import "./globals.css";
import Navbar from "@/components/Navbar";

const sherika = localFont({
  src: [
    {
      path: "../public/fonts/Sherika-ExtraBold.otf",
      weight: '800',
      style: "extrabold"
    }
  ],
  variable: "--font-sherika"
})

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "Candoxa",
  description: "DApp for creators to gather verified links in a public profile, with on-chain reputation and community curation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${sherika.variable} font-sans antialiased w-screen h-screen`}
      >
        <Image
          src={BackgroundGridImageDApp}
          alt="Background Grid Image DApp"
          fill
          className="object-cover -z-10"
          quality={100}
          priority
        />

        <Image
          src={BackgroundImageDApp}
          alt="Background Image DApp"
          fill
          className="object-cover -z-10 animate-fadeOut"
          quality={100}
          priority
        />
        <div className="animate-fadeIn">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
