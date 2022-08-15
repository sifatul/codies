import Box from "@mui/material/Box";
import * as React from "react";
import { UseAppSelector } from "../../store";
import { getGithubUserInfo } from "../../store/platforms/github";
import { getLeetcodeUserInfo } from "../../store/platforms/leetcode";
import CategoryItem from "./CategoryItem";

export default function CategorySummary() {
  const githubUserInfo = UseAppSelector(getGithubUserInfo);
  const leetCodeUserInfo = UseAppSelector(getLeetcodeUserInfo);

  let maxLanguageCount = { languageName: "", problemsSolved: 0 }
  const problemCount = (leetCodeUserInfo?.languageProblemCount || []).reduce((sum, item) => {
    const countSolved = (item?.problemsSolved || 0);
    if (countSolved > maxLanguageCount.problemsSolved) maxLanguageCount = item

    return countSolved + sum
  }, 0)


  const categoryList = [
    {
      label: "Years of experience",
      icon: "",
      value: "10"
    },
    {
      label: "Programming Language",
      icon: "",
      value: maxLanguageCount.languageName
    },
    {
      label: "Problem Solved",
      icon: "",
      value: problemCount + ""
    },
    {
      label: "Total Project",
      icon: "",
      value: githubUserInfo.repos?.length + ""
    }
  ]
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 128,
          height: 128
        }
      }}
    >

      {categoryList.map(item => <CategoryItem key={item.label} {...item} />)}


    </Box >
  );
}
