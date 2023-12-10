import { json } from '@vercel/remix'

/**
 * Sets network response status to 400, or custom status when provided
 */
export function badRequest<D>(data: D, status?: number): Response {
  return json(data, { status: status ?? 400 })
}
