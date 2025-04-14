export type RegisterKeyRequest = {
    objectType: 'RegisterKeyRequest';
    id: string;
    address: string;
    pubKey: string | null;
    algorithm: 'SECP256K1';
    confirmationId: string;
    hash: string;
}

export type RegisterKeyResponse = {
    objectType: 'RegisterKeyResponse';
    id: string;
    address: string;
}
