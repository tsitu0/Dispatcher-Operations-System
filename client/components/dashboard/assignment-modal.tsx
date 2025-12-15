"use client"

import { useState, type FormEvent } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, X } from "lucide-react"
import type { Driver } from "@/lib/hooks/use-drivers"
import type { Chassis } from "@/lib/hooks/use-chassis"
import type { Container } from "@/lib/hooks/use-containers"

interface AssignmentModalProps {
  container: Container | null
  drivers: Driver[]
  chassis: Chassis[]
  isOpen: boolean
  isLoading: boolean
  error?: string
  onSubmit: (driverId: string, chassisId: string) => Promise<void>
  onClose: () => void
}

export function AssignmentModal({
  container,
  drivers,
  chassis,
  isOpen,
  isLoading,
  error,
  onSubmit,
  onClose,
}: AssignmentModalProps) {
  const [selectedDriver, setSelectedDriver] = useState("")
  const [selectedChassis, setSelectedChassis] = useState("")
  const [validationError, setValidationError] = useState("")

  if (!isOpen || !container) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setValidationError("")

    if (!selectedDriver || !selectedChassis) {
      setValidationError("Please select both a driver and chassis")
      return
    }

    try {
      await onSubmit(selectedDriver, selectedChassis)
      setSelectedDriver("")
      setSelectedChassis("")
      onClose()
    } catch (err) {
      setValidationError(err instanceof Error ? err.message : "Failed to assign")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Assign Resources</CardTitle>
            <CardDescription>Container {container.id}</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {(error || validationError) && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error || validationError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Driver</label>
              <select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                disabled={isLoading}
              >
                <option value="">Select a driver</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name} ({driver.status})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Chassis</label>
              <select
                value={selectedChassis}
                onChange={(e) => setSelectedChassis(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                disabled={isLoading}
              >
                <option value="">Select a chassis</option>
                {chassis.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.licensePlate} ({item.status})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "Assigning..." : "Assign"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
