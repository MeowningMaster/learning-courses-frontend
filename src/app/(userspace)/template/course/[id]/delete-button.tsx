'use client'

import { Delete } from '@mui/icons-material'
import { Button } from '@mui/material'

type Remove = (id: number) => void

function promptRemove(id: number, remove: Remove) {
  if (confirm('Are you sure?')) {
    remove(id)
  }
}

export function DeleteButton({ id, remove }: { id: number; remove: Remove }) {
  return (
    <Button
      variant="outlined"
      color="error"
      startIcon={<Delete />}
      onClick={() => promptRemove(id, remove)}
    >
      Delete
    </Button>
  )
}
