import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme/provider";
import Nav from "@/components/nav";

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
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main vaul-drawer-wrapper="" className="bg-neutral-50 dark:bg-neutral-950 min-h-screen antialiased">
              <div className="container">
                <Nav />
                {children}
              </div>
            </main>
          </ThemeProvider>
        </body>
      </html  >
    </>
  );
}
