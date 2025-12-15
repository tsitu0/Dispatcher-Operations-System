const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
const API_TIMEOUT = 10000 // 10 seconds
const USE_MOCK_DATA = (process.env.NEXT_PUBLIC_USE_MOCK_DATA || "false") === "true"

// Simulate async delay for realistic UX
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const mockData = {
  drivers: [
    { id: "DRV-001", name: "Alex Murphy", phone: "555-123-4567", licenseNumber: "LIC12345", status: "Available" },
    { id: "DRV-002", name: "Jamie Fox", phone: "555-987-6543", licenseNumber: "LIC54321", status: "Assigned" },
  ],
  chassis: [
    { id: "CH-1001", licensePlate: "ABC-123", type: "40ft", status: "Available" },
    { id: "CH-1002", licensePlate: "XYZ-789", type: "20ft", status: "In Use" },
  ],
  containers: [
    {
      id: "CONT-001",
      containerNumber: "MSCU1234567",
      caseNumber: "CASE-01",
      size: "40ft",
      terminal: "LAX",
      deliveryAddressCompany: "Acme Corp",
      lfd: "2024-05-20",
      eta: "2024-05-18",
      billingParty: "Acme Corp",
      notes: "Handle with care",
      puDriver: "Alex Murphy",
    },
  ],
}

const unwrapResponse = async (response: Response) => {
  const json = await response.json()
  if (json && typeof json === "object" && "data" in json) {
    return (json as { data: unknown }).data
  }
  return json
}

const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    try {
      if (USE_MOCK_DATA) {
        await delay(400) // Simulate delay for mock data
        if (endpoint.startsWith("/drivers")) return mockData.drivers as T
        if (endpoint.startsWith("/chassis")) return mockData.chassis as T
        if (endpoint.startsWith("/containers")) return mockData.containers as T
        return [] as T
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      return unwrapResponse(response)
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timeout. Please check your connection.")
      }
      throw error
    }
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      if (USE_MOCK_DATA) {
        await delay(300) // Simulate delay for mock data
        return { ...data, id: `MOCK-${Date.now()}` } as T
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      return unwrapResponse(response)
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timeout. Please check your connection.")
      }
      throw error
    }
  },

  async put<T>(endpoint: string, data: any): Promise<T> {
    try {
      if (USE_MOCK_DATA) {
        await delay(300) // Simulate delay for mock data
        return { ...data } as T
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      return unwrapResponse(response)
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timeout. Please check your connection.")
      }
      throw error
    }
  },

  async delete(endpoint: string): Promise<void> {
    try {
      if (USE_MOCK_DATA) {
        await delay(1000) // Simulate delay for mock data
        return // Return mock data
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "DELETE",
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timeout. Please check your connection.")
      }
      throw error
    }
  },

  async upload<T>(endpoint: string, file: Blob, fieldName = "file"): Promise<T> {
    if (USE_MOCK_DATA) {
      throw new Error("File uploads are not available in mock mode.")
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

    const formData = new FormData()
    formData.append(fieldName, file)

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      return unwrapResponse(response)
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timeout. Please check your connection.")
      }
      throw error
    }
  },
}

export { apiClient, API_BASE_URL }
