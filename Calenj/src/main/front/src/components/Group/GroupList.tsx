import MakeGroup from './MakeGroup';
import {useEffect, useState, useMemo} from 'react';
import {NavigationProps} from '../../store/slice/NavigateByComponent'
import {
    GroupList_Container,
    GroupListSub_Container,
    Btn_CalenJ_Icon,
    Li_GroupList_Item,
    GroupListTitle,
    GroupList_HR,
    Btn_MakeGroup,
    SignOfMessageNum, NavigateState,
} from '../../style/Group/GroupListStyle';
import {endPointMap} from '../../store/module/StompMiddleware'
import {connect} from 'react-redux'
import {mapStateToStompProps, StompData} from '../../store/module/StompReducer'
import {useFetchGroupList} from '../../store/ReactQuery/queryManagement'
import {GroupList_item} from "../../store/ReactQuery/queryInterface";


interface GroupListByNavigationProps {
    redirectDetail: (navigate: string, groupId: string) => NavigationProps;
}


const GroupList: React.FC<StompData & GroupListByNavigationProps> = ({stomp, redirectDetail}) => {
    const [showMakeGroup, setShowMakeGroup] = useState<boolean>(false);
    const [navigate, setNavigate] = useState<NavigationProps>();

    //그룹 목록 불러오기


    const groupListState =  useFetchGroupList(stomp.isOnline)

    useEffect(() => {
        if (groupListState.data) setNavigate(redirectDetail("group", groupListState.data[0].groupId))
    }, [groupListState.isLoading]);

    const closeModal = () => {
        setShowMakeGroup(false);
    };

    interface ALARM {
        param: string;
        alramNum: number;
    }

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
                    <Btn_CalenJ_Icon></Btn_CalenJ_Icon>
                    <GroupList_HR/>
                    <GroupListSub_Container>
                        {groupListState.data.map((group:GroupList_item) => (

                            <Li_GroupList_Item $isClick={clickState(group.groupId)} key={group.groupId}
                                               onClick={() => connectDirection("group", group.groupId)}>
                                <NavigateState $isClick={clickState(group.groupId)}/>
                                <GroupListTitle>
                                    {group.groupTitle}
                                </GroupListTitle>
                                <SignOfMessageNum $existMessage={endPointMap.get(group.groupId) || 0 !== 0}>
                                    {endPointMap.get(group.groupId) !== 0 && endPointMap.get(group.groupId)}
                                </SignOfMessageNum>
                            </Li_GroupList_Item>
                        ))}
                    </GroupListSub_Container>
                    <Btn_MakeGroup onClick={() => setShowMakeGroup(true)}>+</Btn_MakeGroup>
                </GroupList_Container>
            )}
        </div>
    )
}
export default connect(mapStateToStompProps, null)(GroupList);