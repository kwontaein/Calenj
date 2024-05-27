import MakeGroup from './MakeGroup';
import {useEffect, useState, useMemo} from 'react';
import {NavigationProps} from '../../store/slice/NavigatgionSlice'
import {
    GroupList_Container,
    Btn_CalenJ_Icon,
    Li_GroupList_Item,
    GroupListTitle,
    GroupList_HR,
    Btn_MakeGroup,
    SignOfMessageNum,
    NavigateState,
    GroupTitleView_Container,
    GroupTitleViewTail,
    GroupTitleViewContent,
    GroupListContent_Container,
} from '../../style/Group/GroupListStyle';
import {endPointMap} from '../../store/module/StompMiddleware'
import {connect} from 'react-redux'
import {mapStateToStompProps, StompData} from '../../store/module/StompReducer'
import {useFetchGroupList, GroupList_item} from "../../entities/ReactQuery";


interface GroupListByNavigationProps {
    redirectDetail: (navigate: string, groupId: string) => NavigationProps;
}



const GroupList: React.FC<StompData & GroupListByNavigationProps> = ({stomp, redirectDetail}) => {
    const [showMakeGroup, setShowMakeGroup] = useState<boolean>(false);
    const [navigate, setNavigate] = useState<NavigationProps>();
    const [titleView,setTitleView] = useState<string|null>(null);
    //그룹 목록 불러오기


    const groupListState =  useFetchGroupList(stomp.isOnline)

    useEffect(() => {
        if (groupListState.data && groupListState.data[0]){
            setNavigate(redirectDetail("group", groupListState.data[0].groupId))
        }
    }, [groupListState.isLoading]);

    const closeModal = () => {
        setShowMakeGroup(false);
    };


    const connectDirection = (navigateArg: string, paramArg: string) => {
        setNavigate(redirectDetail(navigateArg, paramArg))
    }

    const clickState = (groupId: string): boolean => {
        return navigate?.navigate === "group" && navigate.navigateParam === groupId
    }


    return (
        <div>
            {showMakeGroup && <MakeGroup onClose={closeModal} queryState={groupListState}></MakeGroup>}
            {groupListState.isLoading && <div>Loading...</div>}
            {groupListState.data && (
                <GroupList_Container>
                    <GroupListContent_Container>
                        <Btn_CalenJ_Icon/>
                        <GroupList_HR/>
                        {groupListState.data.map((group:GroupList_item) => (

                            <Li_GroupList_Item onMouseEnter={()=>{setTitleView(group.groupId)}}
                                               onMouseLeave={()=>setTitleView(null)}
                                               $isClick={clickState(group.groupId)} key={group.groupId}
                                               onClick={() => connectDirection("group", group.groupId)}>
                                <NavigateState $isClick={clickState(group.groupId)}/>
                                <GroupListTitle>
                                    {group.groupTitle}
                                </GroupListTitle>
                                <SignOfMessageNum $existMessage={endPointMap.get(group.groupId) || 0 !== 0}>
                                    {endPointMap.get(group.groupId) !== 0 && endPointMap.get(group.groupId)}
                                </SignOfMessageNum>
                                {group.groupId === titleView &&
                                    <GroupTitleView_Container>
                                        <GroupTitleViewTail/>
                                        <GroupTitleViewContent>
                                            {group.groupTitle}
                                        </GroupTitleViewContent>
                                    </GroupTitleView_Container>
                                }
                            </Li_GroupList_Item>
                        ))}
                        <Btn_MakeGroup onClick={() => setShowMakeGroup(true)}>+</Btn_MakeGroup>
                    </GroupListContent_Container>
                </GroupList_Container>
            )}
        </div>
    )
}
export default connect(mapStateToStompProps, null)(GroupList);