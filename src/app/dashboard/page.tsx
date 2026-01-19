"use client"

import { useState } from "react"
import { IconPlus, IconKey } from "@tabler/icons-react"
import { Sidebar } from "@/components/SiderbarDashboard"
import { DashboardHeader } from "@/components/DashboardHeader"
import { CliGuide } from "@/components/CliGuide"
import { ApiKeyCard } from "@/components/ApiKeyCard"
import { CreateApiKeyModal } from "@/components/CreateApiKey"

const initialApiKeys = [
  {
    id: "1",
    name: "Production API",
    keyValue: "spq_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    created: "2024-01-15",
    lastUsed: "2 hours ago",
    status: "active" as const,
  },
  {
    id: "2",
    name: "Development API",
    keyValue: "spq_dev_x9y8z7w6v5u4t3s2r1q0p9o8n7m6l5k4",
    created: "2024-01-10",
    lastUsed: "5 min ago",
    status: "active" as const,
  },
]

export default function DashboardPage() {
  const [apiKeys, setApiKeys] = useState(initialApiKeys)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateKey = (name: string) => {
    const newKey = {
      id: String(Date.now()),
      name,
      keyValue: `spq_live_${Math.random().toString(36).substring(2, 38)}`,
      created: new Date().toISOString().split("T")[0] ?? "no date",
      lastUsed: "Never",
      status: "active" as const,
    }
    setApiKeys([newKey, ...apiKeys])
  }

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id))
  }

  const activeKeys = apiKeys.filter((key) => key.status === "active").length
  const totalKeys = apiKeys.length

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 lg:ml-0">
        <div className="max-w-5xl mx-auto">
          <DashboardHeader title="Dashboard" description="Manage your SpiderQ API keys and get started with the CLI" />

          <CliGuide />

          {/* API Keys Section */}
          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <h2 className="font-black text-xl uppercase">API Keys</h2>
                <span className="px-3 py-1 bg-muted neo-border text-sm font-mono">
                  {activeKeys} / {totalKeys} active
                </span>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 neo-btn"
              >
                <IconPlus size={20} stroke={2.5} />
                New API Key
              </button>
            </div>

            {/* API Keys Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {apiKeys.map((key) => (
                <ApiKeyCard
                  key={key.id}
                  id={key.id}
                  name={key.name}
                  keyValue={key.keyValue}
                  created={key.created}
                  lastUsed={key.lastUsed}
                  status={key.status}
                  onDelete={handleDeleteKey}
                />
              ))}
            </div>

            {apiKeys.length === 0 && (
              <div className="bg-card neo-border-thick neo-shadow-md p-12 text-center">
                <div className="w-16 h-16 bg-muted neo-border mx-auto mb-4 flex items-center justify-center">
                  <IconKey size={32} className="text-muted-foreground" />
                </div>
                <h3 className="font-black text-lg uppercase mb-2">No API Keys</h3>
                <p className="text-muted-foreground mb-6">Create your first API key to get started with SpiderQ</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-spider-green text-black font-black uppercase text-sm px-5 py-3 neo-border neo-shadow-sm hover:bg-spider-yellow transition-colors"
                >
                  <IconPlus size={20} stroke={2.5} />
                  Create API Key
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <CreateApiKeyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateKey} />
    </div>
  )
}

