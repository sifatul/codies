import { css, cx } from '@emotion/css';
import Styled from '@emotion/styled';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDomain, getLastPathname } from 'js-string-helper';
import React, { useEffect, useMemo, useState } from 'react';
import checkUserInfo from '../../../Hooks/checkUser.hook';
import { UseAppDispatch, UseAppSelector } from '../../../store';
import { getGithubUserInfo, setGithubUserInfo } from '../../../store/platforms/github';
import { getUserState } from '../../../store/user/basicInfo';
import { Filter } from '../../../types/common.types';
import { GetData } from '../../../Utils/fetchData';
import CountList from './countList';
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

const GithubProgramming = () => {
  const [showProfileLinkModal, setShowProfileLinkModal] = useState(false)
  const githubUserInfo = UseAppSelector(getGithubUserInfo);

  const { userInfo, _id } = UseAppSelector(getUserState);
  const { github_url, profilePic } = userInfo || {}
  const dispatch = UseAppDispatch();
  const { updateUserInfo } = checkUserInfo()



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
    const gitHubBasicInfo: any = await GetData(`/api/${Filter.GITHUB.toLocaleLowerCase()}/find?userName=${githubUserName}`);
    // if (email) dispatch(setEmail(email))


    const repos = gitHubBasicInfo.repos

    dispatch(setGithubUserInfo({ ...gitHubBasicInfo, repos, username: githubUserName }))
  }, [githubUserName]);

  useEffect(() => {

    if (profilePic) return
    if (!githubUserInfo.avatar_url) return
    const consent = window.confirm('Use Github avatar as profile picture?'); // open the window with 
    if (!consent) return
    updateUserInfo({ profilePic: githubUserInfo.avatar_url })

  }, [githubUserInfo.avatar_url, profilePic])

  const repoListWithLang = useMemo(() => {
    const langRepoMapper: { [key: string]: number; } = {};
    (githubUserInfo?.repos || []).map(item => {
      const language = item.language;
      const counter = langRepoMapper?.[language] || 0;
      langRepoMapper[language] = counter + 1

    })
    const repoList: [string, string][] = Object.keys(langRepoMapper).map((lang: string) => {
      return [lang, langRepoMapper[lang] + '']
    })

    return repoList


  }, [githubUserInfo?.repos])





  return <>
    <ProgrammingSectionHeader>
      <Title>Projects</Title>

      <div className={cx(iconClass)} onClick={e => _id && setShowProfileLinkModal(true)}>
        <FontAwesomeIcon icon={faGithub} />
      </div>
    </ProgrammingSectionHeader>
    {!githubUserInfo?.html_url && <Paragraph > Your Github profile is not connected. </Paragraph>}
    {githubUserInfo?.html_url && repoListWithLang.length <= 0 && <Paragraph > You currently do not have any contributions </Paragraph>}
    {repoListWithLang.length > 0 && <CountList arr={repoListWithLang} />}


    <ProfileCollectModal

      openModal={() => setShowProfileLinkModal(true)}
      closeModal={() => setShowProfileLinkModal(false)}
      modalIsOpen={showProfileLinkModal}
    />

  </>

}
export default GithubProgramming