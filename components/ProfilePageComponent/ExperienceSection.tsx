import React, { useEffect, useState } from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import SkillTags from './SkillTags';
import EditButton from './EditButton';
import ExperienceSectionModal from './ExperienceSectionModal';
import { GetData } from '../../Utils/fetchData';
import { UseAppSelector } from '../../store';
import { getUserState } from '../../store/user/basicInfo';
import { DateString } from '../../Utils/timFormat';

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
    useEffect(() => {
        GetData('/api/experience?userId=' + _id).then((output: any) => {
            const { data = [], status } = output
            if (status == 201) setExperiences(data)
        })

    }, [])
    return (
        <Container>
            <ExperienceSectionHeaderContainer>
                <ExperienceSectionHeader>Experience</ExperienceSectionHeader>
                <div>
                    <EditButton onClick={openModal} />
                    <ExperienceSectionModal
                        openModal={openModal}
                        modalIsOpen={modalIsOpen}
                        closeModal={closeModal}
                    />
                </div>
            </ExperienceSectionHeaderContainer>

            {experiences.map(experience => {
                const { companyName = '', _id, position, startDate, summary, isPresentCompany, endDate } = experience
                const stateTime = DateString(startDate)
                const endTime = isPresentCompany ? 'ongoing' : DateString(endDate)

                return <div key={"experience" + _id}>
                    <ExperienceCards>
                        <ExperienceCardHeaderContainer>
                            <div>
                                <DesignationName>{position}</DesignationName>
                                <CompnayName>{companyName}</CompnayName>
                            </div>
                            <div>
                                <JobTimePeriod>{stateTime} - {endTime}</JobTimePeriod>
                            </div>
                        </ExperienceCardHeaderContainer>
                        <JobDescription>
                            {summary}
                        </JobDescription>
                    </ExperienceCards>
                    <SkillTags />
                </div>
            })}

        </Container>
    );
};

export default ExperienceSection;
