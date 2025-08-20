"use client";

import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import QueryProviders from "@/context/query-provider";
import Image from "next/image";
import { HeaderMainNavbar, HeaderSecondaryNavbar, HeaderThirdNavbar } from "@/container/navbar";
import { HeaderLogo } from "@/container/logo";
import EventSearch from "@/container/event-search/event-search";
import { usePathname } from "next/navigation";
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

// export const metadata: Metadata = {
//   title: "TicketEase",
//   description: "TicketEase is your easy-to-use platform for finding and booking tickets to concerts, festivals, sports events, and more. Enjoy a seamless ticket purchasing experience with fast payments and instant access via QR code tickets.",
// };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isSlugPage = pathname?.startsWith("/event/");
  const isLoginPage = pathname?.startsWith("/login");
  const isRegisterPage = pathname?.startsWith("/register");
  return (
    <html lang="en" className="text-base">
      <body className={`${inter.variable} ${caveat.variable} antialiased font-(family-name:--font-primary) tracking-normal leading-normal text-white bg-(--background-color)`}>
        <QueryProviders>
          {!isLoginPage && !isRegisterPage && (
            <header className="w-full absolute top-0 z-50 px-8 sm:px-16 lg:px-32 2xl:px-64">
              <div className="flex justify-end items-center relative py-2 after:content-[''] after:w-full after:h-0.5 after:absolute after:bottom-0 after:left-0 after:rounded-full after:bg-(--color-surface-2-transparant)">
                <HeaderThirdNavbar />
              </div>
              <div className="flex justify-between relative py-4 after:content-[''] after:w-full after:h-0.5 after:absolute after:bottom-0 after:left-0 after:rounded-full after:bg-(--color-surface-2-transparant)">
                <HeaderLogo />
                <div className="flex flex-col lg:flex-row gap-4">
                  <HeaderMainNavbar />
                  <HeaderSecondaryNavbar />
                </div>
              </div>
            </header>
          )}
          {!isSlugPage && !isLoginPage && !isRegisterPage && (
            <section id="hero" className="min-h-[70vh] relative bg-(--background-color-transparant) px-8 sm:px-16 lg:px-32 2xl:px-64 pt-28">
              <Image src="/hero-image-1920.jpeg" alt="Hero image" fill className="-z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,20,0)_50%,rgba(10,10,20,0.5)_100%)] pointer-events-none"></div>
              <div className="flex flex-col items-center gap-6 pt-12">
                <div className="w-xl">
                  <h2 className="font-(family-name:--font-secondary) font-bold text-3xl text-orange-600 text-center mb-4">Undercover New Moments</h2>
                  <h1 className="text-5xl font-bold text-center mb-4">DISCOVER EVENTS & EXPERIENCES</h1>
                  <p className="text-gray-300 text-center">Join a vibrant community where you can explore global happenings and share memorable moments with friend and family.</p>
                </div>
                <div className="flex justify-center">
                  <EventSearch />
                </div>
              </div>
            </section>
          )}
          <main className={`flex flex-col gap-16 ${isLoginPage ? "" : "px-8 sm:px-16 lg:px-32 2xl:px-64"}`}>{children}</main>
        </QueryProviders>
      </body>
    </html>
  );
}
