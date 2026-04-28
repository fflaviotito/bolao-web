import type { AuditoriaBase } from './base';
import type { Estadio } from './';

export interface Time extends AuditoriaBase {
    nomeOficial: string;
    nomePopular: string;
    sigla: string;
    escudo: string;
    estadioId: Estadio['id'];
    estadio: Pick<Estadio, 'nomePopular'>;
}
