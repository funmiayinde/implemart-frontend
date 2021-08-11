import React from 'react';

type InputProps = {
    type?: string;
    id?: string;
    placeHolder: string;
    name: string;
    className?: any;
    disabled?: boolean,
    meta?: {
        touched: any,
        error: any,
        warning: any,
    },
    onChange?: any | Function,
};

const InputField = ({disabled, meta, type,onChange, name, className, ...rest}: InputProps) => {
    return (
        <>
            <input
                disabled={disabled}
                name={name}
                type={type || 'text'}
                className={className ? className : 'form-control'}
                onChange={onChange}
                {...rest}
            />
            {meta?.touched && meta?.error && (
                <span style={{color: 'red'}} className="d-block">{meta?.error}</span>
            )}
        </>
    )
};

export default InputField;
