import * as S from './style';

interface listaErroProps {
    erros: string[];
}

const ListaErro = ({ erros }: listaErroProps) => {
    if (!erros.length) return null;

    return (
        <S.Lista>
            {erros.map((msg, index) => (
                <li key={index}>{msg}</li>
            ))}
        </S.Lista>
    );
};

export default ListaErro;
