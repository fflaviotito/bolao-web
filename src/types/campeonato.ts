import type { AuditoriaBase } from './base';

export interface Campeonato extends AuditoriaBase {
    nome: string;
    divisao: string;
    ano: number;
    dataInicio: Date;
    dataFim: Date;
    status: 'rascunho' | 'configurado' | 'em_andamento' | 'finalizado';
}

export interface Configuracao extends AuditoriaBase {
    campeonatoId: Campeonato['id'];
    quantidadeTimes: number;
    quantidadeRodadas: number;
}

export interface Regras extends AuditoriaBase {
    campeonatoId: Campeonato['id'];
    pontosEmpateExato: number;
    pontosAcertoEmpate: number;
    pontosPlacarExato: number;
    pontosAcertoVencedor: number;
    pontosGolTime: number;
}
