import { ECheck, Envelope, EnvelopeContent } from "./protocol";
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
        const envelope = createECheckEnvelope();
        const signedEnvelope = SignatureHelper.sign(envelope, PAYER_ADDR, PAYER_PK, 'IDENTITY');

        expect(signedEnvelope.content.address).toBe(PAYER_ADDR);
        expect(signedEnvelope.sig).toBe('0x31fe8581e37ecee1168e69af048b6ac89bbef54fd2b851808104e06f6165840536ae2a992cf918843d610774fb53e73e7b37d244f21c58c376718874327b0a8a1c');
    });

    function createECheckEnvelope() {

        const createdAtUtc: number = 1743526954033;
        const expiresAtUtc: number = 2743526954133;

        const eCheck: ECheck = {
            objectType: 'ECheck',
            id: 'bfcb823c-4506-4e17-b715-59de993d15fe',
            faceAmount: 150,
            currency: 'USDC',
            payer: PAYER_ADDR,
            payerProcessor: PROCESSOR_ADDR,
            payee: PAYEE_ADDR,
            payeeProcessor: PROCESSOR_ADDR,
            createdAt: createdAtUtc,
            expiresAt: expiresAtUtc,
            note: 'Online courses payment, order #123'
        }
    
        const envelopeContent: EnvelopeContent = {
            entity: eCheck,
            address: null,
            pubKey: null,
            sigReason: 'NONE',            
            algorithm: null
        }

        const envelope: Envelope = {
            objectType: 'Envelope',
            id: '19360ffc-dd19-4294-99ed-d0858082b48d',
            content: envelopeContent,
            sig: null
        }

        return envelope;
    }    
});
