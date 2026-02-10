import { TermsSection } from "@/components/onboarding/TermsSection";
import { AcceptanceCard } from "@/components/onboarding/AcceptanceCard";
import { IconShield, IconBug, IconLock, IconBrain, IconHelp } from "@tabler/icons-react";

export default function OnboardingPage() {

	return (
		<div >
			{/* Hero Banner */}

			<div className="my-4 flex text-center align-middle justify-center">

				<h1 className="text-foreground font-black text-3xl sm:text-xl lg:text-4xl xl:text-5xl leading-tight text-balance">
					Términos y Condiciones
				</h1>


			</div>

			<div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:py-12">
				<div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
					{/* Terms Content - Scrollable */}
					<div className="space-y-6 lg:col-span-2 lg:pr-4">
						{/* Intro Card */}
						<div className="bg-secondary neo-border neo-shadow-xl p-4 sm:p-6 lg:p-8 rotate-[-0.5deg]">
							<h2 className="text-foreground mb-3 sm:mb-4 text-xl sm:text-2xl lg:text-3xl font-black leading-tight">
								📋 Lee Antes de Continuar
							</h2>
							<p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
								SpiderQ es una herramienta de ciberseguridad que utiliza inteligencia artificial para potenciar la investigacion y descubrimiento activo de vulnerabilidades a dominios y servidores web el uso de la herramienta queda a discrecion del usuario y el uso que se pone en practica.
							</p>
						</div>

						{/* Terms Sections */}
						<div className="border border-gray-300 rounded bg-white h-96 overflow-y-auto p-4 prose  text-gray-700">
							Aquí pones todo tu texto de términos y condiciones sin formato especial. Solo escribes todo corrido y se va a ver bien. La caja tiene scroll automático cuando el contenido es muy largo.

							Puedes poner saltos de línea normales y todo se verá corporativo y limpio.

							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

							[... aquí va todo tu texto ...]
						</div>
					</div>

					{/* Sidebar - Sticky */}
					<div className="lg:col-span-1 space-y-6">
						<div className="lg:sticky lg:top-4 space-y-6">
							<AcceptanceCard />


						</div>
					</div>
				</div>
			</div>
		</div>
	);

}
