export type GetBalanceRequest = {
    objectType: 'GetBalanceRequest';
    id: string;
    address: string;
}

export type GetBalanceResponse = {
    objectType: 'GetBalanceResponse';
    id: string;
    address: string;
    available: number;
    pending: number;
}
