import { styled } from 'styled-components';
import { Formulario as BaseFormulario } from '@/layouts/PaginaAutenticacao/style';
import { RodapeCartao as BaseRodapeCartao } from '@/layouts/PaginaAutenticacao/style';

export const Formulario = styled(BaseFormulario)`
    div.checkbox {
        display: flex;
        gap: 8px;

        > input {
            height: 20px;
            width: 20px;
            border-radius: 4px;
            accent-color: ${({ theme }) => theme.cores.secundario};
        }

        > label {
            font-size: 16px;
            color: ${({ theme }) => theme.cores.textoSecundario};
        }
    }
`;

export const RodapeCartao = styled(BaseRodapeCartao)`
    @media (min-width: 1024px) {
        > a:first-of-type:hover {
            text-decoration: underline;
            color: ${({ theme }) => theme.cores.textoPrimario};
        }

        > a:last-of-type:hover {
            color: ${({ theme }) => theme.cores.textoPrimario};

            > span {
                text-decoration: underline;
                color: ${({ theme }) => theme.cores.hoverPrimario};
            }
        }
    }
`;
