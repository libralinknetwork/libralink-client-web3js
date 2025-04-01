import { BodyEnvelope } from "../protocol/body";
import { Envelope } from "../protocol/envelope";
import { ProcessorHeaderContent } from "../protocol/header";

const Web3 = require('web3').default;
const web3 = new Web3();

export class SignatureHelper {

    static signBody = (body: BodyEnvelope, pk: string) => {
        const signedMessage = web3.eth.accounts.sign(JSON.stringify(body), `0x${pk}`);
        return signedMessage.signature;
    }

    static signHeader = (header: ProcessorHeaderContent, pk: string) => {
        const signedMessage = web3.eth.accounts.sign(JSON.stringify(header), `0x${pk}`);
        return signedMessage.signature;
    }

    static verifyHeader = (header: ProcessorHeaderContent, address: string, signature: string): boolean => {
        const recoveredAddress = web3.eth.accounts.recover(JSON.stringify(header), signature)
            .toLowerCase();
                        
        return recoveredAddress === address.toLowerCase();
    } 

    static verifyBody = (body: BodyEnvelope, address: string, signature: string) => {
        const recoveredAddress = web3.eth.accounts.recover(JSON.stringify(body), signature)
            .toLowerCase();
                        
        return recoveredAddress === address.toLowerCase();
    }

    static verify = (envelope: Envelope): boolean => {
        var isValid = true;

        const body = envelope.body;
        const headers = envelope.header.headers;

        for (const header of headers) {
            const bodyAddress = header.bodySig.address;
            const bodySignature = header.bodySig.sig;
            isValid = isValid && this.verifyBody(body, bodyAddress, bodySignature);

            if (header.header.objectType === 'ProcessorHeaderContent' ) {
                
                const headerAddress = header.headerSig?.address;
                const headerSignature = header.headerSig?.sig;

                if (!!headerAddress && !!headerSignature) { 
                    isValid = isValid && this.verifyHeader(header.header, headerAddress, headerSignature);
                }
            }

        }

        return isValid;
    }
}