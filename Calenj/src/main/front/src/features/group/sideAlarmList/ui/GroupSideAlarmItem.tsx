
import {CreateGroup} from "../../create";
import {GroupList_item, useFetchGroupList} from "../../../../entities/reactQuery";
import {groupEndPointMap, RootState, updateNavigation} from "../../../../entities/redux";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {SignOfMessageNum, ThemeColor2} from "../../../../shared/ui/SharedStyled";
import {
    Btn_MakeGroup,
    GroupListTitle,
    Li_GroupList_Item,
    NavigateState, SideAlarm_TitleView_Container,
    SideAlarm_TitleViewContent, SideAlarm_TitleViewTail
} from "./GroupSideAlarmStyled";


export const GroupSideAlarmItem :React.FC = ()=>{
    const stomp = useSelector((state: RootState) => state.stomp); // 리덕스 상태 구독
    const groupListState = useFetchGroupList(stomp.isOnline)
    const {navigateParam} = useSelector((state: RootState) => state.navigateInfo);
    const [titleView, setTitleView] = useState<string | null>(null);
    const [showMakeGroup, setShowMakeGroup] = useState<boolean>(false);
    const dispatch = useDispatch()


    return(
        <>
        {groupListState.isLoading && <div>Loading...</div>}
        {groupListState.data &&
            <div>
                {showMakeGroup && <CreateGroup onClose={() => setShowMakeGroup(false)}></CreateGroup>}
                {groupListState.data.map((group: GroupList_item) => (
                    <Li_GroupList_Item onMouseEnter={() => {
                        setTitleView(group.groupId)
                    }}
                                       onMouseLeave={() => setTitleView(null)}
                                       $isClick={navigateParam === group.groupId} key={group.groupId}
                                       onClick={() => {
                                           dispatch(updateNavigation({
                                               navigate: 'group',
                                               navigateParam: group.groupId
                                           }))
                                       }}>
                        <NavigateState $isClick={navigateParam === group.groupId}/>
                        <GroupListTitle>
                            {group.groupTitle}
                        </GroupListTitle>
                        <SignOfMessageNum
                            $existMessage={groupEndPointMap.get(group.groupId) || 0 !== 0}>
                            {groupEndPointMap.get(group.groupId) !== 0 && groupEndPointMap.get(group.groupId)}
                        </SignOfMessageNum>
                        {group.groupId === titleView &&
                            <SideAlarm_TitleView_Container>
                                <SideAlarm_TitleViewTail/>
                                <SideAlarm_TitleViewContent>
                                    {group.groupTitle}
                                </SideAlarm_TitleViewContent>
                            </SideAlarm_TitleView_Container>
                        }
                    </Li_GroupList_Item>
                ))}
                <Btn_MakeGroup onClick={() => setShowMakeGroup(true)}>+</Btn_MakeGroup>
            </div>
        }
        </>
    )
}