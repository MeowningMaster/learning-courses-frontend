'use client'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { PropsWithChildren } from 'react'
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir'
import { theme } from './theme'

export const MuiSetup = ({ children }: PropsWithChildren) => {
  return (
    <>
      <CssBaseline />
      <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  )
}
