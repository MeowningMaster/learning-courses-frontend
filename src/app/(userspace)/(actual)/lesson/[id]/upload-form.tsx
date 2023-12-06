'use client'

import { VisuallyHiddenInput } from '@/components/visually-hidden-input'
import { auth } from '@/utilities/auth'
import { saveBlob } from '@/utilities/save-blob'
import { Delete, Download, UploadFile } from '@mui/icons-material'
import { Button, IconButton, Snackbar, Typography } from '@mui/material'
import { useState } from 'react'

type Submit = (data: FormData) => Promise<FileInfo>
export type FileInfo = { name?: string; id?: number }

type DeleteFile = () => Promise<void>
type DownloadFile = () => Promise<unknown>

export function UploadForm({
  submit,
  initialFile,
  deleteFile,
  lessonId,
}: {
  submit: Submit
  lessonId: number
  initialFile?: FileInfo
  deleteFile?: DeleteFile
}) {
  const user = auth.getOrThrow()
  const [file, setFile] = useState<FileInfo | undefined>(initialFile)
  const [canSubmit, setCanSubmit] = useState<boolean>(false)
  const [open, setOpen] = useState(false)

  const submitFront: Submit = async (data) => {
    const file = await submit(data)
    setOpen(true)
    setFile(file)
    setCanSubmit(false)
    return file
  }

  const deleteFileFront = async () => {
    if (!deleteFile) return
    if (!confirm('Are you sure you want to delete this file?')) return
    await deleteFile()
    setFile(undefined)
  }

  const downloadFileFront = async () => {
    if (!file?.name) return
    const url = new URL(`${lessonId}/file`, window.location.href)
    url.searchParams.set('userId', String(user.id))
    url.searchParams.set('lessonId', String(lessonId))
    const reply = await fetch(url)
    const blob = await reply.blob()
    saveBlob(blob, file.name)
  }

  return (
    <>
      <Typography variant="h5" sx={{ marginTop: '1rem' }}>
        Submit homework
      </Typography>
      <form action={submitFront} className="flex flex-col gap-4 w-fit mt-2">
        <Button
          component="label"
          variant="contained"
          startIcon={<UploadFile />}
        >
          {file?.name ?? 'Upload file'}
          <VisuallyHiddenInput
            name="file"
            type="file"
            onChange={({ target }) => {
              const file = target.files?.[0]
              if (!file) return

              const limit50mb = 50 * 1024 * 1024
              if (file.size > limit50mb) {
                alert('File size limit is 50MB')
                target.value = ''
                return
              }

              setFile({ name: file.name })
              setCanSubmit(true)
            }}
          />
        </Button>
        <div className="flex gap-4">
          {file && canSubmit && (
            <Button type="submit" variant="contained">
              Submit homework
            </Button>
          )}
          {file?.id && (
            <IconButton onClick={downloadFileFront}>
              <Download />
            </IconButton>
          )}
          {deleteFile && file?.id && (
            <IconButton color="error" onClick={deleteFileFront}>
              <Delete />
            </IconButton>
          )}
        </div>
      </form>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message="Homework submitted successfully"
      />
    </>
  )
}
