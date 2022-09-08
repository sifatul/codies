import Styled from '@emotion/styled';
import imageUrl from '../../public/assets/img/Bitmap.png';
import Image from 'next/image';

const FlexContainerStyled = Styled.div`
    display: flex;
`;

const FlexItemStyled = Styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ForgotItemsStyled = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`;

const TitleStyled = Styled.h2`
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 52px;

    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 16px;
    color: #0F1928;
`;
const DescriptionStyled = Styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;

    display: flex;
    align-items: center;
    text-align: center;
    color: #3F4753;
    margin-bottom: 48px;
`;

const InputStyled = Styled.input`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 14px 24px;
    gap: 10px;
    background: #FFFFFF;
    border: 1px solid #2255F7;
    border-radius: 8px;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    margin-bottom: 48px;
`;

const ButtonStyled = Styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;
    gap: 8px;

    width: 480px;
    height: 56px;

    background: #2255F7;
    border-radius: 8px;
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #FFFFFF;
    border: none;
    cursor: pointer;
`;

const RememberFlexStyled = Styled.div`
    display: flex;

`;
const RememberDescStyled = Styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #000000;
    margin: 5px;
`;
const LoginStyled = Styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #2255F7;
`;
const ForgotPassPage = () => {
    return (
        <FlexContainerStyled>
            <FlexItemStyled>
                <Image alt='' src={imageUrl} />
            </FlexItemStyled>
            <FlexItemStyled>
                <ForgotItemsStyled>
                    <TitleStyled>Forgot password?</TitleStyled>
                    <DescriptionStyled>
                        Insert your email to receive the reset link
                    </DescriptionStyled>
                    <InputStyled name='email' />
                    <ButtonStyled>Send Reset Link</ButtonStyled>
                    <RememberFlexStyled>
                        <RememberDescStyled>Remember your password?</RememberDescStyled>
                        <LoginStyled>Login Now</LoginStyled>
                    </RememberFlexStyled>
                </ForgotItemsStyled>
            </FlexItemStyled>
        </FlexContainerStyled>
    );
};

export default ForgotPassPage;
