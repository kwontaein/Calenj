import {QueryClient, useQueryClient} from '@tanstack/react-query';
import React, {useLayoutEffect, useState, useRef} from 'react'
import SignState, {QUERY_COOKIE_KEY} from "./components/Auth/SignState";
import GroupList from './components/Group/GroupList';
import FriendList from "./components/Friends/FriendList";

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

        <div style={{display: "flex", flexDirection: "column"}}>
            <SignState/>
            <h1>여기는 초기 페이지임</h1>
            {isLoding ?
                <div>
                    <div> {cookie && <GroupList cookie={cookie}/>}</div>
                </div> :
                <div style={{marginLeft: '10px'}}>isLoding..</div>}


        </div>


    )
}
export default Home