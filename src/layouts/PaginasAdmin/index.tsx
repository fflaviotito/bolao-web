import type { BarraPesquisaProps } from '@/components/BarraPesquisa';
import type { PaginacaoProps } from '@/components/Paginacao';
import { useEffect, type ReactNode } from 'react';
import * as S from './style';
import { BarraPesquisa, Botao, Paginacao } from '@/components';
import { Plus } from 'lucide-react';

interface PaginasAdminProps {
    aoClicarAdicionar: () => void;
    barraPesquisa: BarraPesquisaProps;
    children: ReactNode;
    paginacao: PaginacaoProps;
    titulo: string;
}

const PaginasAdmin = ({
    aoClicarAdicionar,
    barraPesquisa,
    children,
    paginacao,
    titulo
}: PaginasAdminProps) => {
    useEffect(() => {
        document.title = 'Bolão | Painel de administração';
    }, []);

    return (
        <>
            <S.Cabecalho>
                <h1>{titulo}</h1>
                <Botao
                    tipo="button"
                    variante="primario"
                    texto="Novo"
                    icone={<Plus strokeWidth={3} />}
                    aoClicar={aoClicarAdicionar}
                />
            </S.Cabecalho>
            <BarraPesquisa {...barraPesquisa} />
            {children}
            <Paginacao {...paginacao} />
        </>
    );
};

export default PaginasAdmin;
