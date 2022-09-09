import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import DesiredRoles from '../../components/ProfilePageComponent/DesiredRoles';

const Container = Styled.div`
    margin: 0 auto;
    padding: 0 80px;
    min-height: 100vh;
`;

const ProfileHeader = Styled.div`
    background-color: #EAE509;
    padding: 20px;
    height: 300px;
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
        <Container>
            <ProfileHeader>profile and profile image</ProfileHeader>
            <ProfileDetailsContainer>
                <ProfileSummaryContainer>summary</ProfileSummaryContainer>
                <ProfileSkillsSection>
                    <DesiredRoles />
                </ProfileSkillsSection>
            </ProfileDetailsContainer>
        </Container>
    );
};

export default ProfilePage;
