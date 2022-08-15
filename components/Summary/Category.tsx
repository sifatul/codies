import Box from "@mui/material/Box";
import * as React from "react";
import CategoryItem from "./CategoryItem";

export default function CategorySummary() {
  const categoryList = [
    {
      label: "Years of experience",
      icon: "",
      value: 10
    },
    {
      label: "Programming Language",
      icon: "",
      value: "JavaScript"
    },
    {
      label: "Problem Solved",
      icon: "",
      value: 50
    },
    {
      label: "Total Project",
      icon: "",
      value: 1
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
