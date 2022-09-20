import Styled from '@emotion/styled';
import { css, cx } from '@emotion/css';
import Image from 'next/image';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    line-height: 28px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #FFFFFF;
    border: none;
    cursor: pointer;
`;

const GhostBtnStyled = Styled(ButtonStyled)`
    display: flex;
    align-items: center;
    text-align: center;
    color: #000000;
    background: transparent;
    border: 2px solid #00A2F4;
`;

const SecondaryBtnStyled = Styled(ButtonStyled)`
    background: transparent;
    color: #3F4753;
    border: 1px solid #E7E8E9;
    font-weight: 400;
`;

const TertiaryButtonStyle = Styled(ButtonStyled)`
    display: flex;
    padding:0;
    align-items: center;
    text-align: center;
    color: #000000;
    background: transparent; 
`;

const LinkWithColor = Styled.span`
    color: #2255f7;
    display: inline-block;
    margin-left: 5px;
    cursor: pointer;
`;
const AddBtnStyled = Styled(SecondaryBtnStyled)`
  
    border: 1px solid #2255F7;
    color: #2255F7
`;

export enum ButtonType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    GHOST = 'ghost',
    ADD = 'add',
    TERTIARY = 'tertiary',
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
    if (type === ButtonType.ADD) {
        return <AddButton label={label} onClick={onClick} actionType={actionType} />;
    }
    if (type === ButtonType.TERTIARY) {
        return <TertiaryButton onClick={onClick} label={label} labelWithLink={labelWithLink} actionType={actionType} />;
    }

    return <ButtonStyled type={actionType} onClick={onClick}>{label}</ButtonStyled>;
};

export default Button;

const GhostBtn: React.FC<BtnProps> = ({ label, onClick, labelWithLink, icon, actionType }) => {
    return (
        <GhostBtnStyled type={actionType} onClick={onClick}>
            <span>{label}</span> <LinkWithColor >{labelWithLink}</LinkWithColor>
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

const AddButton: React.FC<BtnProps> = ({ label, onClick, actionType }) => {
    return (
        <AddBtnStyled type={actionType} onClick={onClick} >
            <FontAwesomeIcon icon={faPlus} />
            <span>{label}</span>
        </AddBtnStyled>
    );
};

const TertiaryButton: React.FC<BtnProps> = ({ label, onClick, labelWithLink, icon, actionType }) => {
    return (
        <TertiaryButtonStyle type={actionType} onClick={onClick}>
            <span>{label}</span> <LinkWithColor >{labelWithLink}</LinkWithColor>
        </TertiaryButtonStyle>
    );
};
