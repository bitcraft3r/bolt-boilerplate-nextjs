import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "@/components/convex-provider";
import { Navbar } from "./_home/navbar";
import { Footer } from "./_home/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bolt Boilerplate: Supercharge Your Next.js Projects",
  description: "Accelerate your web development with Bolt Boilerplate: Next.js framework integrated with Convex for seamless interactions, Clerk for authentication, and Shadcn for stunning UI. Setup in minutes.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.png",
        href: "/logo.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.png",
        href: "/logo-dark.png",
      }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-full flex flex-col justify-between">
              <Navbar />
              <main className="pt-28 pb-6 px-6 sm:px-12 md:px-16">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
