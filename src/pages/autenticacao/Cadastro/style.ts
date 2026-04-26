import { styled } from 'styled-components';
import { RodapeCartao as BaseRodapeCartao } from '@/layouts/PaginaAutenticacao/style';

export const RodapeCartao = styled(BaseRodapeCartao)`
    @media (min-width: 1024px) {
        > a:hover {
            color: ${({ theme }) => theme.cores.textoPrimario};

            > span {
                text-decoration: underline;
                color: ${({ theme }) => theme.cores.hoverPrimario};
            }
        }
    }
`;
