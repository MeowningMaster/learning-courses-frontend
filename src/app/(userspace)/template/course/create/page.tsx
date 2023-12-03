import { template } from '@/api'
import { Add } from '@mui/icons-material'
import { Button, TextField, Typography } from '@mui/material'
import { redirect } from 'next/navigation'

async function submit(data: FormData) {
  'use server'

  const dataObject = Object.fromEntries(data.entries())
  const course = template.course.save.schema.body.parse(dataObject)

  const { id } = await template.course.save.call({ body: course })
  redirect(`/template/course/${id}`)
}

export default function Page() {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        New course template
      </Typography>
      <form className="flex flex-col gap-4" action={submit}>
        <TextField name="title" label="Title" required />
        <TextField name="description" label="Descrition" multiline />
        <Button
          type="submit"
          variant="contained"
          className="w-fit"
          startIcon={<Add />}
        >
          Create
        </Button>
      </form>
    </>
  )
}
