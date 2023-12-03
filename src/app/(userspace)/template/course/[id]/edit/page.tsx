import { template } from '@/api'
import { Save } from '@mui/icons-material'
import { Button, TextField, Typography } from '@mui/material'
import { redirect } from 'next/navigation'

async function submit(data: FormData) {
  'use server'

  const dataObject = Object.fromEntries(data.entries())
  ;(dataObject as unknown as { id: number }).id = Number(dataObject.id)
  const course = template.course.update.schema.body.parse(dataObject)

  await template.course.update.call({
    body: course,
    params: { courseTemplateId: course.id },
  })
  redirect(`/template/course/${course.id}`)
}

export default async function Page({
  params: { id },
}: { params: { id: string } }) {
  const course = await template.course.get.call({
    params: { courseTemplateId: Number(id) },
  })

  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Edit course template
      </Typography>
      <form className="flex flex-col gap-4" action={submit}>
        <input type="hidden" name="id" value={course.id} />
        <TextField
          name="title"
          label="Title"
          required
          defaultValue={course.title}
        />
        <TextField
          name="description"
          label="Descrition"
          multiline
          defaultValue={course.description}
        />
        <Button
          type="submit"
          variant="contained"
          className="w-fit"
          startIcon={<Save />}
        >
          Save
        </Button>
      </form>
    </>
  )
}
