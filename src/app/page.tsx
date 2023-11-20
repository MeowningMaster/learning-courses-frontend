import { CenterScreen } from '@/components/center-screen'
import { LoginForm } from '@/components/login-form'
import { Card, Typography } from '@mui/material'

export default function Home() {
  return (
    <main>
      <CenterScreen>
        <Card className="m-8 p-8">
          <Typography variant="h4">Learning Courses</Typography>
          <Typography variant="subtitle1">Авторизуйтесь в системі</Typography>
          <LoginForm className="mt-4" />
        </Card>
      </CenterScreen>
    </main>
  )
}
