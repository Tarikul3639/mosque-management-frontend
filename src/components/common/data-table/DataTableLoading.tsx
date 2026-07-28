"use client"

export function DataTableLoading() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <div className="absolute top-0 left-0 h-1 w-full overflow-hidden bg-primary/10">
        <div className="h-full w-1/4 animate-[loading_1.3s_linear_infinite] bg-primary" />
      </div>

      <style jsx>{`
        @keyframes loading {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(500%);
          }
        }
      `}</style>
    </div>
  )
}
