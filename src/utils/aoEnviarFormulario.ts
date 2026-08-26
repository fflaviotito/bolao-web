import type { FormEvent } from 'react';
import { validarFormulario, type validarFormularioProps } from './validarFormulario';
import api from '@/services/api';
import { toast } from 'react-toastify';
import { tratarErro, type Mensagens } from './tratarErro';

interface aoCadastrarFormularioProps {
    evento: FormEvent;
    validarDados: validarFormularioProps;
    mostrarCarregando: () => void;
    esconderCarregando: () => void;
    rotaPost: string;
    mensagemSucesso: string;
    aoCancelar?: () => void;
    aoSucesso: () => void;
    tratamentoErros?: Mensagens;
    metodo?: 'post' | 'put';
}

export const aoCadastrarFormulario = async ({
    evento,
    validarDados,
    mostrarCarregando,
    esconderCarregando,
    rotaPost,
    mensagemSucesso,
    aoCancelar,
    aoSucesso,
    tratamentoErros,
    metodo = 'post'
}: aoCadastrarFormularioProps) => {
    evento.preventDefault();

    const dadosValidos = validarFormulario(validarDados);

    if (!dadosValidos) return;

    try {
        mostrarCarregando();

        if (metodo === 'put') await api.put(rotaPost, dadosValidos.data);
        else await api.post(rotaPost, dadosValidos.data);

        toast.success(mensagemSucesso);
        if (aoCancelar) aoCancelar();
        aoSucesso();
    } catch (error) {
        tratarErro(error, validarDados.setErros, tratamentoErros);
    } finally {
        esconderCarregando();
    }
};
