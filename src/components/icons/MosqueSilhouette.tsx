export function MosqueSilhouette(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 80" fill="currentColor" {...props}>
      <rect x="8" y="28" width="5" height="52" rx="2" />
      <rect x="187" y="28" width="5" height="52" rx="2" />
      <path d="M100 6c-22 16-32 24-32 44h64c0-20-10-28-32-44z" />
      <path d="M52 34c-9 7-13 10-13 16h26c0-6-4-9-13-16z" />
      <path d="M148 34c-9 7-13 10-13 16h26c0-6-4-9-13-16z" />
      <rect x="30" y="50" width="140" height="30" rx="2" />
    </svg>
  )
}