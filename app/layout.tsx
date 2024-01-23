import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme/provider";
import Nav from "@/components/nav";

import "./globals.css";
import { AuthProvider } from "@/components/auth/provider";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

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
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main vaul-drawer-wrapper="" className="bg-neutral-50 dark:bg-neutral-950 min-h-screen antialiased">
              <div className="container">
                <Suspense fallback="Loading...">
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
