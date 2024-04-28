import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "../components/theme-provider";
import { ConvexClientProvider } from "../components/convex-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Liit: Microblogging Platform with Unlimited Likes | NextJS & Convex Boilerplate",
  description: "Built with NextJS and powered by Convex's real-time database, Liit offers developers a robust boilerplate for building engaging web experiences.",
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
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}