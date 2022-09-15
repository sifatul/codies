import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Styled from '@emotion/styled';
import { css, cx } from '@emotion/css';
import React, { useEffect, useMemo, useState } from 'react';
import ProfileCollectModal from './profileCollectModal';
import { UseAppDispatch, UseAppSelector } from '../../../store';
import { getGithubUserInfo, getTopRepos, setGithubUserInfo } from '../../../store/platforms/github';
import { getUserState } from '../../../store/user/basicInfo';
import { getDomain, getLastPathname } from 'js-string-helper';
import { GetData } from '../../../Utils/fetchData';
import { Filter } from '../../../types/common.types';


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

const GithubProgramming = () => {
  const [showProfileLinkModal, setShowProfileLinkModal] = useState(false)
  const githubTopRepos = UseAppSelector(getTopRepos) || [];
  const githubUserInfo = UseAppSelector(getGithubUserInfo);

  const { _id = '', github_url, leetcode_url, hackerrank_url } = UseAppSelector(getUserState);
  const dispatch = UseAppDispatch();


  const githubUserName = useMemo(() => {
    const { name } = githubUserInfo
    if (name) return name
    if (!github_url) return

    let userName;
    try {
      const domain = getDomain(github_url) || ''
      if (new RegExp('github.com').test(domain) === false) return ''
      userName = getLastPathname(github_url) || ''

    } catch (e) {
      console.error(e)
      return ''
    }
    return userName
  }, [github_url])

  useEffect(() => {
    if (window == undefined || !githubUserName) return;
    // alread has data
    if (githubUserInfo?.html_url) return
    getGithubData()
  }, [githubUserName]);


  const getGithubData = React.useCallback(async () => {
    if (window == undefined || !githubUserName) return;
    console.log("calling getGithubData")
    const gitHubBasicInfo: any = await GetData(`/api/${Filter.GITHUB.toLocaleLowerCase()}/find?userName=${githubUserName}`);

    // const { email } = gitHubBasicInfo;
    // if (email) dispatch(setEmail(email))


    const repos = gitHubBasicInfo.repos

    dispatch(setGithubUserInfo({ ...gitHubBasicInfo, repos, username: githubUserName }))
  }, [githubUserName]);



  return <>
    <ProgrammingSectionHeader>
      <Title>Contributions</Title>

      <div className={cx(iconClass)} onClick={e => setShowProfileLinkModal(true)}>
        <FontAwesomeIcon icon={faGithub} />
      </div>
    </ProgrammingSectionHeader>
    {githubTopRepos.length <= 0 && <Paragraph > You currently do not have any contributions. Recruiters won{"'"}t see this section while it{"'"}s empty. </Paragraph>}
    {githubTopRepos.length && <>Public repos: { githubTopRepos.length} </>}


    <ProfileCollectModal

      openModal={() => setShowProfileLinkModal(true)}
      closeModal={() => setShowProfileLinkModal(false)}
      modalIsOpen={showProfileLinkModal}
    />

  </>

}
export default GithubProgramming