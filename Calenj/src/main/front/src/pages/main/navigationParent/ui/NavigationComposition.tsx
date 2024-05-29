import {SubNavigation,ContentsComposition} from "../../navigationNode";
import {FullScreen_div} from '../../../../shared/ui/SharedStyled'
import React, {useEffect, useRef, useState} from "react";
import {connect} from 'react-redux'
import {
    NavigateState,
    DispatchNavigationProps,
    mapStateToNavigationProps,
    mapDispatchToNavigationProps, NavigationProps,
} from '../../../../entities/redux/slice/NavigatgionSlice'
import {useFetchGroupDetail} from '../../../../entities/reactQuery'
import {GroupListView} from "../../../../features/group/navItems_list";


const NavigationComposition :React.FC<NavigateState & DispatchNavigationProps>=({navigateInfo,updateNavigation})=>{

    //reactQuery로 그룹 디테일정보 fetching
    const groupDetailState =useFetchGroupDetail(navigateInfo.navigate,navigateInfo.navigateParam)

    return(
            <FullScreen_div style = {{ display:"flex", flexDirection:"row"}}>
                <GroupListView/>
                <SubNavigation isLoading={groupDetailState.isLoading}/>
                <ContentsComposition isLoading={groupDetailState.isLoading}/>
            </FullScreen_div>
    )

}
export const NavigationParent= connect(mapStateToNavigationProps, mapDispatchToNavigationProps)(NavigationComposition);