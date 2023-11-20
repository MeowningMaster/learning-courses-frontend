'use client'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { PropsWithChildren } from 'react'
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir'
import { theme } from './theme'

export const MuiSetup = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  )
}
