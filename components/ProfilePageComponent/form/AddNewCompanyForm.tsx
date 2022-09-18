import React, { useCallback } from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import CustomDatePicker from '../../form/FormField/CustomDatePicker';
import Button, { ButtonType } from "../../common/Button"
import { PostData } from '../../../Utils/fetchData';
import { UseAppSelector } from '../../../store';
import { getUserState } from '../../../store/user/basicInfo';

const FormContainer = Styled.div`
    padding: 20px;
    border: 1px solid #e1e1e1;
    margin-top: 20px;
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



const ButtonContainer = Styled.div`
    display: flex;
    justify-content: flex-end;
`;

const ErrorMessageClass = css`
    margin-top: 8px;
    color: red;
    font-weight: 300;
    font-size: 14px;
`;

const validationSchema = Yup.object().shape({
    companyName: Yup.string().required('Company name is required'),
    position: Yup.string().required('Position is required'),
    startDate: Yup.date().required('Start date is required').nullable(),
    presentCompany: Yup.boolean().default(false),
    endDate: Yup.date()
        .when(['presentCompany'], {
            is: (presentCompany: boolean) => {
                return presentCompany === false;
            },
            then: Yup.date().required('End date is required').nullable(),
        })
        .nullable(),
    summary: Yup.string(),
    techStach: Yup.array(),
});


const AddNewCompanyForm = () => {
    const { _id = '', } = UseAppSelector(getUserState);

    const formik = useFormik({
        initialValues: {
            companyName: '',
            position: '',
            presentCompany: false,
            startDate: null,
            endDate: null,
            summary: '',
            techStack: [],
        },
        validationSchema: validationSchema,
        onSubmit: (val: any) => {
            console.log("experience ", JSON.stringify(val))
            const body = {
                userId: _id,
                ...val
            }
            PostData('/api/experience', JSON.stringify(body))

        },
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
                            <div className={cx(ErrorMessageClass)}>
                                <ErrorMessage name='companyName' />
                            </div>
                        </div>
                        <div className={cx(InputFieldContainer)}>
                            <label>Position*</label> <br />
                            <Field
                                className={cx(InputField)}
                                name='position'
                                placeholder='Position'
                            />
                            <div className={cx(ErrorMessageClass)}>
                                <ErrorMessage name='position' />
                            </div>
                        </div>
                        <div className={cx(InputFieldContainer)}>
                            <label>Start Date*</label> <br />
                            <CustomDatePicker name={'startDate'} />
                            <div className={cx(ErrorMessageClass)}>
                                <ErrorMessage name='startDate' />
                            </div>
                        </div>
                        <div className={cx(InputFieldContainer)}>
                            <label>End Date*</label> <br />
                            <CustomDatePicker name={'endDate'} disabled={values.presentCompany} />
                            <div className={cx(ErrorMessageClass)}>
                                <ErrorMessage name='endDate' />
                            </div>
                        </div>
                    </FieldGrid>
                    <div className={cx(InputFieldContainer)}>
                        <label>
                            <Field type='checkbox' name='presentCompany' />{' '}
                            <span>I currently work here</span>
                        </label>
                    </div>
                    <div className={cx(InputFieldContainer)}>
                        <label>Summary</label> <br />
                        <Field
                            as='textarea'
                            className={cx(InputField)}
                            name='summary'
                            placeholder='Summary'
                        />
                    </div>
                    <ButtonContainer>
                        <Button
                            type={ButtonType.PRIMARY}
                            label='Submit'
                            actionType='submit'
                        // onClick={uploadToServer}
                        />
                    </ButtonContainer>
                </Form>
            </FormikProvider>
        </FormContainer>
    );
};

export default AddNewCompanyForm;
