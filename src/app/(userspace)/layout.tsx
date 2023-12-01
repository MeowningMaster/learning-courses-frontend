'use client'

import {
  SnippetFolder,
  Subscriptions,
  TravelExplore,
} from '@mui/icons-material'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import LayoutToolbar from './toolbar'

const drawerWidth = 200

function EasyListItem({
  text,
  icon,
  onClick,
}: {
  text: string
  icon: React.ReactNode
  onClick?: () => void
}) {
  return (
    <ListItem key={text} disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}

export default function UserspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const router = useRouter()
  function navigate(to: string) {
    if (mobileOpen) setMobileOpen(false)
    router.push(to)
  }

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <Divider textAlign="left">Courses</Divider>
        <EasyListItem
          text={'Catalog'}
          icon={<TravelExplore />}
          onClick={() => navigate('/')}
        />
        <EasyListItem text={'Ongoing'} icon={<Subscriptions />} />
        <EasyListItem text={'Templates'} icon={<SnippetFolder />} />
      </List>
    </div>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <LayoutToolbar handleDrawerToggle={handleDrawerToggle} />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
