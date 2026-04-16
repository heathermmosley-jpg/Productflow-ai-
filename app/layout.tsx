import './globals.css'
import type { Metadata } from 'next'

// This is the "Metadata" the error message was asking for
export const metadata: Metadata = {
  title: 'ProductFlowAI - Content Multiplier',
  description: 'Instantly multiply your content across platforms',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
