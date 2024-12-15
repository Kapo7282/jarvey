import { cookies } from 'next/headers'

export async function getAuthToken() {
  const cookieStore = cookies()
  return cookieStore.get('auth_token')
}

export async function setAuthToken(token: string) {
  const cookieStore = cookies()
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })
}

export async function removeAuthToken() {
  const cookieStore = cookies()
  cookieStore.delete('auth_token')
}