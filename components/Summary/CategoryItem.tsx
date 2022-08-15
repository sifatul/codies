import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CategoryIcon from '@mui/icons-material/Category';

export type CategoryItemType = {
  label: string
  icon: string
  value: string
}
export default function CategoryItem(props: CategoryItemType) {
  const { label, icon, value } = props
  return (
    <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* <img src={icon} /> */}
      <CategoryIcon fontSize="large" />
      <p style={{ fontSize: 12 }}>{label}</p>
      <p style={{ padding: 0, margin: 0 }}>{value}</p>
    </Paper>
  );
}
