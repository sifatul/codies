import React from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import SkillTags from './SkillTags';

const Container = Styled.div`
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 12px;
`;

const ExperienceSectionHeaderContainer = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
    padding: 8px 12px;
`;

const ExperienceSectionHeader = Styled.h3`
    font-weight: 600;
    font-size: 24px;
    margin: 0;
`;

const EditButton = Styled.button`
    padding: 2px 16px;
    line-height: 18px; 
`;

const ExperienceCards = Styled.div`
    padding: 8px 12px;
`;

const ExperienceCardHeaderContainer = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
`;

const DesignationName = Styled.h4`
    font-weight: 500;
    font-size: 16px;
    margin: 0;
`;

const CompnayName = Styled.h4`
    font-weight: 300;
    font-size: 16px;
    margin: 0;
    margin-top: 8px;
`;

const JobTimePeriod = Styled.p`
    margin: 0;
    font-weight: 300;
`;

const JobDescription = Styled.p`
    margin: 16px 0;
    font-weight: 300;
`;

const ExperienceSection = () => {
    return (
        <Container>
            <ExperienceSectionHeaderContainer>
                <ExperienceSectionHeader>Experience</ExperienceSectionHeader>
                <EditButton>Edit</EditButton>
            </ExperienceSectionHeaderContainer>
            <ExperienceCards>
                <ExperienceCardHeaderContainer>
                    <div>
                        <DesignationName>Fullstack Developer</DesignationName>
                        <CompnayName>Teracomix</CompnayName>
                    </div>
                    <div>
                        <JobTimePeriod>January 2021 - ongoing</JobTimePeriod>
                    </div>
                </ExperienceCardHeaderContainer>
                <JobDescription>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum soluta quam,
                    libero sapiente omnis minima sed doloribus consectetur nihil. Explicabo cumque
                    voluptatem quaerat quis, aut saepe id velit porro ullam provident libero error
                    illo optio facilis qui illum omnis earum.
                </JobDescription>
            </ExperienceCards>
            <SkillTags />
        </Container>
    );
};

export default ExperienceSection;
