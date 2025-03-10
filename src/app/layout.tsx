import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NavbarProvider } from '@/providers/navbar-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { LanguageProvider } from '@/providers/language-provider'

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
    <html lang="en" suppressHydrationWarning className={`scroll-smooth bg-gray-900 ${inter.className}`}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            <NavbarProvider>
              {children}
            </NavbarProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 