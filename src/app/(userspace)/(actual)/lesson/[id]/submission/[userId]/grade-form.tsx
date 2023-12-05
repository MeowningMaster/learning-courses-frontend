'use client'

import { Grade } from '@mui/icons-material'
import { Button, Snackbar, TextField, Typography } from '@mui/material'
import { useState } from 'react'

type GradeInfo = { mark: number; maxMark: number }
type GradeAction = (data: FormData) => Promise<void>
export function GradeForm({
  gradeInfo: { mark, maxMark },
  grade,
}: { gradeInfo: GradeInfo; grade: GradeAction }) {
  const [open, setOpen] = useState(false)
  async function gradeFront(data: FormData) {
    await grade(data)
    setOpen(true)
  }

  return (
    <>
      <form className="mt-4 flex gap-4" action={gradeFront}>
        <TextField
          name="mark"
          label="Mark"
          defaultValue={mark}
          type="number"
          inputProps={{ min: 0, max: maxMark }}
        />
        <Button
          type="submit"
          variant="outlined"
          startIcon={<Grade />}
          color="success"
        >
          Grade
        </Button>
      </form>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message="Homework graded successfully"
      />
    </>
  )
}
