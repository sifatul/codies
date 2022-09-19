import Styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { UseAppDispatch, UseAppSelector } from '../../../store';
import { getUserState } from '../../../store/user/basicInfo';
import { setExperienceList } from '../../../store/user/experience';
import { GetData } from '../../../Utils/fetchData';
import AddBtn from '../AddBtn';
import ExperienceList from './experiencelist';
import ExperienceSectionModal from './ExperienceSectionModal';

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
    const dispatch = UseAppDispatch();


    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        if (!_id) return
        GetData('/api/experience?userId=' + _id).then((output: any) => {
            const { data = [], status } = output
            if (status == 201) {
                delete data?.status
                dispatch(setExperienceList(data))
            }
        })

    }, [_id])

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
