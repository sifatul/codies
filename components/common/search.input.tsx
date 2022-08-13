import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { UseAppDispatch, UseAppSelector } from '../../store';
import { getSearchState, setSearchTypeEmail, setSearchTypeName, setSearchTypeUrl, userInfoType } from '../../store/search';
import { PostData } from '../../Utils/fetchData';
import { isEmail } from 'js-string-helper';



interface propsType {
    callback: Function;
}
const passedPlaceholderList = ['profile link', 'username'];
export default function CustomizedInputBase({ callback }: propsType) {
    const [searchVal, setSearchVal] = React.useState('');
    const { originalSearchVal } = UseAppSelector(getSearchState);
    const dispatch = UseAppDispatch();

    const searchInputHandler = async (searchVal: string) => {
        if (!searchVal) return;

        if (isEmail(searchVal)) {
            const userInfo = await PostData('api/getUserNyEmail', searchVal)
            if (userInfo) {

                setSearchTypeEmail(userInfo as userInfoType)
                return
            }
        }
        // if search val was not an email || userinfo not found
        try {
            let { protocol, hostname, pathname } = new URL(searchVal);

            //remove trailing slash
            if (pathname.substr(-1) === '/') pathname = pathname.slice(0, -1);

            dispatch(setSearchTypeUrl({
                protocol,
                hostname,
                pathname,
                originalSearchVal: searchVal,
            }))
        } catch (e) {
            console.error(e);
            dispatch(setSearchTypeName(searchVal))

        }
    };

    const inputSubmitHandler = React.useCallback(() => {
        return searchInputHandler(searchVal);
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
                defaultValue={originalSearchVal}
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
