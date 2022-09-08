import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'rss-to-json';
import { connectToDatabase } from '../../../Utils/mongodb';
import Leetcode from './models';
import { GraphQLClient } from 'graphql-request';
import { QueryType } from '../../../Utils/leetcode';

const TagProblemsCountQuery = `
query userProfile($username: String!) {
  matchedUser(username: $username) {
    tagProblemCounts{
      advanced{
        tagName
        tagSlug
        problemsSolved
      }
      intermediate{
        tagName
        tagSlug
        problemsSolved
      }
      fundamental{
        tagName
        tagSlug
        problemsSolved
      }
    }
  }
}
`;
const LangugaeProblemSolvedQuery = `
query userProfile($username: String!) {
  matchedUser(username: $username) {
    languageProblemCount {
      languageName
      problemsSolved
    }
  }
}
`;
const UserProfileQuery = `
query userProfile($username: String!) {
  matchedUser(username: $username) {
    githubUrl
    twitterUrl
    linkedinUrl
    profile {
        userAvatar
        realName
        aboutMe
        school
        websites
        countryName
        company
        jobTitle
        skillTags
        postViewCount 
        reputation 
        solutionCount 
    }
  }
}
`;
const url = 'https://leetcode.com/graphql/';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {

  const output = {};

  try {

    await connectToDatabase();
    const userName = req.query.userName as string;

    if (!userName) return res.status(400).send({ status: 'error', message: 'empty userName is not allowed' });
    const variables = { username: userName?.trim() };

    let leetcode = await Leetcode.findOne({ username: userName });
    if (leetcode) return res.json(leetcode);


    try {
      const client1 = new GraphQLClient(url);
      const client2 = new GraphQLClient(url);
      const client3 = new GraphQLClient(url);
      const output = await Promise.all([
        client1.request(UserProfileQuery, variables),
        client2.request(LangugaeProblemSolvedQuery, variables),
        client3.request(TagProblemsCountQuery, variables),
      ])
      const newData = { username:userName, ...output?.[0]?.matchedUser, ...output?.[1]?.matchedUser, ...output?.[2]?.matchedUser }
      if(!newData) return res.status(400).json({messsage:'leetcode data could not be crawled'})
      leetcode = await Leetcode.create(newData)           
    } catch (e) {
      return res.status(400).json(e);
    }


    if (!leetcode) return res.status(400).json({ message: 'data not found' })
    return res.status(200).json(leetcode);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'leetcode data not found' })
  }

}
