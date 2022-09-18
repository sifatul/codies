import Styled from '@emotion/styled';
import { css, cx } from '@emotion/css';
import Image from 'next/image';

const ButtonStyled = Styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;
    gap: 8px;

    width: 100%;
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

const GhostBtnStyled = Styled.button`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #000000;
    background: transparent;
    border: none;
`;

const SecondaryBtnStyled = Styled(ButtonStyled)`
    background: transparent;
    color: #3F4753;
    border: 1px solid #E7E8E9;
    font-weight: 400;
`;

const LinkWithColor = Styled.span`
    color: #2255f7;
    display: inline-block;
    margin-left: 5px;
    cursor: pointer;
`;

export enum ButtonType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    GHOST = 'ghost',
}

interface BtnProps {
    label: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    labelWithLink?: string;
    icon?: string;
    actionType?: "button" | "submit" | "reset" | undefined
}

interface BtnInputProps extends BtnProps {
    type: ButtonType;
}


const Button: React.FC<BtnInputProps> = ({ label, type, labelWithLink, onClick, icon, actionType = 'button' }) => {
    if (type === ButtonType.GHOST) {
        return <GhostBtn onClick={onClick} label={label} labelWithLink={labelWithLink} actionType={actionType} />;
    }
    if (type === ButtonType.SECONDARY) {
        return <SecondaryButton label={label} onClick={onClick} icon={icon} actionType={actionType} />;
    }
    return <ButtonStyled type={actionType} onClick={onClick}>{label}</ButtonStyled>;
};

export default Button;

const GhostBtn: React.FC<BtnProps> = ({ label, onClick, labelWithLink, icon, actionType }) => {
    return (
        <GhostBtnStyled type={actionType}>
            <span>{label}</span> <LinkWithColor onClick={onClick}>{labelWithLink}</LinkWithColor>
        </GhostBtnStyled>
    );
};

const SecondaryButton: React.FC<BtnProps> = ({ label, onClick, icon = '', actionType }) => {
    return (
        <SecondaryBtnStyled type={actionType} onClick={onClick}>
            {icon && <Image alt='Social Icon' src={icon} width={24} height={24} />}
            <span>{label}</span>
        </SecondaryBtnStyled>
    );
};
