import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type ErrosValidacao = Record<string, string[]>;
export type Mensagens = Partial<Record<number, string>>;

export interface RespostaErro {
    codigo: number;
    mensagem: string;
    erros?: ErrosValidacao;
}

export const tratarErro = (
    error: unknown,
    setErros?: (erros: ErrosValidacao) => void,
    mensagens?: Mensagens
) => {
    if (error instanceof AxiosError) {
        const dados = error.response?.data as RespostaErro;
        const codigo = dados?.codigo;

        if (dados?.erros && setErros) {
            setErros(dados.erros);
        }

        const mensagensPadrao: Mensagens = {
            400: 'Campos inválidos!',
            500: 'Erro no servidor, contate o suporte!'
        };

        const mensagemFinal =
            (codigo && mensagens?.[codigo]) ?? (codigo && mensagensPadrao[codigo]);

        if (mensagemFinal) {
            toast.error(mensagemFinal);
            return;
        }

        if (dados?.mensagem) {
            toast.error(dados.mensagem);
            return;
        }

        if (!error.response) {
            toast.error('Erro de conexão com o servidor!');
            return;
        }
    }

    console.error(error);
    toast.error('Ocorreu um erro inesperado.');
};
