export type GetBalanceRequest = {
    objectType: 'GetBalanceRequest';
    id: string;
    pub: string;
}

export type GetBalanceResponse = {
    objectType: 'GetBalanceResponse';
    id: string;
    pub: string;
    available: number;
    pending: number;
    total: number;
}
