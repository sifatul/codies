import { useState } from 'react';
import Styled from '@emotion/styled';
import { ClassNames, css } from '@emotion/react';
import OtpInput from 'react-otp-input';
import Button from '../../components/common/Button';
import SectionMetaInfo from '../../components/common/formSectionMetaInfo';

const FlexContainer = Styled.div`
    display: flex;
    min-height: 100vh;
`;

const FlexItemLeft = Styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const VerifyEmailPage: React.FC = () => {
    const [otp, setOpt] = useState<string>();

    const handleOtpChange = (e: string) => {
        console.log(e);
        setOpt(e);
    };

    return (
        <FlexContainer>
            <FlexItemLeft>
                <div>
                    <SectionMetaInfo
                        label='Enter Code'
                        description='We sent OTP code to your email address'
                    />
                    <ClassNames>
                        {({ css }) => {
                            return (
                                <OtpInput
                                    value={otp}
                                    onChange={handleOtpChange}
                                    numInputs={4}
                                    hasErrored={false}
                                    errorStyle={{
                                        border: '1px solid red',
                                    }}
                                    inputStyle={css`
                                        width: 50px !important;
                                        height: 54px;
                                        padding: 11px 19px;
                                        color: #2255f7;
                                        border-radius: 4px;
                                        font-style: normal;
                                        font-weight: 400;
                                        font-size: 20px;
                                        line-height: 32px;
                                        background: #e9ebff;
                                        border: 1px solid transparent;
                                        &:focus {
                                            background: white;
                                            border: 1px solid #2255f7;
                                            outline: none;
                                        }
                                        &:not([value='']) {
                                            background: white;
                                            border: 1px solid #2255f7;
                                        }
                                    `}
                                    containerStyle={{
                                        display: 'flex',
                                        gap: '8px',
                                        margin: '40px 0',
                                        justifyContent: 'center',
                                    }}
                                    isInputNum={true}
                                />
                            );
                        }}
                    </ClassNames>
                    <Button label='Verify Email' />
                </div>
            </FlexItemLeft>
        </FlexContainer>
    );
};

export default VerifyEmailPage;
