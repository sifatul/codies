import Styled from '@emotion/styled';
import Image from 'next/image';
import Button, { ButtonType } from '../../components/common/Button';
import SectionMetaInfo from '../../components/common/formSectionMetaInfo';
import Input from '../../components/common/Input';

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

const RememberFlexStyled = Styled.div`
    display: flex;

`;
const myLoader = ({ src, width, quality }) => {
    return `https://source.unsplash.com/random/?${src}?w=${width}&q=${quality || 100}`;
};

const ForgotPassPage = () => {
    return (
        <FlexContainerStyled>
            <FlexItemStyled>
                <Image alt='' loader={myLoader} src='developer,office' width={1024} height={1024} />
            </FlexItemStyled>
            <FlexItemStyled>
                <ForgotItemsStyled>
                    <SectionMetaInfo
                        label='Forgot password?'
                        description='Insert your email to receive the reset link'
                    />
                    <InputStyled name='email' />
                    <Button type={ButtonType.PRIMARY} label='Send Reset Link' />
                    <RememberFlexStyled>
                         <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type={ButtonType.GHOST}
                            label="Remember your password?"
                            labelWithLink='Login Now'
                        />
                    </div>
                    </RememberFlexStyled>
                </ForgotItemsStyled>
            </FlexItemStyled>
        </FlexContainerStyled>
    );
};

export default ForgotPassPage;
