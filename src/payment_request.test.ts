import { ECheck, Envelope } from "./protocol";
import { SignatureHelper } from "./signature";


describe('Payment Request create UC and signing by all the parties', () => {

    let PAYER_ADDR = "0xf39902b133fbdcf926c1f48665c98d1b028d905a";
    let PAYER_PK = "7af8df13f6aebcbd9edd369bb5f67bf7523517685491fea776bb547910ff5673";
    
    let PAYEE_ADDR = "0x8f33dceeedfcf7185aa480ee16db9b9bb745756e";
    let PAYEE_PK = "64496cc969654b231087af38ce654aa8d539fea0970d90366e42a5e39761f3f5";
    
    let PROCESSOR_ADDR = "0x127cc4d943dff0a4bd6b024a96554a84e6247440";
    let PROCESSOR_PK = "1c9f40ff758f70b5c59c9df78738fdd122c4f5d6324e61448a3f516b7df00b22";

    it('Issued E-Check is signed by both Payer and Processor', () => {

        /* 1. Payee creates E-Check and signs it by Payer & Processor(s) to issue */
        const envelope = createECheckEnvelope(PAYER_ADDR, PROCESSOR_ADDR, PAYEE_ADDR, PROCESSOR_ADDR, 150);
        const signedEnvelope = SignatureHelper.sign(envelope, PAYER_ADDR, PAYER_PK);

        expect(signedEnvelope.signature?.pub).toBe(PAYER_ADDR);
        expect(signedEnvelope.signature?.sig).toBe('0x8dab44d1340f615f60ee5d604375d06fe1e937e72f32f12165120bf332ed598d4dab4160008477bffcdfd378dce424745d26fa6a9c0b58f89b1a81e71791cf871c');
    });

    function createECheckEnvelope(payer: string, payerProcessor: string, payee: string, payeeProcessor: string, amount: number) {

        const createdAtUtc: number = 1743526954033;
        const expiresAtUtc: number = 1843526954033;

        const eCheck: ECheck = {
            objectType: 'ECheck',
            id: '9eef8f11-2baf-4f7a-8529-38fc20444d88',
            faceAmount: amount,
            currency: 'USDC',
            payer,
            payerProcessor,
            payee,
            payeeProcessor,
            createdAt: createdAtUtc,
            expiresAt: expiresAtUtc,
            note: null
        }
    
        const envelope: Envelope = {
            objectType: 'Envelope',
            id: 'e2a3eecd-b99e-4c8f-b3c9-01aacb73a1a4',
            content: eCheck,
            signature: null
        }

        return envelope;
    }    
});
