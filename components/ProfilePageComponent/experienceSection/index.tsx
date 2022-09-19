import React, { useEffect, useState } from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import SkillTags from '../SkillTags';
import EditButton from '../EditButton';
import ExperienceSectionModal from './ExperienceSectionModal';
import { GetData } from '../../../Utils/fetchData';
import { UseAppSelector } from '../../../store';
import { getUserState } from '../../../store/user/basicInfo';
import { DateString } from '../../../Utils/timFormat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import experienceList from './experiencelist';
import ExperienceList from './experiencelist';
import Button, { ButtonType } from "../../common/Button"
import AddBtn from '../AddBtn';

const Container = Styled.div`
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 12px;
`;

const ExperienceSectionHeaderContainer = Styled.div`
    // display: flex;
    // justify-content: space-between;
    align-items: center;
    margin: 12px 0;
    padding: 8px 12px;
`;

const ExperienceSectionHeader = Styled.h3`
    font-weight: 600;
    font-size: 24px;
    margin: 0;
`;


const ExperienceSection = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const { _id = '', } = UseAppSelector(getUserState);
    const [experiences, setExperiences] = useState([])

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Container>
            <ExperienceSectionHeaderContainer>
                <ExperienceSectionHeader>Experience</ExperienceSectionHeader>
                <div>
                    <p>Your work will be shown here.</p>
                    <AddBtn onClick={openModal} />

                </div>
            </ExperienceSectionHeaderContainer>
            <ExperienceSectionModal
                openModal={openModal}
                closeModal={closeModal}
                modalIsOpen={modalIsOpen}

            />
            <ExperienceList />



        </Container>
    );
};

export default ExperienceSection;
