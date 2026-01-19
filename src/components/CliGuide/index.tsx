"use client"

import { useState } from "react"
import { IconTerminal2, IconCopy, IconCheck, IconArrowRight } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    step: 1,
    title: "Install SpiderQ CLI",
    command: "npm install -g spiderq-cli",
    description: "Install the SpiderQ command line tool globally",
  },
  {
    step: 2,
    title: "Authenticate",
    command: "spiderq auth login --key YOUR_API_KEY",
    description: "Login with your API key to authenticate requests",
  },
  {
    step: 3,
    title: "Run your first scan",
    command: "spiderq scan https://example.com",
    description: "Start scanning a target URL for vulnerabilities",
  },
]

export function CliGuide() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = (command: string, index: number) => {
    navigator.clipboard.writeText(command)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="bg-card neo-border-thick neo-shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-spider-blue neo-border flex items-center justify-center">
          <IconTerminal2 size={24} className="text-black" stroke={2.5} />
        </div>
        <div>
          <h2 className="font-black text-lg uppercase">Quick Start</h2>
          <p className="text-sm text-muted-foreground">Get started with SpiderQ CLI in 3 steps</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((item, index) => (
          <div key={item.step} className="relative">
            <div className="bg-muted neo-border p-4 h-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 bg-foreground text-background neo-border flex items-center justify-center text-xs font-black">
                  {item.step}
                </span>
                <span className="font-black text-sm uppercase">{item.title}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
              <div className="flex items-center gap-2 bg-background neo-border p-2">
                <code className="font-mono text-xs flex-1 truncate">{item.command}</code>
                <button
                  onClick={() => handleCopy(item.command, index)}
                  className={cn(
                    "p-1.5 shrink-0 transition-colors",
                    copiedIndex === index ? "text-spider-green" : "hover:text-spider-green",
                  )}
                >
                  {copiedIndex === index ? <IconCheck size={14} /> : <IconCopy size={14} />}
                </button>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center">
                <IconArrowRight size={20} className="text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

