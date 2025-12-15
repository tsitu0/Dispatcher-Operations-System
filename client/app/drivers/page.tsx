"use client"

import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { DriverTable } from "@/components/drivers/driver-table"
import { useDrivers } from "@/lib/hooks/use-drivers"
import { Button } from "@/components/ui/button"

export default function DriversPage() {
  const { drivers, isLoading, error } = useDrivers()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-screen-2xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Driver Management</h1>
          <Link href="/drivers/new">
            <Button>New Driver</Button>
          </Link>
        </div>
        {/* </CHANGE> */}
        <DriverTable drivers={drivers} isLoading={isLoading} error={error} />
      </div>
    </div>
  )
}
