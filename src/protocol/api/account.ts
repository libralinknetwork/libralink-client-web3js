export type RegisterKeyRequest = {
    objectType: 'RegisterKeyRequest';
    id: string;
    pub: string;
    challenge: string
}

export type RegisterKeyResponse = {
    objectType: 'RegisterKeyResponse';
    id: string;
    pub: string;
}
