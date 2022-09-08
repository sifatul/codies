import { useState } from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import OtpInput from 'react-otp-input';
import Image from 'next/image';
import Button, { ButtonType } from '../../components/common/Button';
import SectionMetaInfo from '../../components/common/formSectionMetaInfo';

const FlexContainer = Styled.div`
    display: flex;
    min-height: 100vh;
`;

const FlexItemLeft = Styled.div`
    width: 821px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FlexItemRight = Styled.div`
    background: #F3F3F4;
    width: calc(100% - 821px);
    display: flex;
    align-items: center;
    position: relative;
`;

const BackgroundImg = Styled.div`
    width: 626px;
    position: absolute;
    left: -59px;
`;

const OtpInputClass = css`
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
`;

const OtpContainerClass = css`
    display: flex;
    gap: 8px;
    margin: 40px 0;
    justify-content: center;
`;

const OtpErrorClass = css`
    border: 1px solid red;
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
                    <OtpInput
                        value={otp}
                        onChange={handleOtpChange}
                        numInputs={4}
                        hasErrored={false}
                        errorStyle={cx(OtpErrorClass)}
                        inputStyle={cx(OtpInputClass)}
                        containerStyle={cx(OtpContainerClass)}
                        isInputNum={true}
                    />
                    <Button type={ButtonType.PRIMARY} label='Verify Email' />
                    <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type={ButtonType.GHOST}
                            label="Didn't get the code?"
                            labelWithLink='Resend'
                        />
                    </div>
                </div>
            </FlexItemLeft>
            <FlexItemRight>
                <BackgroundImg>
                    <Image
                        alt='avata-icon'
                        width={625}
                        height={611}
                        src='/images/auth/otp-avatar.png'
                        layout='responsive'
                    />
                </BackgroundImg>
            </FlexItemRight>
        </FlexContainer>
    );
};

export default VerifyEmailPage;
