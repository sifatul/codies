import Box from "@mui/material/Box";
import * as React from "react";
import { UseAppSelector } from "../../store";
import { getGithubSummary } from "../../store/platforms/github";
import { getHackerRankTotalProblemSolved } from "../../store/platforms/hackerrank";
import { getLeetCodeSubmissionSummary } from "../../store/platforms/leetcode";
import CategoryItem from "./CategoryItem";

export default function CategorySummary() {
  const githubSummary = UseAppSelector(getGithubSummary);

  const leetCodeSummary = UseAppSelector(getLeetCodeSubmissionSummary);
  const hackerrankTotalSubmission = UseAppSelector(getHackerRankTotalProblemSolved);

  const problemCount = leetCodeSummary.countProblemSolved + hackerrankTotalSubmission
  let programmingLanguageUser = leetCodeSummary.maxUsedLanguage
  if (githubSummary.maxUsedLanguage) programmingLanguageUser += ", " + githubSummary.maxUsedLanguage

  const categoryList = [
    {
      label: "Experiences",
      icon: "",
      value: "#"
    },
    {
      label: "Programming Language",
      icon: "",
      value: programmingLanguageUser
    },
    {
      label: "Problem Solved",
      icon: "",
      value: problemCount + ""
    },
    {
      label: "Total Project",
      icon: "",
      value: githubSummary.totalProject + ""
    }
  ]
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 150,
          height: 'auto'
        }
      }}
    >

      {categoryList.map(item => <CategoryItem key={item.label} {...item} />)}


    </Box >
  );
}
