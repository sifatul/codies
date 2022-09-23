import { useField, useFormikContext } from 'formik';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';

const InputField = css`
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid gray;
    display: block;
`;

const MUIDatePicker = ({ ...props }: any) => {
    const { setFieldValue, setFieldTouched } = useFormikContext();
    const [field] = useField(props);

    return (
        <div>
            <DatePicker
                className={cx(InputField)}
                {...field}
                {...props}
                inputFormat={"dd-MM-YYYY"}
                selected={(field.value && new Date(field.value)) || null}
                onChange={(val) => {
                    setFieldValue(field.name, val);
                }}
                onChangeRaw={(e) => {
                    setFieldTouched(field.name, true, true);
                }}
            />
        </div>
    );
};

export default MUIDatePicker;
