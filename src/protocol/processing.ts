import { Envelope } from "./envelope";

export type ProcessingFee = {
    feeType: 'flat' | 'percent';
    amount: number;
}

export type ProcessingDetails = {
    objectType: 'ProcessingDetails';
    id: string;
    fee: ProcessingFee;
    intermediary: string | null;
    envelope: Envelope
}

