import { DialogProvider } from "@/components/commons/dialog";
import { ThemeProvider } from "@/components/commons/theme-provider";
import { Toaster } from "@/components/shadcn/sonner";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoConnect",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geistSans.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DialogProvider>
            {children}
            <Toaster />
          </DialogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
