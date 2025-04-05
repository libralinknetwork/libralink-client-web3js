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
        const envelope = createECheckEnvelope(PAYER_ADDR, PROCESSOR_ADDR, PAYEE_ADDR, PROCESSOR_ADDR, 150);
        const signedEnvelope = SignatureHelper.sign(envelope, PAYER_ADDR, PAYER_PK, 'IDENTITY');

        expect(signedEnvelope.content.pub).toBe(PAYER_ADDR);
        expect(signedEnvelope.sig).toBe('0xded9970d473b31ec96cf7c9276c2269ebd80dfb889f6a15ccd46a240bd1f20855e8f7f4eeeda6945db75b335e84ee2ae95ed5ba2252c380043f6c61ace878ef11b');
    });

    function createECheckEnvelope(payer: string, payerProcessor: string, payee: string, payeeProcessor: string, amount: number) {

        const createdAtUtc: number = 1743526954033;
        const expiresAtUtc: number = 2743526954133;

        const eCheck: ECheck = {
            objectType: 'ECheck',
            id: 'bfcb823c-4506-4e17-b715-59de993d15fe',
            faceAmount: amount,
            currency: 'USDC',
            payer,
            payerProcessor,
            payee,
            payeeProcessor,
            createdAt: createdAtUtc,
            expiresAt: expiresAtUtc,
            note: 'Online courses payment, order #123'
        }
    
        const envelopeContent: EnvelopeContent = {
            entity: eCheck,
            pub: '0xf39902b133fbdcf926c1f48665c98d1b028d905a',
            sigReason: 'IDENTITY'
        }

        const envelope: Envelope = {
            objectType: 'Envelope',
            id: '19360ffc-dd19-4294-99ed-d0858082b48d',
            content: envelopeContent,
            sig: '0xded9970d473b31ec96cf7c9276c2269ebd80dfb889f6a15ccd46a240bd1f20855e8f7f4eeeda6945db75b335e84ee2ae95ed5ba2252c380043f6c61ace878ef11b'
        }

        return envelope;
    }    
});
