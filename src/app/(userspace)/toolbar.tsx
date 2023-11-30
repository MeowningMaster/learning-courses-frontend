'use client'

import { Person } from '@mui/icons-material'
import { Menu } from '@mui/icons-material'
import { Avatar, IconButton, Toolbar, Typography } from '@mui/material'
import cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function LayoutToolbar({
  handleDrawerToggle,
}: { handleDrawerToggle: () => void }) {
  const router = useRouter()
  function logout() {
    cookies.remove('token')
    router.push('/sign-in')
  }

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
      <IconButton onClick={logout}>
        <Avatar>
          <Person />
        </Avatar>
      </IconButton>
    </Toolbar>
  )
}
