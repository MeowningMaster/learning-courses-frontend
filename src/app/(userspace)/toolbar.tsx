'use client'

import { auth } from '@/utilities/auth'
import { cookies } from '@/utilities/cookies'
import { Person } from '@mui/icons-material'
import { Menu } from '@mui/icons-material'
import { Avatar, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

export default async function LayoutToolbar({
  handleDrawerToggle,
}: { handleDrawerToggle: () => void }) {
  const router = useRouter()
  async function logout() {
    await cookies.remove('token')
    router.push('/sign-in')
  }

  const { login } = await auth.getOrThrow()

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
      <Typography variant="h6" noWrap component="div">
        Learning Courses
      </Typography>
      <Tooltip title={login}>
        <IconButton onClick={logout}>
          <Avatar>
            <Person />
          </Avatar>
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}
