import Link from "next/link"
import { IconError404, IconHome } from "@tabler/icons-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="relative">
            <IconError404 className="w-32 h-32 text-primary" stroke={1.5} />
            <div className="absolute inset-0 bg-primary/20 blur-3xl -z-10" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Page Not Found</h1>
          <p className="text-muted-foreground text-lg">The page you're looking for doesn't exist or has been moved.</p>
        </div>

        <Link href="/">
          <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 font-medium transition-colors">
            <IconHome className="w-5 h-5" stroke={1.5} />
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  )
}
