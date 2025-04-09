/**
 * Validates that a email exists and is 4 characters long.
 */
export function validateEmail(
  email: unknown,
  checkCriteria = true,
): string | undefined {
  if (typeof email !== "string" || email.length === 0) {
    return "Email is required";
  }

  if (checkCriteria && email.length < 4) {
    return "Email must be at least 4 characters long";
  }
}
