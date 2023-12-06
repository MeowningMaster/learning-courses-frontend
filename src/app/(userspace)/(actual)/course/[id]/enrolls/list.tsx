'use client'

import { course, user } from '@/api'
import { index } from '@/api/course'
import { Prettify } from '@/utilities/types/prettify'
import { userColorMap } from '@/utilities/user-color-map'
import { Close, Done } from '@mui/icons-material'
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

type Enrolls = z.infer<typeof course['showAllEnrolls']['schema']['reply']>
type User = z.infer<typeof user['get']['schema']['reply']>

type EnrollsWithUsers = Prettify<Enrolls[number] & { user: User }>[]

export type EnrollReply = (
  enroll: EnrollsWithUsers[number],
  action: 'accept' | 'reject',
) => Promise<void>

export function EnrollsList({
  enrolls: initialEnrolls,
  reply,
}: { enrolls: EnrollsWithUsers; reply: EnrollReply }) {
  const [enrolls, setEnrolls] = useState(initialEnrolls)

  if (enrolls.length === 0) {
    return <>No pending enrolls 🎉</>
  }

  async function enrollReply(
    enroll: EnrollsWithUsers[number],
    action: 'accept' | 'reject',
  ) {
    await reply(enroll, action)
    setEnrolls(enrolls.slice().filter(({ id }) => id !== enroll.id))
  }

  return (
    <>
      {enrolls.map((enroll, index) => (
        <React.Fragment key={enroll.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: userColorMap[enroll.user.role] }} />
            </ListItemAvatar>
            <ListItemText
              primary={`${enroll.user.firstName} ${enroll.user.lastName}`}
              secondary={enroll.user.login}
            />
            <div className="flex gap-2">
              <IconButton onClick={() => enrollReply(enroll, 'accept')}>
                <Done color="success" />
              </IconButton>
              <IconButton onClick={() => enrollReply(enroll, 'reject')}>
                <Close color="error" />
              </IconButton>
            </div>
          </ListItem>
        </React.Fragment>
      ))}
    </>
  )
}
