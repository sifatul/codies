import { css, cx } from '@emotion/css';
import Styled from '@emotion/styled';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import React, { useCallback } from 'react';
import * as Yup from 'yup';
import { UseAppDispatch, UseAppSelector } from '../../../store';
import { getUserState } from '../../../store/user/basicInfo';
import { deleteExperience, getExperiences, updateExperience } from '../../../store/user/experience';
import { DeleteData, PutData } from '../../../Utils/fetchData';
import Button, { ButtonType } from "../../common/Button";
import CustomDatePicker from '../../form/FormField/CustomDatePicker';
import { validationSchema } from "./AddNewCompanyForm"
const FormContainer = Styled.div`
    padding: 20px;
    // border: 1px solid #e1e1e1;
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
    gap: 10px;
`;

const ErrorMessageClass = css`
    margin-top: 8px;
    color: red;
    font-weight: 300;
    font-size: 14px;
`;
const ButtonWrapper = Styled.div`
flex-basis: 40%
`;




const EditExperienceForm = (props: any) => {
    const { data = {}, closeModal } = props
    const { companyName = '',
        position = '',
        presentCompany = false,
        startDate = null,
        endDate = null,
        summary = '',
        techStack = [],
        _id = ''
    } = data
    const { _id: userId } = UseAppSelector(getUserState);
    const dispatch = UseAppDispatch();



    const handleDelete = useCallback(async () => {
        const res: any = await DeleteData('/api/experience?_id=' + _id)
        console.log(res)
        if (res?.status == 201) {
            alert('deleted')
            dispatch(deleteExperience(_id))
        } else {
            alert(JSON.stringify(res))
        }
        closeModal()

    }, [_id])

    const EditExperience = useCallback(async (val: any) => {

        console.log("experience ", JSON.stringify(val))
        const body = {
            userId,
            ...val,
            _id
        }
        const res: any = await PutData('/api/experience', JSON.stringify(body))
        if (res?.status == 201) {
            alert('updated')
            dispatch(updateExperience(body))
        }
        else {
            alert(JSON.stringify(res))
        }
        closeModal()

    }, [_id])

    const formik = useFormik({
        initialValues: {
            companyName: companyName,
            position,
            presentCompany,
            startDate: startDate ? new Date(startDate) : null,
            endDate: endDate ? new Date(endDate) : null,
            summary,
            techStack,
        },
        validationSchema: validationSchema,
        onSubmit: (val: any) => {
            EditExperience(val)

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
                        <ButtonWrapper>
                            <Button
                                type={ButtonType.PRIMARY}
                                label='Submit'
                                actionType='submit'
                            // onClick={uploadToServer}
                            />
                        </ButtonWrapper>

                        <ButtonWrapper>
                            <Button
                                type={ButtonType.GHOST}
                                label='Delete'
                                // actionType='submit'
                                onClick={handleDelete}
                            />
                        </ButtonWrapper>
                    </ButtonContainer>
                </Form>
            </FormikProvider>
        </FormContainer>
    );
};

export default EditExperienceForm;
