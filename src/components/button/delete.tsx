'use client'

import { Delete } from '@mui/icons-material'
import { Button } from '@mui/material'

type RemoveObject = { id: number }
type Remove<T extends RemoveObject> = (object: T) => void
type Props<T extends RemoveObject> = {
  object: T
  remove: Remove<T>
}

function promptRemove<T extends RemoveObject>({ object, remove }: Props<T>) {
  if (confirm('Are you sure?')) {
    remove(object)
  }
}

export function DeleteButton<T extends RemoveObject>(props: Props<T>) {
  return (
    <Button
      variant="outlined"
      color="error"
      startIcon={<Delete />}
      onClick={() => promptRemove(props)}
      className="h-fit"
    >
      Delete
    </Button>
  )
}
