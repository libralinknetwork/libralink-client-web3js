export type Envelope = {
    objectType: 'Envelope';
    id: string;
    content: EnvelopeContent;
    sig: string | null;
}

export type SignatureReason = 'NONE' | 'IDENTITY' | 'FEE_LOCK' | 'CONFIRM'

export type EnvelopeContent = {
    entity: object;
    pub: string | null;
    sigReason: SignatureReason;
}
