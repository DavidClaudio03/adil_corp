import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import ChatbaseWidget from "@/components/ChatbaseWidget";
import WhatsAppButton from "@/components/whatsapp";

export const metadata: Metadata = {
  title: 'Adil Corp',
  description: 'Created with David Claudio - Full Stack Developer',
  icons: {
    icon: '/logo_adil.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <WhatsAppButton />
        <ChatbaseWidget />
      </body>
    </html>
  )
}
