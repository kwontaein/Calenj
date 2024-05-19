import React, {useLayoutEffect, useState, useRef, useEffect} from 'react'
import {connect} from 'react-redux'
import {FullScreen_div} from "./style/FormStyle";
import {NavigationParent} from './pages/main/navigationParent'
import {
    DispatchStompProps,
    mapDispatchToStompProps,
    StompData,
    mapStateToStompProps
} from './store/module/StompReducer';
import {SignStateWidget} from './widgets/signState';
const Home: React.FC<StompData &DispatchStompProps> = ({stomp}) => {

    return (
        <FullScreen_div>
            {stomp.isOnline ==="ONLINE"?
                <NavigationParent/>:
                <SignStateWidget/>}
        </FullScreen_div>
    )
}
export default connect(mapStateToStompProps,mapDispatchToStompProps) (Home)