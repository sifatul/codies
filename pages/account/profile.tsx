import Styled from '@emotion/styled';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from 'react';
import DesiredRoles from '../../components/ProfilePageComponent/DesiredRoles';
import ExperienceSection from '../../components/ProfilePageComponent/ExperienceSection';
import ProfileBasicInfo from '../../components/ProfilePageComponent/ProfileBasicInfo';
import SideBar from '../../components/ProfilePageComponent/Sidebar';
import SkillsSection from '../../components/ProfilePageComponent/SkillsSection';
import { UseAppDispatch, UseAppSelector } from '../../store';
import { getUserState, resetState } from '../../store/user/basicInfo';


const Container = Styled.div`
    margin: 0 auto;
    min-height: 100vh;
    max-width:1024px;
`;

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
    const router = useRouter()
    const { userName = '', _id } = UseAppSelector(getUserState);
    const dispatch = UseAppDispatch();


    useEffect(() => {
        if (!userName || !_id) router.replace('/auth/signin')
        router.push('/account/profile', `/${userName}`, { shallow: true })
    }, [])
    const logout = useCallback(() => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch(resetState())
            router.replace('/auth/signin')
        }).catch((error) => {
            // An error happened.
        });
    }, [])


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar  >
                        <div style={{ width: '100%', maxWidth: '1024px', margin: '0 auto', display: 'flex' }}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1, }}>
                                Codies
          </Typography>
                            <Button color="inherit" onClick={logout}>Logout</Button>
                        </div>


                    </Toolbar>
                </AppBar>
            </Box >

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
        </>
    );
};

export default ProfilePage;
