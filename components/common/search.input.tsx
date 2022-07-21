import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { validateEmail, isValidHttpUrl, domainFromUrl } from '../../Utils/crunchUrls'

interface propsType {
  callback: Function
}
export default function CustomizedInputBase({ callback }: propsType) {

  const [searchVal, setSearchVal] = React.useState('')

  const inputSubmitHandler = React.useCallback(() => {
    return callback(searchVal)

  }, [searchVal])

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search developer"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={e => { setSearchVal(e.target.value) }}
        error={true}
      />
      {/* <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton> */}
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={inputSubmitHandler}>
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}
