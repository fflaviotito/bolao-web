import { Outlet } from 'react-router-dom';
import * as S from './style';
import { MenuNavegacaoAdmin, Rodape } from '@/components';

const PainelAdmin = () => {
    return (
        <S.Container>
            <MenuNavegacaoAdmin />
            <S.ColunaDireita>
                <S.AreaConteudo>
                    <Outlet />
                </S.AreaConteudo>
                <Rodape />
            </S.ColunaDireita>
        </S.Container>
    );
};

export default PainelAdmin;
