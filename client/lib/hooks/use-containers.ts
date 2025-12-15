"use client"

import { useState, useEffect, useCallback } from "react"
import { apiClient } from "@/lib/api-client"

export interface Container {
  id: string
  containerNumber: string
  caseNumber?: string
  mblNumber?: string
  size?: string
  terminal?: string
  deliveryAddressCompany?: string
  appointmentTime?: string
  lfd?: string
  eta?: string
  billingParty?: string
  demurrage?: string
  inputPerson?: string
  notes?: string
  deliveryAppointment?: string
  emptyStatus?: string
  rtLocEmptyApp?: string
  yards?: string
  puDriver?: string // Added PU DRIVER field
  driverId?: string
  chassisId?: string
}

export function useContainers() {
  const [containers, setContainers] = useState<Container[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isImporting, setIsImporting] = useState(false)

  const fetchContainers = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await apiClient.get<Container[]>("/containers")
      setContainers(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch containers")
      setContainers([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContainers()
  }, [fetchContainers])

  const createContainer = useCallback(
    async (container: Omit<Container, "id">) => {
      try {
        const newContainer = await apiClient.post<Container>("/containers", container)
        setContainers([...containers, newContainer])
        return newContainer
      } catch (err) {
        throw err instanceof Error ? err : new Error("Failed to create container")
      }
    },
    [containers],
  )

  const updateContainer = useCallback(
    async (id: string, container: Partial<Container>) => {
      try {
        const updated = await apiClient.put<Container>(`/containers/${id}`, container)
        setContainers(containers.map((c) => (c.id === id ? updated : c)))
        return updated
      } catch (err) {
        throw err instanceof Error ? err : new Error("Failed to update container")
      }
    },
    [containers],
  )

  const deleteContainer = useCallback(
    async (id: string) => {
      try {
        await apiClient.delete(`/containers/${id}`)
        setContainers(containers.filter((c) => c.id !== id))
      } catch (err) {
        throw err instanceof Error ? err : new Error("Failed to delete container")
      }
    },
    [containers],
  )

  const importFromFile = useCallback(
    async (file: File) => {
      if (!file) {
        throw new Error("Please select a file to upload")
      }

      setIsImporting(true)
      try {
        const result = await apiClient.upload<{ insertedCount: number; updatedCount: number; skippedCount: number; totalRows: number }>(
          "/containers/import",
          file,
        )
        await fetchContainers()
        return result
      } catch (err) {
        throw err instanceof Error ? err : new Error("Failed to import containers")
      } finally {
        setIsImporting(false)
      }
    },
    [fetchContainers],
  )

  return {
    containers,
    isLoading,
    error,
    fetchContainers,
    createContainer,
    updateContainer,
    deleteContainer,
    importFromFile,
    isImporting,
  }
}
