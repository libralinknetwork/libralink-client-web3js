export type ECheckBody = {
    objectType: 'ECheckBody';
    amount: number;
    type: string;
    payer: string;
    payerProcessor: string;
    payee: string;
    payeeProcessor: string;
    createdAt: number;
    expiresAt: number;
    note: string | null;
}

export type PaymentRequestBody = {
    objectType: 'PaymentRequestBody';
    amount: number;
    type: string;
    payer: string;
    payerProcessor: string;
    payee: string;
    payeeProcessor: string;
    createdAt: number;
    note: string | null;
}

export type BodyEnvelope = {
    body: ECheckBody | PaymentRequestBody;
}
