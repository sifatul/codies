import MenuIcon from '@mui/icons-material/Menu';
import { Toolbar, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import React from "react";
import SearchToolbar from '../search/search.toolbar';


const CustomToolbar = ({ handleDrawerOpen, open }: { handleDrawerOpen: any, open: boolean }) => {
  return <Toolbar>
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={handleDrawerOpen}
      edge="start"
      sx={{
        marginRight: 5,
        ...(open && { display: 'none' }),
      }}
    >
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" noWrap component="div">
      Find Profile
  </Typography>


    <SearchToolbar />

  </Toolbar>
}
export default CustomToolbar