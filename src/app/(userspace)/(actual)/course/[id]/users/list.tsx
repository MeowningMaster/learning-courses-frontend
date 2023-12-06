'use client'

import { course, user } from '@/api'
import { userColorMap } from '@/utilities/user-color-map'
import { Close, Delete, Done } from '@mui/icons-material'
import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { z } from 'zod'
import { remove } from './server'

type Users = z.infer<typeof course['getInfoOfUsersInCourse']['schema']['reply']>

export function EnrollsList({
  users: initialUsers,
  courseId,
}: { users: Users; courseId: number }) {
  const [users, setUsers] = useState(initialUsers)

  if (users.length === 0) {
    return <>No users</>
  }

  async function removeFront(params: { userId: number; courseId: number }) {
    await remove(params)
    setUsers(users.slice().filter(({ id }) => id !== params.userId))
  }

  return (
    <>
      {users.map((user, index) => (
        <React.Fragment key={user.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: userColorMap[user.user.role] }} />
            </ListItemAvatar>
            <ListItemText
              primary={`${user.user.firstName} ${user.user.lastName}`}
              secondary={user.user.login}
            />
            <div className="flex gap-2">
              <IconButton
                onClick={() => {
                  if (!confirm('Are you sure?')) return
                  removeFront({ courseId, userId: user.user.id })
                }}
              >
                <Delete color="error" />
              </IconButton>
            </div>
          </ListItem>
        </React.Fragment>
      ))}
    </>
  )
}
