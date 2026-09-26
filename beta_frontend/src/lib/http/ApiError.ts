export interface FieldError {
  field: string;
  message: string;
}

/**
 * Normalised error for every failed request.
 *
 * The backend answers errors as `{ success: false, error: { code, message, details? } }`,
 * except FastAPI's own HTTPBearer rejection, which is `{ detail: string }`.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fieldErrors: FieldError[];

  constructor(status: number, code: string, message: string, fieldErrors: FieldError[] = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }

  static async fromResponse(response: Response): Promise<ApiError> {
    let body: unknown = null;
    try {
      body = await response.json();
    } catch {
      /* non-JSON body */
    }

    if (isEnvelope(body)) {
      const { code, message, details } = body.error;
      return new ApiError(response.status, code, message, Array.isArray(details) ? details : []);
    }

    if (body && typeof body === "object" && "detail" in body && typeof body.detail === "string") {
      return new ApiError(response.status, "UNAUTHORIZED", body.detail);
    }

    return new ApiError(response.status, "UNKNOWN_ERROR", response.statusText || "Something went wrong.");
  }

  static network(): ApiError {
    return new ApiError(0, "NETWORK_ERROR", "The server is unreachable. Check your connection and try again.");
  }
}

function isEnvelope(
  body: unknown,
): body is { error: { code: string; message: string; details?: FieldError[] } } {
  return (
    !!body &&
    typeof body === "object" &&
    "error" in body &&
    !!body.error &&
    typeof body.error === "object" &&
    "code" in body.error &&
    "message" in body.error
  );
}
