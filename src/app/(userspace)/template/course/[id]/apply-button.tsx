'use client'

import { Eject } from '@mui/icons-material'
import { Button } from '@mui/material'

export function ApplyButton({
  id,
  apply,
}: { id: number; apply: (id: number) => void }) {
  return (
    <Button
      variant="outlined"
      startIcon={<Eject />}
      sx={{ marginTop: '1.5rem' }}
      onClick={() => apply(id)}
      color="success"
      className="h-fit"
    >
      Create course from this template
    </Button>
  )
}
