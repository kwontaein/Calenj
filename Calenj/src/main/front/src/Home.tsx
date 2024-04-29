import React, {useLayoutEffect, useState, useRef, useEffect} from 'react'
import {connect} from 'react-redux'
import DefaultNavigation from "./components/Global/DefaultNavigation";
import {FullScreen_div} from "./style/FormStyle";
import NavigationComposition from './components/Global/NavigationComposition'
import {
    DispatchStompProps,
    mapDispatchToStompProps,
    StompData,
    mapStateToStompProps
} from './store/module/StompReducer';
import SignState from "./components/Auth/SignState";

const Home: React.FC<StompData & DispatchStompProps> = ({stomp}) => {

    return (
        <FullScreen_div style={{display: "flex", flexDirection: "row"}}>
            {stomp.isOnline === "ONLINE" ?
                <FullScreen_div style={{display: "flex", flexDirection: "row"}}>
                    <DefaultNavigation/>
                    <NavigationComposition/>
                </FullScreen_div> :
                <SignState/>}


        </FullScreen_div>
    )
}
export default connect(mapStateToStompProps, mapDispatchToStompProps)(Home)