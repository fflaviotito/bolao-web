import type { AuditoriaBase } from './base';
import type { Campeonato } from './campeonato';

export interface Rodada extends AuditoriaBase {
    nome: string;
    numero: number;
    campeonatoId: Campeonato['id'];
    quantidadePartidas: number;
    completa: boolean;
}
