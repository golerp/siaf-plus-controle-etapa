import { Etapa } from "./etapa";

export interface LinhaEtapaFase {
    id: number;
    ofcEtapa: Etapa;
    ofcEtapaId: number;
    ofcLinhaetapaId: number;
    ordem: number;
    subetapa: boolean;
}