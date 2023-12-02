import { Skeleton } from '@mui/material'

export function ListFallback() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Skeleton variant="text" height={60} width="60%" />
        <Skeleton variant="text" height={40} width="40%" />
      </div>
      <Skeleton variant="text" height={60} width="60%" />
      <Skeleton variant="rounded" height={80} />
      <Skeleton variant="rounded" height={100} />
      <Skeleton variant="rounded" height={80} />
    </div>
  )
}
