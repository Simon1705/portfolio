import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NavbarProvider } from '@/providers/navbar-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { LanguageProvider } from '@/providers/language-provider'
import GsapSmoother from '@/components/gsap-smoother'
import LoadingScreen from '@/components/loading-screen'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Portfolio | Simon Peter",
  description: "Personal portfolio website showcasing my projects and skills",
  icons: {
    icon: [
      {
        url: '/icon.png',
        type: 'image/png',
        sizes: '32x32'
      },
      {
        url: '/icon.png',
        type: 'image/png',
        sizes: '16x16'
      }
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
    other: {
      rel: 'icon',
      url: '/favicon.ico',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`bg-gray-900 ${inter.className}`}>
      <body>
        <LoadingScreen />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            <NavbarProvider>
              <Navbar />
              <GsapSmoother />
              <div id="smooth-wrapper">
                <div id="smooth-content">
                  {children}
                </div>
              </div>
            </NavbarProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 