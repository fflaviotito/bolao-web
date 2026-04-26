import z from 'zod';
import { emailRegra, nomeUsuarioRegra, senhaForteRegra } from '@/validators';
import { Link, useNavigate } from 'react-router-dom';
import { useCarregando } from '@/contexts/CarregandoContext';
import { useEffect, useState, type FormEvent } from 'react';
import api from '@/services/api';
import { toast } from 'react-toastify';
import { tratarErro, validarFormulario } from '@/utils';
import PaginaAutenticacao from '@/layouts/PaginaAutenticacao';
import * as S from './style';
import { Formulario } from '@/layouts/PaginaAutenticacao/style';
import { Botao, InputTexto } from '@/components';

const schema = z
    .object({
        nome: nomeUsuarioRegra,
        email: emailRegra,
        senha: senhaForteRegra,
        senhaConfirmacao: z.string()
    })
    .refine((dados) => dados.senha === dados.senhaConfirmacao, {
        message: 'As senhas não coincidem',
        path: ['senhaConfirmacao']
    });

const Cadastro = () => {
    const navegar = useNavigate();

    const { mostrarCarregando, esconderCarregando } = useCarregando();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
    const [erros, setErros] = useState({});

    useEffect(() => {
        document.title = 'Bolão | Crie sua conta';
    }, []);

    const aoEnviar = async (evento: FormEvent) => {
        evento.preventDefault();

        const dadosValidos = validarFormulario({
            schema,
            dados: { nome, email, senha, senhaConfirmacao },
            setErros
        });
        if (!dadosValidos) return;

        try {
            mostrarCarregando();
            await api.post('/registrar', dadosValidos.data);
            toast.success('Cadastro realizado com sucesso!');
            navegar('/entrar');
        } catch (erro) {
            tratarErro(erro, setErros, {
                409: 'E-mail já cadastrado!'
            });
        } finally {
            esconderCarregando();
        }
    };

    return (
        <PaginaAutenticacao
            titulo="Junte-se à torcida!"
            descricao="Crie sua conta em segundos."
            descricao2="Começe a palpitar nos melhores jogos."
            tituloCartao="Crie sua conta"
            subtituloCartao="Insira suas informações e faça seu registro"
            ladoCartao="esquerdo"
        >
            <Formulario onSubmit={aoEnviar}>
                <div>
                    <InputTexto
                        label="Nome"
                        placeholder="Digite seu nome..."
                        required={false}
                        name="nome"
                        value={nome}
                        onChange={(evento) => setNome(evento.target.value)}
                        erros={erros}
                    />
                    <InputTexto
                        label="E-mail"
                        type="text"
                        placeholder="Digite seu email..."
                        required={false}
                        name="email"
                        value={email}
                        onChange={(evento) => setEmail(evento.target.value)}
                        erros={erros}
                    />
                    <InputTexto
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha..."
                        required={false}
                        name="senha"
                        value={senha}
                        onChange={(evento) => setSenha(evento.target.value)}
                        erros={erros}
                    />
                    <InputTexto
                        label="Confirme sua senha"
                        type="password"
                        placeholder="Digite novamente sua senha..."
                        required={false}
                        name="senhaConfirmacao"
                        value={senhaConfirmacao}
                        onChange={(evento) => setSenhaConfirmacao(evento.target.value)}
                        erros={erros}
                    />
                </div>
                <Botao tipo="submit" texto="Cadastre-se" variante="principal" larguraTotal />
            </Formulario>

            <S.RodapeCartao>
                <Link to="/entrar">
                    Já tem uma conta? <span>Entrar</span>
                </Link>
            </S.RodapeCartao>
        </PaginaAutenticacao>
    );
};

export default Cadastro;
