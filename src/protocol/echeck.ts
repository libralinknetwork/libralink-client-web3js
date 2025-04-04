export type ECheck = {
    objectType: 'ECheck';
    id: string;
    faceAmount: number;
    currency: string;
    payer: string;
    payerProcessor: string;
    payee: string;
    payeeProcessor: string;
    createdAt: number;
    expiresAt: number;
    note: string | null;
}

export type DepositApproval = {
    objectType: 'DepositApproval';
    id: string;
    checkId: string;
    amount: number;
    createdAt: number;
    payer: string;
    payee: string;
    note: string | null;
}
