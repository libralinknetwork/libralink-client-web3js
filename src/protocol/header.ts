
export type Signature = {
    address: string;
    salt: string;
    sig: string;
}

export type FeeStructure = {
    fee: number;
}

export type ProcessorHeaderContent = {
    objectType: 'ProcessorHeaderContent';
    intermediary: string;
    fee: FeeStructure;    
}

export type EmptyHeaderContent = {
    objectType: 'EmptyHeaderContent';
}

export type HeaderWithSignature = {
    header: EmptyHeaderContent | ProcessorHeaderContent;
    bodySig: Signature;
    headerSig: Signature | null;
}

export type HeaderEnvelope = {
    headers: HeaderWithSignature[];
}
