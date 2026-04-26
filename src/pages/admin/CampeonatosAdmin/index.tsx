import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useBuscaPaginada } from '@/hooks/useBuscaPaginada';
import type { Campeonato } from '@/types';
import * as S from '@/styles/TabelasAdmin';
import PaginasAdmin from '@/layouts/PaginasAdmin';
import { obterStatusPorData } from '@/utils';
import FormNovoCampeonato from './FormNovoCampeonato';

const CampeonatosAdmin = () => {
    const navigate = useNavigate();
    const [modalAberto, setModalAberto] = useState(false);
    const {
        busca,
        dados: campeonatos,
        paginacao,
        recarregar
    } = useBuscaPaginada<Campeonato>('/campeonatos');

    return (
        <S.Container>
            <PaginasAdmin
                aoClicarAdicionar={() => setModalAberto(true)}
                barraPesquisa={busca}
                paginacao={paginacao}
                titulo="Campeonatos"
            >
                <S.TabelaContainer>
                    <S.Tabela>
                        <thead>
                            <tr>
                                <S.ColunaNumero>Nº</S.ColunaNumero>
                                <th>Nome</th>
                                <th>Divisão</th>
                                <th>Ano</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campeonatos.map((campeonato, index) => {
                                const status = obterStatusPorData(
                                    campeonato.dataInicio,
                                    campeonato.dataFim
                                );

                                return (
                                    <tr
                                        key={campeonato.id}
                                        onClick={() =>
                                            navigate(`/admin/campeonatos/${campeonato.id}`)
                                        }
                                    >
                                        <td>{(paginacao.pagina - 1) * 10 + index + 1}</td>
                                        <S.ColunaForte>{campeonato.nome}</S.ColunaForte>
                                        <td>{campeonato.divisao}</td>
                                        <td>{campeonato.ano}</td>
                                        <td>
                                            <S.PilulaStatus
                                                $tipo={status === 'Ativo' ? 'ativo' : 'finalizado'}
                                            >
                                                {status}
                                            </S.PilulaStatus>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </S.Tabela>
                </S.TabelaContainer>
            </PaginasAdmin>
            <FormNovoCampeonato
                aberto={modalAberto}
                aoFechar={() => setModalAberto(false)}
                aoSucesso={recarregar}
            />
        </S.Container>
    );
};

export default CampeonatosAdmin;
