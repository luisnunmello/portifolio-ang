export type ErrorResponse = {
    error: string,
    message: string,
    status: number
}

export function isErrorResponse(error: any): error is ErrorResponse {
  return error &&
    typeof error === "object" &&
    "error" in error &&
    "message" in error &&
    "status" in error;
}