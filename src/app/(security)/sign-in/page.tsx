import { CenterScreen } from '@/components/center-screen'
import { Card, Link, Typography } from '@mui/material'
import { LoginForm } from './form'

export default function Login() {
  return (
    <main>
      <CenterScreen>
        <Card className="m-8 p-8">
          <Typography variant="h4">Learning Courses</Typography>
          <Typography variant="subtitle1">Авторизуйтесь в системі</Typography>
          <LoginForm className="my-4" />
          <Link href="/sign-up">Не маєте акаунту? Зареєструйтесь</Link>
        </Card>
      </CenterScreen>
    </main>
  )
}
