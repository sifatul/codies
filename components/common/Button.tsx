import Styled from '@emotion/styled';

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
    font-size: 16px;
    line-height: 24px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #FFFFFF;
    border: none;
    cursor: pointer;
`;

export enum ButtonType {
    PRIMARY = 'primary',
    GHOST = 'ghost',
}

const Button: React.FC<{
    label: string;
    type: ButtonType;
    labelWithLink?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ label, type, labelWithLink }) => {
    if (type === ButtonType.GHOST) {
        return (
            <div>
                <span>{label}</span> <span>{labelWithLink}</span>
            </div>
        );
    }
    return <ButtonStyled>{label}</ButtonStyled>;
};

export default Button;
