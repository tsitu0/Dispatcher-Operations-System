"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type { Container } from "@/lib/hooks/use-containers"

interface ContainerFormProps {
  initialData?: Container
  onSubmit: (data: Omit<Container, "id">) => Promise<void>
  isLoading?: boolean
  error?: string
}

const containerSizes = ["20ft", "40ft", "45ft"]

export function ContainerForm({ initialData, onSubmit, isLoading = false, error }: ContainerFormProps) {
  const [formData, setFormData] = useState({
    caseNumber: initialData?.caseNumber || "",
    mblNumber: initialData?.mblNumber || "",
    containerNumber: initialData?.containerNumber || "",
    size: initialData?.size || "",
    terminal: initialData?.terminal || "",
    deliveryAddressCompany: initialData?.deliveryAddressCompany || "",
    appointmentTime: initialData?.appointmentTime || "",
    lfd: initialData?.lfd || "",
    eta: initialData?.eta || "",
    billingParty: initialData?.billingParty || "",
    demurrage: initialData?.demurrage || "",
    inputPerson: initialData?.inputPerson || "",
    notes: initialData?.notes || "",
    deliveryAppointment: initialData?.deliveryAppointment || "",
    emptyStatus: initialData?.emptyStatus || "",
    rtLocEmptyApp: initialData?.rtLocEmptyApp || "",
    yards: initialData?.yards || "",
    puDriver: initialData?.puDriver || "",
    driverId: initialData?.driverId || "",
    chassisId: initialData?.chassisId || "",
  })

  const [validationError, setValidationError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setValidationError("")

    if (!formData.caseNumber.trim()) {
      setValidationError("Case Number is required")
      return
    }

    try {
      await onSubmit(formData as Omit<Container, "id">)
    } catch (err) {
      setValidationError(err instanceof Error ? err.message : "Failed to save container")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Container" : "Create New Container"}</CardTitle>
        <CardDescription>Enter container details and logistics information</CardDescription>
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
            <label className="text-sm font-medium">Case Number *</label>
            <Input
              name="caseNumber"
              value={formData.caseNumber}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Input Person</label>
            <Input
              name="inputPerson"
              value={formData.inputPerson}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">ETA (Estimated Time of Arrival)</label>
            <Input name="eta" value={formData.eta} onChange={handleChange} disabled={isLoading} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Container ID</label>
            <Input
              name="containerNumber"
              value={formData.containerNumber}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">MBL#</label>
            <Input name="mblNumber" value={formData.mblNumber} onChange={handleChange} disabled={isLoading} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Chassis</label>
              <Input
                name="chassisId"
                value={formData.chassisId}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Driver</label>
              <Input
                name="driverId"
                value={formData.driverId}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Demurrage</label>
            <Input
              name="demurrage"
              value={formData.demurrage}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Size</label>
              <Input
                name="size"
                value={formData.size}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Terminal</label>
              <Input
                name="terminal"
                value={formData.terminal}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">LFD (Last Free Day)</label>
            <Input name="lfd" value={formData.lfd} onChange={handleChange} disabled={isLoading} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Appointment Time</label>
            <Input name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} disabled={isLoading} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-background min-h-24"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Delivery Appointment</label>
            <Input
              name="deliveryAppointment"
              value={formData.deliveryAppointment}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Empty Status</label>
            <Input
              name="emptyStatus"
              value={formData.emptyStatus}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">RT LOC EMPTY APP</label>
            <Input
              name="rtLocEmptyApp"
              value={formData.rtLocEmptyApp}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Yards</label>
            <Input
              name="yards"
              value={formData.yards}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">PU DRIVER</label>
            <Input
              name="puDriver"
              value={formData.puDriver}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Delivery Address & Company Name</label>
            <Input
              name="deliveryAddressCompany"
              value={formData.deliveryAddressCompany}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Billing Party</label>
            <Input
              name="billingParty"
              value={formData.billingParty}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : initialData ? "Update Container" : "Create Container"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
