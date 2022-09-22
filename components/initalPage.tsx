import * as React from 'react';
import Styled from '@emotion/styled';

import Footer from '../components/common/footer';
import Hint from '../components/common/hint';
import styles from '../styles/Home.module.css';
import SearchInput from './search/search.input';


const Main = Styled.h1`
flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const SectionTitle = Styled.h1`

@media (max-width: 768px){
  font-size: 30px;
  line-height: 30px;
}
width: auto;
font-style: normal;
font-weight: 700;
font-size: 50px;
line-height: 125%;

letter-spacing: 0.005em;
color: #000000;
margin: 0 auto;
`;
const Section = Styled.section`

@media (max-width: 768px){
  padding: 30px 30px;
  margin-top:35px;
}
padding: 130px 120px;
  margin-top:150px;
  background: #E9EBFF;
`;
const SectionImageContainer = Styled.div`
  display:flex;
  flex-direction: column;
  gap : 10px;
  align-items: center;
`;
const SectionImage = Styled.img`

@media (max-width: 768px){
  width: 80%;
}
  min-width:20%; 
  width: 40%;
  max-width:200px;
`;
const HalfSection = Styled.div`
  width: 50%;
  @media (max-width: 450px){
    width: 100%;
  }
`;
const Row = Styled.div`
  width: 100%;
  display: flex;
  @media (max-width: 450px){
    flex-direction: column;
  }
  
`;

const InitialPage = () => {
  return (
    <>
      <div className={styles.container}>
        <Main >
          <Hint />

          <div className={styles.seachContainer}>
            <SearchInput />
          </div>
        </Main>

        <Section>

          <Row>

            <HalfSection>


              <SectionTitle> Auto sync platforms that matter to you </SectionTitle>
              <p>You can keep learning, working on projects, growing and we will keep your profile up-to-date.</p>
            </HalfSection>

            <HalfSection style={{ margin: 'auto' }}>

              <SectionImageContainer>
                <SectionImage
                  alt='github icon'
                  src='https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white'
                />
                <SectionImage
                  alt='hackerrank icon'
                  src='https://img.shields.io/badge/-Hackerrank-2EC866?style=for-the-badge&logo=HackerRank&logoColor=white'
                />
                <SectionImage
                  alt='codepen icon'
                  src='https://img.shields.io/badge/Codepen-000000?style=for-the-badge&logo=codepen&logoColor=white'
                />
                <SectionImage
                  alt='leetcode icon'
                  src='https://img.shields.io/badge/LeetCode-grey?style=for-the-badge&logo=LeetCode&logoColor=#d16c06'
                />
              </SectionImageContainer>
            </HalfSection>

          </Row>

        </Section>

        <Footer />
      </div>
    </>
  );
};

export default InitialPage;
