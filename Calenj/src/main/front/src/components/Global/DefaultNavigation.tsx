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
} from '../../store/slice/NavigateByComponent'
import {useQueryClient} from "@tanstack/react-query";
import {QUERY_COOKIE_KEY} from '.././../store/ReactQuery/QueryKey'

const DefaultNavigation :React.FC<NavigateState &DispatchNavigationProps>=({updateNavigation,navigateInfo})=>{
    const queryClient = useQueryClient();
    const cookie = queryClient.getQueryState([QUERY_COOKIE_KEY])

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
            {!cookie &&<SignState/>}
            <GroupList redirectDetail={redirectDetail}/>
        </div>
    )
}
export default connect(mapStateToNavigationProps,mapDispatchToNavigationProps) (DefaultNavigation);