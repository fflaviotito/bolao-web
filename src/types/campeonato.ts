import type { AuditoriaBase } from './base';

export interface Campeonato extends AuditoriaBase {
    nome: string;
    divisao: string;
    ano: number;
    dataInicio: Date;
    dataFim: Date;
    status: 'rascunho' | 'configurado' | 'em_andamento' | 'finalizado';
}
