import { useParams, Outlet, useNavigate } from 'react-router-dom';
import { useCarregando } from '@/contexts/CarregandoContext';
import { useState, useEffect } from 'react';
import type { Campeonato } from '@/types';
import api from '@/services/api';
import { tratarErro } from '@/utils';
import CaixaDialogo from '@/components/CaixaDialogo';
import { AlertTriangle } from 'lucide-react';

const GuardaCampeonato = () => {
    const { id } = useParams();
    const navegacao = useNavigate();
    const { esconderCarregando, mostrarCarregando } = useCarregando();
    const [campeonato, setCampeonato] = useState<Campeonato>();

    useEffect(() => {
        const buscarCampeonato = async () => {
            try {
                mostrarCarregando();
                const resposta = await api.get(`/campeonato/${id}`);
                setCampeonato(resposta.data);
            } catch (error) {
                tratarErro(error);
            } finally {
                esconderCarregando();
            }
        };

        if (id) buscarCampeonato();
    }, [id, mostrarCarregando, esconderCarregando]);

    if (!campeonato) return null;

    if (campeonato.status === 'rascunho') {
        return (
            <CaixaDialogo
                aberto={true}
                icone={<AlertTriangle size={56} />}
                titulo="Ação Necessária"
                descricao="O painel deste campeonato está bloqueado. Você precisa finalizar o cadastro das regras e configurações para continuar."
                botoes={[
                    {
                        texto: 'Ir para Configurações',
                        aoClicar: () =>
                            navegacao(`/admin/campeonatos/${id}/configuracoes`, { replace: true }),
                        tipo: 'button',
                        variante: 'primario'
                    }
                ]}
            />
        );
    }

    return <Outlet context={{ campeonato }} />;
};

export default GuardaCampeonato;
