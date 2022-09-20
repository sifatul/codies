import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import SearchHelper from '../../Hooks/search.hook';
import { UseAppSelector } from '../../store';
import { getSearchState } from '../../store/search';

const passedPlaceholderList = ['Github profile link', 'Leetcode profile link', 'Hackerrank profile link', 'Codepen profile link', 'Email address'];
export default function CustomizedInputBase() {
    const [searchVal, setSearchVal] = React.useState('');
    const { originalSearchVal } = UseAppSelector(getSearchState);
    const { searchInputHandler } = SearchHelper(searchVal);

    const [placeholder, setPlaceholder] = React.useState('');

    const animatePlaceholder = React.useCallback(
        (currentPlaceholderIdx: number) => {
            let placeholderIndex = 0;
            const passedPlaceholder = passedPlaceholderList[currentPlaceholderIdx];

            const intr = setInterval(() => {
                setPlaceholder(passedPlaceholder.slice(0, placeholderIndex));
                if (placeholderIndex + 1 > passedPlaceholder.length) {
                    placeholderIndex = 0;
                    let nextPlaceHolderIdx = currentPlaceholderIdx + 1;
                    if (nextPlaceHolderIdx >= passedPlaceholderList.length) {
                        nextPlaceHolderIdx = 0;
                    }
                    clearInterval(intr);
                    animatePlaceholder(nextPlaceHolderIdx);
                } else {
                    placeholderIndex = placeholderIndex + 1;
                }
            }, 250);
        },
        [placeholder]
    );

    React.useEffect(() => {
        animatePlaceholder(0);
    }, []);

    return (
        <Paper
            component='form'
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
        >
            {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton> */}
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search google maps' }}
                defaultValue={originalSearchVal}
                onChange={(e) => {
                    setSearchVal(e.target.value);
                }}
                error={true}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        searchInputHandler();
                        e.preventDefault();
                    }
                }}
            />

            {/* <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton> */}
            <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
            <IconButton
                color='primary'
                sx={{ p: '10px' }}
                aria-label='directions'
                onClick={() => searchInputHandler()}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
