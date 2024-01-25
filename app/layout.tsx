import { Inter, Sora } from 'next/font/google'

import type { Metadata } from "next";
import Script from 'next/script';
import { Suspense } from "react";
import { Toaster } from "sonner";

import { cn } from '@/lib/utils';
import { ThemeProvider } from "@/components/theme/provider";
import { AuthProvider } from "@/components/auth/provider";
import { TooltipProvider } from "@/components/ui/tooltip";

import Nav from "@/components/nav";
import Spinner from '@/components/spinner';

import 'react-image-crop/dist/ReactCrop.css'
import "./globals.css";

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
        <body className={cn(
          "font-sans antialiased min-h-screen bg-background",
          inter.variable,
          sora.variable,
        )}>
          <Script async src="https://analytics.tygr.dev/script.js" data-website-id="b77fbcb1-45fe-44b5-b08d-7f6b5d775451" />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main vaul-drawer-wrapper="" className="min-h-screen antialiased bg-neutral-50 dark:bg-neutral-950">
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
