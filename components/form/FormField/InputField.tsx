import React from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import { TextField } from '@mui/material';

interface InputFieldProps {
    name: string;
    label: string;
    errorText?: string;
    fullWidth?: boolean;
    type?: string;
    error?: boolean;
    disabled?: boolean;
}

export default function InputField(props: InputFieldProps) {
    const { errorText, type, ...rest } = props;
    const [field, meta] = useField(props);

    function _renderHelperText() {
        const [touched, error] = at(meta, 'touched', 'error');
        if (touched && error) {
            return error;
        }
    }

    return (
        <TextField
            type={type || 'text'}
            error={meta?.touched && (meta?.error as unknown as boolean) && true}
            helperText={_renderHelperText()}
            {...field}
            {...rest}
        />
    );
}
