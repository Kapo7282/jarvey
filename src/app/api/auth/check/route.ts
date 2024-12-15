import { NextResponse } from 'next/server'
import { getAuthToken } from '@/lib/api/auth'

export async function GET() {
  try {
    const token = await getAuthToken()
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    return NextResponse.json({ authenticated: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}