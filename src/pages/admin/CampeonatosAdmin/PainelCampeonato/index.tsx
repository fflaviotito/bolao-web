import { Calendar, Medal, Settings, Shield } from 'lucide-react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import type { Campeonato } from '@/types';

import * as S from './style';
import { CardAcao } from '@/components';

const cards = [
    {
        descricao: 'Vincular ou remover times',
        icone: <Shield />,
        titulo: 'Participantes',
        url: 'times'
    },
    { descricao: 'Criar e atualizar jogos', icone: <Calendar />, titulo: 'Rodadas', url: 'jogos' },
    {
        descricao: 'Gerir tabela do campeonato',
        icone: <Medal />,
        titulo: 'Classificação',
        url: 'classificacao'
    },
    {
        descricao: 'Editar dados e regras',
        icone: <Settings />,
        titulo: 'Configurações',
        url: 'configuracoes'
    }
];

const PainelCampeonatoAdmin = () => {
    const navegacao = useNavigate();
    const { id } = useParams();
    const { campeonato } = useOutletContext<{ campeonato: Campeonato }>();

    const urlPadrao = `/admin/campeonatos/${id}/`;

    return (
        <S.Container>
            <S.Cabecalho>
                <h1>
                    {campeonato.nome} {campeonato.ano}
                </h1>
                <p>{campeonato.divisao}</p>
            </S.Cabecalho>
            <h2>O que você deseja gerenciar?</h2>
            <S.GridBotoes>
                {cards.map((card) => (
                    <CardAcao
                        aoClicar={() => navegacao(`${urlPadrao}${card.url}`)}
                        descricao={card.descricao}
                        titulo={card.titulo}
                        icone={card.icone}
                        key={card.titulo}
                    />
                ))}
            </S.GridBotoes>
        </S.Container>
    );
};

export default PainelCampeonatoAdmin;
