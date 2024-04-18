import {QueryClient, useQueryClient} from '@tanstack/react-query';
import React, {useLayoutEffect, useState, useRef, useEffect} from 'react'
import SignState, {QUERY_COOKIE_KEY} from "./components/Auth/SignState";
import GroupList from './components/Group/GroupList';
import FriendList from "./components/Friends/FriendList";
import {DIV_FULL_HEIGHT, GlobalStyles} from "./style/FormStyle";

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
        <GlobalStyles style={{display: "flex", flexDirection: "column"}}>
            <SignState/>
            {isLoding ?
                <DIV_FULL_HEIGHT>
                    <DIV_FULL_HEIGHT> {cookie && <GroupList/>}</DIV_FULL_HEIGHT>
                </DIV_FULL_HEIGHT> :
                <div style={{marginLeft: '10px'}}>isLoding..</div>}
        </GlobalStyles>
    )
}
export default Home