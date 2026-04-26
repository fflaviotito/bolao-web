import z from 'zod';
import { emailRegra, senhaPuraLogin } from '@/validators';
import { useNavigate, Link } from 'react-router-dom';
import { useCarregando } from '@/contexts/CarregandoContext';
import { useEffect, useState, type FormEvent } from 'react';
import api from '@/services/api';
import type { LoginResponse } from '@/types';
import PaginaAutenticacao from '@/layouts/PaginaAutenticacao';
import * as S from './style';
import { Botao, InputTexto } from '@/components';
import { tratarErro, validarFormulario } from '@/utils';

const schema = z.object({
    email: emailRegra,
    senha: senhaPuraLogin
});

const Login = () => {
    const navegar = useNavigate();

    const { mostrarCarregando, esconderCarregando } = useCarregando();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erros, setErros] = useState({});

    useEffect(() => {
        document.title = 'Bolão | Acesse sua conta';

        const token = localStorage.getItem('bolao:token');
        if (token) navegar('/', { replace: true });
    }, [navegar]);

    const aoEnviar = async (evento: FormEvent) => {
        evento.preventDefault();

        const dadosValidos = validarFormulario({
            schema,
            dados: { email, senha },
            setErros
        });
        if (!dadosValidos) return;

        try {
            mostrarCarregando();

            const response = await api.post('/entrar', dadosValidos.data);

            const { token, usuario }: LoginResponse = response.data;

            localStorage.setItem('bolao:token', token);
            localStorage.setItem('bolao:usuario', JSON.stringify(usuario));

            navegar('/');
        } catch (erro) {
            tratarErro(erro, setErros, {
                401: 'E-mail ou senha incorretos!'
            });
        } finally {
            esconderCarregando();
        }
    };

    return (
        <PaginaAutenticacao
            titulo="Olá, Bem-vindo!"
            descricao="Seu chute certo está aqui, palpite e acerte o resultado."
            descricao2="Jogue com os amigos!"
            tituloCartao="Acesse sua conta"
            subtituloCartao="Insira suas credenciais e faça seu palpite"
            ladoCartao="direito"
        >
            <S.Formulario onSubmit={aoEnviar}>
                <div>
                    <InputTexto
                        label="E-mail"
                        type="email"
                        placeholder="Digite seu email..."
                        required={true}
                        name="email"
                        value={email}
                        onChange={(evento) => setEmail(evento.target.value)}
                        erros={erros}
                    />
                    <InputTexto
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha..."
                        required={true}
                        name="senha"
                        value={senha}
                        onChange={(evento) => setSenha(evento.target.value)}
                        erros={erros}
                    />
                    <div className="checkbox">
                        <input type="checkbox" id="lembrar-me" />
                        <label htmlFor="lembrar-me">Lembrar-me</label>
                    </div>
                </div>
                <Botao tipo="submit" texto="Enviar" variante="principal" larguraTotal />
            </S.Formulario>

            <S.RodapeCartao>
                <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
                <Link to="/cadastrar">
                    Não tem uma conta? <span>Cadastre-se</span>
                </Link>
            </S.RodapeCartao>
        </PaginaAutenticacao>
    );
};

export default Login;
