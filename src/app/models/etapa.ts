export interface Etapa {
    id?: number;
    intEmpresaId?: number;
    desativado: boolean;
    descricao: string;
    orcamentoServico: boolean;
    permiteIgnoraEtapa: boolean;
    logCriacao?: Date;
    logAtualizacao?: Date;
    logPctUsuarioId?: number;
    
}