"use client"

import { useState, useEffect } from "react"
import { IconX, IconKey, IconCopy, IconCheck } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

interface CreateApiKeyModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (name: string) => void
}

export function CreateApiKeyModal({ isOpen, onClose, onCreate }: CreateApiKeyModalProps) {
  const [name, setName] = useState("")
  const [createdKey, setCreatedKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setName("")
      setCreatedKey(null)
      setCopied(false)
    }
  }, [isOpen])

  const handleCreate = () => {
    if (!name.trim()) return
    const newKey = `spq_live_${Math.random().toString(36).substring(2, 38)}`
    setCreatedKey(newKey)
    onCreate(name)
  }

  const handleCopy = () => {
    if (createdKey) {
      navigator.clipboard.writeText(createdKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClose = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-card neo-border-thick neo-shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-spider-green neo-border flex items-center justify-center">
              <IconKey size={20} className="text-black" stroke={2.5} />
            </div>
            <h2 className="font-black text-xl uppercase">{createdKey ? "Key Created" : "New API Key"}</h2>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-muted transition-colors neo-border">
            <IconX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!createdKey ? (
            <>
              <label className="block mb-2">
                <span className="text-xs font-black uppercase text-muted-foreground">Key Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Production API"
                  className="w-full mt-2 px-4 py-3 bg-muted neo-border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-spider-green"
                  autoFocus
                />
              </label>
              <p className="text-sm text-muted-foreground mt-4">
                Give your API key a descriptive name to easily identify it later.
              </p>
            </>
          ) : (
            <>
              <div className="bg-spider-yellow/20 neo-border p-4 mb-4">
                <p className="text-sm font-bold">
                  Make sure to copy your API key now. You won't be able to see it again!
                </p>
              </div>
              <div className="bg-muted neo-border p-4">
                <div className="flex items-center justify-between gap-4">
                  <code className="font-mono text-sm flex-1 truncate">{createdKey}</code>
                  <button
                    onClick={handleCopy}
                    className={cn(
                      "p-2 transition-colors neo-border shrink-0",
                      copied ? "bg-spider-green text-black" : "hover:bg-background",
                    )}
                  >
                    {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-4 p-6 border-t-4 border-border">
          {!createdKey ? (
            <>
              <button
                onClick={handleClose}
                className="flex-1 font-black uppercase text-sm px-5 py-3 neo-border hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!name.trim()}
                className={cn(
                  "flex-1 font-black uppercase text-sm px-5 py-3 neo-border neo-shadow-sm transition-colors",
                  name.trim()
                    ? "bg-spider-green text-black hover:bg-spider-yellow"
                    : "bg-muted text-muted-foreground cursor-not-allowed",
                )}
              >
                Create Key
              </button>
            </>
          ) : (
            <button
              onClick={handleClose}
              className="w-full font-black uppercase text-sm px-5 py-3 bg-spider-green text-black neo-border neo-shadow-sm hover:bg-spider-yellow transition-colors"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

