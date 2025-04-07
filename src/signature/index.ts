import { Envelope, EnvelopeContent, SignatureReason } from "../protocol";

const Web3 = require('web3').default;
const web3 = new Web3();

export class SignatureHelper {

    static sign = (envelope: Envelope, address: string, pk: string, sigReason: SignatureReason): Envelope => {
        const envelopeContent: EnvelopeContent = { ...envelope.content, pub: address, sigReason };
        const message = JSON.stringify(envelopeContent);
        const signature = web3.eth.accounts.sign(message, `0x${pk}`).signature;

        return { id: envelope.id, objectType: envelope.objectType, 
            content: envelopeContent, sig: signature }
    }
    
    static verify = (content: object, address: string, signature: string): boolean => {
        const recoveredAddress = web3.eth.accounts.recover(JSON.stringify(content), signature);                        
        return recoveredAddress.toLowerCase() === address.toLowerCase();        
    }
}