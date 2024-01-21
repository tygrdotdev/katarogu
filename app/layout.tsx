import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme/provider";
import Nav from "@/components/nav";
import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  title: "Kataorgu",
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
          "bg-neutral-100 dark:bg-neutral-900 min-h-screen antialiased container",
        )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div vaul-drawer-wrapper="">
              <Nav />
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html >
    </>
  );
}
