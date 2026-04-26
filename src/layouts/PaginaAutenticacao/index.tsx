import type { ReactNode } from 'react';
import * as S from './style';

interface PaginaAutenticacaoProps {
    children: ReactNode;
    titulo: string;
    descricao: string;
    descricao2?: string;
    tituloCartao: string;
    subtituloCartao: string;
    ladoCartao?: 'esquerdo' | 'direito';
}

const PaginaAutenticacao = ({
    children,
    titulo,
    descricao,
    descricao2,
    tituloCartao,
    subtituloCartao,
    ladoCartao = 'esquerdo'
}: PaginaAutenticacaoProps) => {
    return (
        <S.Container $ladoCartao={ladoCartao}>
            <S.LadoMarca $ladoCartao={ladoCartao}>
                <img src="/images/logo.png" alt="Logo do Bolão" />
                <div>
                    <h1>{titulo}</h1>
                    <p>
                        {descricao}
                        <br />
                        {descricao2}
                    </p>
                </div>
            </S.LadoMarca>

            <S.Cartao>
                <S.CabecalhoCartao>
                    <img src="/images/logo.png" alt="Logo do Bolão" />
                    <h2>{tituloCartao}</h2>
                    <p>{subtituloCartao}</p>
                </S.CabecalhoCartao>
                {children}
            </S.Cartao>
        </S.Container>
    );
};

export default PaginaAutenticacao;
