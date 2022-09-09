import React from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';

const SkillsTagContainer = Styled.div`
    padding: 8px 12px;
    display: flex;
    flex-wrap: wrap;
`;

const SkillTag = Styled.p`
    margin: 4px 5px;
    padding: 4px 8px;
    background-color: #e1e1e1;
    font-size: 14px;
    color: #73777B;
    border: 1px solid gray;
    border-radius: 4px;
    font-weight: 500;
`;

const SkillTags = () => {
    return (
        <SkillsTagContainer>
            <SkillTag>Javascript</SkillTag>
            <SkillTag>Typescript</SkillTag>
            <SkillTag>Reactjs</SkillTag>
            <SkillTag>Nextjs</SkillTag>
            <SkillTag>Nestjs</SkillTag>
            <SkillTag>Jenkins</SkillTag>
            <SkillTag>Docker</SkillTag>
            <SkillTag>MySQL</SkillTag>
            <SkillTag>Git</SkillTag>
        </SkillsTagContainer>
    );
};

export default SkillTags;
