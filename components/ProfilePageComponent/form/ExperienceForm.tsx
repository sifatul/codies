import React, { useState } from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import AddNewCompanyForm from './AddNewCompanyForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';
import EditExperienceForm from './EditExperienceForm';

const Container = Styled.div`
    padding-bottom: 12px;
`;

const AddNewCompanySection = Styled.div`
    margin: 10px 0;
`;

const ShowButton = Styled.button`
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: #277BC0;
`;

const ExperienceForm = (props: { data: any, closeModal?: () => void }) => {
    const { data = null, closeModal } = props

    return (
        <Container>
            <AddNewCompanySection>
                <div>
                    {data && <EditExperienceForm {...props} />}
                    {!data && <AddNewCompanyForm closeModal={closeModal} />}
                </div>
            </AddNewCompanySection>
        </Container>
    );
};

export default ExperienceForm;
