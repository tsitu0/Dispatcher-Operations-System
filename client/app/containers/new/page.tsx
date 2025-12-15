"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { ContainerForm } from "@/components/containers/container-form"
import { useContainers } from "@/lib/hooks/use-containers"

export default function NewContainerPage() {
  const router = useRouter()
  const { createContainer } = useContainers()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    setError("")
    try {
      await createContainer(data)
      router.push("/containers")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create container")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-10">Create New Container</h1>
        <ContainerForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
      </div>
    </div>
  )
}
