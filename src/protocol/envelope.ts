export type Envelope = {
    objectType: 'Envelope';
    id: string;
    content: EnvelopeContent;
    sig: string | null;
}

export type SignatureReason = 'NONE' | 'IDENTITY' | 'FEE_LOCK' | 'CONFIRM'

export type SignatureAlgorithm = 'SECP256K1'

export type EnvelopeContent = {
    entity: object;
    address: string | null;
    pubKey: string | null;
    sigReason: SignatureReason;
    algorithm: SignatureAlgorithm | null;
}
