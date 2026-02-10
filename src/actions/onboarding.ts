"use server";

import { env } from "@/env";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export interface ActionResponse {
	success: boolean;
	message?: string;
	error?: string;
}

/**
 * Accept terms and register user
 */
export const acceptTerms = async (): Promise<ActionResponse> => {
	try {
		const user = await auth();
		if (!user.userId) {
			throw new Error("Unauthorized");
		}

		const token = await user.getToken();
		if (!token) {
			throw new Error("No authentication token available");
		}

		const response = await fetch(
			`${env.NEXT_PUBLIC_API_BASE_URL}/user/register`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${token}`,
				},
				// No body as requested - only token in authorization header
			},
		);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Failed to register user: ${response.status} ${errorText}`,
			);
		}
		const client = await clerkClient()
		await client.users.updateUser(user.userId, {
			publicMetadata: {
				onboardingComplete: true,
			},
		})


		return {
			success: true,
			message: "Successfully registered user",
		};
	} catch (error) {
		console.error("Registration error:", error);

		if (error instanceof Error) {
			return {
				success: false,
				message: "Registration failed",
				error: error.message,
			};
		}

		return {
			success: false,
			message: "Registration failed",
			error: "Unknown error occurred",
		};
	}
};
