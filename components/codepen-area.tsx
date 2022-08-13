import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { UseAppDispatch, UseAppSelector } from '../store';
import { setcodepenUserInfo } from '../store/platforms/codepen';
import { getSearchState } from '../store/search';
import { SearchByType } from '../types/common.types';
import { GetData } from '../Utils/fetchData';
interface codepenItemType {
    pubDate: string;
    link: string;
    title: string;
}

const codepenInfoFetchUrl =
    'https://api.rss2json.com/v1/api.json?rss_url=https://codepen.io/userName/popular/feed/';
const CodePenArea = (props: any) => {
    const dispatch = UseAppDispatch();

    const { searchBy, originalSearchVal, pathname } = UseAppSelector(getSearchState);

    const [popularPen, setPopularPen] = useState<codepenItemType[]>([]);
    let codePenUserName = originalSearchVal;
    // considering the input to be a name
    if (searchBy === SearchByType.URL && pathname) {
        //extract name from the url
        const _codePenUserName = pathname.split('/').pop();
        if (_codePenUserName) codePenUserName = _codePenUserName
    }
    const codepenInfoFetchApi = codepenInfoFetchUrl.replace('userName', codePenUserName);

    const getCodepenData = useCallback(async () => {
        const data: any = await GetData(codepenInfoFetchApi);
        const { items = [] } = data;


        const sortedData: codepenItemType[] = items.sort(
            (a: { pubDate: string }, b: { pubDate: string }) => {
                const timeA = new Date(a.pubDate).getTime();
                const timeB = new Date(b.pubDate).getTime();
                return timeB - timeA;
            }
        );
        const codepenData = {
            pens: sortedData,
            username: codePenUserName
        }
        dispatch(setcodepenUserInfo(codepenData))
        setPopularPen(sortedData.slice(0, 2));
    }, []);

    useEffect(() => {
        getCodepenData();
    }, []);
    if (!codePenUserName) return <></>;

    return (
        <div style={{ display: 'flex' }}>
            {popularPen.map((item, idx) => {
                if (!item) return <></>;

                const codepenLink = item?.link;
                if (!codepenLink) return <></>;
                const { pathname } = new URL(codepenLink);
                if (!pathname) return <></>;
                const pathnameArr = pathname.split('/').filter((item) => item != '');

                // const parts = ['protocol', 'hostname', 'pathname'];

                const userName = pathnameArr[0];
                const projectName = pathnameArr.pop();
                const previewUrl = `https://codepen.io/${userName}/embed/preview/${projectName}`;
                return (
                    <iframe
                        height='300'
                        key={'ifram-' + idx}
                        scrolling='no'
                        title={item?.title}
                        src={previewUrl}
                        frameBorder='no'
                        loading='lazy'
                        allowTransparency={true}
                        allowFullScreen={true}
                    >
                        See the Pen <a href={codepenLink}>Stacking Cards (Motion One Version)</a> by
                        Bramus (<a href={codepenLink}>@bramus</a>) on{' '}
                        <a href={codepenLink}>CodePen</a>.
                    </iframe>
                );
            })}
        </div>
    );
};
export default CodePenArea;
