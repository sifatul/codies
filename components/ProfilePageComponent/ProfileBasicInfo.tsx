import React from 'react';
import Styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot, faPhone, faShield } from '@fortawesome/free-solid-svg-icons';
import { UseAppSelector } from '../../store';
import { getUserState } from '../../store/user/basicInfo';
import EditButton from './EditButton';
import ProfileHeaderModal from './profileHeaderSection/profileHeaderModal';

const Container = Styled.div`
    width: 100%;
    padding: 40px;
`;
const HeaderContainer = Styled.div`
    background-color: #fcba03;
    height: 10vh;
    width: 100%;
`;

const UserProfilePic = Styled.img`
    height: 96px;
    width: 96px;
    margin-left: 48px;
    border-radius: 50%;
    border: 2px solid rgb(255, 255, 255);
    margin-top: -20px;
    background-size: cover;
    background-position: center center;
    
`;

const UserInformationContainer = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-top: 20px;
`;

const UserNameContainer = Styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
`;

const UserNameParagraph = Styled.p`
    font-size: 42px;
    line-height: 1.15;
    font-weight: 600;
    color: inherit;
    margin: 0px;
`;

const UserDescriptionAndSocialContainer = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const UserDescriptionContainer = Styled.div`
    margin-right: auto;
    width: 50%;
`;

const UserDescriptionParagraph = Styled.p`
    font-size: 24px;
    line-height: 1.15;
    font-weight: 400;
    color: inherit;
    margin: 0px;
`;
const SocialIconContainer = Styled.div`
    width: 20%;
    display: flex;
    justify-content: center;
    gap: 10px;
`;

const UserLocationAndPhoneContainer = Styled.div`
    display: flex;
    gap: 8px 88px;
    margin-top: 5px;
`;

const UserLocation = Styled.div`
    align-items: center;
    color: #606c78;
    display: flex;
    gap: 4px;
`;
const UserPhone = Styled.div`
    align-items: center;
    display: flex;
    gap: 4px;
`;

const UserLocationAndPhoneParagraph = Styled.div`
    font-size: 16px;
    line-height: 1.15;
    font-weight: 400;
    color: inherit;
`;

const UserPrivacyNoteContainer = Styled.div`
    margin-bottom: -8px;
    background-color: rgb(223, 236, 249);
    border-radius: 4px;
    color: #1f2228;
    padding: 16px;
`;

const UserPrivacyNoteParagraphContainer = Styled.div`
    display: flex;
    // justify-content: center;
    align-items: center;
    gap: 12px;
`;

const PrivacyNoteParagraph = Styled.div`
    font-size: 14px;
    line-height: 1.35;
    font-weight: 600;
    color: inherit;
    margin: 0px;
`;
const PrivacyNoteDescriptionParagraph = Styled.div`
    font-size: 14px;
    line-height: 1.35;
    font-weight: 400;
    color: inherit;
    margin: 0px;
`;
const ProfileBasicInfo = () => {
    const userState = UseAppSelector(getUserState);
    const { profilePic = 'https://source.unsplash.com/6VPEOdpFNAs', fullName = '' } =
        userState?.userInfo || {};

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Container>
            <HeaderContainer />
            <UserProfilePic src={profilePic} />
            <UserInformationContainer>
                <UserNameContainer>
                    <UserNameParagraph>{fullName}</UserNameParagraph>
                    <div>
                        {userState?._id && <EditButton onClick={openModal} />}
                        <ProfileHeaderModal
                            modalIsOpen={modalIsOpen}
                            openModal={openModal}
                            closeModal={closeModal}
                        />
                    </div>
                </UserNameContainer>
                <UserDescriptionAndSocialContainer>
                    <UserDescriptionContainer>
                        <UserDescriptionParagraph>
                            Junior Full stack developer Focused on Frontend, Skilled in Javascript,
                            React and Node.Js
                        </UserDescriptionParagraph>
                    </UserDescriptionContainer>
                    <SocialIconContainer>
                        <FontAwesomeIcon icon={faGithubSquare} />
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </SocialIconContainer>
                </UserDescriptionAndSocialContainer>
                <UserLocationAndPhoneContainer>
                    <UserLocation>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <UserLocationAndPhoneParagraph>
                            Dhaka, Bangladesh
                        </UserLocationAndPhoneParagraph>
                    </UserLocation>
                    <UserPhone>
                        <FontAwesomeIcon icon={faPhone} />
                        <UserLocationAndPhoneParagraph>
                            +8801111222333
                        </UserLocationAndPhoneParagraph>
                    </UserPhone>
                </UserLocationAndPhoneContainer>
            </UserInformationContainer>
            <div style={{ margin: '16px 0px' }}></div>
            <UserPrivacyNoteContainer>
                <UserPrivacyNoteParagraphContainer>
                    <FontAwesomeIcon icon={faShield} />
                    <PrivacyNoteParagraph>Privacy note:</PrivacyNoteParagraph>
                    <PrivacyNoteDescriptionParagraph>
                        Specify which companies you had like to be hidden from here.
                    </PrivacyNoteDescriptionParagraph>
                </UserPrivacyNoteParagraphContainer>
            </UserPrivacyNoteContainer>
        </Container>
    );
};

export default ProfileBasicInfo;
