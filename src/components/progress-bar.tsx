'use client'

import { AppProgressBar } from 'next-nprogress-bar'
import { PropsWithChildren } from 'react'

export default function ProgressBar({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <AppProgressBar
        height="2px"
        color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  )
}
