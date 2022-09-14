import { css, cx } from '@emotion/css';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useCallback } from 'react';
import * as Yup from 'yup';
import Button, { ButtonType } from '../../../components/common/Button';
import SectionMetaInfo from '../../../components/common/formSectionMetaInfo';
import Input from '../../../components/common/Input';
import { useRouter } from 'next/router';

import {
    FormSection,
    FormWrap, ImageContainer, RowGap, SectionContainer
} from '../signup';
import { PostData } from '../../../Utils/fetchData';

const JustifySpaceBetween = css`
    justify-content: space-between;
`;

const ColorGray = css`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;

    display: flex;
    align-items: center;
    text-align: right;
    color: #3F4753;
`;

const SocialSignup: React.FC = () => {
    const router = useRouter()
    const { platform, token } = router.query

    const SigninSchema = Yup.object().shape({
        userName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .trim().matches(/^\S*$/, "username must not contain space.")
            .required('UserName required')
    });



    const socailSignup = useCallback(async ({ userName }: any) => {
        try {
            const body = JSON.stringify({ platform, token, userName })
            if (!platform || !token || !userName) {
                alert("params missing")
            }
            const res: any = await PostData(`/api/auth/social`, body)
            if (res?.status == 200) return window.location.href = `/account/profile`
            throw res?.message
        } catch (e) {
            console.error(e)
            alert(JSON.stringify(e))
            return window.location.href = `/auth/signin`
        }
    }, [platform, token])

    const formik = useFormik({
        initialValues: {
            userName: ''
        },
        validationSchema: SigninSchema,
        onSubmit: (val) => {
            console.log(val);
            socailSignup(val)
        },
    });

    const { handleChange, values, errors } = formik;

    return (
        <div className={cx(SectionContainer)}>
            <div className={cx(FormSection)}>
                <div className={cx(FormWrap)}>
                    <SectionMetaInfo
                        label="Let's add a user name"
                        description='User name would create the personalized profile.'
                    />

                    <div>
                        <FormikProvider value={formik}>
                            <Form>
                                <div className={cx(RowGap)}>
                                    <Input
                                        label='User Name'
                                        placeholder='User name'
                                        name='userName'
                                        value={values.userName}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        errorMessage={errors.userName}
                                    />
                                </div>


                                <div className={cx([RowGap])}>
                                    <Button
                                        type={ButtonType.PRIMARY}
                                        label='Go to Profile'
                                        actionType='submit'
                                    />
                                </div>

                            </Form>
                        </FormikProvider>
                    </div>
                </div>
            </div>
            <div className={cx(ImageContainer)} />
        </div>
    );
};

export default SocialSignup;
