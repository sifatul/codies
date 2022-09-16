import { css, cx } from '@emotion/css';
import Styled from '@emotion/styled';
import { faHackerrank } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDomain, getLastPathname } from 'js-string-helper';
import React, { useEffect, useMemo, useState } from 'react';
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

const HackerrankProgramming = () => {
  const [showProfileLinkModal, setShowProfileLinkModal] = useState(false)
  const hackerrankUserInfo = UseAppSelector(getHackerRankUserInfo);

  const { languages = [] } = hackerrankUserInfo
  console.log("hackerrankUserInfo: ", hackerrankUserInfo)




  const { hackerrank_url } = UseAppSelector(getUserState);
  const dispatch = UseAppDispatch();


  const hackerRankUserName = useMemo(() => {
    let userName = ''
    if (!hackerrank_url) return ''

    try {
      const domain = getDomain(hackerrank_url) || '';
      if (new RegExp('hackerrank.com').test(domain) === false) return '';
      userName = getLastPathname(hackerrank_url) || '';
    } catch (e) {
      return '';
    }
    return userName;
  }, []);



  useEffect(() => {
    if (window == undefined || !hackerRankUserName) return;
    // already has data
    if (hackerrankUserInfo.username) return
    getHackerRankInfo();
  }, [hackerRankUserName]);


  const getHackerRankInfo = React.useCallback(async () => {


    let data: any = await GetData(`/api/${Filter.HACKERRANK.toLocaleLowerCase()}/find?userName=${hackerRankUserName}`);

    const hackerRankdata: hackerRankDataType = data || {};
    const { avatar, country, name } = hackerRankdata;
    // if (name) dispatch(setName(name));
    // if (avatar) dispatch(setProfilePic(avatar));
    // if (country) dispatch(setCountry(country));

    dispatch(setHackerRankInfo(hackerRankdata));
    console.log("hackerRankdata> ", hackerRankdata);
    return hackerRankdata;
  }, []);
  const languagesVersionTogether = useMemo(() => {
    let mapLang: { [key: string]: number } = {}
    for (let i = 0; i < languages.length; i++) {
      const item = languages[i];
      const languageName = item[0].replace(new RegExp("[0-9]", "g"), "");
      let prevNum = mapLang[languageName] || 0
      mapLang[languageName] = parseInt(item[1]) + prevNum
    }

    const output: [string, string][] = Object.keys(mapLang).map((lang: string) => {
      return [lang, mapLang[lang] + '']
    })

    return output

  }, [languages.length])

  console.log("languages: ", languages)
  return <>
    <ProgrammingSectionHeader>
      <Title>Hackerranking</Title>

      <div className={cx(iconClass)} onClick={e => setShowProfileLinkModal(true)}>
        <FontAwesomeIcon icon={faHackerrank} />
      </div>
    </ProgrammingSectionHeader>
    {languagesVersionTogether.length <= 0 && <Paragraph > You currently do not have any contributions yet. </Paragraph>}
    {languagesVersionTogether.length > 0 && <CountList arr={languagesVersionTogether} />}


    <ProfileCollectModal

      openModal={() => setShowProfileLinkModal(true)}
      closeModal={() => setShowProfileLinkModal(false)}
      modalIsOpen={showProfileLinkModal}
    />

  </>

}
export default HackerrankProgramming