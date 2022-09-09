import React from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';

const Container = Styled.div`
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 12px;
`

const DesiredRolesContainer = Styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const DesiredRolesHeaderContainer = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
    padding: 8px 12px;
`;

const EditButton = Styled.button`
    padding: 2px 16px;
    line-height: 18px; 
`;

const DesiredRolesHeader = Styled.h3`
    font-weight: 600;
    font-size: 24px;
    margin: 0;
`;

const RoleName = Styled.p`
    font-weight: 500;
    font-size: 16px;
    margin: 0;
    margin-bottom: 8px;
`;

const Experience = Styled.p`
    font-weight: 300;
    font-size: 16px;
    margin: 0;
    margin-bottom: 8px;
`;

const RolesContainer = Styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
`;

const DesiredRoles = () => {
    return (
        <Container>
            <DesiredRolesHeaderContainer>
                <DesiredRolesHeader>Desired Roles</DesiredRolesHeader>
                <EditButton>Edit</EditButton>
            </DesiredRolesHeaderContainer>
            <DesiredRolesContainer>
                <RolesContainer>
                    <RoleName>Frontend Engineer</RoleName>
                    <Experience>2 years</Experience>
                </RolesContainer>
                <RolesContainer>
                    <RoleName>Backend Engineer</RoleName>
                    <Experience>2 years</Experience>
                </RolesContainer>
                <RolesContainer>
                    <RoleName>Fullstack Engineer</RoleName>
                    <Experience>2 years</Experience>
                </RolesContainer>
            </DesiredRolesContainer>
            <RolesContainer>
                <RoleName>Overall Experience</RoleName>
                <Experience>2 ~ 4 years</Experience>
            </RolesContainer>
        </Container>
    );
};

export default DesiredRoles;
