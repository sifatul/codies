import React from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import SkillTags from './SkillTags';
import EditButton from './EditButton';
import SkillsSectionModal from './SkillsSectionModal';

const Container = Styled.div`
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 12px;
`;

const SkillsSectionHeaderContainer = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
    padding: 8px 12px;
`;

const SkillsSectionHeader = Styled.h3`
    font-weight: 600;
    font-size: 24px;
    margin: 0;
`;

const SkillsSection = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
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
            <SkillsSectionHeaderContainer>
                <SkillsSectionHeader>Skills</SkillsSectionHeader>
                <div>
                    <EditButton onClick={openModal} />
                    <SkillsSectionModal
                        openModal={openModal}
                        modalIsOpen={modalIsOpen}
                        closeModal={closeModal}
                    />
                </div>
            </SkillsSectionHeaderContainer>
            <SkillTags />
        </Container>
    );
};

export default SkillsSection;
