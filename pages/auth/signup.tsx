import React from 'react';
import { css, cx } from '@emotion/css';
import Button, { ButtonType } from '../../components/common/Button';
import SectionMetaInfo from '../../components/common/formSectionMetaInfo';
import Input, { InputType } from '../../components/common/Input';

const SectionContainer = css`
    display: flex;
`;

const FormSection = css`
    width: 821px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 60px 0;
`;

const SocialBtnContainer = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 24px 0;
    margin: 35px 0;
`;

const FormWrap = css`
    width: 488px;
    position: relative;
`;

const Divider = css`
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

const DividerText = css`
    background: white;
    display: inline-block;
    padding: 5px 20px;
    z-index: 99;
`;

const MultipleInput = css`
    display: flex;
    gap: 0 16px;
`;

const RowGap = css`
    margin-top: 30px;
`;

const FlexItem = css`
    display: flex;
`;

const JustifyCenter = css`
    justify-content: center;
`;

const CheckboxContainer = css`
    display: flex;
`;

const ColoredLink = css`
    color: #2255F7;
    margin: 0 5px 0 5px;
`;

const ImageContainer = css`
    background: url(https://images.unsplash.com/photo-1551739440-5dd934d3a94a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80);
    background-size: cover;
    background-repeat: no-repeat;
    width: calc(100% - 821px);
`;

const SignupPage: React.FC<{}> = () => {
    return (
        <div className={cx(SectionContainer)}>
            <div className={cx(FormSection)}>
                <div className={cx(FormWrap)}>
                    <SectionMetaInfo
                        label="Let's partner up"
                        description="Let's level up your digital profile, together."
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
                        <div className={cx(MultipleInput)}>
                            <Input label='First Name' placeholder='First name' />
                            <Input label='Last Name' placeholder='Last name' />
                        </div>
                        <div className={cx(RowGap)}>
                            <Input label='Email' placeholder='Enter your email' />
                        </div>
                        <div className={cx(RowGap)}>
                            <Input
                                label='Password'
                                placeholder='Password'
                                type={InputType.PASSWORD}
                            />
                        </div>
                        <div className={cx([RowGap, FlexItem])}>
                            <div className={cx([CheckboxContainer])}>
                                <Input label='agree' type={InputType.CHECKBOX} />
                            </div>
                            <label htmlFor='agreeToTerms'>I agree to the <span className={cx(ColoredLink)}> Terms and conditions </span> and <span className={cx(ColoredLink)}> Privacy policy</span></label>
                        </div>
                        <div className={cx([RowGap])}>
                            <Button type={ButtonType.PRIMARY} label="Create your account"/>
                        </div>
                        <div className={cx([RowGap, FlexItem, JustifyCenter])}>
                            <Button type={ButtonType.GHOST} label="Already a member?" labelWithLink='Login' />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx(ImageContainer)} />
        </div>
    );
};

export default SignupPage;
