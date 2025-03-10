import { LinhaEtapaFase } from "./linha-etapa-fase";

export interface LinhaEtapa {
    id?: number;
    intEmpresaId?: number;
    ofcOrcamentoId?: number;
    ofcOrdemServicoId?: number;
    ofcLinhaEtapaFaseId?: number;
    ofcLinhaEtapaId?: number;
    dataHoraInicio?: Date;
    linhaetapaFase?: LinhaEtapaFase[];
    dataHoraFim?: Date;
    observacao?: string;
    situacao?: number;
    subetapa: boolean;
    logInicioPctUsuarioId?: number;
    logFimPctUsuarioId?: number;
}