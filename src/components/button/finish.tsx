'use client'

import { Flag } from '@mui/icons-material'
import { Button } from '@mui/material'

type FinishObject = { id: number }
type Finish<T extends FinishObject> = (object: T) => void
type Props<T extends FinishObject> = {
  object: T
  finish: Finish<T>
}

function promptFinish<T extends FinishObject>({
  object,
  finish: remove,
}: Props<T>) {
  if (confirm('Are you sure?')) {
    remove(object)
  }
}

export function FinishButton<T extends FinishObject>(props: Props<T>) {
  return (
    <Button
      variant="outlined"
      color="warning"
      startIcon={<Flag />}
      onClick={() => promptFinish(props)}
      className="h-fit"
    >
      Finish
    </Button>
  )
}
