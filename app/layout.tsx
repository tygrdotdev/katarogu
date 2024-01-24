import { Inter, Sora } from 'next/font/google'

import type { Metadata } from "next";
import Script from 'next/script';
import { Suspense } from "react";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/theme/provider";
import { AuthProvider } from "@/components/auth/provider";
import { TooltipProvider } from "@/components/ui/tooltip";

import Nav from "@/components/nav";
import Spinner from '@/components/spinner';
import "./globals.css";
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], display: "swap", variable: "--font-inter" });
const sora = Sora({ subsets: ['latin'], display: "swap", variable: "--font-sora" });

export const metadata: Metadata = {
  title: "Katarogu",
  description: "An Anime and Manga tracker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn(inter.variable, sora.variable, 'font-sans')}>
          <Script async src="https://analytics.tygr.dev/script.js" data-website-id="b77fbcb1-45fe-44b5-b08d-7f6b5d775451" />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main vaul-drawer-wrapper="" className="bg-neutral-50 dark:bg-neutral-950 min-h-screen antialiased">
              <div className="container">
                <Suspense fallback={<Spinner />}>
                  <TooltipProvider>
                    <Toaster />
                    <AuthProvider>
                      <Nav />
                      {children}
                    </AuthProvider>
                  </TooltipProvider>
                </Suspense>
              </div>
            </main>
          </ThemeProvider>
        </body>
      </html  >
    </>
  );
}
