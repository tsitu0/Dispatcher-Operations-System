"use client"

import { useState, useEffect, useCallback } from "react"
import { apiClient } from "@/lib/api-client"

export interface Chassis {
  id: string
  licensePlate: string
  type: string
  status: "Available" | "In Use" | "Maintenance"
}

export function useChassis() {
  const [chassis, setChassis] = useState<Chassis[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchChassis = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await apiClient.get<Chassis[]>("/chassis")
      const normalized = Array.isArray(data)
        ? data
        : Array.isArray((data as { data?: Chassis[] })?.data)
          ? (data as { data?: Chassis[] }).data || []
          : []
      setChassis(normalized)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch chassis")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchChassis()
  }, [fetchChassis])

  return { chassis, isLoading, error, fetchChassis }
}
