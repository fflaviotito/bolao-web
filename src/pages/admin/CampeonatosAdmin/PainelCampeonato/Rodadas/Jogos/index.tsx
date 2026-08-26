import { useCarregando } from '@/contexts/CarregandoContext';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Partida } from '@/types';
import api from '@/services/api';
import { tratarErro } from '@/utils';
import TabelaPartidas from './TabelaPartidas';
import FormPartidas from './FormPartidas';

const PartidasDaRodada = () => {
    const { esconderCarregando, mostrarCarregando } = useCarregando();
    const { rodadaId } = useParams();

    const [partidas, setPartidas] = useState<Partida[] | null>(null);
    const [modoEdicao, setModoEdicao] = useState(false);

    const carregar = useCallback(async () => {
        try {
            mostrarCarregando();
            const { data } = await api.get(`/rodadas/${rodadaId}/partidas`);
            setPartidas(data);
            setModoEdicao(false);
        } catch (error) {
            tratarErro(error);
        } finally {
            esconderCarregando();
        }
    }, [rodadaId, mostrarCarregando, esconderCarregando]);

    useEffect(() => {
        carregar();
    }, [carregar]);

    if (partidas === null) return null;

    if (partidas.length === 0 || modoEdicao) {
        return (
            <FormPartidas
                partidasExistentes={partidas}
                onSalvo={carregar}
                onCancelar={partidas.length > 0 ? () => setModoEdicao(false) : undefined}
            />
        );
    }

    return (
        <TabelaPartidas
            partidas={partidas}
            onEditarRodada={() => setModoEdicao(true)}
            onAtualizado={carregar}
        />
    );
};

export default PartidasDaRodada;
