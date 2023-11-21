import { security } from '@/api'
import { BoxProps, Button, TextField } from '@mui/material'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function submit(data: FormData) {
  'use server'

  const dataObject = Object.fromEntries(data.entries())
  const crendentials = security.signUp.schema.body.parse(dataObject)

  await security.signUp.call({ body: crendentials })
  const { token } = await security.signIn.call({ body: crendentials })

  cookies().set('token', token)
  redirect('/')
}

export function SignUpForm(props: BoxProps) {
  return (
    <form className={`flex flex-col gap-4 ${props.className}`} action={submit}>
      <div className="flex gap-4">
        <TextField
          name="firstName"
          label="Ім'я"
          required
          autoComplete="given-name"
        />
        <TextField
          name="lastName"
          label="Прізвище"
          required
          autoComplete="family-name"
        />
      </div>
      <TextField name="login" label="Пошта" type="email" required />
      <TextField name="password" label="Пароль" type="password" required />
      <Button type="submit" variant="contained">
        Зареєструватися
      </Button>
    </form>
  )
}
