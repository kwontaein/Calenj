import {
    GroupName_Container,
    MapProfile_Container,
    ProfileName_Wrapper, ShareButton_Container,
    ShareContent_Container, ShareContent_Wrapper,
    ShareDateView_Container, SharePickIcon_Container, SideScrollBox_Container
} from "./ShareDateViewStyled";
import React, {useEffect, useReducer, useState} from "react";
import {EventButtonIcon_Wrapper} from "./DateEventDetailStyled";
import {useFetchFriendList, useFetchGroupList, useFetchUserChatList} from "../../../../entities/reactQuery";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {
    Modal_Condition_Button,
    PointColor,
    ProfileContainer,
    RowFlexBox,
    Toggle_Container, Toggle_Item
} from "../../../../shared/ui/SharedStyled";
import {InfoBox} from "../../../../shared/ui/InfoBox";
import {useShareSchedule} from "../model/useShareSchedule";
import {EventApi} from "@fullcalendar/react";

interface DateEventProps{
    onClose:()=>void,
    scheduleId: string,

}

export const ShareDateView : React.FC<DateEventProps> = ({onClose, scheduleId}) =>{
    const userId = localStorage.getItem('userId')||''
    const stomp = useSelector((state: RootState) => state.stomp); // 리덕스 상태 구독
    const friendListState = useFetchFriendList(userId);
    const groupListState = useFetchGroupList(stomp.isOnline)

    const [copyAble,setCopyAble] = useReducer((prev)=>!prev, false)
    const [isHover,setIsHover] = useReducer((prev)=>!prev, false)
    const {shareTarget, setTargetHandler} =useShareSchedule(scheduleId)

    return(
        <ShareDateView_Container>
            <ShareContent_Container style={{alignItems:'center', marginTop:'10px', flexDirection:"row"}}>
                <EventButtonIcon_Wrapper style={{fontSize: '13px'}}>
                    <i className="bi bi-share-fill"></i>
                </EventButtonIcon_Wrapper>
                <div style={{fontSize: '13px'}}>
                    공유대상 지정
                </div>
            </ShareContent_Container>

            <ShareContent_Container>
                <ShareContent_Wrapper>
                    친구
                </ShareContent_Wrapper>
                <SideScrollBox_Container>
                {friendListState.data && friendListState.data.map((friend)=>(
                    <MapProfile_Container onClick={()=>setTargetHandler("friend",friend.chattingRoomId)}>
                        {shareTarget.some(({chatId})=>chatId === friend.chattingRoomId)&&
                        <SharePickIcon_Container>
                            <i className="bi bi-check-circle"></i>
                        </SharePickIcon_Container>
                        }
                        <ProfileContainer $userId={friend.friendUserId} style={{width:'30px', height:'30px', boxSizing:'border-box'}}/>
                        <ProfileName_Wrapper>
                            {friend.nickName}
                        </ProfileName_Wrapper>
                    </MapProfile_Container>
                ))}
                </SideScrollBox_Container>
            </ShareContent_Container>
            <ShareContent_Container>
                <ShareContent_Wrapper>
                    그룹
                </ShareContent_Wrapper>
                <SideScrollBox_Container>
                    {groupListState.data && groupListState.data.map((group)=>(
                    <MapProfile_Container onClick={()=>setTargetHandler("group",group.groupId)}>
                        {shareTarget.some(({chatId})=>chatId === group.groupId)&&
                            <SharePickIcon_Container style={{marginTop:'20px'}}>
                                <i className="bi bi-check-circle"></i>
                            </SharePickIcon_Container>
                        }
                        <GroupName_Container $isPick={shareTarget.some(({chatId})=>chatId === group.groupId)}>
                            {group.groupTitle}
                        </GroupName_Container>

                    </MapProfile_Container>
                ))}
                </SideScrollBox_Container>
            </ShareContent_Container>
            <ShareButton_Container>
                <RowFlexBox>
                    <EventButtonIcon_Wrapper style={{fontSize: '13px',marginLeft:'-5px'}}
                                             onMouseEnter={setIsHover}
                                             onMouseLeave={setIsHover}>
                        <i className="bi bi-info-circle"></i>
                    </EventButtonIcon_Wrapper>
                    {isHover && <InfoBox text={`일정을 공유받은 대상이 해당 일정을 복사할 수 있는여부 (현재상태: ${copyAble ? "복사 가능":"복사 불가능"})`} marginLeft={-10} marginTop={-60}/>}
                    <div style={{fontSize: '10px', marginLeft:'-5px'}}>
                        일정 카피 가능여부
                    </div>
                    <Toggle_Container onClick={setCopyAble} $toggleState={copyAble} style={{width:'40px',marginLeft:'10px'}}>
                        <Toggle_Item $isClick={copyAble} $toggleState={copyAble}/>
                    </Toggle_Container>
                </RowFlexBox>
                <RowFlexBox>
                <Modal_Condition_Button onClick={onClose} style={{marginRight:'5px'}}>
                        취소
                    </Modal_Condition_Button>
                    <Modal_Condition_Button style={{fontSize:'12px'}} $isAble={shareTarget.length>0}>
                        공유하기
                    </Modal_Condition_Button>
                </RowFlexBox>
                
            </ShareButton_Container>

        </ShareDateView_Container>
    )
}