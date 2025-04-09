/**
 * Validates that a password exists and is at least 8 characters long.
 */
export function validatePassword(
  password: unknown,
  checkCriteria = true,
): string | undefined {
  if (typeof password !== "string" || password.length === 0) {
    return "Password is required";
  }

  if (checkCriteria && password.length < 8) {
    return "Passwords must be at least 8 characters long";
  }
}
