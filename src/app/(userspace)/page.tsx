'use server'

import { course } from '@/api'
import { Typography } from '@mui/material'

export default async function CoursesCatalog() {
  const courses = await course.getAll.call()
  return <>{JSON.stringify(courses)}</>
}
