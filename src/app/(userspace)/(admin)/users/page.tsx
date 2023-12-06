import ListFallback from '@/components/fallback/list'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<ListFallback />}>
      <Content />
    </Suspense>
  )
}

import * as api from '@/api'
import { UserType } from '@/api/commonType'
import { auth } from '@/utilities/auth'
import { userColorMap } from '@/utilities/user-color-map'
import { PersonAdd } from '@mui/icons-material'
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import React from 'react'

const rolePriority: Record<UserType, number> = {
  ADMIN: 0,
  INSTRUCTOR: 1,
  STUDENT: 2,
}

async function Content() {
  const users = await api.user.getAll.call()
  users.sort((a, b) => {
    const aPriority = rolePriority[a.role]
    const bPriority = rolePriority[b.role]
    if (aPriority !== bPriority) {
      return aPriority - bPriority
    }
    return a.id - b.id
  })

  return (
    <>
      <Button startIcon={<PersonAdd />} href="/users/create">
        Add user
      </Button>
      <div className="max-w-md">
        {users.map((user, index) => {
          return (
            <React.Fragment key={user.id}>
              <ListItem alignItems="flex-start">
                <ListItemButton href={`users/${user.id}`}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: userColorMap[user.role] }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName}`}
                    secondary={user.login}
                  />
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}
