import type { ChangeEvent, InputHTMLAttributes } from 'react';
import type { ErrosPorCampo } from '../../utils/formatarErrosZod';
import { Container } from './style';
import { ListaErro } from '@/components';

interface InputTextoProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type?: 'text' | 'password' | 'email';
    placeholder: string;
    required?: boolean;
    name: string;
    value: string;
    onChange: (evento: ChangeEvent<HTMLInputElement>) => void;
    erros?: ErrosPorCampo;
    className?: string;
}

const InputTexto = ({
    label,
    type = 'text',
    placeholder,
    required = false,
    name,
    value,
    onChange,
    erros,
    className,
    ...rest
}: InputTextoProps) => {
    const errosDesteCampo = erros ? erros[name] : undefined;
    const temErro = Boolean(errosDesteCampo);

    return (
        <Container className={className} $temErro={temErro}>
            <label htmlFor={label}>{label}:</label>
            <input
                type={type}
                placeholder={placeholder}
                id={label}
                required={required}
                name={name}
                value={value}
                onChange={onChange}
                {...rest}
            />
            {errosDesteCampo && <ListaErro erros={errosDesteCampo} />}
        </Container>
    );
};

export default InputTexto;
