
export const LeetCodeApi = "https://leetcode.com/graphql/"
export enum QueryType {
  TagProblemsCountQuery = 'TagProblemsCountQuery',
  LangugaeProblemSolvedQuery = 'LangugaeProblemSolvedQuery',
  userProfileQuery = 'userProfileQuery'
}
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
`
const LangugaeProblemSolvedQuery = `
query userProfile($username: String!) {
  matchedUser(username: $username) {
    languageProblemCount {
      languageName
      problemsSolved
    }
  }
}
`
const userProfileQuery = `
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
`
const allLeetCodeQueries = {
  TagProblemsCountQuery,
  LangugaeProblemSolvedQuery,
  userProfileQuery


}
const getLeetCodeProfileInfo = async (nameFromUrl: string, queryType: QueryType) => {

  const variables = { username: nameFromUrl }

  const query = allLeetCodeQueries[queryType]
  const param = JSON.stringify({
    query,
    variables,
    url: LeetCodeApi
  })
  return new Promise(resolve => {
    fetch('/api/leetcode-api', { method: "POST", body: param })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        // resolve(json)
        console.log(json)
        if (!json) return resolve(null)
        const { matchedUser } = json
        if (!matchedUser) return resolve(null)
        resolve(matchedUser)


      })

  })


}
export { getLeetCodeProfileInfo }
