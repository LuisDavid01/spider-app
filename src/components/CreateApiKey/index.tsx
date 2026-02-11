"use client"

import { useState, useEffect, useActionState } from "react"
import { IconX, IconKey, IconCopy, IconCheck } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { Form, FormError, FormGroup } from "../FormWithActions"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { createAPIKey, updateAPIKey } from "@/actions/apikey"
import type { spiderAPIKey } from "@/types/apikey"
import { parseDate } from "@/utils"

interface CreateApiKeyModalProps {
	isOpen: boolean
	onClose: () => void
	apiKey?: spiderAPIKey
	isEditing?: boolean
}

export function CreateApiKeyModal({ isOpen, onClose, apiKey, isEditing }: CreateApiKeyModalProps) {
	const [name, setName] = useState("")
	const [createdKey, setCreatedKey] = useState<string | null>(null)
	const [copied, setCopied] = useState(false)
	const initialState: ActionResponse = {
		success: false,
		message: '',
		errors: undefined,
	}
	// Use useActionState hook for the Form submission action
	const [state, formAction, isPending] = useActionState<
		ActionResponse,
		FormData
	>(async (prevState: ActionResponse, formData: FormData) => {
		// Extract data from Form
		const data = {
			name: formData.get("name") as string,
			expiration_date: formData.get("expiration_date") as string,
		}

		try {
			const result = isEditing
				? await updateAPIKey(apiKey!.id, data)
				: await createAPIKey(data)

			// Handle successful submission
			if (result.success) {
				console.log(result)
			}

			return result
		} catch (err) {
			return {
				success: false,
				message: (err as Error).message || 'An error occurred',
				errors: undefined
			}
		}
	}, initialState)


	useEffect(() => {
		if (!isOpen) {
			setName("")
			setCreatedKey(null)
			setCopied(false)
		}
	}, [isOpen])


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
				<Form action={formAction}>
					<div className="p-6">


						{state?.message && (
							<FormError
								className={`mb-4 ${state.success ? 'bg-green-100 text-green-800 border-green-300' : ''
									}`}
							>
								{state.message}
							</FormError>
						)}
						<FormGroup className="mb-3">
							<Input
								name="name"
								id="name"
								type="text"
								defaultValue={apiKey?.name ?? ""}
								required
								placeholder="e.g. Default Api Key"
								className=" bg-input border-input text-text-primary placeholder:text-muted-foreground resize-none"
							/>

						</FormGroup>


						{state.errors?.rating && (
							<FormError
								className={`mb-4}`}
							>
								{state.errors.name}
							</FormError>

						)}

						<FormGroup className="mb-3">
							<Input
								name="expiration_date"
								id="expiration_date"
								defaultValue={apiKey?.expiration_date
									? parseDate(apiKey.expiration_date)
									: ""}
								type="date"
								placeholder="Expiration Date"
								className=" bg-input border-input text-text-primary placeholder:text-muted-foreground resize-none"
							/>
						</FormGroup>


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
								<Button
									type="submit"
									disabled={isPending}
									className={cn(
										"flex-1 font-black uppercase text-sm px-5 py-3 neo-border neo-shadow-sm transition-colors",
									)}
								>
								{isEditing ? "Edit Key" : "Create Key"}
								</Button>
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
				</Form>
			</div>

		</div>
	)
}

