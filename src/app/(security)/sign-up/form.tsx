import { security } from '@/api'
import { auth } from '@/utilities/auth'
import { BoxProps, Button, TextField } from '@mui/material'
import { redirect } from 'next/navigation'

async function submit(data: FormData) {
  'use server'

  const dataObject = Object.fromEntries(data.entries())
  const crendentials = security.signUp.schema.body.parse(dataObject)

  await security.signUp.call({ body: crendentials })
  const authData = await security.signIn.call({ body: crendentials })
  auth.set(authData)
  redirect('/')
}

export function SignUpForm(props: BoxProps) {
  return (
    <form className={`flex flex-col gap-4 ${props.className}`} action={submit}>
      <div className="flex gap-4">
        <TextField
          name="firstName"
          label="Name"
          required
          autoComplete="given-name"
        />
        <TextField
          name="lastName"
          label="Surname"
          required
          autoComplete="family-name"
        />
      </div>
      <TextField name="login" label="Email" type="email" required />
      <TextField name="password" label="Password" type="password" required />
      <Button type="submit" variant="contained">
        Sign up
      </Button>
    </form>
  )
}
