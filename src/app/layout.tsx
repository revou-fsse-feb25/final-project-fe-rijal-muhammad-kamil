import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { HeaderMainNavbar, HeaderSecondaryNavbar, HeaderThirdNavbar } from "@/container/navbar";
import { HeaderLogo } from "@/container/logo";
import Image from "next/image";
import EventSearch from "@/container/event-search/event-search";

const inter = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TicketEase",
  description: "TicketEase is your easy-to-use platform for finding and booking tickets to concerts, festivals, sports events, and more. Enjoy a seamless ticket purchasing experience with fast payments and instant access via QR code tickets.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="text-base">
      <body className={`${inter.variable} ${caveat.variable} antialiased font-(family-name:--font-primary) tracking-normal leading-normal text-white bg-(--background-color)`}>
        <section id="hero" className="h-[70vh] flex flex-col relative bg-[rgba(10,10,20,0.7)] px-8 sm:px-16 lg:px-32 2xl:px-64">
          <Image src="/hero-image-1920.jpeg" alt="Hero image" fill className="z-[-50]"></Image>
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(10,10,20,0)_50%,rgba(10,10,20,0.7)_100%)]"></div>
          <header>
            <div className="flex justify-end items-center relative py-2 after:content-[] after:absolute after:bottom-0 after:w-full after:h-0.5 after:bg-(--color-surface-variant) after:rounded-full">
              <HeaderThirdNavbar />
            </div>
            <div className="flex justify-between relative py-5 after:content-[] after:absolute after:bottom-0 after:w-full after:h-0.5 after:bg-(--color-surface-variant) after:rounded-full">
              <HeaderLogo />
              <div className="flex flex-col lg:flex-row gap-6">
                <HeaderMainNavbar />
                <HeaderSecondaryNavbar />
              </div>
            </div>
          </header>
          <div className="flex flex-col items-center">
            <div className="w-xl my-14">
              <h2 className="font-(family-name:--font-secondary) text-3xl text-orange-500 text-center mb-4">Undercover New Moments</h2>
              <h1 className="text-5xl font-bold text-center mb-4">DISCOVER EVENTS & EXPERIENCES</h1>
              <p className="text-gray-300 text-center">Join a vibrant community where you can explore global happenings and shere memorable moments with friend and family.</p>
            </div>
            <div className="w-full flex justify-center">
              <EventSearch />
            </div>
          </div>
        </section>
        {children}
      </body>
    </html>
  );
}
