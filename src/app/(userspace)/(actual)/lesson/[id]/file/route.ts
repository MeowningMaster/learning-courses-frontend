import * as api from '@/api'
import { auth } from '@/utilities/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const user = auth.getOrThrow()
  const params = Object.fromEntries(request.nextUrl.searchParams.entries()) as {
    userId: string
    lessonId: string
  }
  const userId = Number(params.userId)
  const lessonId = Number(params.lessonId)

  const blob: Blob = await api.file.download.call({
    params: { userId, lessonId },
  })
  return new NextResponse(blob)
}
