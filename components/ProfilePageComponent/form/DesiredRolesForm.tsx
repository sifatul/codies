import React from 'react';

import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';

const Container = Styled.div`
    padding-bottom: 12px;
`;

const DesiredRolesHeader = Styled.h3`
    font-weight: 600;
    font-size: 24px;
    margin: 0;
    padding-bottom: 12px;
    border-bottom: 1px solid #e1e1e1;
`;

const FormContainer = Styled.div`
    padding: 20px 0;
`;

const DesiredRolesForm = () => {
    return (
        <Container>
            <DesiredRolesHeader>Desired Roles</DesiredRolesHeader>
            <FormContainer>Comming soon ....</FormContainer>
        </Container>
    );
};

export default DesiredRolesForm;
