import { useState } from 'react';
import { useBuscaPaginada } from '@/hooks/useBuscaPaginada';
import type { Time } from '@/types';
import * as S from '@/styles/TabelasAdmin';
import PaginasAdmin from '@/layouts/PaginasAdmin';
import FormNovoTime from './FormNovoTime';

const TimesAdmin = () => {
    const [modalAberto, setModalAberto] = useState(false);
    const { busca, dados: times, paginacao, recarregar } = useBuscaPaginada<Time>('/times');

    return (
        <S.Container>
            <PaginasAdmin
                aoClicarAdicionar={() => setModalAberto(true)}
                barraPesquisa={busca}
                paginacao={paginacao}
                titulo="Times"
            >
                <S.TabelaContainer>
                    <S.Tabela>
                        <thead>
                            <tr>
                                <S.ColunaNumero>Nº</S.ColunaNumero>
                                <th>Nome Popular</th>
                                <th>Sigla</th>
                                <th>Nome Oficial</th>
                                <th>Estádio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {times.map((time, index) => (
                                <tr key={time.id}>
                                    <td>{(paginacao.pagina - 1) * 10 + index + 1}</td>
                                    <S.ColunaForte>
                                        <S.CampoCompartilhado>
                                            <img src={time.escudo} alt={time.nomePopular} />
                                            <span>{time.nomePopular}</span>
                                        </S.CampoCompartilhado>
                                    </S.ColunaForte>
                                    <td>{time.sigla}</td>
                                    <td>{time.nomeOficial}</td>
                                    <td>{time.estadio.nomePopular}</td>
                                </tr>
                            ))}
                        </tbody>
                    </S.Tabela>
                </S.TabelaContainer>
            </PaginasAdmin>
            <FormNovoTime
                aberto={modalAberto}
                aoFechar={() => setModalAberto(false)}
                aoSucesso={recarregar}
            />
        </S.Container>
    );
};

export default TimesAdmin;
