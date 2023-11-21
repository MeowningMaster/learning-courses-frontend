import { CenterScreen } from '@/components/center-screen'
import { Card, Link, Typography } from '@mui/material'
import { SignUpForm } from './form'

export default function Login() {
  return (
    <main>
      <CenterScreen>
        <Card className="m-8 p-8">
          <Typography variant="h4">Learning Courses</Typography>
          <Typography variant="subtitle1">
            Створіть новий обліковий запис
          </Typography>
          <SignUpForm className="my-4" />
          <Link href="/sign-in">Вже маєте акаунт? Авторизуйтесь</Link>
        </Card>
      </CenterScreen>
    </main>
  )
}
