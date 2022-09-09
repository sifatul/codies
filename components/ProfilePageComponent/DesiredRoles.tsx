import React from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';

const DesiredRolesContainer = Styled.div`
    display: flex;
`;

const RolesContainer = Styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;
`;

const DesiredRoles = () => {
    return (
        <DesiredRolesContainer>
            <RolesContainer>
                <p>Frontend Engineer</p>
                <p>2 years</p>
            </RolesContainer>
            <RolesContainer>
                <p>Backend Engineer</p>
                <p>2 years</p>
            </RolesContainer>
        </DesiredRolesContainer>
    );
};

export default DesiredRoles;
