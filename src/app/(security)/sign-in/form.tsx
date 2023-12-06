'use client'

import { BoxProps, Button, TextField } from '@mui/material'
import { submitSignIn } from './submit'

async function submit(data: FormData) {
  const error = await submitSignIn(data)
  if (error) alert(error)
}

export function LoginForm(props: BoxProps) {
  return (
    <form className={`flex flex-col gap-4 ${props.className}`} action={submit}>
      <TextField name="login" label="Email" type="email" required />
      <TextField name="password" label="Password" type="password" required />
      <Button type="submit" variant="contained">
        Log in
      </Button>
    </form>
  )
}
