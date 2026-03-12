"use client";

import { useState } from "react";
import {
	IconEye,
	IconEyeOff,
	IconCopy,
	IconTrash,
	IconDotsVertical,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { spiderAPIKey } from "@/types/apikey";
import { revokeAPIKey } from "@/actions/apikey";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { parseDate } from "@/utils";

interface ApiKeyCardProps {
	onEdit?: (apiKey: spiderAPIKey) => void;
	apiKey: spiderAPIKey;
}

const statusStyles = {
	active: "bg-spider-green text-black",
	inactive: "bg-spider-yellow text-black",
	expired: "bg-spider-red text-white",
};

export function ApiKeyCard({
	onEdit,
	apiKey,
}: ApiKeyCardProps) {
	const [revealed, setRevealed] = useState(false);
	const [copied, setCopied] = useState(false);
	const queryClient = useQueryClient()
	const router = useRouter()
	const handleCopy = () => {
		navigator.clipboard.writeText(apiKey.secret);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDelete = async () => {
		await revokeAPIKey(apiKey.id)
		queryClient.invalidateQueries({queryKey: ["apikeys"]})
		router.refresh()
	}

	const maskedKey = apiKey.secret.slice(0, 8) + "•".repeat(24) + apiKey.secret.slice(-4);

	return (
		<div className="bg-card neo-border-thick neo-shadow-md p-6">
			<div className="mb-4 flex items-start justify-between">
				<div>
					<h3 className="text-lg font-black uppercase">{apiKey.name}</h3>
					<span
						className={cn(
							"neo-border mt-2 inline-block px-3 py-1 text-xs font-black uppercase",
							statusStyles[apiKey.is_active ? "active" : "inactive"],
						)}
					>
						{apiKey.is_active ? "Active" : "Inactive"}
					</span>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger className="hover:bg-muted rounded-sm p-2 transition-colors">
						<IconDotsVertical size={20} />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="neo-border neo-shadow-sm">
						<DropdownMenuItem
							className="text-xs font-bold uppercase"
							onClick={() => apiKey && onEdit?.(apiKey)}
						>
							Edit Name
						</DropdownMenuItem>
						<DropdownMenuItem className="text-spider-red text-xs font-bold uppercase"
							onClick={async () => await handleDelete()}
						>
							<IconTrash className="mr-2 h-4 w-4" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="bg-muted neo-border mb-4 p-4">
				<div className="flex items-center justify-between gap-2">
					<code className="flex-1 truncate font-mono text-sm">
						{maskedKey}
					</code>
					<div className="flex items-center ">
						<button
							onClick={handleCopy}
							className={cn(
								"neo-border p-2 transition-colors",
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
					<p className="text-muted-foreground text-xs font-black uppercase">
						Created
					</p>
					<p className="font-mono">{parseDate(apiKey.created_at)}</p>
				</div>
				<div>
					<p className="text-muted-foreground text-xs font-black uppercase">
						Expires in
					</p>
					<p className="font-mono">{parseDate(apiKey.expiration_date)}</p>
				</div>
			</div>
		</div>
	);
}
