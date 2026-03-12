'use server'

import { env } from "@/env"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"



// Schema for creating/updating API keys
const APIKeySchema = z.object({
	name: z.string().optional(),
	expiration_date: z.string().optional(),

})

export type APIKeyData = z.infer<typeof APIKeySchema>

const baseUrl = env.NEXT_PUBLIC_API_BASE_URL

/**
 * Get all API keys for a user
 */
export const getAPIKeys = async () => {
	const user = await auth()
	if (!user.userId) {
		return { success: false, message: 'Unauthorized' }
	}

	const token = await user.getToken()
	const res = await fetch(`${baseUrl}/apikey/user/${user.userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	})

	if (!res.ok) {
		throw new Error('Failed to fetch API keys')
	}

	return res.json()
}

/**
 * Create a new API key
 */
export const createAPIKey = async (data: APIKeyData = {}) => {
	const user = await auth()
	if (!user.userId) {
		throw new Error('Unauthorized')
	}

	const token = await user.getToken()

	const validationResult = APIKeySchema.safeParse(data)
	if (!validationResult.success) {
		return {
			success: false,
			message: 'Validation failed',
			errors: validationResult.error.flatten().fieldErrors,
		}
	}
	console.log(validationResult.data.expiration_date)

	const response = await fetch(`${baseUrl}/apikey`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(validationResult.data),
	})

	if (!response.ok) {
		return { success: false, message: 'Failed to create API key' }
	}

	revalidatePath('/dashboard')
	return { success: true, message: 'Api key created successfully' }
}


export const updateAPIKey = async (id: string, data: Partial<APIKeyData>) => {
	const user = await auth()
	if (!user.userId) {
		return { success: false, message: 'Unauthorized' }
	}

	const token = await user.getToken()

	// Validate with Zod
	const validationResult = APIKeySchema.partial().safeParse(data)
	if (!validationResult.success) {
		return {
			success: false,
			message: 'Validation failed',
			errors: validationResult.error.flatten().fieldErrors,
		}
	}


	const validatedData = validationResult.data
	const updateData: Record<string, unknown> = {}

	if (validatedData.name !== undefined)
		updateData.name = validatedData.name
	if (validatedData.expiration_date !== undefined)
		updateData.expiration_date = validatedData.expiration_date

	const response = await fetch(`${baseUrl}/apikey/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(updateData),
	})

	if (!response.ok) {
		return { success: false, message: 'Failed to update API key' }
	}

	revalidatePath('/dashboard')
	return { success: true, message: 'API key updated successfully' }
}


export const revokeAPIKey = async (id: string) => {
	const user = await auth()
	if (!user.userId) {
		return { success: false, message: 'Unauthorized' }
	}

	const token = await user.getToken()
	const res = await fetch(`${baseUrl}/apikey/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	})

	if (!res.ok) {
		return { success: false, message: 'Failed to revoke API key' }
	}

	revalidatePath('/dashboard')
	return { success: true, message: 'API key revoked successfully' }
}
