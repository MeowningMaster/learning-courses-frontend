import * as api from '@/api'
import { userColorMap } from '@/utilities/user-color-map'
import {
  Avatar,
  Chip,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { Fragment } from 'react'
import { z } from 'zod'

type Submissions = z.infer<
  typeof api['userToLesson']['homeworkSubmissions']['schema']['reply']
>
type Users = z.infer<typeof api['user']['get']['schema']['reply']>[]

export function SubmissionsList({
  submissions,
  users,
  lessonId,
}: { submissions: Submissions; users: Users; lessonId: number }) {
  return (
    <div className="w-fit">
      {submissions.map((submission, index) => {
        const submitter = users[index]
        return (
          <Fragment key={submission.id}>
            {index !== 0 && <Divider variant="inset" component="li" />}
            <ListItem alignItems="flex-start">
              <ListItemButton href={`${lessonId}/submission/${submitter.id}`}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: userColorMap[submitter.role] }} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${submitter.firstName} ${submitter.lastName}`}
                  secondary={submitter.login}
                />
                <Chip
                  label={`Mark: ${submission.mark}`}
                  color={submission.isPassed ? 'success' : 'warning'}
                  variant="outlined"
                  className="ml-4"
                />
              </ListItemButton>
            </ListItem>
          </Fragment>
        )
      })}
    </div>
  )
}
