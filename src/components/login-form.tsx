import { security } from '@/api'
import { BoxProps, Button, TextField } from '@mui/material'
import { cookies } from 'next/headers'

async function submit(data: FormData) {
  'use server'

  const dataObject = Object.fromEntries(data.entries())
  const crendentials = security.signIn.schema.body.parse(dataObject)

  const { token } = await security.signIn.call({ body: crendentials })

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
