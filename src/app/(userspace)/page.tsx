'use server'

import { course } from '@/api'
import { CourseList } from '@/components/course/list'
import { Suspense } from 'react'

async function Catalog() {
  const courses = await course.getAll.call()
  return <CourseList list={courses} />
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
