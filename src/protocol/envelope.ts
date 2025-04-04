export type Signature = {
    pub: string;
    sig: string;
}

export type Envelope = {
    objectType: 'Envelope';
    id: string;
    content: object;
    signature: Signature | null;
}
