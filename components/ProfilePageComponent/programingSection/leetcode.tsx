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
import { getLeetCodeSubmissionSummary, getLeetcodeUserInfo, setLeetcodeLanguageProblemCount, setLeetcodeTagProblemCounts, setLeetcodeUserInfo } from '../../../store/platforms/leetcode';
import { getHackerRankTotalProblemSolved } from '../../../store/platforms/hackerrank';


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

const LeetcodeProgramming = () => {
  const [showProfileLinkModal, setShowProfileLinkModal] = useState(false)
  const leetcodeUserInfo = UseAppSelector(getLeetcodeUserInfo);

  const { languageProblemCount = [] } = leetcodeUserInfo
  console.log("leetcodeUserInfo: ", leetcodeUserInfo)




  const { _id = '', github_url, leetcode_url, hackerrank_url } = UseAppSelector(getUserState);
  const dispatch = UseAppDispatch();


  const leetcodeUserName = useMemo(() => {
    let userName = ''
    if (!leetcode_url) return ''

    try {
      const domain = getDomain(leetcode_url) || '';
      if (new RegExp('leetcode.com').test(domain) === false) return '';
      userName = getLastPathname(leetcode_url) || '';
    } catch (e) {
      return '';
    }
    return userName;
  }, []);



  useEffect(() => {
    if (window == undefined || !leetcodeUserName) return;
    // already has data
    if (leetcodeUserInfo.username) return
    getLeetCodeInfo();
  }, [leetcodeUserName]);


  const getLeetCodeInfo = React.useCallback(async () => {

    const getDataFromDB: any = await GetData(
      `/api/${Filter.LEETCODE.toLocaleLowerCase()}/find?userName=${leetcodeUserName}`
    );

    const param = {
      githubUrl: getDataFromDB?.githubUrl,
      twitterUrl: getDataFromDB?.twitterUrl,
      linkedinUrl: getDataFromDB?.linkedinUrl,
      profile: getDataFromDB?.profile,
      languageProblemCount: getDataFromDB?.languageProblemCount,
      tagProblemCounts: getDataFromDB?.tagProblemCounts,
      username: leetcodeUserName,
    };

    dispatch(setLeetcodeUserInfo(param));
    dispatch(setLeetcodeLanguageProblemCount(getDataFromDB?.languageProblemCount));
    dispatch(setLeetcodeTagProblemCounts(getDataFromDB?.tagProblemCounts));


  }, [leetcodeUserName]);



  return <>
    <ProgrammingSectionHeader>
      <Title>Programming</Title>

      <div className={cx(iconClass)} onClick={e => setShowProfileLinkModal(true)}>
        <FontAwesomeIcon icon={faGithub} />
      </div>
    </ProgrammingSectionHeader>
    {languageProblemCount.length <= 0 && <Paragraph > You currently do not have any contributions. Recruiters won{"'"}t see this section while it{"'"}s empty. </Paragraph>}
    {languageProblemCount.length && <>Public repos: { languageProblemCount.length} </>}


    <ProfileCollectModal

      openModal={() => setShowProfileLinkModal(true)}
      closeModal={() => setShowProfileLinkModal(false)}
      modalIsOpen={showProfileLinkModal}
    />

  </>

}
export default LeetcodeProgramming