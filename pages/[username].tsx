import Styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import AlertDialog from '../components/common/TakeUserFeedback';
import DesiredRoles from '../components/ProfilePageComponent/DesiredRoles';
import ExperienceSection from '../components/ProfilePageComponent/experienceSection';
import ProfileBasicInfo from '../components/ProfilePageComponent/ProfileBasicInfo';
import SideBar from '../components/ProfilePageComponent/Sidebar';
import SkillsSection from '../components/ProfilePageComponent/skillSection/SkillsSection';
import checkUserInfo from '../Hooks/checkUser.hook';
import { UseAppDispatch, UseAppSelector } from '../store';
import { getUserState, setUserInfo } from '../store/user/basicInfo';



const ProfileHeader = Styled.div`
    height: auto;
    // margin-top: 40px;
`;
const ProfileDetailsContainer = Styled.div`
    display: grid;
    grid-template-columns: 2fr 4fr;
    margin-top: 20px;

    @media (max-width: 650px){
        grid-template-columns: unset;
    }

`;


const ProfileSummaryContainer = Styled.div`
   padding: 30px;
`;

const ProfileSkillsSection = Styled.div`
    padding: 30px;
`;

const ProfilePage: React.FC = () => {
    const router = useRouter()
    const { _id = '', userInfo } = UseAppSelector(getUserState);
    const { username } = router.query
    const { getUserByName } = checkUserInfo()
    const dispatch = UseAppDispatch();
    console.log("username: ", username)

    const getUserBySearchName = useCallback(async () => {
        console.log("username:12  ", username)

        const name = username?.toString() || ''
        const userInfo: any = await getUserByName(name)
        if (userInfo && userInfo?.status == 200) dispatch(setUserInfo(userInfo))

    }, [username])


    useEffect(() => {
        if (!_id && !userInfo?.userName) {
            // user is directly coming to the url
            getUserBySearchName()
        }


    }, [])


    return (
        <>
            <AlertDialog />
            <ProfileHeader>
                <ProfileBasicInfo />
            </ProfileHeader>
            <ProfileDetailsContainer>
                <ProfileSummaryContainer>
                    <SideBar />
                </ProfileSummaryContainer>
                <ProfileSkillsSection>
                    {/* <DesiredRoles /> */}
                    <SkillsSection />
                    <ExperienceSection />
                </ProfileSkillsSection>
            </ProfileDetailsContainer>
        </>

    );
};

export default ProfilePage;
