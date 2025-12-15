"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Driver } from "@/lib/hooks/use-drivers"

interface DriverTableProps {
  drivers: Driver[]
  isLoading: boolean
  error: string | null
}

const statusColors: Record<string, string> = {
  Available: "bg-green-100 text-green-800",
  Assigned: "bg-blue-100 text-blue-800",
  "Off Duty": "bg-gray-100 text-gray-800",
}

export function DriverTable({ drivers, isLoading, error }: DriverTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Drivers</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : drivers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No drivers found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-5 font-semibold">Driver ID</th>
                  <th className="text-left py-4 px-5 font-semibold">Name</th>
                  <th className="text-left py-4 px-5 font-semibold">Phone</th>
                  <th className="text-left py-4 px-5 font-semibold">License Number</th>
                  <th className="text-left py-4 px-5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.id} className="border-b hover:bg-muted/50">
                    <td className="py-4 px-5 font-mono text-sm">{driver.id}</td>
                    <td className="py-4 px-5 font-semibold">{driver.name}</td>
                    <td className="py-4 px-5 text-sm">{driver.phone}</td>
                    <td className="py-4 px-5 font-mono text-sm">{driver.licenseNumber}</td>
                    <td className="py-4 px-5">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[driver.status] || "bg-gray-100"}`}
                      >
                        {driver.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
