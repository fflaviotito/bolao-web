export interface AuditoriaBase {
    id: string;
    criadoEm: Date;
    criadoPorId: string;
    atualizadoEm?: Date;
    atualizadoPorId?: string;
}
