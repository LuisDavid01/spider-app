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
import { IconSend, IconShare } from "@tabler/icons-react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { sendFeedback } from "@/actions/feedback";

const FEATURES = [
	{ id: "feature-1", label: "Scripting automation" },
	{ id: "feature-2", label: "Visual docs" },
	{ id: "feature-3", label: "Reports automation" },
	{ id: "feature-4", label: "Risk assessment" },
	{ id: "feature-5", label: "URL fuzzing" },
	{ id: "feature-6", label: "Web scraping" },
] as const;

interface feedbackProps {
	btnText?: string;
	btnClassName?: string;
}

export function FeedbackForm({ btnText, btnClassName }: feedbackProps) {
	const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

	const initialState: ActionResponse = {
		success: false,
		message: "",
		errors: undefined,
	};

	const handleFeatureToggle = (featureId: string) => {
		const feature = FEATURES.find((f) => f.id === featureId);
		if (!feature) return;

		const label = feature.label;
		setSelectedFeatures((prev) =>
			prev.includes(label)
				? prev.filter((name) => name !== label)
				: [...prev, label]
		);
	};

	const [state, formAction, isPending] = useActionState<
		ActionResponse,
		FormData
	>(async (prevState: ActionResponse, formData: FormData) => {
		const data = {
			features: selectedFeatures,
			coment: formData.get("coment") as string,
			expertise: formData.get("expertise") as string,
			companyrole: formData.get("companyrole") as string,
		};

		try {
			const result = await sendFeedback(data);
			if (result.success) {
				setSelectedFeatures([]);
			}
			return result;
		} catch (err) {
			return {
				success: false,
				message: (err as Error).message || "An error occurred",
				errors: undefined,
			};
		}
	}, initialState);

	return (
		<div className="flex items-center justify-center">
			<Modal>
				<ModalTrigger className={btnClassName}>
					<span className="">
						<IconShare size={16} />
					</span>
					{btnText}
				</ModalTrigger>
				<ModalBody>
					<Form action={formAction}>
						<ModalContent>
							{/* Header */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
								className="text-center mb-4"
							>
								{state?.message && (
									<FormError
										className={`mb-3 ${
											state.success
												? "inline-block px-3 py-1 border bg-green-100 text-green-800 border-green-300 text-sm"
												: ""
										}`}
									>
										{state.message}
									</FormError>
								)}
								<h4 className="text-lg sm:text-xl md:text-2xl font-bold">
									Help us improve SpiderQ
								</h4>
							</motion.div>

							{/* Expertise y Role - Grid responsivo */}
							<div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
								<FormGroup>
									<motion.div
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.1 }}
									>
										<Label htmlFor="expertise" className="block text-sm font-medium mb-2">
											Area of expertise
										</Label>
										<Input
											name="expertise"
											id="expertise"
											placeholder="e.g., Cybersecurity"
											className={state?.errors?.expertise ? "border-red-500" : ""}
										/>
										{state.errors?.expertise && (
											<FormError className="mt-1 text-xs">
												{state.errors.expertise}
											</FormError>
										)}
									</motion.div>
								</FormGroup>

								<FormGroup>
									<motion.div
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.15 }}
									>
										<Label htmlFor="companyrole" className="block text-sm font-medium mb-2">
											Current role
										</Label>
										<Input
											name="companyrole"
											id="companyrole"
											placeholder="e.g., Senior Engineer"
											className={
												state?.errors?.companyrole ? "border-red-500" : ""
											}
										/>
										{state.errors?.companyrole && (
											<FormError className="mt-1 text-xs">
												{state.errors.companyrole}
											</FormError>
										)}
									</motion.div>
								</FormGroup>
							</div>

							{/* Features - Checkboxes compactos horizontales */}
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className="mb-4"
							>
								<p  className="block text-sm font-medium mb-2">
									Features you'd like to see
								</p>
								
								{/* Grid compacto de checkboxes */}
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
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
												className="text-xs sm:text-sm font-normal cursor-pointer leading-tight"
											>
												{feature.label}
											</Label>
										</div>
									))}
								</div>
								
								{state.errors?.features && (
									<FormError className="mt-2 text-xs">
										{state.errors.features}
									</FormError>
								)}
							</motion.div>

							{/* Comentarios */}
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.25 }}
							>
								<Label htmlFor="coment" className="block text-sm font-medium mb-2">
									Additional suggestions
								</Label>
								<Textarea
									name="coment"
									id="coment"
									placeholder="Share your thoughts..."
									rows={2}
									className={state?.errors?.coment ? "border-red-500" : ""}
								/>
								{state.errors?.coment && (
									<FormError className="mt-1 text-xs">
										{state.errors.coment}
									</FormError>
								)}
							</motion.div>
						</ModalContent>

						<ModalFooter>
							<Button
							variant={"default"}
								type="submit"
								disabled={isPending}
								className="dark:text-muted-foreground neo-btn"
							>
							<IconSend className="w-4 h-4" />
								{isPending ? (
									<>
										Sending...
									</>
								) : (
									<>
										Send feedback
									</>
								)}
							</Button>
						</ModalFooter>
					</Form>
				</ModalBody>
			</Modal>
		</div>
	);
}
