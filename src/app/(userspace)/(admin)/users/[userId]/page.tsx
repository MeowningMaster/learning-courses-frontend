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
import { EditForm } from './edit-form'

export default async function Page({ params }: { params: { userId: string } }) {
  const userId = Number(params.userId)
  const user = await api.user.get.call({ params: { userId } })

  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Edit user
      </Typography>
      <EditForm user={user} />
    </>
  )
}
