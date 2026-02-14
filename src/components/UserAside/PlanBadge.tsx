"use client"

import { useAuth } from "@clerk/nextjs"

export function PlanBadge() {
  const { isLoaded, has } = useAuth()

  if (!isLoaded) return <p className="text-xs text-sidebar-foreground/50 truncate">checking plan...</p>

  let plan = "Free"

  if (has({ plan: "spiderq_pro" })) {
    plan = "SpiderQ pro"
  }  
  return (

	  <p className="text-xs text-sidebar-foreground/50 truncate">{plan}</p>

  )
}

