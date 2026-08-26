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

export const CabecalhoAcoes = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
`;

export const ListaConfrontos = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const Linha = styled.div`
    /* torna este card um container de consulta: o grid dos campos abaixo reage ao espaço
       realmente disponível aqui (recolhimento da sidebar incluso), não à largura da janela. */
    container-type: inline-size;

    display: flex;
    flex-direction: column;
    gap: 12px;
    background-color: ${({ theme }) => theme.cores.fundoCartao};
    border: 1px solid ${({ theme }) => theme.cores.bordaInput};
    border-radius: 8px;
    padding: 16px;

    > span {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: ${({ theme }) => theme.cores.textoTerciario};
    }
`;

export const CamposLinha = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    /* itens de grid não encolhem abaixo do tamanho mínimo do próprio conteúdo por padrão,
       o que fazia os campos vazarem do card em certas larguras. */
    > * {
        min-width: 0;
    }

    @container (min-width: 420px) {
        grid-template-columns: 1fr 1fr;
    }

    @container (min-width: 800px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

export const ConfrontoModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 8px 0 24px;
`;

export const TimeModal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    flex: 1;
    min-width: 0;

    > img {
        width: 56px;
        height: 56px;
        object-fit: contain;
    }

    > span {
        font-weight: 600;
        font-size: 14px;
        text-align: center;
        color: ${({ theme }) => theme.cores.textoPrimario};
    }
`;

export const PlacarModal = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    > input {
        width: 48px;
        height: 48px;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        border: 1px solid ${({ theme }) => theme.cores.bordaInput};
        border-radius: 8px;
        background-color: ${({ theme }) => theme.cores.fundoInput};
        color: ${({ theme }) => theme.cores.textoPrimario};
    }

    > span {
        font-weight: 700;
        color: ${({ theme }) => theme.cores.textoSecundario};
    }
`;

export const CheckboxFinalizado = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: ${({ theme }) => theme.cores.textoSecundario};
    cursor: pointer;

    > input {
        width: 18px;
        height: 18px;
        cursor: pointer;
    }
`;
