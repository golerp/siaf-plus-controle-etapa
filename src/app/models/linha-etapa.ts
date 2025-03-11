import { LinhaEtapaFase } from "./linha-etapa-fase";

export interface LinhaEtapa {
    id?: number;
    intEmpresaId?: number;
    ofcOrcamentoId?: number;
    ofcOrdemServicoId?: number;
    ofcLinhaetapaFaseId?: number;
    ofcLinhaetapaId?: number;
    dataHoraInicio?: Date;
    ofcLinhaetapaFase?: LinhaEtapaFase[];
    dataHoraFim?: Date;
    observacao?: string;
    situacao?: number;
    subetapa: boolean;
    logInicioPctUsuarioId?: number;
    logFimPctUsuarioId?: number;

    action?: string
}