import { CenterScreen } from '@/components/center-screen'
import { Card, Link, Typography } from '@mui/material'
import { LoginForm } from './form'

export default function Login() {
  return (
    <main>
      <CenterScreen>
        <Card className="m-8 p-8">
          <Typography variant="h4">Learning Courses</Typography>
          <Typography variant="subtitle1">Log in to the system</Typography>
          <LoginForm className="my-4" />
          <Link href="/sign-up">Don't have an account? Sign up</Link>
        </Card>
      </CenterScreen>
    </main>
  )
}
