import {QueryClient, useQueryClient} from '@tanstack/react-query';
import React, {useLayoutEffect, useState, useRef, useEffect} from 'react'
import FriendList from "./components/Friends/FriendList";
import {connect} from 'react-redux'
import DefaultNavigation from "./components/Global/DefaultNavigation";
import {FullScreen_div, RowFlexBox} from "./style/FormStyle";
import EventManagementBar from "./components/Global/EventManagementBar";
import SubNavigationbar from "./components/Global/SubNavigationbar";
import GroupDetail from "./components/Group/GroupDetail";
import {Content_Container} from "./style/Navigation/DefaultNavigationStyle";
import {
    NavigateState,
    DispatchNavigationProps,
    mapStateToNavigationProps,
    mapDispatchToNavigationProps,
    NavigationProps
} from './store/slice/NavigateByComponent'
import SignState from "./components/Auth/SignState";

const Home: React.FC<NavigateState & DispatchNavigationProps> = ({navigateInfo}) => {

    useEffect(() => {
        if (navigateInfo.navigate === "group") {
            console.log(`redirectDetail ${navigateInfo.navigateParam}`)
        }

    }, [navigateInfo]);

    return (
        <FullScreen_div style={{display: "flex", flexDirection: "row"}}>
            {/*<SignState/>*/}
            <DefaultNavigation/>

            <Content_Container>
                <EventManagementBar navigate={navigateInfo.navigate}/>
                <RowFlexBox style={{height: 'calc(100% - 51px)'}}>
                    <SubNavigationbar navigate={navigateInfo.navigate}/>
                    {(navigateInfo.navigate === "group" && navigateInfo.navigateParam !== '') &&
                        <GroupDetail groupId={navigateInfo.navigateParam}/>
                    }
                </RowFlexBox>
            </Content_Container>
            <SignState></SignState>
        </FullScreen_div>
    )
}
export default connect(mapStateToNavigationProps, mapDispatchToNavigationProps)(Home)