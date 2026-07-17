import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "IEEE OUTR | Research, Projects, & Community",
  description:
    "The official website of the IEEE Student Branch at Odisha University of Technology and Research (OUTR). A community of innovators and researchers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary font-sans relative transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CustomCursor />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
