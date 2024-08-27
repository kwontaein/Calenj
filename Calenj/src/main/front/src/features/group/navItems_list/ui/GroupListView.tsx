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
import {
    groupEndPointMap,
    RootState, saveFriendIdByChatRoomId,
    saveUserName,
    updateMainSubNavigation,
    updateNavigation
} from '../../../../entities/redux'
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
    const [friendAlarm,setFriendAlarm] = useState<string[]>([])
    const dispatch = useDispatch()
    //그룹 목록 불러오기
    const groupListState = useFetchGroupList(stomp.isOnline)
    const {userNameStorage, friendIdStorage} = useSelector((state: RootState) => state.userNameStorage)
    const userId = localStorage.getItem('userId') || ''
    const {data} = useFetchFriendList(userId);
    const {clickState} = useSelector((state: RootState) => state.subNavigation.main_subNavState)


    useEffect(() => {
        if(!data) return
        data.forEach((friend)=>{
            dispatch(saveUserName({userId:friend.friendUserId, userName: friend.nickName}))
            dispatch(saveFriendIdByChatRoomId({chatRoomId:friend.chattingRoomId, friendUserId:friend.friendUserId}))
        })
    }, [data]);

    useEffect(() => {
        const {state,target} = stomp.receiveMessage;
        if(target ==="friendMsg" && (state ==="SEND" || state ==="ALARM")){
            setFriendAlarm([...friendEndPointMap.keys()])
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
                        <Btn_CalenJ_Icon $isClick={navigate === "main"} onClick={() => {
                            dispatch(updateNavigation({navigate: 'main', navigateParam:main_subNavState.friendParam}))}}/>
                        {friendAlarm && friendAlarm.map((chattingRoomId)=>(
                            (friendEndPointMap.get(chattingRoomId)!==0 && (navigateParam!==chattingRoomId || clickState==="calendar")) &&
                            <ProfileContainer key={chattingRoomId}
                                              $userId={friendIdStorage[chattingRoomId] ? friendIdStorage[chattingRoomId].friendUserId : ''}
                                              onMouseEnter={() => {setTitleView(chattingRoomId)}}
                                              onMouseLeave={() => setTitleView(null)}
                                              onClick={() => {
                                                  dispatch(updateNavigation({navigate: 'main', navigateParam: chattingRoomId}))
                                                  dispatch(updateMainSubNavigation({clickState:'friend', friendParam:chattingRoomId}))
                                              }}
                                              style={{marginBlock: '8px', width:'50px', height:'50px', boxSizing:'border-box'}}>
                                <NavigateState $isClick={navigateParam === chattingRoomId}/>
                                <SignOfMessageNum $existMessage={friendEndPointMap.get(chattingRoomId) !== 0}>
                                    {friendEndPointMap.get(chattingRoomId)}
                                </SignOfMessageNum>
                                {chattingRoomId === titleView &&
                                    userNameStorage[friendIdStorage[chattingRoomId] ? friendIdStorage[chattingRoomId].friendUserId : ''] &&
                                    <GroupTitleView_Container>
                                        <GroupTitleViewTail/>
                                        <GroupTitleViewContent>
                                            { userNameStorage[friendIdStorage[chattingRoomId].friendUserId].userName}
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
