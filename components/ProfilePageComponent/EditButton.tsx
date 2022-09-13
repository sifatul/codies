import React from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const EditBtn = Styled.button`
    padding: 2px 16px;
    line-height: 24px; 
    cursor: pointer;
    background: #fff;
    outline: none;
    border: 1px solid gray;
    border-radius: 4px;
    transition: all 0.2s ease-in-out;
    &:hover {
        box-shadow: 2px 2px 8px #888;
        border: 1px solid transparent;
    }
`;

interface EditButtonProps {
    onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
    return (
        <EditBtn onClick={() => onClick()}>
            <FontAwesomeIcon icon={faPenToSquare} />
        </EditBtn>
    );
};

export default EditButton;
