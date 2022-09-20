import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import Styled from '@emotion/styled';
import * as Yup from 'yup';
import { isPhoneNumber } from 'js-string-helper';
import { getPhoneNumberRegex } from '../../../helper/regex';

const FormContainer = Styled.div`
    padding: 20px;
`;

const validationSchema = Yup.object().shape({
    profileHeading: Yup.string(),
    phoneNumber: Yup.string()
        .matches(getPhoneNumberRegex, 'Not look like a phone number')
        .nullable(),
    designation: Yup.string(),
    country: Yup.string(),
    city: Yup.string(),
});

const ProfileSummaryForm = () => {
    const formik = useFormik({
        initialValues: {
            skillTag: '',
        },
        // validationSchema: validationSchema,
        onSubmit: (val: any) => {},
    });
    const { handleChange, errors, values, setFieldValue, resetForm } = formik;

    return (
        <FormContainer>
            <FormikProvider value={formik}></FormikProvider>
        </FormContainer>
    );
};

export default ProfileSummaryForm;
