import React, { useCallback, useEffect, useState } from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import SkillTags from './SkillTags';
import EditButton from './EditButton';
import SkillsSectionModal from './SkillsSectionModal';
import AddBtn from './AddBtn';
import { UseAppSelector } from '../../store';
import { getUserState } from '../../store/user/basicInfo';
import { GetData } from '../../Utils/fetchData';

const Container = Styled.div`
    border-bottom: 1px solid #e1e1e1;
    padding: 12px;
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

const ContentContainer = Styled.div``;

const SkillsSection = () => {
    const { _id = '' } = UseAppSelector(getUserState);
    const [skillTags, setSkillTags] = useState<any>([]);
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

    const getData = useCallback(() => {
        GetData('/api/skills?userId=' + _id).then((res: any) => {
            console.log(res);
            const { data = [], status } = res;
            if (status == 201) setSkillTags(data);
        });
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

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
                        skillTags={skillTags as any}
                    />
                </div>
            </SkillsSectionHeaderContainer>
            {skillTags && skillTags?.length && <SkillTags tags={skillTags as any} />}
            {!skillTags && !skillTags.length && (
                <ContentContainer>
                    <AddBtn label='Add skills' onClick={openModal} />
                    <SkillsSectionModal
                        openModal={openModal}
                        modalIsOpen={modalIsOpen}
                        closeModal={closeModal}
                        skillTags={skillTags as any}
                    />
                </ContentContainer>
            )}
        </Container>
    );
};

export default SkillsSection;
