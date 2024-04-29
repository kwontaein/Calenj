import {RowFlexBox} from "../../style/FormStyle";
import SubNavigationbar from "./SubNavigationbar";
import GroupDetail from "../Group/GroupDetail";
import {FullScreen_div} from '../../style/FormStyle'
import React from "react";
import {connect} from 'react-redux'
import {
    NavigateState,
    DispatchNavigationProps,
    mapStateToNavigationProps,
    mapDispatchToNavigationProps,
    NavigationProps
} from '../../store/slice/NavigateByComponent'
import axios, {AxiosError} from "axios";
import {stateFilter} from "../../stateFunc/actionFun";
import {useQuery} from "@tanstack/react-query";
import {QUERY_GROUP_DETAIL_KEY} from "../../store/ReactQuery/QueryKey";
import ContentsComposition from "./ContentsComposition";


interface groupDetails {
    groupId: number;
    groupTitle: string;
    groupCreated: string;
    groupCreater: string;
    members: groupMembers[];
}

interface groupMembers {
    groupRoleType: String;
    group_user_location: String;
    nickName: String;
    onlineStatus: string;
    userEmail: string;
}

const NavigationComposition :React.FC<NavigateState&DispatchNavigationProps>=({navigateInfo})=>{
    const getGroupDetail = async (): Promise<groupDetails | null> => {
        try {
            console.log('실행')
            const response = await axios.post('/api/groupDetail', {
                groupId: navigateInfo.navigateParam
            }) // 객체의 속성명을 'id'로 설정;
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if (axiosError.response?.status) {
                console.log(axiosError.response.status);
                stateFilter((axiosError.response.status).toString());
            }
            return null;
        }
    }


    const grooupDetailState =useQuery<groupDetails | null, Error>({
        queryKey: [QUERY_GROUP_DETAIL_KEY, navigateInfo.navigateParam],
        queryFn: getGroupDetail, //HTTP 요청함수 (Promise를 반환하는 함수)
        enabled: navigateInfo.navigate==="group"
    });


    return(
        <FullScreen_div style = {{ display:"flex", flexDirection:"row"}}>
                    <SubNavigationbar isLoading={grooupDetailState.isLoading}/>
                    <ContentsComposition/>
        </FullScreen_div>
    )

}
export default connect(mapStateToNavigationProps,mapDispatchToNavigationProps)(NavigationComposition);