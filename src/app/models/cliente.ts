export interface Cliente {
    id: number;
    intClienteGrupoId: number;
    intEmpresaId: number;
    razaoSocial: string;
    tipo: string;
    telefone: string;
    pfCpf?: string;
    natureza: string;
    logAtualizacao?: Date;
    logCriacao: Date;
    enderecoLogradouro: string;
    enderecoLogradouroNumero: string;
    enderecoComplemento: string;
    enderecoBairro: string;
    enderecoCep: string;
    enderecoUf: string;
    enderecoIntCidadeId: number;
    celular?: string;
    email?: string;
    desativado: boolean;
}