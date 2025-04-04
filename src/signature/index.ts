import { Envelope } from "../protocol";

const Web3 = require('web3').default;
const web3 = new Web3();

export class SignatureHelper {

    static sign = (envelope: Envelope, address: string, pk: string): Envelope => {
        const content = envelope.content;
        const message = JSON.stringify(content);
        const signature = web3.eth.accounts.sign(message, `0x${pk}`).signature;

        return {...envelope, signature: { pub: address, sig: signature }}
    }
    
    static verify = (content: object, address: string, signature: string): boolean => {
        const recoveredAddress = web3.eth.accounts.recover(JSON.stringify(content), signature);                        
        return recoveredAddress.toLowerCase() === address.toLowerCase();        
    }
}