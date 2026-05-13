import { InputTexto } from '@/components';
import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const Cabecalho = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    > h1 {
        font-size: 24px;
        font-weight: 700;
        color: ${({ theme }) => theme.cores.textoPrimario};
    }

    > p {
        font-size: 14px;
        color: ${({ theme }) => theme.cores.textoSecundario};
    }

    @media (min-width: 520px) {
        > h1 {
            font-size: 32px;
        }

        > p {
            font-size: 16px;
        }
    }
`;

export const InputTextoDaPagina = styled(InputTexto)`
    @media (min-width: 500px) {
        flex-direction: row;
        align-items: center;
        gap: 12px;

        > label {
            width: 190px;
        }

        > input {
            width: 60px;
            text-align: center;
        }
    }
`;
