import {friendEndPointMap} from "../../../../entities/redux/model/module/StompMiddleware";
import {ProfileContainer, SignOfMessageNum, ThemeColor2} from "../../../../shared/ui/SharedStyled";
import {RootState, updateMainSubNavigation, updateNavigation} from "../../../../entities/redux";
import {updateUserChatApi} from "../../list/api/updateUserChatApi";

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useFetchUserChatList} from "../../../../entities/reactQuery";
import styled from "styled-components";
import {
    NavigateState,
    SideAlarm_TitleView_Container,
    SideAlarm_TitleViewContent,
    SideAlarm_TitleViewTail
} from "./FriendSideAlarmListStyled";


export const FriendSideAlarmList : React.FC =()=>{
    const [titleView, setTitleView] = useState<string | null>(null);
    const [friendAlarm,setFriendAlarm] = useState<string[]>([])

    const stomp = useSelector((state: RootState) => state.stomp); // 리덕스 상태 구독
    const {navigateParam} = useSelector((state: RootState) => state.navigateInfo);
    const {userNameStorage, friendIdStorage} = useSelector((state: RootState) => state.userNameStorage)
    const {clickState} = useSelector((state: RootState) => state.subNavigation.main_subNavState)

    const userId = localStorage.getItem('userId') || ''
    const userChatList = useFetchUserChatList(userId)

    const dispatch = useDispatch()

    useEffect(() => {
        const {state,target} = stomp.receiveMessage;
        if(target ==="friendMsg" && (state ==="SEND" || state ==="ALARM")){
            setFriendAlarm([...friendEndPointMap.keys()])
        }
    }, [stomp])

    return(
        <>
            {friendAlarm && friendAlarm.map((chattingRoomId)=>(
                (friendEndPointMap.get(chattingRoomId)!==0 && (navigateParam!==chattingRoomId || clickState==="calendar")) &&
                <ProfileContainer key={chattingRoomId}
                                  $userId={friendIdStorage[chattingRoomId] ? friendIdStorage[chattingRoomId].friendUserId : ''}
                                  onMouseEnter={() => {setTitleView(chattingRoomId)}}
                                  onMouseLeave={() => setTitleView(null)}
                                  onClick={() => {
                                      dispatch(updateNavigation({navigate: 'main', navigateParam: chattingRoomId}))
                                      dispatch(updateMainSubNavigation({clickState:'friend', friendParam:chattingRoomId}))
                                      if(userChatList.data){
                                          const chatInfo = userChatList.data.filter(({chatId})=> chatId===chattingRoomId).at(-1)
                                          if(chatInfo) {
                                              if(chatInfo.open) return
                                              chatInfo.open = true;
                                              updateUserChatApi(chatInfo).then(()=> userChatList.refetch())
                                          }
                                      }
                                  }}
                                  style={{marginBlock: '8px', width:'50px', height:'50px', boxSizing:'border-box'}}>
                    <NavigateState $isClick={navigateParam === chattingRoomId}/>
                    <SignOfMessageNum $existMessage={friendEndPointMap.get(chattingRoomId) !== 0}>
                        {friendEndPointMap.get(chattingRoomId)}
                    </SignOfMessageNum>
                    {chattingRoomId === titleView &&
                        userNameStorage[friendIdStorage[chattingRoomId] ? friendIdStorage[chattingRoomId].friendUserId : ''] &&
                        <SideAlarm_TitleView_Container>
                            <SideAlarm_TitleViewTail/>
                            <SideAlarm_TitleViewContent>
                                { userNameStorage[friendIdStorage[chattingRoomId].friendUserId].userName}
                            </SideAlarm_TitleViewContent>
                        </SideAlarm_TitleView_Container>

                    }
                </ProfileContainer>
            ))}
        </>
    )
}