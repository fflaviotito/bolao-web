import { useEffect, type ReactNode } from 'react';
import * as S from './style';
import { X } from 'lucide-react';

interface ModalProps {
    aberto: boolean;
    children: ReactNode;
    titulo: string;
    aoFechar?: () => void;
    variante?: 'formulario' | 'pop-up';
    icone?: ReactNode;
}

const Modal = ({
    aberto,
    aoFechar,
    children,
    titulo,
    variante = 'formulario',
    icone
}: ModalProps) => {
    useEffect(() => {
        if (!aoFechar) return;

        const aoApertarEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') aoFechar();
        };
        if (aberto) window.addEventListener('keydown', aoApertarEsc);
        return () => window.removeEventListener('keydown', aoApertarEsc);
    }, [aberto, aoFechar]);

    if (!aberto) return null;

    return (
        <S.Overlay>
            <S.Container>
                <S.Cabecalho $variante={variante}>
                    {variante === 'formulario' ? (
                        <>
                            <h2>{titulo}</h2>
                            <button type="button" onClick={aoFechar}>
                                {<X size={24} strokeWidth={3} />}
                            </button>
                        </>
                    ) : (
                        <>
                            {icone}
                            <h2>{titulo}</h2>
                        </>
                    )}
                </S.Cabecalho>
                <S.Conteudo>{children}</S.Conteudo>
            </S.Container>
        </S.Overlay>
    );
};

export default Modal;
