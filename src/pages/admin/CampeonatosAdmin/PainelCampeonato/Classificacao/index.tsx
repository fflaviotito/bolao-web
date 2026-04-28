import { useCarregando } from '@/contexts/CarregandoContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { TimePorCampeonato } from '@/types';
import api from '@/services/api';
import { tratarErro } from '@/utils';
import * as S from '@/styles/TabelasAdmin';
import * as SLocal from './style';

const ClassificacaoDoCampeonato = () => {
    const { esconderCarregando, mostrarCarregando } = useCarregando();
    const { id: campeonatoId } = useParams();

    const [times, setTimes] = useState<TimePorCampeonato[]>([]);

    useEffect(() => {
        const buscarTimesVinculados = async () => {
            try {
                mostrarCarregando();

                const { data } = await api.get(`/campeonatos/${campeonatoId}/times`);
                setTimes(data);
            } catch (error) {
                tratarErro(error);
            } finally {
                esconderCarregando();
            }
        };

        buscarTimesVinculados();
    }, [campeonatoId, esconderCarregando, mostrarCarregando]);

    return (
        <S.Container>
            <SLocal.Cabecalho>
                <h1>Classificação do Campenato</h1>
                <p>Visualize e gerencie a classificação oficial do campeonato</p>
            </SLocal.Cabecalho>
            <S.TabelaContainer>
                <S.Tabela>
                    <thead>
                        <tr>
                            <S.ColunaNumero>Nº</S.ColunaNumero>
                            <th>Time</th>
                            <th>Pts</th>
                            <th>P</th>
                            <th>V</th>
                            <th>D</th>
                            <th>E</th>
                            <th>GP</th>
                            <th>GS</th>
                            <th>SG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {times.map((time, index) => (
                            <tr key={time.id}>
                                <td>{index + 1}</td>
                                <S.ColunaForte>
                                    <S.CampoCompartilhado>
                                        <img src={time.time.escudo} alt={time.time.nomePopular} />
                                        <span>{time.time.nomePopular}</span>
                                    </S.CampoCompartilhado>
                                </S.ColunaForte>
                                <td>{time.ponto}</td>
                                <td>{time.partida}</td>
                                <td>{time.vitoria}</td>
                                <td>{time.derrota}</td>
                                <td>{time.empate}</td>
                                <td>{time.golProprio}</td>
                                <td>{time.golSofrido}</td>
                                <td>{time.saldoGol}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={10}>
                                <div>
                                    <span>Pts: Pontos</span>
                                    <span>P: Partidas</span>
                                    <span>V: Vitórias</span>
                                    <span>D: Derrotas</span>
                                    <span>E: Empates</span>
                                    <span>GP: Gols Próprios</span>
                                    <span>GS: Gols Sofridos</span>
                                    <span>SG: Saldo de Gols</span>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </S.Tabela>
            </S.TabelaContainer>
        </S.Container>
    );
};

export default ClassificacaoDoCampeonato;
