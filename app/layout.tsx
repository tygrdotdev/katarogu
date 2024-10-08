import { Inter, Sora } from "next/font/google";

import type { Metadata } from "next";
import { Toaster } from "sonner";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme/provider";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "@/components/navbar";

import "react-image-crop/dist/ReactCrop.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

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
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.variable,
            sora.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main
              vaul-drawer-wrapper=""
              className="min-h-screen bg-neutral-50 mx-auto antialiased dark:bg-neutral-950"
            >
              <div className="container">
                <TooltipProvider>
                  <Toaster />
                  <Navbar />
                  {children}
                </TooltipProvider>
              </div>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}