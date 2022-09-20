import Styled from '@emotion/styled';
import React from 'react';
import DesiredRoles from '../components/ProfilePageComponent/DesiredRoles';
import ExperienceSection from '../components/ProfilePageComponent/experienceSection';
import ProfileBasicInfo from '../components/ProfilePageComponent/ProfileBasicInfo';
import SideBar from '../components/ProfilePageComponent/Sidebar';
import SkillsSection from '../components/ProfilePageComponent/skillSection/SkillsSection';



const ProfileHeader = Styled.div`
    height: auto;
    margin-top: 40px;
`;
const ProfileDetailsContainer = Styled.div`
    display: grid;
    grid-template-columns: 2fr 4fr;
    margin-top: 20px;

`;


const ProfileSummaryContainer = Styled.div`
   padding: 30px;
`;

const ProfileSkillsSection = Styled.div`
    padding: 30px;
`;

const ProfilePage: React.FC = () => {


    return (
        <>

            <ProfileHeader>
                <ProfileBasicInfo />
            </ProfileHeader>
            <ProfileDetailsContainer>
                <ProfileSummaryContainer>
                    <SideBar />
                </ProfileSummaryContainer>
                <ProfileSkillsSection>
                    <DesiredRoles />
                    <SkillsSection />
                    <ExperienceSection />
                </ProfileSkillsSection>
            </ProfileDetailsContainer>
        </>

    );
};

export default ProfilePage;
