export const obterStatusPorData = (inicio: Date, fim: Date) => {
    const hoje = new Date();

    if (hoje < new Date(inicio)) return 'Em breve';
    if (hoje > new Date(fim)) return 'Finalizado';
    return 'Ativo';
};
