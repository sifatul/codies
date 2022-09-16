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
import checkUserInfo from '../../../Hooks/checkUser.hook';
import { UseAppDispatch } from '../../../store';
import { setUserInfo } from '../../../store/user/basicInfo';

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
    const { platform, token, email, fullName = '', profilePic = '' } = router.query
    const { getUserByName } = checkUserInfo()
    const dispatch = UseAppDispatch();


    const SigninSchema = Yup.object().shape({
        userName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .matches(/^\S*$/, "username must not contain space.")
            .matches(/^[a-zA-Z0-9]*$/, "must not contain any special character")
            .required('UserName required'),
    });



    const socailSignup = useCallback(async (userName: any) => {
        try {
            if (!platform || !token || !userName) {
                alert("params missing")
            }
            const data = { platform, token, userName, email, fullName, profilePic }

            const body = JSON.stringify(data)

            const res: any = await PostData(`/api/auth/social`, body)
            if (res?.status == 200) {
                dispatch(setUserInfo(res))
                router.push(`/account/profile?username=${res?.userName}`)
                return
            }
            throw res?.message
        } catch (e) {
            console.error(e)
            alert(JSON.stringify(e))
            return window.location.href = `/auth/signin`
        }
    }, [platform, token])

    const formik: any = useFormik({
        initialValues: {
            userName: ''
        },
        validationSchema: SigninSchema,
        onSubmit: async (val) => {

            const username = val.userName
            const userInfo: any = getUserByName(username)
            if (userInfo && userInfo?.status == 200) return formik.setErrors({ userName: "Username already exists." })
            socailSignup(username)
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
