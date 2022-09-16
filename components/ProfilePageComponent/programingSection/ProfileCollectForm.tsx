import { css, cx } from '@emotion/css';
import Styled from '@emotion/styled';
import { ErrorMessage, Form, FormikProvider, useFormik } from 'formik';
import React, { useCallback } from 'react';
import * as Yup from 'yup';
import { UseAppDispatch, UseAppSelector } from '../../../store';
import { getUserState, setUserInfo } from '../../../store/user/basicInfo';
import { PatchData } from '../../../Utils/fetchData';
import Button, { ButtonType } from '../../common/Button';
import Input, { InputType } from '../../common/Input';


const Container = Styled.div`
    padding-bottom: 12px;
`;

const FromHeader = Styled.h3`
    font-weight: 600;
    font-size: 24px;
    margin: 0;
    padding-bottom: 12px;
    border-bottom: 1px solid #e1e1e1;
`;

const FormContainer = Styled.div`
    padding: 20px;
`;
const FormWrapper = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 60px;
`;

const InputFieldWrapper = css`
    width: 100%;
    display: block;
`;
const InputFieldWrapperInner = css`
    width: 100%; 
`;


const ErrorMessageClass = css`
    margin-top: 8px;
    color: red;
    font-weight: 300;
    font-size: 14px;
`;




const validationSchema = Yup.object().shape({
    github_url: Yup.string()
        .matches(/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/, 'incorrect github url!'),

    leetcode_url: Yup.string()
        .matches(/^(https?:\/\/)?(www\.)?leetcode\.com\/[a-zA-Z0-9_]{1,25}$/, 'incorrect leetcode url!'),
    hackerrank_url: Yup.string()
        .matches(/^(https?:\/\/)?(www\.)?hackerrank\.com\/[a-zA-Z0-9_]{1,25}$/, 'incorrect hackerrank url!'),

});

const ProfileCollectForm = (props: any) => {
    const { callback } = props

    const { _id = '', github_url, leetcode_url, hackerrank_url } = UseAppSelector(getUserState);
    const dispatch = UseAppDispatch();


    const updateUserInfo = useCallback(async (links: any) => {


        dispatch(setUserInfo(links))

        try {
            await PatchData(`/api/users/${_id}`, JSON.stringify(links))
            callback()
        } catch (e) {
            console.error(e)
        }

    }, [_id])


    const formik = useFormik({
        initialValues: {
            github_url: github_url || '',
            hackerrank_url: hackerrank_url || '',
            leetcode_url: leetcode_url || '',
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (val: any) => {

            updateUserInfo(val)

        },
    });
    // console.log("githubTopRepos: ", githubTopRepos)



    const { handleChange, errors, values, setFieldValue, resetForm } = formik;

    return (
        <Container >
            <FromHeader>Social platforms</FromHeader>
            <div>
                <h4>Build your profile right away</h4>
                <p>Infomations from the profiles will be used to create your digital profile </p>
            </div>
            <FormContainer>
                <FormikProvider value={formik}>
                    <Form>

                        <FormWrapper

                            className={cx(InputFieldWrapper)}
                        >

                            <div className={cx(InputFieldWrapperInner)} >

                                <Input

                                    type={InputType.TEXT}
                                    value={github_url || values.github_url}
                                    label='Github profile'
                                    placeholder='https://github.com/username'
                                    name='github_url'
                                    onChange={handleChange}

                                />
                                <div className={cx(ErrorMessageClass)}>
                                    <ErrorMessage name='github_url' />
                                </div>
                            </div>


                            <div className={cx(InputFieldWrapperInner)} >
                                <Input

                                    type={InputType.TEXT}
                                    value={values.leetcode_url}
                                    label='Leetcode profile'
                                    placeholder='https://leetcode.com/username'
                                    name='leetcode_url'
                                    onChange={handleChange}

                                />
                                <div className={cx(ErrorMessageClass)}>
                                    <ErrorMessage name='leetcode_url' />
                                </div>
                            </div>

                            <div className={cx(InputFieldWrapperInner)} >


                                <Input

                                    type={InputType.TEXT}
                                    value={values.hackerrank_url}
                                    label='Hackerrank profile'
                                    placeholder='https://www.hackerrank.com/username'
                                    name='hackerrank_url'
                                    onChange={handleChange}

                                />
                                <div className={cx(ErrorMessageClass)}>
                                    <ErrorMessage name='leetcode_url' />
                                </div>

                            </div>


                        </FormWrapper>
                        <Button
                            type={ButtonType.PRIMARY}
                            label='update profile'
                            actionType='submit'
                        />

                    </Form>

                </FormikProvider>
            </FormContainer>

        </Container>
    );
};

export default ProfileCollectForm;
