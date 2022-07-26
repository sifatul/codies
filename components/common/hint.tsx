import React from 'react';
import Image from 'next/image'

const Hint = () => {

  return <div style={{ paddingTop: '200px' }}>

    <p> Now you can get a summary of developers profile by inserting </p>
    <div>Profile <strong>user name</strong> or <strong>profile link</strong> from:</div>
    <Image src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" width="100px" height="30px" />
    <Image src="https://img.shields.io/badge/-Hackerrank-2EC866?style=for-the-badge&logo=HackerRank&logoColor=white" width="100px" height="30px" />
    <Image src="https://img.shields.io/badge/Codepen-000000?style=for-the-badge&logo=codepen&logoColor=white" width="100px" height="30px" />


  </div >
}
export default Hint