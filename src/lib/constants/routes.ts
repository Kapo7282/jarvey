export const ROUTES = {
  HOME: '/',
  TICKETS: '/tickets',
  CHAT: '/chat',
  MESSAGES: '/messages',
  SETTINGS: '/settings',
  CONNECT_EMAIL: '/connect-email',
  CONNECT_STORE: '/connect-store',
  SIGNUP: '/signup',
} as const

export type Route = typeof ROUTES[keyof typeof ROUTES]