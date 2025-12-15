"use client"

import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { DriverForm } from "@/components/drivers/driver-form"
import { apiClient } from "@/lib/api-client"
import type { Driver } from "@/lib/hooks/use-drivers"

export default function NewDriverPage() {
  const router = useRouter()

  const handleSubmit = async (data: Omit<Driver, "id">) => {
    await apiClient.post("/drivers", data)
    router.push("/drivers")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <DriverForm onSubmit={handleSubmit} onCancel={() => router.push("/drivers")} />
      </div>
    </div>
  )
}
