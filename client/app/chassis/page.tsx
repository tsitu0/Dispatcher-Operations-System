"use client"

import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { ChassisTable } from "@/components/chassis/chassis-table"
import { useChassis } from "@/lib/hooks/use-chassis"
import { Button } from "@/components/ui/button"

export default function ChassisPage() {
  const { chassis, isLoading, error } = useChassis()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-screen-2xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Chassis Management</h1>
          <Link href="/chassis/new">
            <Button>New Chassis</Button>
          </Link>
        </div>
        {/* </CHANGE> */}
        <ChassisTable chassis={chassis} isLoading={isLoading} error={error} />
      </div>
    </div>
  )
}
