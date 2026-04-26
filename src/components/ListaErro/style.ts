import styled from 'styled-components';

export const Lista = styled.ul`
    > li {
        list-style-position: inside;
        font-size: 10px;
        color: ${({ theme }) => theme.cores.erros};
    }
`;
