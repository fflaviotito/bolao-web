import { toast } from 'react-toastify';
import { Pencil } from 'lucide-react';
import { useCarregando } from '@/contexts/CarregandoContext';
import { useState, type ChangeEvent } from 'react';
import type { Partida } from '@/types';
import api from '@/services/api';
import { formatarDataHora, tratarErro } from '@/utils';
import * as S from '@/styles/TabelasAdmin';
import * as SForm from '@/styles/FormsNovosCadastros';
import * as SLocal from './style';
import { Botao, Modal } from '@/components';

interface TabelaPartidasProps {
    partidas: Partida[];
    onEditarRodada: () => void;
    onAtualizado: () => void;
}

const TabelaPartidas = ({ partidas, onEditarRodada, onAtualizado }: TabelaPartidasProps) => {
    const { esconderCarregando, mostrarCarregando } = useCarregando();

    const [partidaEmEdicao, setPartidaEmEdicao] = useState<Partida | null>(null);
    const [golMandante, setGolMandante] = useState('0');
    const [golVisitante, setGolVisitante] = useState('0');
    const [finalizado, setFinalizado] = useState(false);

    const rodadaSemNenhumGol = partidas.every(
        (partida) => partida.golMandante === null && partida.golVisitante === null
    );

    const abrirModalPlacar = (partida: Partida) => {
        if (partida.finalizado) return;

        setPartidaEmEdicao(partida);
        setGolMandante(String(partida.golMandante ?? 0));
        setGolVisitante(String(partida.golVisitante ?? 0));
        setFinalizado(false);
    };

    const fecharModalPlacar = () => setPartidaEmEdicao(null);

    const aoMudarGol =
        (setter: (valor: string) => void) => (evento: ChangeEvent<HTMLInputElement>) => {
            setter(evento.target.value.replace(/\D/g, '').slice(0, 2));
        };

    const salvarPlacar = async () => {
        if (!partidaEmEdicao) return;

        try {
            mostrarCarregando();
            await api.patch(`/admin/partidas/${partidaEmEdicao.id}/resultado`, {
                golMandante: Number(golMandante || 0),
                golVisitante: Number(golVisitante || 0),
                finalizado
            });
            toast.success(finalizado ? 'Partida finalizada!' : 'Placar atualizado!');
            fecharModalPlacar();
            onAtualizado();
        } catch (error) {
            tratarErro(error);
        } finally {
            esconderCarregando();
        }
    };

    return (
        <S.Container>
            <SLocal.CabecalhoAcoes>
                <SLocal.Cabecalho>
                    <h1>Partidas da Rodada</h1>
                    <p>
                        Confrontos já cadastrados nesta rodada. Clique numa partida pra lançar o
                        placar.
                    </p>
                </SLocal.Cabecalho>
                {rodadaSemNenhumGol && (
                    <Botao
                        texto="Editar Rodada"
                        tipo="button"
                        variante="secundario"
                        icone={<Pencil size={18} />}
                        aoClicar={onEditarRodada}
                    />
                )}
            </SLocal.CabecalhoAcoes>
            <S.TabelaContainer>
                <S.Tabela>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Mandante</th>
                            <th>Visitante</th>
                            <th>Estádio</th>
                            <th>Placar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {partidas.map((partida) => (
                            <tr
                                key={partida.id}
                                onClick={() => abrirModalPlacar(partida)}
                                style={{ cursor: partida.finalizado ? 'default' : 'pointer' }}
                            >
                                <td>{formatarDataHora(partida.data)}</td>
                                <S.ColunaForte>
                                    <S.CampoCompartilhado>
                                        <img
                                            src={partida.timeMandante.escudo}
                                            alt={partida.timeMandante.nomePopular}
                                        />
                                        <span>{partida.timeMandante.nomePopular}</span>
                                    </S.CampoCompartilhado>
                                </S.ColunaForte>
                                <S.ColunaForte>
                                    <S.CampoCompartilhado>
                                        <img
                                            src={partida.timeVisitante.escudo}
                                            alt={partida.timeVisitante.nomePopular}
                                        />
                                        <span>{partida.timeVisitante.nomePopular}</span>
                                    </S.CampoCompartilhado>
                                </S.ColunaForte>
                                <td>{partida.estadio.nomePopular}</td>
                                <td>
                                    <S.PilulaStatus
                                        $tipo={partida.finalizado ? 'finalizado' : 'ativo'}
                                    >
                                        {partida.golMandante !== null
                                            ? `${partida.golMandante} x ${partida.golVisitante}`
                                            : 'Agendado'}
                                    </S.PilulaStatus>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </S.Tabela>
            </S.TabelaContainer>

            <Modal
                aberto={Boolean(partidaEmEdicao)}
                aoFechar={fecharModalPlacar}
                titulo="Atualizar Placar"
            >
                {partidaEmEdicao && (
                    <>
                        <SLocal.ConfrontoModal>
                            <SLocal.TimeModal>
                                <img
                                    src={partidaEmEdicao.timeMandante.escudo}
                                    alt={partidaEmEdicao.timeMandante.nomePopular}
                                />
                                <span>{partidaEmEdicao.timeMandante.nomePopular}</span>
                            </SLocal.TimeModal>
                            <SLocal.PlacarModal>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={golMandante}
                                    onChange={aoMudarGol(setGolMandante)}
                                />
                                <span>x</span>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={golVisitante}
                                    onChange={aoMudarGol(setGolVisitante)}
                                />
                            </SLocal.PlacarModal>
                            <SLocal.TimeModal>
                                <img
                                    src={partidaEmEdicao.timeVisitante.escudo}
                                    alt={partidaEmEdicao.timeVisitante.nomePopular}
                                />
                                <span>{partidaEmEdicao.timeVisitante.nomePopular}</span>
                            </SLocal.TimeModal>
                        </SLocal.ConfrontoModal>
                        <SLocal.CheckboxFinalizado>
                            <input
                                type="checkbox"
                                checked={finalizado}
                                onChange={(evento) => setFinalizado(evento.target.checked)}
                            />
                            Marcar como finalizado (não poderá mais ser alterado)
                        </SLocal.CheckboxFinalizado>
                        <SForm.AcoesFormulario>
                            <Botao
                                texto="Cancelar"
                                tipo="button"
                                variante="secundario"
                                aoClicar={fecharModalPlacar}
                            />
                            <Botao
                                texto="Salvar"
                                tipo="button"
                                variante="primario"
                                aoClicar={salvarPlacar}
                            />
                        </SForm.AcoesFormulario>
                    </>
                )}
            </Modal>
        </S.Container>
    );
};

export default TabelaPartidas;
