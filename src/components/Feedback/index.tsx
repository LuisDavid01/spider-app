"use client";
import React, { useActionState, useState } from "react";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalTrigger,
} from "../ui/animated-modal";

import { motion } from "motion/react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import { Form, FormError, FormGroup } from "../FormWithActions";
import { useRouter } from "next/navigation";
import { IconSend, IconShare } from "@tabler/icons-react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { sendFeedback } from "@/actions/feedback";

const FEATURES = [
	{ id: "feature-1", label: "Scripting automation" },
	{ id: "feature-2", label: "Generate visual documentation" },
	{ id: "feature-3", label: "Reports automation" },
	{ id: "feature-4", label: "Risk assertment" },
	{ id: "feature-5", label: "Url fuzzing" },
	{ id: "feature-6", label: "Web scraping" },
] as const

interface feedbackProps {
	btnText?: string,
	btnClassName?: string
}
export function FeedbackForm({
	btnText,
	btnClassName
}: feedbackProps) {
	const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

	const router = useRouter()
	const initialState: ActionResponse = {
		success: false,
		message: '',
		errors: undefined,
	}
	// Use useActionState hook for the Form submission action
	//

	const handleFeatureToggle = (featureId: string) => {
		const feature = FEATURES.find(f => f.id === featureId);
		if (!feature) return;

		const label = feature.label;

		setSelectedFeatures((prev) =>
			prev.includes(label)
				? prev.filter((name) => name !== label)  // quitar si ya está
				: [...prev, label]                       // agregar si no está
		);
	}

	const [state, formAction, isPending] = useActionState<
		ActionResponse,
		FormData
	>(async (prevState: ActionResponse, formData: FormData) => {
		// Extract data from Form
		const data = {
			features: selectedFeatures,
			coment: formData.get('coment') as string,
			expertise: formData.get('expertise') as string,
			companyrole: formData.get('companyrole') as string,


		}

		try {
			const result = await sendFeedback(data);			// Handle successful submission
			setSelectedFeatures([]);
			if (result.success) {
				console.log(result)
			}
			console.log(result)

			return result
		} catch (err) {
			return {
				success: false,
				message: (err as Error).message || 'An error occurred',
				errors: undefined
			}
		}
	}, initialState)

	return (
		<div className="flex items-center justify-center">
			<Modal>
				<ModalTrigger className={btnClassName}>
					<span className="">
						<IconShare size={16} />
					</span>
					{btnText}
				</ModalTrigger>
				<ModalBody className="mx-4 sm:mx-0 w-[calc(100%-2rem)] sm:w-auto max-w-[90%] sm:max-w-none min-h-[40%] sm:min-h-[50%] max-h-[85vh] sm:max-h-[70%] overflow-y-auto">
					<Form action={formAction} className="flex flex-col min-h-full">
						<ModalContent className="flex-1">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
								className="text-center mb-8"
							>

								<h4 className="text-2xl md:text-3xl font-bold mb-2">
									Help us improve SpiderQ
								</h4>
								{state?.message && (
									<FormError
										className={`mb-4 ${state.success
												? "inline-block px-4 py-1.5 border mb-4 bg-green-100 text-green-800 border-green-300"
												: ""
											}`}
									>
										{state.message}
									</FormError>
								)}
							</motion.div>
							<div className="mb-3 grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormGroup>
									<motion.div
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.2 }}
									>
										<label className="block text-text-primary font-medium mb-2">
											What is your area of expertise?
										</label>
										<Input
											name="expertise"
											id="expertise"
											placeholder="Cybersecurity, DevOps, etc..."
											className={state?.errors?.expertise ? "border-red-500" : ""}
										/>
									</motion.div>
									{state.errors?.expertise && (
										<FormError className="mt-1 text-sm">
											{state.errors.expertise}
										</FormError>
									)}
								</FormGroup>
								<FormGroup>
									<motion.div
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.25 }}
									>
										<label className="block text-text-primary font-medium mb-2">
											What is your current role in your company?
										</label>
										<Input
											name="companyrole"
											id="companyrole"
											placeholder="Senior Engineer, Red Team, student, etc..."
											className={state?.errors?.companyrole ? "border-red-500" : ""}
										/>
									</motion.div>
									{state.errors?.companyrole && (
										<FormError className="mt-1 text-sm">
											{state.errors.companyrole}
										</FormError>
									)}
								</FormGroup>
							</div>
							<motion.div
								initial={{ opacity: 0, x: 30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.1 }}
								className="mb-4"
							>
								<label className="block text-text-primary font-medium mb-3 text-center">
									¿Which features would you like to see in SpiderQ?
								</label>
								<div className="space-y-3">
									{FEATURES.map((feature) => (
										<div key={feature.id} className="flex items-center space-x-2">
											<Checkbox
												id={feature.id}
												checked={selectedFeatures.includes(feature.label)}
												onCheckedChange={() => handleFeatureToggle(feature.id)}
												className={state?.errors?.features ? "border-red-500" : ""}
											/>
											<Label
												htmlFor={feature.id}
												className="text-sm font-normal cursor-pointer"
											>
												{feature.label}
											</Label>
										</div>
									))}
								</div>
								{state.errors?.features && (
									<FormError className="mt-2 text-sm">
										{state.errors.features}
									</FormError>
								)}
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.2 }}
							>
								<label className="block text-text-primary font-medium mb-2">
									¿Any suggestions to improve SpiderQ?
								</label>
								<Textarea
									name="coment"
									id="coment"
									placeholder="Share your thoughts with us..."
									className={state?.errors?.coment ? "border-red-500" : ""}
								/>
							</motion.div>
							{state.errors?.coment && (
								<FormError className="mt-1 text-sm">
									{state.errors.coment}
								</FormError>
							)}
						</ModalContent>
						<ModalFooter className="gap-4 pt-6 border-t border-muted flex-shrink-0">
							<Button
								type="submit"
								disabled={isPending}
								className="px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
							>
								<>
									<IconSend className="w-4 h-4" />
									Enviar feedback
								</>
							</Button>
						</ModalFooter>
					</Form>
				</ModalBody>
			</Modal>
		</div>
	);
}
