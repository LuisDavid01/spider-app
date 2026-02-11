"use client"

import { useAuth } from "@clerk/nextjs"

export function PlanBadge() {
  const { isLoaded, has } = useAuth()

  if (!isLoaded) return <p className="text-xs text-sidebar-foreground/50 truncate">checking plan...</p>

  let plan = "Free"

  if (has({ plan: "enterprise" })) {
    plan = "Enterprise"
  } else if (has({ plan: "pro" })) {
    plan = "Pro"
  }

  return (
	  <p className="text-xs text-sidebar-foreground/50 truncate">{plan}</p>

  )
}

