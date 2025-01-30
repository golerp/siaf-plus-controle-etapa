import { TipoEquipamento } from './tipo-equipamento';

export interface Equipamento {
    amperagemId?: number;
    codigo?: string;
    dataFabricacao?: Date;
    fabricanteId?: number;
    frequencia: number;
    id: number;
    intClienteId: number;
    intEmpresaId: number;
    intervaloRevisao?: number;
    logAtualizacao?: Date;
    logCriacao: Date;
    logPctUsuarioId: number;
    modelo: string;
    oficinaTipoEquipamento: TipoEquipamento;
    potenciaId?: number;
    rede: number;
    rpmPolosId?: number;
    serie: string;
    tag: string;
    tensaoId?: number;
    tipoEquipamentoId: number;
}