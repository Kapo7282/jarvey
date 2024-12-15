export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePassword(password: string): {
  hasLowerCase: boolean
  hasUpperCase: boolean
  hasNumber: boolean
  hasMinLength: boolean
} {
  return {
    hasLowerCase: /[a-z]/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasMinLength: password.length >= 14,
  }
}