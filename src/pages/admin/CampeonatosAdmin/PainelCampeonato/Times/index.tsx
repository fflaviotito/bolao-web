import type { Time } from '@/types';
import { useCarregando } from '@/contexts/CarregandoContext';
import { useParams } from 'react-router-dom';
import { useEffect, useCallback, useState, type FormEvent } from 'react';
import type { OpcaoSelect } from '@/components/SelectComBusca';
import api from '@/services/api';
import { tratarErro } from '@/utils';
import { toast } from 'react-toastify';
import * as S from './style';
import { Botao, SelectComBusca } from '@/components';
import { Minus, Plus } from 'lucide-react';

type TimeVinculado = Pick<Time, 'id' | 'nomePopular'>;

const TimesDoCampeonato = () => {
    const { esconderCarregando, mostrarCarregando } = useCarregando();
    const { id: campeonatoId } = useParams();

    const [timeId, setTimeId] = useState('');
    const [opcoesTimes, setOpcoesTimes] = useState<OpcaoSelect[]>([]);
    const [carregandoTimes, setCarregandoTimes] = useState(false);
    const [timesVinculados, setTimesVinculados] = useState<TimeVinculado[]>([]);

    const buscarTimesVinculados = useCallback(async () => {
        try {
            mostrarCarregando();
            const { data } = await api.get(`/campeonatos/${campeonatoId}/times`);
            setTimesVinculados(
                data.map(({ time }: { time: Time }) => ({
                    id: time.id,
                    nomePopular: time.nomePopular
                }))
            );
        } catch (error) {
            tratarErro(error);
        } finally {
            esconderCarregando();
        }
    }, [campeonatoId, mostrarCarregando, esconderCarregando]);

    const buscarOpcoesTimes = useCallback(async () => {
        try {
            setCarregandoTimes(true);
            const { data } = await api.get('/times', { params: { paginar: false } });
            setOpcoesTimes(data.map((time: Time) => ({ label: time.nomePopular, value: time.id })));
        } catch (error) {
            tratarErro(error);
        } finally {
            setCarregandoTimes(false);
        }
    }, []);

    useEffect(() => {
        buscarTimesVinculados();
        buscarOpcoesTimes();
    }, [buscarTimesVinculados, buscarOpcoesTimes]);

    const aoAdicionar = async (evento: FormEvent) => {
        evento.preventDefault();
        if (!timeId) return;

        try {
            await api.post(`/admin/campeonatos/${campeonatoId}/times`, { campeonatoId, timeId });

            const timeSelecionado = opcoesTimes.find((t) => t.value === timeId);
            if (timeSelecionado) {
                setTimesVinculados((prev) => [
                    ...prev,
                    { id: timeSelecionado.value, nomePopular: timeSelecionado.label }
                ]);
            }

            toast.success('Time vinculado com sucesso!');
            setTimeId('');
        } catch (error) {
            tratarErro(error);
        }
    };

    const aoRemover = async (idTime: string) => {
        try {
            await api.delete(`/admin/campeonatos/${campeonatoId}/times/${idTime}`);
            setTimesVinculados((prev) => prev.filter((time) => time.id !== idTime));
            toast.success('Time excluído com sucesso!');
        } catch (error) {
            tratarErro(error);
        }
    };

    return (
        <S.Container>
            <S.Cabecalho>
                <h1>Gerenciar Participantes</h1>
                <p>Adicione ou remova times deste campeonato.</p>
            </S.Cabecalho>

            <S.Formulario onSubmit={aoAdicionar}>
                <SelectComBusca
                    label="Time"
                    name="timeId"
                    value={timeId}
                    onChange={setTimeId}
                    opcoes={opcoesTimes}
                    loading={carregandoTimes}
                    placeholder="Pesquise o time..."
                />
                <Botao
                    tipo="submit"
                    variante="primario"
                    texto="Adicionar"
                    icone={<Plus strokeWidth={3} />}
                />
            </S.Formulario>

            {timesVinculados.length > 0 && (
                <S.ListaTimes>
                    {timesVinculados.map((time) => (
                        <S.CardTime key={time.id}>
                            <span>{time.nomePopular}</span>
                            <S.BotaoRemover
                                type="button"
                                onClick={() => aoRemover(time.id)}
                                title={`Remover ${time.nomePopular}`}
                            >
                                <Minus size={20} strokeWidth={3} />
                            </S.BotaoRemover>
                        </S.CardTime>
                    ))}
                </S.ListaTimes>
            )}
        </S.Container>
    );
};

export default TimesDoCampeonato;
