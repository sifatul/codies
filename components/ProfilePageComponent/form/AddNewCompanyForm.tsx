import React from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import CustomDatePicker from '../../form/FormField/CustomDatePicker';

const FormContainer = Styled.div`
    padding: 20px;
`;

const FieldGrid = Styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 15px;
`;

const InputFieldContainer = css`
    width: 100%;
    padding: 12px;
`;

const InputField = css`
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid gray;
    display: block;
`;

const validationSchema = Yup.object().shape({
    companyName: Yup.string().required('Company name is required'),
    position: Yup.string().required('Position is required'),
    startDate: Yup.date().required('Date is required'),
    endDate: Yup.date().nullable(),
    summary: Yup.string(),
    techStach: Yup.array(),
});

const AddNewCompanyForm = () => {
    const formik = useFormik({
        initialValues: {
            companyName: '',
            position: '',
            startDate: null,
            endDate: null,
            summary: '',
            techStack: [],
        },
        validationSchema: validationSchema,
        onSubmit: (val: any) => {},
    });

    const { handleChange, errors, values, setFieldValue, resetForm } = formik;

    return (
        <FormContainer>
            <FormikProvider value={formik}>
                <Form>
                    <FieldGrid>
                        <div className={cx(InputFieldContainer)}>
                            <label>Company Name*</label> <br />
                            <Field
                                className={cx(InputField)}
                                name='companyName'
                                placeholder='Company name'
                            />
                        </div>
                        <div className={cx(InputFieldContainer)}>
                            <label>Position*</label> <br />
                            <Field
                                className={cx(InputField)}
                                name='position'
                                placeholder='Position'
                            />
                        </div>
                        <div className={cx(InputFieldContainer)}>
                            <label>Start Date*</label> <br />
                            <CustomDatePicker name={'startDate'} />
                        </div>
                        <div className={cx(InputFieldContainer)}>
                            <label>Start Date*</label> <br />
                            <CustomDatePicker name={'endDate'} />
                        </div>
                    </FieldGrid>
                    <div className={cx(InputFieldContainer)}>
                        <label>Summary</label> <br />
                        <Field
                            as='textarea'
                            className={cx(InputField)}
                            name='summary'
                            placeholder='Summary'
                        />
                    </div>
                </Form>
            </FormikProvider>
        </FormContainer>
    );
};

export default AddNewCompanyForm;
