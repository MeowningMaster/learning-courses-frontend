import { UserType } from '@/api/commonType'
import { deepOrange, deepPurple, grey } from '@mui/material/colors'

export const userColorMap: Record<UserType, string> = {
  ADMIN: deepOrange[500],
  INSTRUCTOR: deepPurple[500],
  STUDENT: grey[500],
}
