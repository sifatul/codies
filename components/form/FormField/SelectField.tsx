import React from 'react';
import PropTypes from 'prop-types';
import { at } from 'lodash';
import { useField } from 'formik';
import { InputLabel, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';

interface SelectFieldPropTypes {
    label: string;
    name: string;
    data: SelectFieldDataType[];
    fullWidth?: boolean;
    disabled?: boolean;
}

interface SelectFieldDataType {
    label: string;
    value: string | undefined;
}

function SelectField(props: SelectFieldPropTypes) {
    const { label, data, ...rest } = props;
    const [field, meta] = useField(props);
    const { value: selectedValue } = field;
    const [touched, error] = at(meta, 'touched', 'error');
    const isError = touched && error && true;
    function _renderHelperText() {
        if (isError) {
            return <FormHelperText>{error}</FormHelperText>;
        }
    }

    return (
        <FormControl {...rest} error={isError}>
            <InputLabel>{label}</InputLabel>
            <Select {...field} value={selectedValue ? selectedValue : ''}>
                {data.map((item: any, index: number) => (
                    <MenuItem key={index} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
            {_renderHelperText()}
        </FormControl>
    );
}

SelectField.defaultProps = {
    data: [],
};

SelectField.propTypes = {
    fullWidth: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.array.isRequired,
};

export default SelectField;
