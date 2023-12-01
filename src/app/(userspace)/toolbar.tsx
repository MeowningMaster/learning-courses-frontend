'use client'

import { UserType } from '@/api/commonType'
import { auth } from '@/utilities/auth'
import { Person } from '@mui/icons-material'
import { Menu } from '@mui/icons-material'
import {
  Avatar,
  Button,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { deepOrange, deepPurple, grey } from '@mui/material/colors'
import { useRouter } from 'next-nprogress-bar'

export default function LayoutToolbar({
  handleDrawerToggle,
}: { handleDrawerToggle: () => void }) {
  return (
    <Toolbar className="justify-between">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <Menu />
      </IconButton>
      <Link href="/" color="inherit" underline="hover">
        <Typography variant="h6" noWrap component="div">
          Learning Courses
        </Typography>
      </Link>

      <PersonAvatar />
    </Toolbar>
  )
}

const bgcolorMap: Record<UserType, string> = {
  ADMIN: deepOrange[500],
  INSTRUCTOR: deepPurple[500],
  STUDENT: grey[500],
}

function PersonAvatar() {
  const router = useRouter()
  function logout() {
    auth.remove()
    router.push('/sign-in')
  }

  const { login, role } = auth.getOrThrow()
  const bgcolor = bgcolorMap[role]
  return (
    <Tooltip title={`Logout ${login}`}>
      <IconButton onClick={logout}>
        <Avatar sx={{ bgcolor }}>
          <Person />
        </Avatar>
      </IconButton>
    </Tooltip>
  )
}
