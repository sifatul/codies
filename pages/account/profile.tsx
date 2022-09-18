import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import DesiredRoles from '../../components/ProfilePageComponent/DesiredRoles';
import SkillsSection from '../../components/ProfilePageComponent/SkillsSection';
import ExperienceSection from '../../components/ProfilePageComponent/ExperienceSection';
import ProfileBasicInfo from '../../components/ProfilePageComponent/ProfileBasicInfo';
import SideBar from '../../components/ProfilePageComponent/Sidebar';
import { useEffect } from 'react';
import { useRouter } from "next/router";
import { UseAppSelector } from '../../store';
import { getUserState } from '../../store/user/basicInfo';


const Container = Styled.div`
    margin: 0 auto;
    padding: 0 80px;
    min-height: 100vh;
`;

const ProfileHeader = Styled.div`
    padding: 20px;
    height: auto;
    margin-top: 40px;
    padding: 48px;
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
    const router = useRouter()
    const { userName = '', _id } = UseAppSelector(getUserState);


    // useEffect(() => {
    //     if (!userName || !_id) router.replace('/auth/signin')
    //     router.push('/account/profile', `/${userName}`, { shallow: true })
    // }, [])


    return (
        <Container>
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
        </Container>
    );
};

export default ProfilePage;
