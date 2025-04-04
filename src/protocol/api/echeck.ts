import { DepositApproval, ECheck } from "../echeck";

export type DepositRequest = {
    objectType: 'DepositRequest';
    id: string;
    check: ECheck;
    depositApprovals: DepositApproval[]
}

export type DepositResponse = {
    objectType: 'DepositResponse';
    id: string;
    checkId: string;
    amount: number;
    depositApprovalIds: string[]
}
