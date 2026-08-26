import type { AuditoriaBase } from './base';
import type { Rodada } from './rodada';
import type { Estadio } from './estadio';
import type { Time } from './time';

type TimeResumido = Pick<Time, 'id' | 'nomePopular' | 'sigla' | 'escudo'>;

export interface Partida extends AuditoriaBase {
    rodadaId: Rodada['id'];
    data: string;
    estadioId: Estadio['id'];
    estadio: Pick<Estadio, 'id' | 'nomePopular'>;
    timeMandanteId: Time['id'];
    timeMandante: TimeResumido;
    golMandante: number | null;
    timeVisitanteId: Time['id'];
    timeVisitante: TimeResumido;
    golVisitante: number | null;
    finalizado: boolean;
}
