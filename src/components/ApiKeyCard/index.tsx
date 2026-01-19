"use client"

import { useState } from "react"
import { IconEye, IconEyeOff, IconCopy, IconTrash, IconDotsVertical } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"

interface ApiKeyCardProps {
  id: string
  name: string
  keyValue: string
  created: string
  lastUsed: string
  status: "active" | "inactive" | "expired"
  onDelete: (id: string) => void
}

const statusStyles = {
  active: "bg-spider-green text-black",
  inactive: "bg-spider-yellow text-black",
  expired: "bg-spider-red text-white",
}

export function ApiKeyCard({ id, name, keyValue, created, lastUsed, status, onDelete }: ApiKeyCardProps) {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(keyValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const maskedKey = keyValue.slice(0, 8) + "•".repeat(24) + keyValue.slice(-4)

  return (
    <div className="bg-card neo-border-thick neo-shadow-md p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-black text-lg uppercase">{name}</h3>
          <span
            className={cn("inline-block px-3 py-1 text-xs font-black uppercase neo-border mt-2", statusStyles[status])}
          >
            {status}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 hover:bg-muted transition-colors rounded-sm">
            <IconDotsVertical size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="neo-border neo-shadow-sm">
            <DropdownMenuItem className="font-bold uppercase text-xs">Edit Name</DropdownMenuItem>
            <DropdownMenuItem className="font-bold uppercase text-xs">Regenerate</DropdownMenuItem>
            <DropdownMenuItem className="font-bold uppercase text-xs text-spider-red" onClick={() => onDelete(id)}>
              <IconTrash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="bg-muted neo-border p-4 mb-4">
        <div className="flex items-center justify-between gap-4">
          <code className="font-mono text-sm flex-1 truncate">{revealed ? keyValue : maskedKey}</code>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRevealed(!revealed)}
              className="p-2 hover:bg-background transition-colors neo-border"
              title={revealed ? "Hide" : "Reveal"}
            >
              {revealed ? <IconEyeOff size={16} /> : <IconEye size={16} />}
            </button>
            <button
              onClick={handleCopy}
              className={cn(
                "p-2 transition-colors neo-border",
                copied ? "bg-spider-green text-black" : "hover:bg-background",
              )}
              title="Copy"
            >
              <IconCopy size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-xs font-black uppercase text-muted-foreground">Created</p>
          <p className="font-mono">{created}</p>
        </div>
        <div>
          <p className="text-xs font-black uppercase text-muted-foreground">Last Used</p>
          <p className="font-mono">{lastUsed}</p>
        </div>
      </div>
    </div>
  )
}

