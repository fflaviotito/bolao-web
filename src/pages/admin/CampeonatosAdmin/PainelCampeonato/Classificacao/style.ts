import styled from 'styled-components';

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
