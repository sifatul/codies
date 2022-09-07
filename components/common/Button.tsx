import Styled from '@emotion/styled';
import { css } from '@emotion/react';

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

const GhostBtnStyled = Styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #000000;
`;

const LinkWithColor = Styled.span`
    color: #2255f7;
    display: inline-block;
    margin-left: 5px;
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
}> = ({ label, type, labelWithLink, onClick }) => {
    if (type === ButtonType.GHOST) {
        return (
            <GhostBtnStyled>
                <span>{label}</span> <LinkWithColor onClick={onClick}>{labelWithLink}</LinkWithColor>
            </GhostBtnStyled>
        );
    }
    return <ButtonStyled>{label}</ButtonStyled>;
};

export default Button;
