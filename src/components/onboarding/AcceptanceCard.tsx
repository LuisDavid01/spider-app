"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { acceptTerms } from "@/actions/onboarding";
import {
	IconLoader2,
	IconShield,
	IconAlertTriangle,
} from "@tabler/icons-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


export function AcceptanceCard() {
	const [isAccepted, setIsAccepted] = useState(false);
	const [isPending, startTransition] = useTransition();
	const { user } = useUser()
	const router = useRouter()

	const handleSubmit = async () => {
		if (!isAccepted) return;

		startTransition(async () => {
			const result = await acceptTerms();
			if (result.success) {
				await user?.reload()
				router.push('/')
			}
		});
	};
	return (
		<Card className="neo-border neo-shadow-xl bg-card sticky top-4 overflow-hidden">
			<CardHeader className="bg-destructive/20 border-b-4 border-black p-4 sm:p-6">
				<CardTitle className="text-destructive flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-black">
					<IconAlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
					<span className="leading-tight">¡Aceptación Obligatoria!</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
				<div className="space-y-4">
					<label className="group flex cursor-pointer items-start gap-3 sm:gap-4">
						<div className="flex items-center justify-center pt-1">
							<Checkbox
								checked={isAccepted}
								onCheckedChange={(checked) => setIsAccepted(checked as boolean)}
								className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-5 w-5 sm:h-6 sm:w-6 border-3 border-black data-[state=checked]:border-black neo-shadow-sm transition-all hover:scale-110"
							/>
						</div>
						<div className="space-y-2 flex-1">
							<p className="text-sm sm:text-base leading-relaxed font-black text-foreground">
								He leído y acepto todo lo establecido
							</p>
							<p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
								Al marcar esta casilla, confirmas que has revisado completamente los términos de servicio, política de privacidad y condiciones de uso de IA para ciberseguridad de SpiderQ. Reconoces que nuestra plataforma utiliza inteligencia artificial avanzada para análisis de seguridad.
							</p>
						</div>
					</label>
				</div>

				<div className="bg-primary/10 neo-border flex items-start sm:items-center gap-2 sm:gap-3 p-3 sm:p-4">
					<IconShield className="text-primary h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 mt-0.5 sm:mt-0" />
					<p className="text-xs sm:text-sm font-bold text-foreground leading-relaxed">
						Máxima seguridad garantizada: Encriptación AES-256 y protección empresarial
					</p>
				</div>

				<Button
					onClick={handleSubmit}
					disabled={!isAccepted || isPending}
					className="neo-border neo-shadow-md bg-primary text-primary-foreground hover:bg-primary/90 w-full py-4 sm:py-6 text-sm sm:text-base font-black transition-all hover:neo-shadow-lg hover:translate-x-[-2px] hover:translate-y-[-2px] active:neo-shadow-sm active:translate-x-0 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0"
				>
					{isPending ? (
						<span className="flex items-center justify-center gap-2">
							<IconLoader2 className="h-5 w-5 animate-spin" />
							<span className="hidden sm:inline">Procesando tu registro...</span>
							<span className="sm:hidden">Procesando...</span>
						</span>
					) : (
						<span className="flex items-center justify-center gap-2">
							<span>¡Entrar a SpiderQ Ahora!</span>
							<IconShield className="h-5 w-5" />
						</span>
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
