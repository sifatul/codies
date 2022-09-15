import React, { useState } from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import AddNewCompanyForm from './AddNewCompanyForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';

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

const ExperienceForm = () => {
    const [showAddNewCompany, setShowAddNewCompany] = useState(false);

    const handleShowForm = () => {
        setShowAddNewCompany(!showAddNewCompany);
    };
    return (
        <Container>
            <AddNewCompanySection>
                <div>
                    <ShowButton onClick={handleShowForm}>
                        {!showAddNewCompany ? (
                            <span>
                                <FontAwesomeIcon icon={faAdd} /> Add new company
                            </span>
                        ) : (
                            <span>
                                <FontAwesomeIcon icon={faMinus} /> Add new company
                            </span>
                        )}
                    </ShowButton>
                    {showAddNewCompany && <AddNewCompanyForm />}
                </div>
            </AddNewCompanySection>
        </Container>
    );
};

export default ExperienceForm;
