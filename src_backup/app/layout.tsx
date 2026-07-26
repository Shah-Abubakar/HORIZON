import React from 'react'
import './globals.css'

export const metadata = {
  title: 'HORIZON — AI-Powered Builder for Students',
  description: 'Your step-by-step AI-powered guide to building your ideas using free AI tools.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-dark-900 text-accent-primary-light antialiased">
        {children}
      </body>
    </html>
  )
}
