import Styled from '@emotion/styled';
import { useMemo } from 'react';
const CommitList = Styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
`

const CommitItem = Styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`


const CommitSkill = Styled.h4`
    font-weight: 400;
    color: #0969da;
    margin: 0;
`


const CommitCount = Styled.p`
    color: #444444;
    margin: 0;
`

const CountList = (props: { arr: string[][] }) => {
  const { arr = [] } = props
  let list = arr.slice().sort((a, b) => parseInt(b?.[1]) - parseInt(a?.[1])); // this is the key

  return <CommitList>

    {list.map((item, idx: number) => {
      return (
        <CommitItem key={idx}>

          <CommitSkill>
            {item[0]}

          </CommitSkill>

          <CommitCount>
            {item[1]}
          </CommitCount>

        </CommitItem>
      )
    })}


  </CommitList>
}
export default CountList