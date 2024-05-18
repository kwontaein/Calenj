import SubNavigationbar from "../../body/ui/SubNavigationbar";
import {FullScreen_div} from '../../../../style/FormStyle'
import React, {useEffect, useRef, useState} from "react";
import {connect} from 'react-redux'
import {
    NavigateState,
    DispatchNavigationProps,
    mapStateToNavigationProps,
    mapDispatchToNavigationProps, NavigationProps,
} from '../../../../store/slice/NavigatgionSlice'
import {ContentsWidgets} from "../../body/ui/ContentsComposition";
import {useFetchGroupDetail} from '../../../../entities/ReactQuery/model/queryModel'
import {debounce, throttle} from "../../../../shared/lib/actionFun";
import GroupList from "../../../../components/Group/GroupList";


const NavigationComposition :React.FC<NavigateState & DispatchNavigationProps>=({navigateInfo,updateNavigation})=>{

    //reactQuery로 그룹 디테일정보 fetching
    const groupDetailState =useFetchGroupDetail(navigateInfo.navigate,navigateInfo.navigateParam)

    useEffect(()=>{
    },[navigateInfo])

    const redirectDetail = (navigate:string, groupId?: string):NavigationProps => {
        if(navigate === "group" && groupId) {
            updateNavigation({navigate: "group", navigateParam: ''})
            updateNavigation({navigate: "group", navigateParam: groupId})
            return {navigate:navigate, navigateParam:groupId};
        }else{
            return {navigate:navigate, navigateParam:''};
        }
    }

    return(
            <FullScreen_div style = {{ display:"flex", flexDirection:"row"}}>
                <GroupList redirectDetail={redirectDetail}/>
                <SubNavigationbar isLoading={groupDetailState.isLoading}/>
                <ContentsWidgets
                    isLoading={groupDetailState.isLoading}
                    target={navigateInfo.navigate}
                    param={navigateInfo.navigateParam}
                />
            </FullScreen_div>
    )

}
export default connect(mapStateToNavigationProps, mapDispatchToNavigationProps)(NavigationComposition);