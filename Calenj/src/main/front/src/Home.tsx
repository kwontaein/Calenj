import {QueryClient, useQueryClient} from '@tanstack/react-query';
import React, {useLayoutEffect, useState, useRef, useEffect} from 'react'
import SignState, {QUERY_COOKIE_KEY} from "./components/Auth/SignState";
import FriendList from "./components/Friends/FriendList";
import DefaultNavigation from "./DefaultNavigation";
const Home: React.FC = () => {
    const [isLoding, setLoding] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const [cookie, setCookie] = useState<boolean>(false);

    useLayoutEffect(() => {

        setTimeout(() => {
            setCookie(queryClient.getQueryData([QUERY_COOKIE_KEY]) as boolean);
            setLoding(true);
        }, 400)
    }, [])


    return (
        <div>
            {isLoding ?
                <DefaultNavigation/> :
                <div style={{marginLeft: '10px'}}>isLoding..</div>}
        </div>
    )
}
export default Home