export default function CoursePage({ params }: { params: { id: string } }) {
  const id = Number(params.id)

  return <>{id}</>
}
