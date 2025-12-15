"use client"

import { useState, type FormEvent, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const session = localStorage.getItem("dispatcher_session")
    if (session) {
      router.push("/dashboard")
    }
  }, [router])

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (!email.includes("@")) {
        setError("Invalid email format")
        setIsLoading(false)
        return
      }

      if (password.length < 4) {
        setError("Password must be at least 4 characters")
        setIsLoading(false)
        return
      }

      // TODO: Replace with real authentication API call
      // Example: const response = await fetch(`${API_BASE_URL}/auth/login`, { ... })

      // Create session directly (temporary until backend is ready)
      const session = {
        email,
        name: "Dispatcher User",
        id: "dispatcher_001",
        loginTime: new Date().toISOString(),
      }

      localStorage.setItem("dispatcher_session", JSON.stringify(session))
      router.push("/dashboard")
    } catch (err) {
      setError("Login failed. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4">
          <div className="flex justify-center mb-4">
            <Image src="/logo.png" alt="E Song Transportation" width={160} height={160} className="h-40 w-auto" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl text-center">E Song Transportation</CardTitle>
            <CardDescription className="text-center">Dispatcher Dashboard Login</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="dispatcher@esong.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
