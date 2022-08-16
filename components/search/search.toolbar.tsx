import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import React from "react";
import SearchHelper from '../../Hooks/search.hook';
import { UseAppSelector } from '../../store';
import { getSearchState } from '../../store/search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));

const SearchToolbar = () => {

  const { originalSearchVal } = UseAppSelector(getSearchState);

  console.log("toolbar search > originalSearchVal,", originalSearchVal)

  const [searchVal, setSearchVal] = React.useState('');
  const { searchInputHandler } = SearchHelper(searchVal)

  return <Search >
    <SearchIconWrapper onClick={e => searchInputHandler()}>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Search…"
      inputProps={{ 'aria-label': 'search' }}
      onChange={(e) => {
        setSearchVal(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          searchInputHandler();
          e.preventDefault();
        }
      }}
    />
  </Search>
}
export default SearchToolbar