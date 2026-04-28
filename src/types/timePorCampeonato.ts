import type { AuditoriaBase } from './base';
import type { Campeonato } from './campeonato';
import type { Time } from './time';

export interface TimePorCampeonato extends AuditoriaBase {
    campeonatoId: Campeonato['id'];
    timeId: Time['id'];
    ponto: number;
    partida: number;
    vitoria: number;
    derrota: number;
    empate: number;
    golProprio: number;
    golSofrido: number;
    saldoGol: number;
    time: Time;
}
