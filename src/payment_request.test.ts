import { BodyEnvelope, PaymentRequestBody } from "./protocol/body";
import { Envelope } from "./protocol/envelope";
import { FeeStructure, HeaderEnvelope, HeaderWithSignature, ProcessorHeaderContent, Signature } from "./protocol/header";
import { SignatureHelper } from "./signature";


describe('Payment Request create UC and signing by all the parties', () => {

    let PAYER_ADDR = "0xf39902b133fbdcf926c1f48665c98d1b028d905a";
    let PAYER_PK = "7af8df13f6aebcbd9edd369bb5f67bf7523517685491fea776bb547910ff5673";
    
    let PAYEE_ADDR = "0x8f33dceeedfcf7185aa480ee16db9b9bb745756e";
    let PAYEE_PK = "64496cc969654b231087af38ce654aa8d539fea0970d90366e42a5e39761f3f5";
    
    let TP_ADDR = "0x127cc4d943dff0a4bd6b024a96554a84e6247440";
    let TP_PK = "1c9f40ff758f70b5c59c9df78738fdd122c4f5d6324e61448a3f516b7df00b22";
    
    let INTER_ADDR = "0x6ab62b06d9b20e7cbc163dc0bd823d1c6e053314";
    let INTER_PK = "d550ba83c69c081ff689fc19bef6aebf4b8d6f39d59bfede59ed223d1f934d90";

    it('Signed Payment Request can be validated', () => {

        /* 1. Payee creates Payment Request and signs it */
        var paymentRequest = createPaymentRequest(PAYER_ADDR, PAYEE_ADDR, 150);

        const body = paymentRequest.body;
        const payeeSigValue = SignatureHelper.signBody(body, PAYEE_PK);
        expect(payeeSigValue).toBe('0x051267ae319cd23083c116f43e2d41966354a69e61824a2c922edde4a6df407b74e1db37f82eb5da421f7a19e80bf5bb95fbe875e4d9df186ca73f1c8d7ed65b1c');

        const payeeSignature: Signature = {
            address: PAYEE_ADDR,
            salt: '9f819ddd-f710-4b1d-904d-b119e01acf9f',
            sig: payeeSigValue
        }
        const payeeHeader: HeaderWithSignature = {
            bodySig: payeeSignature,
            header: {
                objectType: 'EmptyHeaderContent'
            },
            headerSig: null
        }

        paymentRequest = {...paymentRequest, header: { headers: [...paymentRequest.header.headers, payeeHeader]}}
        expect(SignatureHelper.verify(paymentRequest)).toBe(true)

        /* 2. Payee sends request to Payer, Payer agrees with everything and signs the request */

        const payerSigValue = SignatureHelper.signBody(body, PAYER_PK);
        expect(payerSigValue).toBe('0xeb1b5d817660a2f189bc76f00f7116714e6e76caa5dd7a51809e6b14e812860505716037fdacbbe48d454744e8276d2ce2c9ffa1e6e87fc4c06a38d98d0e127f1b');

        const payerSignature: Signature = {
            address: PAYER_ADDR,
            salt: '607cadad-af8c-4579-bbf6-554026e5c4a7',
            sig: payerSigValue
        }

        const payerHeader: HeaderWithSignature = {
            bodySig: payerSignature,
            header: {
                objectType: 'EmptyHeaderContent'
            },
            headerSig: null
        }

        paymentRequest = {...paymentRequest, header: { headers: [...paymentRequest.header.headers, payerHeader]}}
        expect(SignatureHelper.verify(paymentRequest)).toBe(true)
        
        /* 3. Payment is not guaranteed at this stage, hence Payer sends request to Trusted Party to sign & declare the fee size */

        const feeStructure: FeeStructure = {
            fee: 10.0
        }

        const partyHeaderContent: ProcessorHeaderContent = {
            objectType: 'ProcessorHeaderContent',
            intermediary: INTER_ADDR,
            fee: feeStructure                
        }

        const partyBodySigValue = SignatureHelper.signBody(body, TP_PK);
        expect(partyBodySigValue).toBe('0xa8307a297a3df47a02e3feb7472401b2e0cbb7de28cb270f42567d39f34355b90755d926a58cb2657661c3d3ee481f5c6c44e2c99e7301c3af5bde06916e45721c');

        const partyHeaderSigValue = SignatureHelper.signHeader(partyHeaderContent, TP_PK);
        expect(partyHeaderSigValue).toBe('0x8d57a292e8dc196729c2d9f129a17ce2a3d62cfe9bef37ccdeb24300bcf259740d133ff82f0064a68050b033c403c604995cbc6696311836e1ffe4241487b6261b');

        const partyBodySignature: Signature = {
            address: TP_ADDR,
            salt: '6b693293-fd61-4de8-9b18-98e4aadadedd',
            sig: partyBodySigValue
        }

        const partyHeaderSignature: Signature = {
            address: TP_ADDR,
            salt: '7ae2b744-b4eb-4e1a-adc4-59d47ae6d1b1',
            sig: partyHeaderSigValue
        }

        const partyHeader: HeaderWithSignature = {
            bodySig: partyBodySignature,
            headerSig: partyHeaderSignature,
            header: partyHeaderContent
        }

        paymentRequest = {...paymentRequest, header: { headers: [...paymentRequest.header.headers, partyHeader]}}
        expect(SignatureHelper.verify(paymentRequest)).toBe(true)
    });

    function createPaymentRequest(payer: string, payee: string, amount: number) {

        const createdAtUtc: number = 1743526954033;

        const bodyContent: PaymentRequestBody = {
            objectType: 'PaymentRequestBody',
            amount, 
            type: 'USDT',
            payer,
            payerProcessor: TP_ADDR,
            payee,
            payeeProcessor: TP_ADDR,
            createdAt: createdAtUtc,            
            note: ''
        }

        const bodyEnvelope: BodyEnvelope = {
            body: bodyContent
        }

        const headerEnvelope: HeaderEnvelope = {
            headers: []
        }
    
        const envelope: Envelope = {
            protocolVersion: 1,
            envelopeId: 'cdcaa5d4-bb25-4146-8c78-b736559443a1',
            header: headerEnvelope,
            body: bodyEnvelope,
            error: null           
        }

        return envelope;
    }    
});
