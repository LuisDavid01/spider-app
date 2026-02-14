"use client";

import { useState } from "react";
import { IconPlus, IconKey } from "@tabler/icons-react";
import { Sidebar } from "@/components/SiderbarDashboard";
import { DashboardHeader } from "@/components/DashboardHeader";
import { CliGuide } from "@/components/CliGuide";
import { ApiKeyCard } from "@/components/ApiKeyCard";
import { CreateApiKeyModal } from "@/components/CreateApiKey";
import { getAPIKeys, revokeAPIKey } from "@/actions/apikey";
import { useQuery } from "@tanstack/react-query";
import type { spiderAPIKey } from "@/types/apikey";
import { Protect } from "@clerk/nextjs";

export default function DashboardPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingApiKey, setEditingApiKey] = useState<spiderAPIKey | null>(null);

	const handleEditApiKey = (apiKey: spiderAPIKey) => {
		if (apiKey) {
			setEditingApiKey(apiKey);
			setIsModalOpen(true);
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setEditingApiKey(null);
	};

	const { data, isLoading } = useQuery({
		queryKey: ["apikeys"],
		queryFn: async () => {
			const res = await getAPIKeys();
			console.log(res);
			return res.api_keys;
		},
		staleTime: 10 * 60 * 1000,
	});

	return (
		<div >
			<CliGuide />

			{/* API Keys Section */}
			<Protect
      feature="apikeys"
      fallback={<p>Only subscribers with the Premium Access feature can access this content.</p>}
    >
			<div className="mt-10">
				<div className="mb-6 flex flex-wrap items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<h2 className="text-xl font-black uppercase">API Keys</h2>
						<span className="bg-muted neo-border px-3 py-1 font-mono text-sm"></span>
					</div>

					<button
						onClick={() => setIsModalOpen(true)}
						className="neo-btn flex items-center gap-2"
					>
						<IconPlus size={20} stroke={2.5} />
						New API Key
					</button>
				</div>

				{/* API Keys Grid */}
				{isLoading && (
					<div className="py-8 text-center">
						<div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2"></div>
					</div>
				)}

				{/* No data state */}
				{!isLoading && data && (
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{data.map((key: spiderAPIKey) => (
							<ApiKeyCard
								key={key.id}
								apiKey={key}
								onEdit={handleEditApiKey}
							/>
						))}
					</div>
				)}

				{!isLoading && !data && (
					<div className="bg-card neo-border-thick neo-shadow-md p-12 text-center">
						<div className="bg-muted neo-border mx-auto mb-4 flex h-16 w-16 items-center justify-center">
							<IconKey size={32} className="text-muted-foreground" />
						</div>
						<h3 className="mb-2 text-lg font-black uppercase">
							No API Keys
						</h3>
						<p className="text-muted-foreground mb-6">
							Create your first API key to get started with SpiderQ
						</p>
						<button
							onClick={() => setIsModalOpen(true)}
							className="bg-spider-green neo-border neo-shadow-sm hover:bg-spider-yellow inline-flex items-center gap-2 px-5 py-3 text-sm font-black text-black uppercase transition-colors"
						>
							<IconPlus size={20} stroke={2.5} />
							Create API Key
						</button>
					</div>
				)}
			</div>
			</Protect>
			<CreateApiKeyModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				apiKey={editingApiKey || undefined}
				isEditing={!!editingApiKey}
			/>
		</div>
	);
}
