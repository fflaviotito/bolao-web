import { useCarregando } from '@/contexts/CarregandoContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Rodada } from '@/types';
import api from '@/services/api';
import { tratarErro } from '@/utils';
import * as S from '@/styles/TabelasAdmin';
import * as SLocal from './style';

const RodadasDoCampeonato = () => {
    const { esconderCarregando, mostrarCarregando } = useCarregando();
    const { id: campeonatoId } = useParams();
    const navegacao = useNavigate();

    const [rodadas, setRodadas] = useState<Rodada[]>([]);

    useEffect(() => {
        const buscarRodadas = async () => {
            try {
                mostrarCarregando();
                const { data } = await api.get(`/campeonatos/${campeonatoId}/rodadas`);
                setRodadas(data);
            } catch (error) {
                tratarErro(error);
            } finally {
                esconderCarregando();
            }
        };

        buscarRodadas();
    }, [campeonatoId, esconderCarregando, mostrarCarregando]);

    return (
        <S.Container>
            <SLocal.Cabecalho>
                <h1>Rodadas</h1>
                <p>Selecione uma rodada para cadastrar ou visualizar as partidas.</p>
            </SLocal.Cabecalho>
            <S.TabelaContainer>
                <S.Tabela>
                    <thead>
                        <tr>
                            <S.ColunaNumero>Nº</S.ColunaNumero>
                            <th>Rodada</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rodadas.map((rodada) => (
                            <tr
                                key={rodada.id}
                                onClick={() =>
                                    navegacao(
                                        `/admin/campeonatos/${campeonatoId}/rodadas/${rodada.id}`
                                    )
                                }
                            >
                                <td>{rodada.numero}</td>
                                <S.ColunaForte>{rodada.nome}</S.ColunaForte>
                                <td>
                                    <S.PilulaStatus
                                        $tipo={rodada.completa ? 'finalizado' : 'ativo'}
                                    >
                                        {rodada.completa ? 'Completa' : 'Vazia'}
                                    </S.PilulaStatus>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </S.Tabela>
            </S.TabelaContainer>
        </S.Container>
    );
};

export default RodadasDoCampeonato;
