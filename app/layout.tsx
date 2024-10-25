import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";

import "./globals.css";
import "react-image-crop/dist/ReactCrop.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme/provider";
import Navbar from "@/components/nav";

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
  description: "A free, open-source and community driven manga and anime tracking service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
              <Navbar />
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
