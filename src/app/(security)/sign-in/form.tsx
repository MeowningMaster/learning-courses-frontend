import { security } from '@/api'
import { auth } from '@/utilities/auth'
import { BoxProps, Button, TextField } from '@mui/material'
import { redirect } from 'next/navigation'

async function submit(data: FormData) {
  'use server'

  const dataObject = Object.fromEntries(data.entries())
  const crendentials = security.signIn.schema.body.parse(dataObject)

  const authData = await security.signIn.call({ body: crendentials })
  auth.set(authData)
  redirect('/')
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
