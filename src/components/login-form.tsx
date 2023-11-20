import { Box, BoxProps, Button, TextField } from '@mui/material'

async function submit(data: FormData) {
  'use server'

  console.log(...data.entries())
}

export function LoginForm(props: BoxProps) {
  return (
    <form className={`flex flex-col gap-4 ${props.className}`} action={submit}>
      <TextField name="email" label="Пошта" type="email" required />
      <TextField name="password" label="Пароль" type="password" required />
      <Button type="submit" variant="contained">
        Увійти
      </Button>
    </form>
  )
}
