import React from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import SkillTags from './SkillTags';

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

const EditButton = Styled.button`
    padding: 2px 16px;
    line-height: 18px; 
`;

const SkillsSection = () => {
    return (
        <Container>
            <SkillsSectionHeaderContainer>
                <SkillsSectionHeader>Skills</SkillsSectionHeader>
                <EditButton>Edit</EditButton>
            </SkillsSectionHeaderContainer>
            <SkillTags />
        </Container>
    );
};

export default SkillsSection;
