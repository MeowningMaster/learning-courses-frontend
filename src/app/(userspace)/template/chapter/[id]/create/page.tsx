import { template } from '@/api'
import { Add } from '@mui/icons-material'
import { Button, TextField, Typography } from '@mui/material'
import { redirect } from 'next/navigation'

async function submit(data: FormData) {
  'use server'

  const dataObject = Object.fromEntries(data.entries())
  const courseTemplateId = Number(dataObject.courseTemplateId)
  const chapter = template.chapter.save.schema.body.parse(dataObject)
  chapter.number = 0

  const { id } = await template.chapter.save.call({
    body: chapter,
    params: { courseTemplateId },
  })
  redirect(`/template/chapter/${id}`)
}

export default function Page({
                               params: { id: courseId },
                             }: { params: { id: string } }) {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        New chapter template
      </Typography>
      <form className="flex flex-col gap-4" action={submit}>
        <input type="hidden" name="courseTemplateId" value={courseId}/>
        <TextField name="title"
                   label="Title"
                   required
                   InputProps={{inputProps: {minLength: 4, maxLength: 512}}}
        />
        {/*<TextField name="number"*/}
        {/*           type="number"*/}
        {/*           label="Number"*/}
        {/*           required*/}
        {/*           InputProps={{inputProps: {min: 0}}}*/}
        {/*           defaultValue={0}*/}
        {/*/>*/}
        <TextField name="description"
                   label="Descrition"
                   required
                   multiline
                   InputProps={{inputProps: {minLength: 4, maxLength: 2048}}}
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
