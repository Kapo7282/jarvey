export const APP_CONFIG = {
  APP_NAME: 'Jarvey AI',
  APP_DESCRIPTION: 'AI-powered customer support dashboard',
  COMPANY_NAME: 'Jarvey',
  SUPPORT_EMAIL: 'support@jarvey.ai',
  MIN_PASSWORD_LENGTH: 14,
  TRIAL_DAYS: 14,
  API_ENDPOINTS: {
    AUTH: '/api/auth',
    CHAT: '/api/chat',
    TICKETS: '/api/tickets',
    USERS: '/api/users',
  },
} as const