import {useEffect, useState} from "react";
import {SubNavigation_Container} from '../../style/Navigation/SubNavigationContainer'
import {connect} from 'react-redux'
import {
    NavigateState,
    mapStateToNavigationProps,
} from '../../store/slice/NavigateByComponent'
import {useQueryClient} from "@tanstack/react-query";
import {QUERY_GROUP_DETAIL_KEY} from "../../store/ReactQuery/QueryKey";


interface NavigationProps {
    target : string;
    param: string;
}
interface groupDetails {
    groupId: string;
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

const SubNavigationbar:React.FC<NavigateState> =({navigateInfo})=>{
    const [groupDetail,setGroupDetail] = useState<groupDetails>();
    const queryClient = useQueryClient();

    //그룹 디테일 불러오기
    useEffect(() => {
        setGroupDetail(queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY,navigateInfo.navigateParam]));
    }, [queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY,navigateInfo.navigateParam])]);


    return  (
        <SubNavigation_Container>
            {navigateInfo.navigate === "group" &&
                <div></div>
            }
        </SubNavigation_Container>
    )
}
export default connect(mapStateToNavigationProps,null) (SubNavigationbar);