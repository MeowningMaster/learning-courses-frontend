'use client'

import { saveBlob } from '@/utilities/save-blob'
import { Download } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'

export function DownloadButton({
  fileInfo,
  lessonId,
  submitter,
}: {
  lessonId: number
  fileInfo: { title: string }
  submitter: { id: number }
}) {
  const downloadFileFront = async () => {
    const url = new URL(
      `/lesson/${lessonId}/file`,
      `${window.location.protocol}//${window.location.host}`,
    )
    url.searchParams.set('userId', String(submitter.id))
    url.searchParams.set('lessonId', String(lessonId))
    const reply = await fetch(url)
    const blob = await reply.blob()
    saveBlob(blob, fileInfo.title)
  }

  return (
    <Button
      onClick={downloadFileFront}
      variant="outlined"
      startIcon={<Download />}
      sx={{ marginTop: '1rem' }}
    >
      {fileInfo.title}
    </Button>
  )
}
