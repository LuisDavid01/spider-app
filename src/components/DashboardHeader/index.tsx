"use client"

interface DashboardHeaderProps {
  title: string
  description?: string
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{title}</h1>
      {description && <p className="text-muted-foreground mt-1">{description}</p>}
    </header>
  )
}

