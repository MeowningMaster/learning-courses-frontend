'use server'

import { course } from '@/api'
import { Typography } from '@mui/material'
import { Suspense } from 'react'

async function Catalog() {
  const courses = await course.getAll.call()
  return <>{JSON.stringify(courses)}</>
}

export default async function CoursesCatalog() {
  return (
    <>
      <Suspense>
        <Catalog />
      </Suspense>
    </>
  )
}
