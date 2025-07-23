import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "@/components/ui/toaster"

import './globals.css'

export const metadata: Metadata = {
  title: 'Yaw Asante',
  description: 'MPhil Economics student at KNUST, exploring the intersection of economics and AI.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 transition-colors duration-300">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        <Analytics />
        <Toaster />
        </ThemeProvider>
        < SpeedInsights />
      </body>
    </html>
  )
}
