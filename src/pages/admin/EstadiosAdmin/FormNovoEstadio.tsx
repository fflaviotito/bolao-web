import z from 'zod';
import { nomePadraoRegra } from '@/validators';
import type { ModalFormularioProps } from '@/types/modal';
import { useCarregando } from '@/contexts/CarregandoContext';
import { useState, type FormEvent } from 'react';
import { aoCadastrarFormulario } from '@/utils';
import { Botao, InputTexto, Modal } from '@/components';
import * as S from '@/styles/FormsNovosCadastros';
import { mascaraTextoPadrao } from '@/utils/mascaras';

const schema = z.object({
    nomeOficial: nomePadraoRegra.or(z.literal('')),
    nomePopular: nomePadraoRegra
});

const FormNovoEstadio = ({ aberto, aoFechar, aoSucesso }: ModalFormularioProps) => {
    const { mostrarCarregando, esconderCarregando } = useCarregando();
    const [nomeOficial, setNomeOficial] = useState('');
    const [nomePopular, setNomePopular] = useState('');
    const [erros, setErros] = useState({});

    const aoEnviar = async (evento: FormEvent) => {
        aoCadastrarFormulario({
            evento,
            validarDados: {
                schema,
                dados: { nomeOficial, nomePopular },
                setErros
            },
            mostrarCarregando,
            esconderCarregando,
            rotaPost: '/admin/estadios',
            mensagemSucesso: 'Estádio cadastrado com sucesso!',
            aoCancelar,
            aoSucesso
        });
    };

    const aoCancelar = () => {
        setNomeOficial('');
        setNomePopular('');
        setErros({});
        aoFechar();
    };

    return (
        <Modal aberto={aberto} aoFechar={aoCancelar} titulo="Novo Estádio">
            <S.Formulario onSubmit={aoEnviar}>
                <InputTexto
                    label="Nome Oficial"
                    name="nomeOficial"
                    onChange={(evento) => setNomeOficial(mascaraTextoPadrao(evento.target.value))}
                    placeholder="Estádio Jornalista Mário Filho"
                    value={nomeOficial}
                    erros={erros}
                    required={false}
                />
                <InputTexto
                    label="Nome Popular"
                    name="nomePopular"
                    onChange={(evento) => setNomePopular(mascaraTextoPadrao(evento.target.value))}
                    placeholder="Maracanã"
                    value={nomePopular}
                    erros={erros}
                    required={true}
                />
                <S.AcoesFormulario>
                    <Botao
                        texto="Cancelar"
                        tipo="button"
                        variante="secundario"
                        aoClicar={aoCancelar}
                    />
                    <Botao texto="Salvar" tipo="submit" variante="primario" />
                </S.AcoesFormulario>
            </S.Formulario>
        </Modal>
    );
};

export default FormNovoEstadio;
