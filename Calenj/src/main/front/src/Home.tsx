import React, {useLayoutEffect, useState, useRef, useEffect} from 'react'
import {connect} from 'react-redux'
import DefaultNavigation from "./components/Global/DefaultNavigation";
import {FullScreen_div} from "./style/FormStyle";
import NavigationComposition from './components/Global/NavigationComposition'
import {
    NavigateState,
    DispatchNavigationProps,
    mapStateToNavigationProps,
    mapDispatchToNavigationProps,
    NavigationProps
} from './store/slice/NavigateByComponent'
import SignState from "./components/Auth/SignState";
const Home: React.FC<NavigateState &DispatchNavigationProps> = ({navigateInfo}) => {

    return (
        <FullScreen_div style={{display:"flex", flexDirection:"row"}}>
            {/*<SignState/>*/}
            <DefaultNavigation/>
            <NavigationComposition/>
        </FullScreen_div>
    )
}
export default connect(mapStateToNavigationProps,mapDispatchToNavigationProps) (Home)