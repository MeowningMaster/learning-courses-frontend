'use client'

import * as api from '@/api'
import { Add, Delete } from '@mui/icons-material'
import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { z } from 'zod'
import { remove, save } from './server-functions'

type User = z.infer<typeof api.user.get.schema.reply>
export function EditForm({ user }: { user: User }) {
  return (
    <form className="flex flex-col gap-4" action={save}>
      <input type="hidden" name="id" value={user.id} />
      <input type="hidden" name="login" value={user.login} />
      <TextField name="password" label="Password" type="password" />
      <TextField
        name="firstName"
        label="First name"
        required
        defaultValue={user.firstName}
      />
      <TextField
        name="lastName"
        label="Last name"
        required
        defaultValue={user.lastName}
      />
      <div>
        <InputLabel id="role-select">Role</InputLabel>
        <Select
          name="role"
          labelId="role-select"
          label="Role"
          className="w-full"
          required
          defaultValue={user.role}
        >
          <MenuItem value={'ADMIN'}>Admin</MenuItem>
          <MenuItem value={'INSTRUCTOR'}>Instructor</MenuItem>
          <MenuItem value={'STUDENT'}>Student</MenuItem>
        </Select>
      </div>
      <div className="flex gap-4 justify-between">
        <Button
          type="submit"
          variant="contained"
          className="w-fit"
          startIcon={<Add />}
        >
          Save
        </Button>
        <Button
          variant="contained"
          className="w-fit"
          onClick={() => {
            if (!confirm('Are you sure?')) return
            remove(user.id)
          }}
          startIcon={<Delete />}
          color="error"
        >
          Delete
        </Button>
      </div>
    </form>
  )
}
