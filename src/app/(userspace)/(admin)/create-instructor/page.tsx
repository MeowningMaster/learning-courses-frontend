import * as api from '@/api'
import { Add } from '@mui/icons-material'
import { Button, TextField, Typography } from '@mui/material'
import { redirect } from 'next/navigation'

async function submit(data: FormData) {
  'use server'

  const dataObject = Object.fromEntries(data.entries())
  dataObject.role = 'INSTRUCTOR'
  const user = api.user.create.schema.body.parse(dataObject)

  await api.user.create.call({ body: user })
  redirect('/')
}

export default function Page() {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        New instructor
      </Typography>
      <form className="flex flex-col gap-4" action={submit}>
        <TextField name="login" label="Email" type="email" required />
        <TextField name="password" label="Password" type="password" required />
        <TextField name="firstName" label="First name" required />
        <TextField name="lastName" label="Last name" required />
        <Button
          type="submit"
          variant="contained"
          className="w-fit"
          startIcon={<Add />}
        >
          Create
        </Button>
      </form>
    </>
  )
}
