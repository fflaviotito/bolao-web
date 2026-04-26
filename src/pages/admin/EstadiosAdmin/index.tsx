import { useState } from 'react';
import { useBuscaPaginada } from '@/hooks/useBuscaPaginada';
import type { Estadio } from '@/types';
import * as S from '@/styles/TabelasAdmin';
import PaginasAdmin from '@/layouts/PaginasAdmin';
import FormNovoEstadio from './FormNovoEstadio';

const EstadiosAdmin = () => {
    const [modalAberto, setModalAberto] = useState(false);
    const {
        busca,
        dados: estadios,
        paginacao,
        recarregar
    } = useBuscaPaginada<Estadio>('/estadios');

    return (
        <S.Container>
            <PaginasAdmin
                aoClicarAdicionar={() => setModalAberto(true)}
                barraPesquisa={busca}
                paginacao={paginacao}
                titulo="Estádios"
            >
                <S.TabelaContainer>
                    <S.Tabela>
                        <thead>
                            <tr>
                                <S.ColunaNumero>Nº</S.ColunaNumero>
                                <th>Nome Popular</th>
                                <th>Nome Oficial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estadios.map((estadio, index) => (
                                <tr key={estadio.id}>
                                    <td>{(paginacao.pagina - 1) * 10 + index + 1}</td>
                                    <S.ColunaForte>{estadio.nomePopular}</S.ColunaForte>
                                    <td>{estadio.nomeOficial}</td>
                                </tr>
                            ))}
                        </tbody>
                    </S.Tabela>
                </S.TabelaContainer>
            </PaginasAdmin>
            <FormNovoEstadio
                aberto={modalAberto}
                aoFechar={() => setModalAberto(false)}
                aoSucesso={recarregar}
            />
        </S.Container>
    );
};

export default EstadiosAdmin;
