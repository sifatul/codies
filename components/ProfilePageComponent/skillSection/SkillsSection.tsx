import Styled from '@emotion/styled';
import React, { useCallback, useEffect } from 'react';
import { UseAppDispatch, UseAppSelector } from '../../../store';
import { getUserState } from '../../../store/user/basicInfo';
import { getSkillTags, setSkillTags } from '../../../store/user/experience';
import { GetData } from '../../../Utils/fetchData';
import AddBtn from '../AddBtn';
import EditButton from '../EditButton';
import SkillsSectionModal from './SkillsSectionModal';
import SkillTags from './SkillTags';

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
    const { _id = '', userInfo } = UseAppSelector(getUserState);
    const skillTags = UseAppSelector(getSkillTags);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const dispatch = UseAppDispatch();

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    const getData = useCallback(async () => {
        const requestId = userInfo?._id
        if (!requestId) return
        const res: any = await GetData('/api/skills?userId=' + requestId)
        console.log(res);
        const { data = [], status } = res || {};
        if (status == 201) {
            dispatch(setSkillTags(data))
        }
    }, [userInfo?._id]);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <Container>
            <SkillsSectionHeaderContainer>
                <SkillsSectionHeader>Skills</SkillsSectionHeader>
                <div>
                    {(skillTags || [])?.length > 0 && <EditButton onClick={openModal} />}
                    <SkillsSectionModal
                        openModal={openModal}
                        modalIsOpen={modalIsOpen}
                        closeModal={closeModal}
                        skillTags={skillTags as any}
                    />
                </div>
            </SkillsSectionHeaderContainer>
            {(skillTags || [])?.length > 0 && <SkillTags tags={skillTags as any} />}
            {(skillTags || [])?.length <= 0 && (
                <ContentContainer>
                    {_id && <AddBtn label='Add skills' onClick={openModal} />}
                    {!_id && <p>No data found</p>}
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
