import { template } from '@/api'
import { Add } from '@mui/icons-material'
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
  const chapterTemplateId = Number(dataObject.chapterTemplateId)
  const lesson = template.lesson.save.schema.body.parse(dataObject)
  lesson.number = 0

  const { id } = await template.lesson.save.call({
    body: lesson,
    params: { chapterTemplateId },
  })
  redirect(`/template/lesson/${id}`)
}

export default function Page({
  params: { id: chapterId },
}: { params: { id: string } }) {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        New lesson template
      </Typography>
      <form className="flex flex-col gap-4" action={submit}>
        <input type="hidden" name="chapterTemplateId" value={chapterId} />
        <TextField name="title" label="Title" required />
        <TextField name="description" label="Descrition" multiline />
        <TextField
          type="number"
          name="maxMark"
          label="Max mark"
          required
          defaultValue={100}
        />
        <TextField
          type="number"
          name="successMark"
          label="Success mark"
          required
          defaultValue={60}
        />
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
