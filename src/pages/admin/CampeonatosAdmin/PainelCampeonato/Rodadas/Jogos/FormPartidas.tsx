import z from 'zod';
import { useCarregando } from '@/contexts/CarregandoContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState, type FormEvent } from 'react';
import type { Estadio, Partida, Time } from '@/types';
import type { OpcaoSelect } from '@/components/SelectComBusca';
import { dataHoraBrasileiraRegra } from '@/validators';
import api from '@/services/api';
import { aoCadastrarFormulario, mascaraDataHora, tratarErro } from '@/utils';
import * as S from '@/styles/TabelasAdmin';
import * as SForm from '@/styles/FormsNovosCadastros';
import * as SLocal from './style';
import { Botao, InputTexto, SelectComBusca } from '@/components';

interface ConfrontoFormulario {
    id?: string;
    data: string;
    estadioId: string;
    timeMandanteId: string;
    timeVisitanteId: string;
}

const confrontoSchema = z
    .object({
        id: z.string().optional(),
        data: dataHoraBrasileiraRegra,
        estadioId: z.string().min(1, 'Selecione um estádio.'),
        timeMandanteId: z.string().min(1, 'Selecione o time mandante.'),
        timeVisitanteId: z.string().min(1, 'Selecione o time visitante.')
    })
    .refine((confronto) => confronto.timeMandanteId !== confronto.timeVisitanteId, {
        message: 'O time visitante não pode ser igual ao mandante.',
        path: ['timeVisitanteId']
    });

const schema = z.object({
    confrontos: z.array(confrontoSchema)
});

const confrontoVazio: ConfrontoFormulario = {
    data: '',
    estadioId: '',
    timeMandanteId: '',
    timeVisitanteId: ''
};

const paraDataHoraTexto = (isoOuData: string) => {
    const data = new Date(isoOuData);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(data.getDate())}/${pad(data.getMonth() + 1)}/${data.getFullYear()} ${pad(data.getHours())}:${pad(data.getMinutes())}`;
};

interface FormPartidasProps {
    partidasExistentes: Partida[];
    onSalvo: () => void;
    onCancelar?: () => void;
}

const FormPartidas = ({ partidasExistentes, onSalvo, onCancelar }: FormPartidasProps) => {
    const { esconderCarregando, mostrarCarregando } = useCarregando();
    const { id: campeonatoId, rodadaId } = useParams();

    const [linhas, setLinhas] = useState<ConfrontoFormulario[]>([]);
    const [opcoesTimes, setOpcoesTimes] = useState<OpcaoSelect[]>([]);
    const [opcoesEstadios, setOpcoesEstadios] = useState<OpcaoSelect[]>([]);
    const [estadioPorTime, setEstadioPorTime] = useState<Record<string, string>>({});
    const [erros, setErros] = useState({});

    const emEdicao = partidasExistentes.length > 0;

    useEffect(() => {
        const carregarOpcoes = async () => {
            try {
                mostrarCarregando();
                const [configResp, timesResp, estadiosResp] = await Promise.all([
                    api.get(`/admin/campeonatos/${campeonatoId}/configuracoes`),
                    api.get(`/campeonatos/${campeonatoId}/times`),
                    api.get('/estadios', { params: { paginar: false } })
                ]);

                setOpcoesTimes(
                    timesResp.data.map(({ time }: { time: Time }) => ({
                        label: time.nomePopular,
                        value: time.id
                    }))
                );
                setEstadioPorTime(
                    Object.fromEntries(
                        timesResp.data
                            .map(({ time }: { time: Time }) => [time.id, time.estadioId])
                            .filter(([, estadioId]: [string, string | undefined]) => estadioId)
                    )
                );
                setOpcoesEstadios(
                    estadiosResp.data.map((estadio: Estadio) => ({
                        label: estadio.nomePopular,
                        value: estadio.id
                    }))
                );

                if (emEdicao) {
                    setLinhas(
                        partidasExistentes.map((partida) => ({
                            id: partida.id,
                            data: paraDataHoraTexto(partida.data),
                            estadioId: partida.estadioId,
                            timeMandanteId: partida.timeMandanteId,
                            timeVisitanteId: partida.timeVisitanteId
                        }))
                    );
                } else {
                    const quantidadeConfrontos = configResp.data.configuracoes.quantidadeTimes / 2;
                    setLinhas(
                        Array.from({ length: quantidadeConfrontos }, () => ({ ...confrontoVazio }))
                    );
                }
            } catch (error) {
                tratarErro(error);
            } finally {
                esconderCarregando();
            }
        };

        carregarOpcoes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [campeonatoId]);

    const atualizarLinha = (indice: number, campo: keyof ConfrontoFormulario, valor: string) => {
        setLinhas((prev) =>
            prev.map((linha, i) => {
                if (i !== indice) return linha;

                const linhaAtualizada = { ...linha, [campo]: valor };

                if (campo === 'timeMandanteId' && estadioPorTime[valor]) {
                    linhaAtualizada.estadioId = estadioPorTime[valor];
                }

                return linhaAtualizada;
            })
        );
    };

    const timesEscolhidos = new Set(
        linhas.flatMap((linha) => [linha.timeMandanteId, linha.timeVisitanteId]).filter(Boolean)
    );

    const opcoesTimesDisponiveis = (valorAtual: string) =>
        opcoesTimes.filter(
            (opcao) => opcao.value === valorAtual || !timesEscolhidos.has(opcao.value)
        );

    const aoEnviar = async (evento: FormEvent) => {
        aoCadastrarFormulario({
            evento,
            validarDados: {
                schema,
                dados: { confrontos: linhas },
                setErros
            },
            mostrarCarregando,
            esconderCarregando,
            rotaPost: `/admin/rodadas/${rodadaId}/partidas`,
            metodo: emEdicao ? 'put' : 'post',
            mensagemSucesso: emEdicao
                ? 'Rodada atualizada com sucesso!'
                : 'Partidas cadastradas com sucesso!',
            aoSucesso: onSalvo
        });
    };

    return (
        <S.Container>
            <SLocal.Cabecalho>
                <h1>{emEdicao ? 'Editar Partidas' : 'Cadastrar Partidas'}</h1>
                <p>
                    {emEdicao
                        ? 'Ajuste os confrontos desta rodada. Todos precisam ser enviados juntos.'
                        : `Preencha os ${linhas.length} confrontos desta rodada. Todos precisam ser enviados juntos.`}
                </p>
            </SLocal.Cabecalho>
            <SForm.Formulario onSubmit={aoEnviar}>
                <SLocal.ListaConfrontos>
                    {linhas.map((linha, indice) => (
                        <SLocal.Linha key={linha.id ?? indice}>
                            <span>Confronto {indice + 1}</span>
                            <SLocal.CamposLinha>
                                <SelectComBusca
                                    label="Mandante"
                                    name={`confrontos.${indice}.timeMandanteId`}
                                    value={linha.timeMandanteId}
                                    onChange={(valor) =>
                                        atualizarLinha(indice, 'timeMandanteId', valor)
                                    }
                                    opcoes={opcoesTimesDisponiveis(linha.timeMandanteId)}
                                    erros={erros}
                                />
                                <SelectComBusca
                                    label="Visitante"
                                    name={`confrontos.${indice}.timeVisitanteId`}
                                    value={linha.timeVisitanteId}
                                    onChange={(valor) =>
                                        atualizarLinha(indice, 'timeVisitanteId', valor)
                                    }
                                    opcoes={opcoesTimesDisponiveis(linha.timeVisitanteId)}
                                    erros={erros}
                                />
                                <SelectComBusca
                                    label="Estádio"
                                    name={`confrontos.${indice}.estadioId`}
                                    value={linha.estadioId}
                                    onChange={(valor) => atualizarLinha(indice, 'estadioId', valor)}
                                    opcoes={opcoesEstadios}
                                    erros={erros}
                                />
                                <InputTexto
                                    label="Data e hora"
                                    name={`confrontos.${indice}.data`}
                                    placeholder="20/09/2026 16:00"
                                    value={linha.data}
                                    onChange={(evento) =>
                                        atualizarLinha(
                                            indice,
                                            'data',
                                            mascaraDataHora(evento.target.value)
                                        )
                                    }
                                    erros={erros}
                                />
                            </SLocal.CamposLinha>
                        </SLocal.Linha>
                    ))}
                </SLocal.ListaConfrontos>
                <SForm.AcoesFormulario>
                    {onCancelar && (
                        <Botao
                            texto="Cancelar"
                            tipo="button"
                            variante="secundario"
                            aoClicar={onCancelar}
                        />
                    )}
                    <Botao
                        texto={emEdicao ? 'Salvar Alterações' : 'Cadastrar Rodada'}
                        tipo="submit"
                        variante="primario"
                    />
                </SForm.AcoesFormulario>
            </SForm.Formulario>
        </S.Container>
    );
};

export default FormPartidas;
