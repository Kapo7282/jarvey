import { NextResponse } from 'next/server'
import { removeAuthToken } from '@/lib/api/auth'

export async function POST() {
  try {
    await removeAuthToken()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}