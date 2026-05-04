import styled from 'styled-components';
import { AcoesFormulario } from '@/styles/FormsNovosCadastros';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;

    > p {
        color: ${({ theme }) => theme.cores.textoPrimario};
    }
`;

export const CampoBotoes = styled(AcoesFormulario)`
    @media (min-width: 430px) {
        align-self: end;
    }
`;
