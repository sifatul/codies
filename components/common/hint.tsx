import React from 'react';
import Image from 'next/image';

const Hint = () => {
    return (
        <div style={{ paddingTop: '200px' }}>
            <p> Now you can get a summary of developers profile by inserting </p>
            <div>
                Profile <strong>user name</strong> or <strong>profile link</strong> from:
            </div>
            <img
                alt='github icon'
                src='https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white'
                height='30px'
            />
            <img
                alt='hackerrank icon'
                src='https://img.shields.io/badge/-Hackerrank-2EC866?style=for-the-badge&logo=HackerRank&logoColor=white'
                height='30px'
            />
            <img
                alt='codepen icon'
                src='https://img.shields.io/badge/Codepen-000000?style=for-the-badge&logo=codepen&logoColor=white'
                height='30px'
            />
            <img
                alt='leetcode icon'
                src='https://img.shields.io/badge/LeetCode-grey?style=for-the-badge&logo=LeetCode&logoColor=#d16c06'
                height='30px'
            />
        </div>
    );
};
export default Hint;
