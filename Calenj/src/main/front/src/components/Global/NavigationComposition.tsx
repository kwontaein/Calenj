import SubNavigationbar from "./SubNavigationbar";
import {FullScreen_div} from '../../style/FormStyle'
import React, {useEffect, useRef, useState} from "react";
import {connect} from 'react-redux'
import {
    NavigateState,
    DispatchNavigationProps,
    mapStateToNavigationProps,
    mapDispatchToNavigationProps,
} from '../../store/slice/NavigatgionSlice'
import ContentsComposition from "./ContentsComposition";
import {useFetchGroupDetail} from '../../store/ReactQuery/queryManagement'
import {debounce, throttle} from "../../stateFunc/actionFun";


const NavigationComposition :React.FC<NavigateState & DispatchNavigationProps>=({navigateInfo})=>{

    //reactQuery로 그룹 디테일정보 fetching
    const groupDetailState =useFetchGroupDetail(navigateInfo.navigate,navigateInfo.navigateParam)

    return(
            <FullScreen_div style = {{ display:"flex", flexDirection:"row"}}>
                        <SubNavigationbar
                            isLoading={groupDetailState.isLoading}/>
                        <ContentsComposition
                            isLoading={groupDetailState.isLoading}
                            target={navigateInfo.navigate}
                            param={navigateInfo.navigateParam}
                        />
            </FullScreen_div>
    )

}
export default connect(mapStateToNavigationProps, mapDispatchToNavigationProps)(NavigationComposition);