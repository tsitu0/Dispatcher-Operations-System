import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Mock validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    if (password.length < 4) {
      return NextResponse.json({ error: "Password too short" }, { status: 400 })
    }

    // Create mock session
    const session = {
      email,
      name: "Dispatcher User",
      id: "dispatcher_001",
      loginTime: new Date().toISOString(),
    }

    // Create response with cookie
    const response = NextResponse.json({ success: true, session }, { status: 200 })
    response.cookies.set("dispatcher_session", JSON.stringify(session), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    })

    return response
  } catch (error) {
    console.log("[v0] Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
