import { css, cx } from '@emotion/css';
import Styled from '@emotion/styled';
import { getDomain, getLastPathname } from 'js-string-helper';
import React, { useEffect, useMemo, useState } from 'react';
import { UseAppDispatch, UseAppSelector } from '../../../store';
import { getLeetcodeUserInfo, setLeetcodeLanguageProblemCount, setLeetcodeTagProblemCounts, setLeetcodeUserInfo } from '../../../store/platforms/leetcode';
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

const LeetcodeProgramming = () => {
  const [showProfileLinkModal, setShowProfileLinkModal] = useState(false)
  const leetcodeUserInfo = UseAppSelector(getLeetcodeUserInfo);

  const { languageProblemCount = [] } = leetcodeUserInfo


  const { userInfo, _id } = UseAppSelector(getUserState);
  const { leetcode_url } = userInfo || {}
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
  }, [leetcode_url]);



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

  const LanguageAndCount = useMemo(() => {
    return languageProblemCount.map(item => {
      return [item.languageName, item.problemsSolved + '']
    })
  }, [languageProblemCount?.length])


  return <>
    <ProgrammingSectionHeader>
      <Title>Leetcoding</Title>

      <div className={cx(iconClass)} onClick={e => _id && setShowProfileLinkModal(true)}>
        <img src='/icons/leetcode.png' alt='leetcode-icon' style={{ height: '30px' }} />
      </div>
    </ProgrammingSectionHeader>
    {!leetcode_url && <Paragraph > Your HackerRank profile is not connected. </Paragraph>}
    {leetcode_url && languageProblemCount.length <= 0 && <Paragraph > You currently do not have any contributions. </Paragraph>}
    {languageProblemCount.length > 0 && <CountList arr={LanguageAndCount} />}


    <ProfileCollectModal

      openModal={() => setShowProfileLinkModal(true)}
      closeModal={() => setShowProfileLinkModal(false)}
      modalIsOpen={showProfileLinkModal}
    />

  </>

}
export default LeetcodeProgramming