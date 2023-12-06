import * as api from '@/api'
import { Add } from '@mui/icons-material'
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { redirect } from 'next/navigation'

async function save(data: FormData) {
  'use server'

  const dataObject = Object.fromEntries(data.entries())
  const user = api.user.create.schema.body.parse(dataObject)

  await api.user.create.call({ body: user })
  redirect('/users')
}

export default function Page() {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        New user
      </Typography>
      <form className="flex flex-col gap-4" action={save}>
        <TextField name="login" label="Email" type="email" required />
        <TextField name="password" label="Password" type="password" required />
        <TextField name="firstName" label="First name" required />
        <TextField name="lastName" label="Last name" required />
        <div>
          <InputLabel id="role-select">Role</InputLabel>
          <Select
            name="role"
            labelId="role-select"
            label="Role"
            className="w-full"
            required
            defaultValue={'INSTRUCTOR'}
          >
            <MenuItem value={'ADMIN'}>Admin</MenuItem>
            <MenuItem value={'INSTRUCTOR'}>Instructor</MenuItem>
            <MenuItem value={'STUDENT'}>Student</MenuItem>
          </Select>
        </div>
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
