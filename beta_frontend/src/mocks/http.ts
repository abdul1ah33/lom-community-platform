/** Response builders that mimic the FastAPI backend's shapes. */

export interface MockRequest {
  method: string;
  path: string;
  params: Record<string, string>;
  query: URLSearchParams;
  body: unknown;
  headers: Headers;
}

export type MockHandler = (request: MockRequest) => Response | Promise<Response>;

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function noContent(): Response {
  return new Response(null, { status: 204 });
}

/** Same envelope as backend `ErrorResponse`. */
export function apiError(
  status: number,
  code: string,
  message: string,
  details?: { field: string; message: string }[],
): Response {
  return json({ success: false, error: { code, message, ...(details ? { details } : {}) } }, status);
}

export function validationError(details: { field: string; message: string }[]): Response {
  return apiError(422, "VALIDATION_ERROR", "Request validation failed.", details);
}

export class MockHttpError extends Error {
  constructor(readonly response: Response) {
    super("Mock HTTP error");
  }
}
