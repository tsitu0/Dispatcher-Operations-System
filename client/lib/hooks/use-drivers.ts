"use client"

import { useState, useEffect, useCallback } from "react"
import { apiClient } from "@/lib/api-client"

export interface Driver {
  id: string
  name: string
  phone: string
  licenseNumber: string
  status: "Available" | "Assigned" | "Off Duty"
}

export function useDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDrivers = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await apiClient.get<Driver[]>("/drivers")
      const normalized = Array.isArray(data)
        ? data
        : Array.isArray((data as { data?: Driver[] })?.data)
          ? (data as { data?: Driver[] }).data || []
          : []
      setDrivers(normalized)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch drivers")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDrivers()
  }, [fetchDrivers])

  return { drivers, isLoading, error, fetchDrivers }
}
