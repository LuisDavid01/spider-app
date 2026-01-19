'use server'

import { env } from "@/env"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"



// Schema for creating/updating API keys
const APIKeySchema = z.object({
    name: z.string().optional(), // If your API supports naming keys
    is_active: z.boolean().optional(),
})

export type APIKeyData = z.infer<typeof APIKeySchema>

const baseUrl = env.NEXT_PUBLIC_API_BASE_URL

/**
 * Get all API keys for a user
 */
export const getAPIKeys = async (userId: string) => {
    const user = await auth()
    if (!user.userId) {
        throw new Error('Unauthorized')
    }

    const token = await user.getToken()
    const res = await fetch(`${baseUrl}/apikey/user/${userId}`, {
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

    // Validate with Zod if data is provided
    const validationResult = APIKeySchema.safeParse(data)
    if (!validationResult.success) {
        throw new Error('Invalid API key data')
    }

    const response = await fetch(`${baseUrl}/apikey`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(validationResult.data),
    })

    if (!response.ok) {
        throw new Error('Failed to create API key')
    }

    revalidatePath('/dashboard')
    return response.json()
}

/**
 * Update an API key
 */
export const updateAPIKey = async (id: string, data: Partial<APIKeyData>) => {
    const user = await auth()
    if (!user.userId) {
        throw new Error('Unauthorized')
    }

    const token = await user.getToken()

    // Validate with Zod
    const validationResult = APIKeySchema.partial().safeParse(data)
    if (!validationResult.success) {
        throw new Error('Invalid API key data')
    }

    const response = await fetch(`${baseUrl}/apikey`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            id,
            ...validationResult.data,
        }),
    })

    if (!response.ok) {
        throw new Error('Failed to update API key')
    }

    revalidatePath('/dashboard')
    return response.json()
}

/**
 * Revoke/delete an API key
 */
export const revokeAPIKey = async (id: string) => {
    const user = await auth()
    if (!user.userId) {
        throw new Error('Unauthorized')
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
        throw new Error('Failed to revoke API key')
    }

    revalidatePath('/dashboard')
    return res.json()
}
