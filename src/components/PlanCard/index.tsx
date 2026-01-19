import { IconCheck } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

interface PlanCardProps {
  name: string
  price: string
  period: string
  features: string[]
  popular?: boolean
  current?: boolean
}

export function PlanCard({ name, price, period, features, popular, current }: PlanCardProps) {
  return (
    <div className={cn("bg-card neo-border-thick p-6 relative", popular ? "neo-shadow-lg" : "neo-shadow-md")}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-spider-yellow neo-border px-4 py-1">
          <span className="text-xs font-black uppercase">Most Popular</span>
        </div>
      )}
      {current && (
        <div className="absolute -top-4 right-4 bg-spider-green neo-border px-4 py-1">
          <span className="text-xs font-black uppercase">Current Plan</span>
        </div>
      )}
      <h3 className="font-black text-2xl uppercase mb-2">{name}</h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-black font-mono">{price}</span>
        <span className="text-muted-foreground font-bold">/{period}</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <div className="w-6 h-6 bg-spider-green neo-border flex items-center justify-center">
              <IconCheck size={16} className="text-black" stroke={2.5} />
            </div>
            <span className="font-bold text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={cn(
          "w-full py-4 font-black uppercase neo-border neo-shadow-sm",
          current
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-foreground text-background hover:bg-foreground/90 transition-colors",
        )}
        disabled={current}
      >
        {current ? "Current Plan" : "Upgrade"}
      </button>
    </div>
  )
}

