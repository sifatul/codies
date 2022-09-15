import React, { useCallback, useMemo } from 'react';
import { css, cx } from '@emotion/css';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import SectionMetaInfo from '../../components/common/formSectionMetaInfo';
import Input, { InputType } from '../../components/common/Input';
import Button, { ButtonType } from '../../components/common/Button';
import {
    SectionContainer,
    FormSection,
    FormWrap,
    Divider,
    DividerText,
    RowGap,
    FlexItem,
    JustifyCenter,
    ImageContainer,
    CheckboxContainer,
} from './signup';
import SocialAuthComponent from '../../components/auth/social';
import { useRouter } from 'next/router';
import { GetData, PostData } from '../../Utils/fetchData';

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

const SigninPage: React.FC = () => {



    const router = useRouter()
    const goToSignup = useCallback(() => {
        router.push('/auth/signup')
    }, [])
    const userSignin = useCallback(async (param: { email: string, password: string }) => {

        try {
            const res: any = await GetData(`/api/auth/login?email=${param.email}&password=${param.password}`);
            if (res.status == 200) return router.push('/account/profile')
            if (res.status == 401) return router.push('/auth/verify-email?email=' + param?.email);
            else throw res?.message
        } catch (e) {
            console.error(e);
            alert(JSON.stringify(e))

        }


    }, [])


    const SigninSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(40, 'Password must not exceed 40 characters'),
        // rememberMe: Yup.bool().oneOf([true], 'Remember me Terms is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: SigninSchema,
        onSubmit: (val) => {
            console.log("login val", val);
            const { email, password } = val;
            userSignin({ email, password })
        },
    });

    const { handleChange, values, errors } = formik;

    return (
        <div className={cx(SectionContainer)}>
            <div className={cx(FormSection)}>
                <div className={cx(FormWrap)}>
                    <SectionMetaInfo
                        label='Login to your Account'
                        description='Your own Digital Profile'
                    />

                    <SocialAuthComponent />
                    <div className={cx(Divider)}>
                        <span className={cx(DividerText)}>or</span>
                    </div>
                    <div>
                        <FormikProvider value={formik}>
                            <Form>
                                <div className={cx(RowGap)}>
                                    <Input
                                        label='Email'
                                        placeholder='Email or User name'
                                        type={InputType.TEXT}
                                        name='email'
                                        value={values.email}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                </div>
                                <div className={cx(RowGap)}>
                                    <Input
                                        label='Password'
                                        placeholder='Password'
                                        type={InputType.PASSWORD}
                                        name='password'
                                        value={values.password}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                </div>
                                <div className={cx([RowGap, FlexItem, JustifySpaceBetween])}>
                                    <div className={cx([FlexItem])}>
                                        <div className={cx([CheckboxContainer])}>
                                            <Input
                                                label='agree'
                                                type={InputType.CHECKBOX}
                                                name='rememberMe'
                                                id='rememberMe'
                                                value={values.rememberMe}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                }}
                                            />
                                        </div>
                                        <label htmlFor='rememberMe' className={cx(ColorGray)}>Remember me</label>
                                    </div>
                                    <div>
                                        <label htmlFor='rememberMe' className={cx(ColorGray)}>Forgot Password?</label>
                                    </div>
                                </div>
                                <div className={cx([RowGap])}>
                                    <Button
                                        type={ButtonType.PRIMARY}
                                        label='Login to Your Account'
                                        actionType='submit'
                                    />
                                </div>
                                <div className={cx([RowGap, FlexItem, JustifyCenter])}>
                                    <Button
                                        type={ButtonType.GHOST}
                                        label='Not a member yet? '
                                        labelWithLink='Register Now'
                                        actionType='button'
                                        onClick={goToSignup}
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

export default SigninPage;
