'use client'

import { LibraryAdd, LibraryAddCheck } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

type EnrollObject = { id: number }
type Enroll<T extends EnrollObject> = (object: T) => Promise<void>
type Props<T extends EnrollObject> = {
  object: T
  enroll: Enroll<T>
  alreadyEnrolled?: boolean
}

export function EnrollButton<T extends EnrollObject>(props: Props<T>) {
  const [enrolled, setEnrolled] = React.useState(props.alreadyEnrolled)

  if (enrolled) {
    return (
      <Button
        variant="outlined"
        color="success"
        startIcon={<LibraryAddCheck />}
        disabled
        className="h-fit"
      >
        Enrolled
      </Button>
    )
  }

  return (
    <Button
      variant="outlined"
      color="success"
      startIcon={<LibraryAdd />}
      onClick={async () => {
        await props.enroll(props.object)
        setEnrolled(true)
      }}
      className="h-fit"
    >
      Enroll
    </Button>
  )
}
