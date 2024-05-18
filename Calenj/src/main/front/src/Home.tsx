import React, {useLayoutEffect, useState, useRef, useEffect} from 'react'
import {connect} from 'react-redux'
import MainNavigation from "./components/Global/MainNavigation";
import {FullScreen_div} from "./style/FormStyle";
import NavigationComposition from './components/Global/NavigationComposition'
import {
    DispatchStompProps,
    mapDispatchToStompProps,
    StompData,
    mapStateToStompProps
} from './store/module/StompReducer';
import {SignStateWidget} from './widgets/SignState';
const Home: React.FC<StompData &DispatchStompProps> = ({stomp}) => {

    return (
        <FullScreen_div>
            {stomp.isOnline ==="ONLINE"?
                <FullScreen_div style={{display:"flex", flexDirection:"row"}}>
                    <MainNavigation/>
                    <NavigationComposition/>
                </FullScreen_div> :
                <SignStateWidget/>}
        </FullScreen_div>
    )
}
export default connect(mapStateToStompProps,mapDispatchToStompProps) (Home)