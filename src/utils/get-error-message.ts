import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface ApiValidationError {
    field: string;
    message: string;
}

interface ApiErrorResponse {
    success?: boolean;
    statusCode?: number;
    message?: string;
    error?: string;
    errors?: ApiValidationError[];
}

export function getErrorMessage(
    error: FetchBaseQueryError | SerializedError | unknown,
): string {
    if (!error) {
        return "Something went wrong.";
    }

    if ("status" in (error as FetchBaseQueryError)) {
        const fetchError = error as FetchBaseQueryError;

        if (fetchError.data && typeof fetchError.data === "object") {
            const data = fetchError.data as ApiErrorResponse;

            if (
                Array.isArray(data.errors) &&
                data.errors.length > 0
            ) {
                return data.errors
                    .map((error) => error.message)
                    .join(", ");
            }

            if (data.message) {
                return data.message;
            }

            if (data.error) {
                return data.error;
            }
        }

        return "Request failed.";
    }

    if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
    ) {
        return String((error as SerializedError).message);
    }

    return "Something went wrong.";
}