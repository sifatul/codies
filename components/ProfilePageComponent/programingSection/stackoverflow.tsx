import { css, cx } from '@emotion/css';
import Styled from '@emotion/styled';
import { faHackerrank, faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDomain, getLastPathname } from 'js-string-helper';
import React, { useEffect, useMemo, useState } from 'react';
import checkUserInfo from '../../../Hooks/checkUser.hook';
import { UseAppDispatch, UseAppSelector } from '../../../store';
import { getHackerRankUserInfo, hackerRankDataType, setHackerRankInfo } from '../../../store/platforms/hackerrank';
import { getUserState } from '../../../store/user/basicInfo';
import { Filter } from '../../../types/common.types';
import { GetData } from '../../../Utils/fetchData';
import CountList from "./countList";
import ProfileCollectModal from './profileCollectModal';



const Title = Styled.p`
  font-weight: 500;
  font-size: 16px;
  margin: 0;
  margin-bottom: 8px;
  width: 100%;
`;

export const iconClass = css`
    margin-left:10px;
    &:hover {
      cursor: pointer;
  }
`;

const ProgrammingSectionHeader = Styled.div`
    display: flex;
`
const Paragraph = Styled.p`
    font-weight: 300;
    font-size: 16px;
    margin: 0;
    margin-bottom: 0;
    display: flex;
    width: 100%;
    margin-bottom: 10px
`;

const Stackoverflowing = () => {
  const [showProfileLinkModal, setShowProfileLinkModal] = useState(false)
  const hackerrankUserInfo = UseAppSelector(getHackerRankUserInfo);


  const { userInfo, _id } = UseAppSelector(getUserState);
  const { profilePic } = userInfo || {}
  const stackoverflow_url = '';


  return <>
    <ProgrammingSectionHeader>
      <Title>Stackoverflowing</Title>

      <div className={cx(iconClass)} onClick={e => _id && setShowProfileLinkModal(true)}>
        <FontAwesomeIcon icon={faStackOverflow} size="xl" />
      </div>
    </ProgrammingSectionHeader>
    {!stackoverflow_url && <Paragraph > Upcoming. </Paragraph>}

    {/* <ProfileCollectModal

      openModal={() => setShowProfileLinkModal(true)}
      closeModal={() => setShowProfileLinkModal(false)}
      modalIsOpen={showProfileLinkModal}
    /> */}

  </>

}
export default Stackoverflowing