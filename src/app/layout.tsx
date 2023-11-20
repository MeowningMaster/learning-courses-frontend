import { MuiSetup } from '@/components/mui/setup'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Learning courses',
  description: 'Expand your knowledge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MuiSetup>{children}</MuiSetup>
      </body>
    </html>
  )
}
