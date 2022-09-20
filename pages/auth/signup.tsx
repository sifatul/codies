import Lottie from 'react-lottie';
import { css, cx } from '@emotion/css';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import SocialAuthComponent from '../../components/auth/social';
import Button, { ButtonType } from '../../components/common/Button';
import SectionMetaInfo from '../../components/common/formSectionMetaInfo';
import Input, { InputType } from '../../components/common/Input';
import checkUserInfo from '../../Hooks/checkUser.hook';
import FirebaseLoginManage from '../../Hooks/socailLogin';
import { PostData } from '../../Utils/fetchData';
import loadingAnimation from '../../animation/loadingAnimation.json';
import successAnimation from '../../animation/successAnimation.json';

export const SectionContainer = css`
    display: flex;
`;

export const FormSection = css`
    width: 821px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 60px 0;
`;

export const FormWrap = css`
    width: 488px;
    position: relative;
`;

export const Divider = css`
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 34px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #3f4753;
    justify-content: center;
    background: #fff;
    padding: 10px 30px;
    &:before {
        height: 1px;
        background: #cfd1d4;
        content: '';
        width: 100%;
        position: absolute;
    }
`;

export const DividerText = css`
    background: white;
    display: inline-block;
    padding: 5px 20px;
    z-index: 99;
`;

export const RowGap = css`
    margin-top: 30px;
`;

export const FlexItem = css`
    display: flex;
`;

export const JustifyCenter = css`
    justify-content: center;
`;

export const CheckboxContainer = css`
    display: flex;
`;

const ColoredLink = css`
    color: #2255f7;
`;

export const ImageContainer = css`
    background: url(https://images.unsplash.com/photo-1551739440-5dd934d3a94a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80);
    background-size: cover;
    background-repeat: no-repeat;
    width: calc(100% - 550px);
`;
const errorMessage = css`
    color: #f04848;
    padding-top: 4px;
    padding-bottom: 4px;
`;

enum StatusType {
    SUCCESS = 'success',
    IDEL = 'idel',
    ERROR = 'error',
}

const SignupPage: React.FC<{}> = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [signupStatus, setSignupStatus] = useState({
        status: StatusType.IDEL,
        message: '',
    });
    const { getUserByName, getUserByEmail } = checkUserInfo();
    const { createEmailAndPasswordUser } = FirebaseLoginManage();
    const [showEmailForm, setShowEmailForm] = useState(false);

    const goToSignin = useCallback(() => {
        router.push('/auth/signin');
    }, []);

    const SignupSchema = Yup.object().shape({
        userName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .matches(/^\S*$/, 'username must not contain space.')
            .matches(/^[a-zA-Z0-9]*$/, 'must not contain any special character')
            .required('UserName required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(40, 'Password must not exceed 40 characters'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
    });

    const createNewUser = useCallback(
        async (newUser: { userName: string; email: string; password: string }) => {
            const analytics = getAnalytics();

            try {
                const res: any = await PostData('/api/users/add', JSON.stringify(newUser));
                // console.log(res);
                if (res.status !== 200) throw res?.message;
                if (!res?.email) throw 'email missing in response';
                createEmailAndPasswordUser(newUser.email, newUser.password);
                logEvent(analytics, `email verification sent`);
                setLoading(false);
                setSignupStatus({ status: StatusType.SUCCESS, message: 'Successfully done!' });
                //
            } catch (e) {
                console.error(e);
                alert(JSON.stringify(e));
                logEvent(analytics, `signup error`);
                setLoading(false);
                setSignupStatus({ status: StatusType.ERROR, message: 'Failed!' });
            }
        },
        []
    );

    const formik: any = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
            acceptTerms: false,
        },
        validationSchema: SignupSchema,
        onSubmit: async (val) => {
            setLoading(true);
            const userName = val.userName;
            const email = val.email;

            const [userNamePromise, emailPromise]: any = await Promise.allSettled([
                getUserByName(userName),
                getUserByEmail(email),
            ]);

            if (emailPromise?.value) return formik.setErrors({ email: 'Email already exists.' });
            if (userNamePromise?.value)
                return formik.setErrors({ userName: 'Username already exists.' });
            createNewUser({ userName, email, password: val.password });
        },
    });

    const defaultOptions = {
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    const { handleChange, errors, values, setFieldValue } = formik;

    return (
        <div className={cx(SectionContainer)}>
            <div className={cx(FormSection)}>
                <div className={cx(FormWrap)}>
                    <SectionMetaInfo
                        label="Let's partner up"
                        description="Let's level up your digital profile, together."
                    />
                    {!showEmailForm && (
                        <>
                            <SocialAuthComponent />
                            <div>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowEmailForm(true);
                                    }}
                                    type={ButtonType.SECONDARY}
                                    label='Signup with Email'
                                />
                            </div>
                        </>
                    )}

                    {loading && (
                        <Lottie
                            options={{
                                ...defaultOptions,
                                animationData: loadingAnimation,
                            }}
                            eventListeners={[
                                {
                                    eventName: 'complete',
                                    callback: () => console.log('the animation completed:'),
                                },
                            ]}
                            height={400}
                            width={400}
                        />
                    )}

                    {!loading && signupStatus.status === StatusType.SUCCESS && (
                        <Lottie
                            options={{
                                ...defaultOptions,
                                animationData: successAnimation,
                                loop: false,
                            }}
                            eventListeners={[
                                {
                                    eventName: 'complete',
                                    callback: () => {
                                        setSignupStatus({
                                            status: StatusType.IDEL,
                                            message: '',
                                        });
                                        router.push('/auth/verify-email?email=' + values?.email);
                                    },
                                },
                            ]}
                            height={400}
                            width={400}
                        />
                    )}

                    {showEmailForm && !loading && signupStatus.status === StatusType.IDEL && (
                        <>
                            {/* <div className={cx(Divider)}>
                                <span className={cx(DividerText)}>or</span>
                            </div> */}
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
                                        <div className={cx(RowGap)}>
                                            <Input
                                                label='Email'
                                                placeholder='Enter your email'
                                                name='email'
                                                value={values.email}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                }}
                                                errorMessage={errors.email}
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
                                        <div className={cx([RowGap, FlexItem])}>
                                            <div className={cx([CheckboxContainer])}>
                                                <Input
                                                    label='agree'
                                                    type={InputType.CHECKBOX}
                                                    name='acceptTerms'
                                                    value={values.acceptTerms}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                />
                                            </div>
                                            <label htmlFor='agreeToTerms'>
                                                I agree to the
                                                <span className={cx(ColoredLink)}>
                                                    &nbsp;Terms and conditions&nbsp;
                                                </span>
                                                and{' '}
                                                <span className={cx(ColoredLink)}>
                                                    {' '}
                                                    Privacy policy
                                                </span>
                                            </label>
                                        </div>
                                        {errors.acceptTerms && (
                                            <div className={cx(errorMessage)}>
                                                <span>{errors.acceptTerms}</span>
                                            </div>
                                        )}
                                        <div className={cx([RowGap])}>
                                            <Button
                                                type={ButtonType.PRIMARY}
                                                label='Create your account'
                                                actionType='submit'
                                            />
                                        </div>
                                    </Form>
                                </FormikProvider>
                            </div>
                        </>
                    )}
                    {!loading && signupStatus.status === StatusType.IDEL && (
                        <div className={cx([FlexItem, JustifyCenter])}>
                            <Button
                                type={ButtonType.TERTIARY}
                                label='Already a member?'
                                labelWithLink='Login'
                                actionType='button'
                                onClick={goToSignin}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className={cx(ImageContainer)} />
        </div>
    );
};

export default SignupPage;
