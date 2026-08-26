import { ZodError } from 'zod';

export type ErrosPorCampo = Record<string, string[]>;

export const formatarErrosZod = (erro: ZodError): ErrosPorCampo => {
    const errosFormatados: ErrosPorCampo = {};

    erro.issues.forEach((issues) => {
        const campo = issues.path.join('.');

        if (!errosFormatados[campo]) errosFormatados[campo] = [];

        errosFormatados[campo].push(issues.message);
    });

    return errosFormatados;
};
