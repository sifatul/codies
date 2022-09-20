import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import Styled from '@emotion/styled';
import * as Yup from 'yup';
import { isPhoneNumber } from 'js-string-helper';
import { getPhoneNumberRegex } from '../../../helper/regex';
import { css, cx } from '@emotion/css';
import Button, { ButtonType } from '../../common/Button';
import { PatchData, PutData } from '../../../Utils/fetchData';
import { UseAppSelector } from '../../../store';
import { getUserState } from '../../../store/user/basicInfo';

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

const ErrorMessageClass = css`
    margin-top: 8px;
    color: red;
    font-weight: 300;
    font-size: 14px;
`;

const ButtonContainer = Styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Heading = Styled.h4`
    font-size: 24px;
    font-weight: 600;
`;

const validationSchema = Yup.object().shape({
    profileHeading: Yup.string(),
    phoneNumber: Yup.string().required(),
    designation: Yup.string(),
    country: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
});

const ProfileSummaryForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
    const { _id = '', userInfo } = UseAppSelector(getUserState);
    const {
        city = '',
        country = '',
        profileHeading = '',
        phoneNumber = '',
        designation = '',
    } = userInfo || {};

    const formik = useFormik({
        initialValues: {
            profileHeading: profileHeading || '',
            phoneNumber: phoneNumber || '',
            designation: designation || '',
            country: country || '',
            city: city || '',
        },
        validationSchema: validationSchema,
        onSubmit: async (val: any) => {
            const res: any = await PatchData('/api/users/' + _id, JSON.stringify(val));

            if (res?.status === 200) {
                alert('Successfully updated');
                resetForm();
                closeModal();
            } else {
                alert('Try again');
            }
        },
    });
    const { handleChange, errors, values, setFieldValue, resetForm } = formik;

    return (
        <FormContainer>
            <Heading>Profle Summary</Heading>
            <FormikProvider value={formik}>
                <Form>
                    <FieldGrid>
                        <div className={cx(InputFieldContainer)}>
                            <Field
                                className={cx(InputField)}
                                name='designation'
                                placeholder='Frontend Developer'
                            />
                            <div className={cx(ErrorMessageClass)}>
                                <ErrorMessage name='designation' />
                            </div>
                        </div>
                        <div className={cx(InputFieldContainer)}>
                            <Field
                                className={cx(InputField)}
                                name='phoneNumber'
                                placeholder='Phone number'
                            />
                            <div className={cx(ErrorMessageClass)}>
                                <ErrorMessage name='phoneNumber' />
                            </div>
                        </div>
                        <div className={cx(InputFieldContainer)}>
                            <Field
                                className={cx(InputField)}
                                name='country'
                                placeholder='Country'
                            />
                        </div>
                        <div className={cx(InputFieldContainer)}>
                            <Field className={cx(InputField)} name='city' placeholder='City' />
                        </div>
                    </FieldGrid>
                    <div className={cx(InputFieldContainer)}>
                        <Field
                            as='textarea'
                            className={cx(InputField)}
                            name='profileHeading'
                            placeholder='Profile Heading'
                        />
                        <div className={cx(ErrorMessageClass)}>
                            <ErrorMessage name='profileHeading' />
                        </div>
                    </div>
                    <ButtonContainer>
                        <Button
                            type={ButtonType.PRIMARY}
                            label='Save'
                            actionType='submit'
                            // onClick={uploadToServer}
                        />
                    </ButtonContainer>
                </Form>
            </FormikProvider>
        </FormContainer>
    );
};

export default ProfileSummaryForm;
