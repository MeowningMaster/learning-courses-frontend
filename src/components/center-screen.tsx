export function CenterScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex items-center">
      <div className="mx-auto">{children}</div>
    </div>
  )
}
