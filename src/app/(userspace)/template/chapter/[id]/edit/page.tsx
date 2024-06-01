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
  dataObject.number = Number(dataObject.number)
  const chapter = template.chapter.update.schema.body.parse(dataObject)

  await template.chapter.update.call({
    body: chapter,
    params: { chapterTemplateId: chapter.id },
  })
  redirect(`/template/chapter/${chapter.id}`)
}

export default async function Page({
  params: { id },
}: { params: { id: string } }) {
  const chapter = await template.chapter.get.call({
    params: { chapterTemplateId: Number(id) },
  })

  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Edit chapter template
      </Typography>
      <form className="flex flex-col gap-4" action={submit}>
        <input type="hidden" name="id" value={chapter.id} />
        <input type="hidden" name="number" value={chapter.number} />
        <TextField
          name="title"
          label="Title"
          required
          defaultValue={chapter.title}
        />
        <TextField
          name="description"
          label="Descrition"
          multiline
          defaultValue={chapter.description}
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
