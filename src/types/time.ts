import type { AuditoriaBase } from './base';
import type { Estadio } from './';

export interface Time extends AuditoriaBase {
    nomeOficial: string;
    nomePopular: string;
    sigla: string;
    escudo: string;
    estadioId: string;
    estadio: Pick<Estadio, 'nomePopular'>;
}
