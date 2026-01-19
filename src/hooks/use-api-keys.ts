"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createAPIKey, getAPIKeys, revokeAPIKey, updateAPIKey, type APIKeyData } from "@/actions/apikey"
import { useUser } from "@clerk/nextjs"
import type { APIKey } from "@/types/apikey"
/**
 * Hook to fetch API keys for the current user
 */
export function useAPIKeys() {
    const { user } = useUser()

    return useQuery({
        queryKey: ["apiKeys", user?.id],
        queryFn: () => {
            if (!user?.id) throw new Error("User not authenticated")
            return getAPIKeys(user.id)
        },
        enabled: !!user?.id,
    })
}

/**
 * Hook to create a new API key
 */
export function useCreateAPIKey() {
    const queryClient = useQueryClient()
    const { user } = useUser()

    return useMutation({
        mutationFn: (data?: APIKeyData) => createAPIKey(data),
        onSuccess: () => {
            // Invalidate and refetch API keys
            queryClient.invalidateQueries({ queryKey: ["apiKeys", user?.id] })
        },
    })
}

/**
 * Hook to update an API key
 */
export function useUpdateAPIKey() {
    const queryClient = useQueryClient()
    const { user } = useUser()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<APIKeyData> }) =>
            updateAPIKey(id, data),
        onMutate: async ({ id, data }) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["apiKeys", user?.id] })

            // Snapshot previous value
            const previousKeys = queryClient.getQueryData<APIKey[]>(["apiKeys", user?.id])

            // Optimistically update
            if (previousKeys) {
                queryClient.setQueryData<APIKey[]>(
                    ["apiKeys", user?.id],
                    previousKeys.map((key) =>
                        key.id === id ? { ...key, ...data } : key
                    )
                )
            }

            return { previousKeys }
        },
        onError: (_err, _variables, context) => {
            // Rollback on error
            if (context?.previousKeys) {
                queryClient.setQueryData(["apiKeys", user?.id], context.previousKeys)
            }
        },
        onSettled: () => {
            // Refetch after mutation
            queryClient.invalidateQueries({ queryKey: ["apiKeys", user?.id] })
        },
    })
}

/**
 * Hook to revoke/delete an API key
 */
export function useRevokeAPIKey() {
    const queryClient = useQueryClient()
    const { user } = useUser()

    return useMutation({
        mutationFn: (id: string) => revokeAPIKey(id),
        onMutate: async (id) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["apiKeys", user?.id] })

            // Snapshot previous value
            const previousKeys = queryClient.getQueryData<APIKey[]>(["apiKeys", user?.id])

            // Optimistically remove the key
            if (previousKeys) {
                queryClient.setQueryData<APIKey[]>(
                    ["apiKeys", user?.id],
                    previousKeys.filter((key) => key.id !== id)
                )
            }

            return { previousKeys }
        },
        onError: (_err, _variables, context) => {
            // Rollback on error
            if (context?.previousKeys) {
                queryClient.setQueryData(["apiKeys", user?.id], context.previousKeys)
            }
        },
        onSettled: () => {
            // Refetch after mutation
            queryClient.invalidateQueries({ queryKey: ["apiKeys", user?.id] })
        },
    })
}
