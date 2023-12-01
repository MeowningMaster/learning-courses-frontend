import { MuiSetup } from '@/components/mui/setup'
import ProgressBar from '@/components/progress-bar'
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
        <ProgressBar>
          <MuiSetup>{children}</MuiSetup>
        </ProgressBar>
      </body>
    </html>
  )
}
