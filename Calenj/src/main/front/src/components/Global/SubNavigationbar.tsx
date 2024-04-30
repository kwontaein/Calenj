import {useEffect, useState} from "react";
import {
    SubNavigation_Container,
    SubNavigateTopBar,
    SubNavigateTopBar_leftContent,
    SubNavigateTopBar_EventSelecter_Container,
    SubNavigateTopBar_rightContent_item,
    SubNavigateContents_Container,
    SubNavigateItem_Icon,
    SubNavigateItem_Content,
    SubNavigateItem_Container, Hr_SubNavigation,
} from '../../style/Navigation/SubNavigationStyle'
import {connect} from 'react-redux'
import {
    NavigateState,
    mapStateToNavigationProps,
} from '../../store/slice/NavigateByComponent'
import {useIsFetching, useQueryClient, useQuery } from "@tanstack/react-query";
import {QUERY_GROUP_DETAIL_KEY} from "../../store/ReactQuery/queryManagement";
import GrouypByNavigationSelectBox from "../Group/GroupByNavigationSelectBox";

interface qeuryProps {
    isLoading :boolean
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

const SubNavigationbar:React.FC<NavigateState & qeuryProps> =({navigateInfo,isLoading})=>{
    const [groupDetail,setGroupDetail] = useState<groupDetails>();
    const queryClient = useQueryClient();
    const [showEventSelecter,setShowEventSelecter] = useState<boolean>(false);

    useEffect(() => {
        setShowEventSelecter(false)
    }, [navigateInfo]);

    //그룹 디테일 불러오기
    useEffect( () => {
        setGroupDetail(queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY,navigateInfo.navigateParam]));
    }, [isLoading,navigateInfo.navigateParam]);


    return  (
        <SubNavigation_Container>
            {(navigateInfo.navigate === "group" &&groupDetail )&&
            <SubNavigateTopBar>
                    <SubNavigateTopBar_leftContent>
                        {groupDetail.groupTitle}
                    </SubNavigateTopBar_leftContent>
                <SubNavigateTopBar_EventSelecter_Container>
                    {showEventSelecter ?
                        <SubNavigateTopBar_rightContent_item
                            onClick={()=>{setShowEventSelecter(!showEventSelecter)}}>
                            ×
                        </SubNavigateTopBar_rightContent_item> :
                            <i style={{fontSize:'21px', marginTop:'5px', cursor:'pointer'}} className="fi fi-rr-angle-small-down"
                               onClick={()=>{setShowEventSelecter(!showEventSelecter)}}>
                            </i>
                    }
                    {showEventSelecter &&<GrouypByNavigationSelectBox/>}
                </SubNavigateTopBar_EventSelecter_Container>
            </SubNavigateTopBar>
            }

            <SubNavigateContents_Container>
                <SubNavigateItem_Container>
                    <SubNavigateItem_Icon>
                        <i className="fi fi-ss-calendar" style={{marginTop:'4px'}}></i>
                    </SubNavigateItem_Icon>
                    <SubNavigateItem_Content>
                        그룹일정
                    </SubNavigateItem_Content>
                </SubNavigateItem_Container>
                <Hr_SubNavigation/>
                <SubNavigateItem_Container>
                    <SubNavigateItem_Icon>
                        <i className="fi fi-ss-megaphone" style={{marginTop:'4px'}}></i>
                    </SubNavigateItem_Icon>
                    <SubNavigateItem_Content>
                        공지
                    </SubNavigateItem_Content>
                </SubNavigateItem_Container>
                <SubNavigateItem_Container>
                    <SubNavigateItem_Icon>
                        <i className="fi fi-ss-vote-yea" style={{marginTop:'4px'}}></i>
                    </SubNavigateItem_Icon>
                    <SubNavigateItem_Content>
                        투표
                    </SubNavigateItem_Content>
                </SubNavigateItem_Container>
            </SubNavigateContents_Container>

        </SubNavigation_Container>
    )
}
export default connect(mapStateToNavigationProps,null) (SubNavigationbar);