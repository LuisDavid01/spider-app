export {};

declare global {
	interface CustomJwtSessionClaims {
		metadata: {
			onboardingComplete?: boolean
			role?: Roles;
		};
	}

	// tipo generico para las respuestas de los formularios

	 type ActionResponse = {
		success: boolean
		message: string
		errors?: Record<string, string[]>
		error?: string
	}
}
