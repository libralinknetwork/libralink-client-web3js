export type ErrorMessage = {
    code: number;
    message: string;
}

export type ErrorEnvelope = {
    error: ErrorMessage;
}
