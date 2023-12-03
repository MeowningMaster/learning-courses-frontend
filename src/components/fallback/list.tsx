import { Skeleton } from '@mui/material'

export default function ListFallback() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton variant="rounded" height={100} />
      <Skeleton variant="rounded" height={80} />
      <Skeleton variant="rounded" height={100} />
      <Skeleton variant="rounded" height={80} />
    </div>
  )
}
