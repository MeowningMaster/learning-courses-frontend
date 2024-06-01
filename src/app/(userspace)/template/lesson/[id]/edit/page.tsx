import { template } from '@/api'
import { Save } from '@mui/icons-material'
import { Button, TextField, Typography } from '@mui/material'
import { redirect } from 'next/navigation'

async function submit(data: FormData) {
  'use server'

  const dataObject = Object.fromEntries(data.entries()) as Record<
    string,
    unknown
  >
  dataObject.id = Number(dataObject.id)
  dataObject.maxMark = Number(dataObject.maxMark)
  dataObject.successMark = Number(dataObject.successMark)
  dataObject.number = Number(dataObject.number)
  const lesson = template.lesson.update.schema.body.parse(dataObject)

  await template.lesson.update.call({
    body: lesson,
    params: { lessonTemplateId: lesson.id },
  })
  redirect(`/template/lesson/${lesson.id}`)
}

export default async function Page({
  params: { id },
}: { params: { id: string } }) {
  const lesson = await template.lesson.get.call({
    params: { lessonTemplateId: Number(id) },
  })

  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Edit lesson template
      </Typography>
      <form className="flex flex-col gap-4" action={submit}>
        <input type="hidden" name="id" value={lesson.id}/>
        <input type="hidden" name="number" value={lesson.number}/>
        <TextField
          name="title"
          label="Title"
          required
          defaultValue={lesson.title}
        />
        <TextField
          name="description"
          label="Descrition"
          multiline
          defaultValue={lesson.description}
        />
        <TextField
          type="number"
          name="maxMark"
          label="Max mark"
          required
          defaultValue={lesson.maxMark}
        />
        <TextField
          type="number"
          name="successMark"
          label="Success mark"
          required
          defaultValue={lesson.successMark}
        />
        <Button
          type="submit"
          variant="contained"
          className="w-fit"
          startIcon={<Save/>}
        >
          Save
        </Button>
      </form>
    </>
  )
}
