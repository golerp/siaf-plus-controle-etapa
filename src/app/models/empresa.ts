export interface Empresa {
    cnpj: string;
    id: number;
    fantasia: string;
    idPerfil: number;
    idUsuario: number;
    razaoSocial: string;
    nfceCertificadoPath?: string;
    nfceCertificadoSenha?: string;
    nfceCodigoSeguranca?: string;
    nfceToken?: string;
}