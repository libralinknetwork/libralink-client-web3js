import { BodyEnvelope } from "./body";
import { ErrorEnvelope } from "./error";
import { HeaderEnvelope } from "./header";

export type Envelope = {
    protocolVersion: number;
    envelopeId: string;
    header: HeaderEnvelope;
    body: BodyEnvelope;
    error: ErrorEnvelope | null;
}