import React from 'react';
import Styled from '@emotion/styled';
const MainTitle = Styled.p`

@media (max-width: 768px){
    font-size: 36px;
    line-height: 40px;
    margin-bottom: 20px;
  }

    font-style: normal;
    font-weight: 800;
    font-size: 72px;
    line-height: 80px;
    text-align:center;
    max-width:992px;
    margin-bottom: 40px;
`

const SubTitle = Styled.p`
    text-align:center;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    letter-spacing: -0.02em;
    opacity: 0.8;
    max-width:570px;
    margin: 0 auto;
    margin-bottom: 40px

`

const Hint = () => {
    return (
        <div >
            <MainTitle> Find any developer with a simple search</MainTitle>
            <SubTitle>Find how your friends are growing in their career</SubTitle>
        </div>
    );
};
export default Hint;
