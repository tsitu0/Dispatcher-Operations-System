"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Chassis } from "@/lib/hooks/use-chassis"

interface ChassisTableProps {
  chassis: Chassis[]
  isLoading: boolean
  error: string | null
}

const statusColors: Record<string, string> = {
  Available: "bg-green-100 text-green-800",
  "In Use": "bg-blue-100 text-blue-800",
  Maintenance: "bg-orange-100 text-orange-800",
}

export function ChassisTable({ chassis, isLoading, error }: ChassisTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Chassis</CardTitle>
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
        ) : chassis.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No chassis found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-5 font-semibold">Chassis ID</th>
                  <th className="text-left py-4 px-5 font-semibold">License Plate</th>
                  <th className="text-left py-4 px-5 font-semibold">Type</th>
                  <th className="text-left py-4 px-5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {chassis.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-muted/50">
                    <td className="py-4 px-5 font-mono text-sm">{item.id}</td>
                    <td className="py-4 px-5 font-mono font-semibold">{item.licensePlate}</td>
                    <td className="py-4 px-5 text-sm">{item.type}</td>
                    <td className="py-4 px-5">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.status] || "bg-gray-100"}`}
                      >
                        {item.status}
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
