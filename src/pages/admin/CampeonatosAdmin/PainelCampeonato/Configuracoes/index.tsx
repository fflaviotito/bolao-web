import z from 'zod';
import { numeroIntRegra, pontosRegra } from '@/validators';
import { useCarregando } from '@/contexts/CarregandoContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, type FormEvent } from 'react';
import type { Configuracao, Regras } from '@/types/campeonato';
import api from '@/services/api';
import { aoCadastrarFormulario, tratarErro } from '@/utils';
import * as S from './style';
import * as SForm from '@/styles/FormsNovosCadastros';
import { Botao } from '@/components';

const schema = z.object({
    configuracao: z.object({
        quantidadeTimes: numeroIntRegra,
        quantidadeRodadas: numeroIntRegra
    }),
    regras: z.object({
        pontosEmpateExato: pontosRegra,
        pontosAcertoEmpate: pontosRegra,
        pontosPlacarExato: pontosRegra,
        pontosAcertoVencedor: pontosRegra,
        pontosGolTime: pontosRegra
    })
});

const ConfiguracoesDoCampeonato = () => {
    const { esconderCarregando, mostrarCarregando } = useCarregando();
    const { id: campeonatoId } = useParams();
    const navegacao = useNavigate();

    const [configuracoes, setConfiguracoes] = useState<Configuracao>();
    const [regras, setRegras] = useState<Regras>();
    const [erros, setErros] = useState({});

    useEffect(() => {
        const buscarConfiguracoes = async () => {
            try {
                mostrarCarregando();
                const { data } = await api.get(`/admin/campeonatos/${campeonatoId}/configuracoes`);
                setConfiguracoes(data.configuracoes);
                setRegras(data.regras);
            } catch (error) {
                tratarErro(error);
            } finally {
                esconderCarregando();
            }
        };

        buscarConfiguracoes();
    }, [campeonatoId, esconderCarregando, mostrarCarregando]);

    const aoMudarInputNumero = <T,>(
        evento: React.ChangeEvent<HTMLInputElement>,
        setDados: React.Dispatch<React.SetStateAction<T | undefined>>
    ) => {
        const { name, value } = evento.target;
        setDados((prev) => {
            const novoEstado = {
                ...(prev || {}),
                [name]: value === '' ? '' : Number(value)
            } as T;
            return novoEstado;
        });
    };

    const aoEnviar = async (evento: FormEvent) => {
        aoCadastrarFormulario({
            evento,
            validarDados: {
                schema,
                dados: { configuracao: configuracoes, regras },
                setErros
            },
            mostrarCarregando,
            esconderCarregando,
            rotaPost: `/admin/campeonatos/${campeonatoId}/configuracoes`,
            mensagemSucesso: 'Campeonato configurado com sucesso!',
            aoCancelar: () => {},
            aoSucesso: () => navegacao(`/admin/campeonatos/${campeonatoId}/`)
        });
    };

    return (
        <S.Container>
            <S.Cabecalho>
                <h1>Configurações</h1>
                <p>Configure o campeonato e decida as regras de pontuação.</p>
            </S.Cabecalho>
            <SForm.Formulario onSubmit={aoEnviar}>
                <S.InputTextoDaPagina
                    label="Quantidade de Times"
                    name="quantidadeTimes"
                    onChange={(evento) => aoMudarInputNumero(evento, setConfiguracoes)}
                    placeholder="20"
                    value={String(configuracoes?.quantidadeTimes ?? '')}
                    erros={erros}
                />
                <S.InputTextoDaPagina
                    label="Quantidade de Rodadas"
                    name="quantidadeRodadas"
                    onChange={(evento) => aoMudarInputNumero(evento, setConfiguracoes)}
                    placeholder="38"
                    value={String(configuracoes?.quantidadeRodadas ?? '')}
                    erros={erros}
                />
                <S.InputTextoDaPagina
                    label="Pontos Empate Exato"
                    name="pontosEmpateExato"
                    onChange={(evento) => aoMudarInputNumero(evento, setRegras)}
                    placeholder="5"
                    value={String(regras?.pontosEmpateExato ?? '')}
                    erros={erros}
                />
                <S.InputTextoDaPagina
                    label="Pontos Acerto Empate"
                    name="pontosAcertoEmpate"
                    onChange={(evento) => aoMudarInputNumero(evento, setRegras)}
                    placeholder="3"
                    value={String(regras?.pontosAcertoEmpate ?? '')}
                    erros={erros}
                />
                <S.InputTextoDaPagina
                    label="Pontos Placar Exato"
                    name="pontosPlacarExato"
                    onChange={(evento) => aoMudarInputNumero(evento, setRegras)}
                    placeholder="4"
                    value={String(regras?.pontosPlacarExato ?? '')}
                    erros={erros}
                />
                <S.InputTextoDaPagina
                    label="Pontos Acerto Vencedor"
                    name="pontosAcertoVencedor"
                    onChange={(evento) => aoMudarInputNumero(evento, setRegras)}
                    placeholder="1"
                    value={String(regras?.pontosAcertoVencedor ?? '')}
                    erros={erros}
                />
                <S.InputTextoDaPagina
                    label="Pontos Gol Time"
                    name="pontosGolTime"
                    onChange={(evento) => aoMudarInputNumero(evento, setRegras)}
                    placeholder="1"
                    value={String(regras?.pontosGolTime ?? '')}
                    erros={erros}
                />
                <SForm.AcoesFormulario>
                    <Botao texto="Salvar" tipo="submit" variante="primario" />
                </SForm.AcoesFormulario>
            </SForm.Formulario>
        </S.Container>
    );
};

export default ConfiguracoesDoCampeonato;
