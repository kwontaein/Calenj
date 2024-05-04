import SignState from "../Auth/SignState";
import GroupList from "../Group/GroupList";
import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
    NavigateState,
    DispatchNavigationProps,
    mapStateToNavigationProps,
    mapDispatchToNavigationProps,
    NavigationProps
} from '../../store/slice/NavigatgionSlice'
import {FullScreen_div} from "../../style/FormStyle";

const MainNavigation :React.FC<NavigateState &DispatchNavigationProps>=({updateNavigation,navigateInfo})=>{

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
        <div>
            <GroupList redirectDetail={redirectDetail}/>
        </div>
    )
}
export default connect(mapStateToNavigationProps,mapDispatchToNavigationProps) (MainNavigation);