import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import * as React from 'react';

interface propsType {
    callback: Function;
    value: string;
}
const passedPlaceholderList = ['profile link', 'username'];
export default function CustomizedInputBase({ callback, value }: propsType) {
    const [searchVal, setSearchVal] = React.useState('');

    const inputSubmitHandler = React.useCallback(() => {
        return callback(searchVal);
    }, [searchVal]);

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
            }, 220);
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
                placeholder={'type a ' + placeholder}
                inputProps={{ 'aria-label': 'search google maps' }}
                defaultValue={value}
                onChange={(e) => {
                    setSearchVal(e.target.value);
                }}
                error={true}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        inputSubmitHandler();
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
                onClick={inputSubmitHandler}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
