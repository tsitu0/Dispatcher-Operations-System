"use client"

import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { ChassisForm } from "@/components/chassis/chassis-form"
import { apiClient } from "@/lib/api-client"
import type { Chassis } from "@/lib/hooks/use-chassis"

export default function NewChassisPage() {
  const router = useRouter()

  const handleSubmit = async (data: Omit<Chassis, "id">) => {
    await apiClient.post("/chassis", data)
    router.push("/chassis")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <ChassisForm onSubmit={handleSubmit} onCancel={() => router.push("/chassis")} />
      </div>
    </div>
  )
}
