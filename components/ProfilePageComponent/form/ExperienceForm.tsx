import React from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import AddNewCompanyForm from './AddNewCompanyForm';

const Container = Styled.div`
    padding-bottom: 12px;
`;

const AddNewCompanySection = Styled.div`
    margin: 10px 0;
`;

const ExperienceForm = () => {
    return (
        <Container>
            <AddNewCompanySection>
                <AddNewCompanyForm />
            </AddNewCompanySection>
        </Container>
    );
};

export default ExperienceForm;
