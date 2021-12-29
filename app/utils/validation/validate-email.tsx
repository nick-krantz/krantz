/**
 * Validates that a email exists and is 4 characters long.
 */
export function validateEmail(email: unknown): string | undefined {
  if (typeof email !== 'string' || email.length < 4) {
    return 'Emails must be at least 4 characters long'
  }
}
