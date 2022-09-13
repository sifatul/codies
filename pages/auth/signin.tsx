import React from 'react';
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
    SocialBtnContainer,
    Divider,
    DividerText,
    RowGap,
    FlexItem,
    JustifyCenter,
    ImageContainer,
    CheckboxContainer,
} from './signup';

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
    const SigninSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        rememberMe: Yup.bool().oneOf([true], 'Remember me Terms is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: SigninSchema,
        onSubmit: (val) => {
            console.log(val);
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
                    <div className={cx(SocialBtnContainer)}>
                        <Button
                            type={ButtonType.SECONDARY}
                            label='Signup with Google'
                            icon='/images/auth/Google Logo.png'
                        />
                        <Button
                            type={ButtonType.SECONDARY}
                            label='Signup with Github'
                            icon='/images/auth/GitHub-Mark-ai 1.png'
                        />
                    </div>
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
