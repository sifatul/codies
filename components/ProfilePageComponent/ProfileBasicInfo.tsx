import React from 'react';
import Styled from '@emotion/styled';

const Container = Styled.div`
    width: 100%;
`;
const HeaderContainer = Styled.div`
    background-color: #fcba03;
    height: 10vh;
    width: 100%;
`;

const UserProfilePic = Styled.div`
    height: 96px;
    width: 96px;
    margin-left: 48px;
    border-radius: 50%;
    border: 2px solid rgb(255, 255, 255);
    margin-top: -20px;
    background-size: cover;
    background-position: center center;
    background-image: url("https://source.unsplash.com/6VPEOdpFNAs");
`;

const UserInformationContainer = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-left: 48px;
`;

const UserNameContainer = Styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
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
    align-items: center;
`;

const UserLocationAndPhoneContainer = Styled.div`
    display: flex;
    gap: 8px 88px;
    margin-top: 5px;
`;

const UserLocationAndPhone = Styled.div`
    display: flex;
    gap: 2px;
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
    margin: 0px 48px;
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
    return (
        <Container>
            <HeaderContainer />
            <UserProfilePic />
            <div
                style={{
                    margin: '0px 0px 8px',
                    height: '32px',
                }}
            ></div>
            <UserInformationContainer
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '12px',
                    marginLeft: '48px',
                }}
            >
                <UserNameContainer>
                    <UserNameParagraph>Muhammad Hussain</UserNameParagraph>
                </UserNameContainer>
                <UserDescriptionAndSocialContainer>
                    <UserDescriptionContainer>
                        <UserDescriptionParagraph>
                            Junior Full stack developer Focused on Frontend, Skilled in Javascript,
                            React and Node.Js
                        </UserDescriptionParagraph>
                    </UserDescriptionContainer>
                    <SocialIconContainer>
                        <img src='/icons/github.svg' alt='github' />
                        <img src='/icons/linkedin.svg' alt='linkedin' />
                    </SocialIconContainer>
                </UserDescriptionAndSocialContainer>
                <UserLocationAndPhoneContainer>
                    <UserLocationAndPhone>
                        <img src='/icons/location.svg' alt='location' width='24px' />
                        <UserLocationAndPhoneParagraph>
                            Dhaka, Bangladesh
                        </UserLocationAndPhoneParagraph>
                    </UserLocationAndPhone>
                    <UserLocationAndPhone>
                        <img src='/icons/phone.svg' alt='phone' width='24px' />
                        <UserLocationAndPhoneParagraph>
                            +8801111222333
                        </UserLocationAndPhoneParagraph>
                    </UserLocationAndPhone>
                </UserLocationAndPhoneContainer>
            </UserInformationContainer>
            <div style={{ margin: '16px 0px' }}></div>
            <UserPrivacyNoteContainer>
                <UserPrivacyNoteParagraphContainer>
                    <img src='/icons/security.svg' alt='phone' width='24px' />
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
