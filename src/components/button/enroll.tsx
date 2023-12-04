'use client'

import type * as api from '@/api'
import { LibraryAdd, LibraryAddCheck, Pending } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { z } from 'zod'

type Details = z.infer<
  typeof api.course.getUsersLastEnrollRequest['schema']['reply']
>

type EnrollObject = { id: number }
type Enroll<T extends EnrollObject> = (object: T) => Promise<void>
type Props<T extends EnrollObject> = {
  object: T
  enroll: Enroll<T>
  details?: Details
}

export function EnrollButton<T extends EnrollObject>(props: Props<T>) {
  const [enrolled, setEnrolled] = React.useState<boolean | 'pending'>(
    !props.details ? false : props.details.isApproved ? true : 'pending',
  )

  if (enrolled === 'pending') {
    return (
      <Button
        variant="outlined"
        color="warning"
        startIcon={<Pending />}
        disabled
        className="h-fit"
      >
        Pending enroll
      </Button>
    )
  }

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
        setEnrolled('pending')
      }}
      className="h-fit"
    >
      Enroll
    </Button>
  )
}
