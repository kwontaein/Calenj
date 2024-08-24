import {CreateGroup} from '../../create';
import {useEffect, useState} from 'react';
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
} from './GroupListStyle';
import {groupEndPointMap, RootState, updateMainSubNavigation, updateNavigation} from '../../../../entities/redux'
import {useDispatch, useSelector} from 'react-redux'
import {useFetchGroupList, GroupList_item, useFetchFriendList} from "../../../../entities/reactQuery";
import {createPortal} from "react-dom";
import {friendEndPointMap} from "../../../../entities/redux/model/module/StompMiddleware";
import {ProfileContainer} from "../../../../shared/ui/SharedStyled";


export const GroupListView: React.FC = () => {

    const [showMakeGroup, setShowMakeGroup] = useState<boolean>(false);
    const [titleView, setTitleView] = useState<string | null>(null);
    const stomp = useSelector((state: RootState) => state.stomp); // 리덕스 상태 구독
    const {navigate,navigateParam} = useSelector((state: RootState) => state.navigateInfo);
    const [friendAlarm,setFriendAlarm] = useState<{key:string, alarmNum:number, friendId:string}[]>([])
    const dispatch = useDispatch()
    //그룹 목록 불러오기
    const groupListState = useFetchGroupList(stomp.isOnline)
    const {userNameStorage} = useSelector((state: RootState) => state.userNameStorage)
    const userId = localStorage.getItem('userId') || ''
    const {data} = useFetchFriendList(userId);

    useEffect(() => {
        const {state,target} = stomp.receiveMessage;
        if(target ==="friendMsg" && (state ==="SEND" || state ==="ALARM")){
            friendEndPointMap.forEach((alarmNum,key:string)=>{
                if(alarmNum && data){
                    const friendInfo =  data.filter((friend)=> friend.chattingRoomId)
                    if(friendInfo.length>0){
                        const {friendUserId} = friendInfo[0]
                        setFriendAlarm((prev)=> [...prev.filter(({alarmNum})=>alarmNum!==0), {key,alarmNum, friendId: friendUserId}])
                    }
                }
            })
        }

        if (stomp.requestFile === "ENDPOINT") {
            navigate ==="group" ? groupEndPointMap.set(stomp.param, 0) : friendEndPointMap.set(stomp.param,0)
        }
    }, [stomp])

    const {main_subNavState} = useSelector((state:RootState)=> state.subNavigation)


    return (
        <>
            {showMakeGroup && <CreateGroup onClose={() => setShowMakeGroup(false)}></CreateGroup>}
            {groupListState.isLoading && <div>Loading...</div>}
            {groupListState.data && (
                <GroupList_Container>
                    <GroupListContent_Container>
                        <Btn_CalenJ_Icon $isClick={navigateParam === ""} onClick={() => dispatch(updateNavigation({navigate: 'main', navigateParam:main_subNavState.friendParam}))}/>
                        {friendAlarm && friendAlarm.map(({key, alarmNum, friendId})=>(
                            <ProfileContainer $userId={friendId} onMouseEnter={() => {setTitleView(key)}}
                                               onMouseLeave={() => setTitleView(null)}
                                               onClick={() => dispatch(updateNavigation({navigate: 'main', navigateParam:key}))}>
                                <NavigateState $isClick={navigateParam === key}/>
                                <SignOfMessageNum $existMessage={alarmNum !== 0}>
                                    {alarmNum && alarmNum}
                                </SignOfMessageNum>
                                {key === titleView &&
                                    <GroupTitleView_Container>
                                        <GroupTitleViewTail/>
                                        <GroupTitleViewContent>
                                            {userNameStorage[key]&& userNameStorage[key].userName}
                                        </GroupTitleViewContent>
                                    </GroupTitleView_Container>
                                }
                            </ProfileContainer>
                        ))}
                        <GroupList_HR/>
                        {groupListState.data.map((group: GroupList_item) => (

                            <Li_GroupList_Item onMouseEnter={() => {
                                setTitleView(group.groupId)
                            }}
                                               onMouseLeave={() => setTitleView(null)}
                                               $isClick={navigateParam === group.groupId} key={group.groupId}
                                               onClick={() => {
                                                   dispatch(updateMainSubNavigation({clickState:'friend'}))
                                                   dispatch(updateNavigation({navigate: 'group', navigateParam:group.groupId}))
                                               }}>
                                <NavigateState $isClick={navigateParam === group.groupId}/>
                                <GroupListTitle>
                                    {group.groupTitle}
                                </GroupListTitle>
                                <SignOfMessageNum $existMessage={groupEndPointMap.get(group.groupId) || 0 !== 0}>
                                    {groupEndPointMap.get(group.groupId) !== 0 && groupEndPointMap.get(group.groupId)}
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
        </>
    )
}
