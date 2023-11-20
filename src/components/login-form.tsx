import { schema as signInSchema, signIn } from '@/api/security/sign-in'
import { BoxProps, Button, TextField } from '@mui/material'
import { cookies } from 'next/headers'

async function submit(data: FormData) {
  'use server'

  const dataObject = Object.fromEntries(data.entries())
  const crendentials = signInSchema.body.parse(dataObject)
  console.log(crendentials)

  const { token } = await signIn(crendentials)

  cookies().set('token', token)
}

export function LoginForm(props: BoxProps) {
  return (
    <form className={`flex flex-col gap-4 ${props.className}`} action={submit}>
      <TextField name="login" label="Пошта" type="email" required />
      <TextField name="password" label="Пароль" type="password" required />
      <Button type="submit" variant="contained">
        Увійти
      </Button>
    </form>
  )
}
