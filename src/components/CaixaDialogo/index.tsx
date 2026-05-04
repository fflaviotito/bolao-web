import type { ReactNode } from 'react';
import type { BotaoProps } from '../Botao';
import { Modal, Botao } from '@/components';
import * as S from './style';

interface CaixaDialogoProps {
    aberto: boolean;
    icone?: ReactNode;
    titulo: string;
    descricao: string;
    botoes: BotaoProps[];
}

const CaixaDialogo = ({ aberto, icone, titulo, descricao, botoes }: CaixaDialogoProps) => {
    return (
        <Modal aberto={aberto} titulo={titulo} icone={icone} variante="pop-up">
            {/* 4. Construímos o visual usando os dados recebidos */}
            <S.Container>
                <p>{descricao}</p>

                <S.CampoBotoes>
                    {botoes.map((btn, index) => (
                        <Botao
                            texto={btn.texto}
                            tipo={btn.tipo}
                            variante={btn.variante}
                            aoClicar={btn.aoClicar}
                            key={index}
                        />
                    ))}
                </S.CampoBotoes>
            </S.Container>
        </Modal>
    );
};

export default CaixaDialogo;
