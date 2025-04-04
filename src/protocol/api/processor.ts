export type ProcessorDetails = {
    pub: string;
    isDefault: boolean;
}

export type GetProcessorsResponse = {
    objectType: 'GetProcessorsResponse';
    id: string;
    processors: ProcessorDetails[];
}

export type GetProcessorsRequest = {
    objectType: 'GetProcessorsRequest';
    id: string;
    pub: string;
}
