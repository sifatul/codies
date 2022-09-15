import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Styled from '@emotion/styled';
import { css, cx } from '@emotion/css';
import React, { useState } from 'react';
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
const GithubProgramming = () => {
  const [showProfileLinkModal, setShowProfileLinkModal] = useState(false)
  return <>
    <Title>Contributions</Title>

    <div className={cx(iconClass)} onClick={e => setShowProfileLinkModal(true)}>
      <FontAwesomeIcon icon={faGithub} />


    </div>

    <ProfileCollectModal

      openModal={() => { }}
      closeModal={() => { }}
      modalIsOpen={showProfileLinkModal}
    />

  </>

}
export default GithubProgramming