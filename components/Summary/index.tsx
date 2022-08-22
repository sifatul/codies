import React from "react"
import CodePenArea from "../codepen-area"
import GithubArea from "../github-area"
import HackerrankArea from "../hackerrank-area"
import LeetCodeArea from "../leetcode-area"
import MediumArea from "../medium-area"
import UserBasicInfo from "../userBasicInfo"
import CategorySummary from "./Category"

const SummaryPage = () => {

  return <>
    <CategorySummary />
    <UserBasicInfo />
    <GithubArea />
    <CodePenArea />
    <LeetCodeArea />
    <HackerrankArea />
    <MediumArea />
  </>
}
export default SummaryPage