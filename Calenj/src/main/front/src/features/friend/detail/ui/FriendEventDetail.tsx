import React, {ChangeEvent, useEffect, useState} from "react";
import {getUserProfileApi, UserInfo} from "../../../user/userInfo";
import {useQueryClient} from "@tanstack/react-query";
import {requestFriendApi} from "../../requestFriend/api/requestFriendApi";
import {
    QUERY_FRIEND_LIST_KEY,
    QUERY_REQUEST_FRIEND_LIST,
    QUERY_RESPONSE_FRIEND_LIST
} from "../../../../entities/reactQuery";
import {createPortal} from "react-dom";
import {Modal_Background, Modal_Condition_Button, Modal_Container} from "../../../../shared/ui/SharedStyled";
import {
    Content_Container,
    EmptyData_Content,
    FriendDetail_Close_Button,
    ListItem_Container,
    ListItem_Name_Container,
    ListItem_Profile_Container,
    RequestFriendView_Container,
    RequestFriendViewButton_Container,
    RequestMemo_Container,
    SpeechBox_Container,
    SpeechTail,
    SpeechTextBox,
    UserId,
    UserInfo_Container,
    UserInfoContent_Container,
    UserInfoContent_Text,
    UserInfoTitle_Text,
    UserInfoView_Button,
    UserInfoViewSelect_Container,
    UserName,
    UserName_Container,
    UserProfile,
    UserProfile_Container
} from "./FriendEventDetaulStyled";
import {AHMFormat, changeDateForm} from "../../../../shared/lib";
import {responseEventApi} from "../api/responseEventApi";
import {getFriendUserProfileApi} from "../api/getFriendUserProfileApi";
import {useDispatch} from "react-redux";
import {addSubScribe, saveUserName} from "../../../../entities/redux";

interface RequestFriendProps {
    onClose: () => void,
    myRequest: boolean, // 보낸요청 or 받은요청
    userKey: string,
    waitingView: boolean,
}


export const FriendEventDetail: React.FC<RequestFriendProps> = ({onClose, myRequest, userKey, waitingView}) => {
    const [viewState, setViewState] = useState<string>("introduce")
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [sendMsg, setSendMsg] = useState<string>('');
    const queryClient = useQueryClient();
    const dispatch= useDispatch();
    const getUserInfo = async () => {
        const userData = await getFriendUserProfileApi(userKey);
        setUserInfo(userData)
    }

    useEffect(() => {
        getUserInfo()
    }, []);

    const responseEventCancel = () => {
        if (myRequest) {
            onClose()
        } else if (userInfo) {
            responseEventApi(userKey, 'REJECT').then((response) => {
                if (response.success) {
                    queryClient.refetchQueries({queryKey: [QUERY_RESPONSE_FRIEND_LIST]})
                    onClose()
                }
                window.alert(response.message)
            })
            //요청받은 이벤트 refetch
            queryClient.refetchQueries({queryKey: [QUERY_RESPONSE_FRIEND_LIST]})
            onClose()
        }
    }

    const responseEventAccept = () => {
        if (waitingView) {
            //요청 대기중인 경우 > 요청을 취소(롤백)
            return
        }
        if (myRequest && userInfo) {
            //내가 요청을 보내는 경우(메시지를 담아서 전송)
            requestFriendApi(userInfo.userName, sendMsg).then(() => {
                queryClient.refetchQueries({queryKey: [QUERY_REQUEST_FRIEND_LIST]})
                onClose()
            })
        } else if (!myRequest && userInfo) {
            //내가 요청에 응답하는 경우
            responseEventApi(userKey, 'ACCEPT').then((response) => {
                if (response.success) {
                    dispatch(saveUserName({userId:userKey, userName: userInfo.userName}))
                    queryClient.refetchQueries({queryKey: [QUERY_REQUEST_FRIEND_LIST]})
                    onClose()
                }
                window.alert(response.message)
            })

        }
    }

    return createPortal(
        <Modal_Background>
            <Modal_Container style={{width: '500px', height: 'auto', backgroundColor: 'transparent'}}>
                {(!myRequest && userInfo?.eventContent) &&
                    <SpeechBox_Container>
                        <SpeechTail/>
                        <SpeechTextBox>
                            {userInfo?.eventContent}
                        </SpeechTextBox>
                    </SpeechBox_Container>
                }
                {userInfo &&
                    <RequestFriendView_Container $myRequest={(myRequest && !waitingView)}>
                        <UserProfile_Container>
                            <UserProfile/>
                            <UserName_Container>
                                <UserName>{userInfo.nickName}</UserName>
                                <UserId>{userInfo.userName}</UserId>
                            </UserName_Container>
                            {!myRequest &&
                                <FriendDetail_Close_Button onClick={onClose}>
                                    <i className="bi bi-x"></i>
                                </FriendDetail_Close_Button>
                            }
                        </UserProfile_Container>
                        <Content_Container>
                            <UserInfoViewSelect_Container>
                                <UserInfoView_Button $isFocus={viewState === 'introduce'}
                                                     onClick={() => setViewState('introduce')}
                                                     style={{marginLeft: '0'}}>
                                    소개
                                </UserInfoView_Button>
                                <UserInfoView_Button $isFocus={viewState === 'knowTogether'}
                                                     onClick={() => setViewState('knowTogether')}>
                                    함께 아는 친구
                                </UserInfoView_Button>
                                <UserInfoView_Button $isFocus={viewState === 'sameGroup'}
                                                     onClick={() => setViewState('sameGroup')}>
                                    같은 소속 그룹
                                </UserInfoView_Button>
                            </UserInfoViewSelect_Container>
                            <UserInfo_Container>
                                {viewState === 'introduce' &&
                                    <>
                                        <UserInfoTitle_Text>
                                            가입시기:
                                        </UserInfoTitle_Text>
                                        <UserInfoContent_Text>
                                            {AHMFormat(changeDateForm(userInfo.joinDate)).substring(0, 14)}
                                        </UserInfoContent_Text>
                                        <UserInfoTitle_Text>
                                            소개:
                                        </UserInfoTitle_Text>
                                        <UserInfoContent_Text>
                                            {userInfo.introduce}
                                        </UserInfoContent_Text>
                                    </>
                                }
                                {viewState === 'knowTogether' &&
                                    <UserInfoContent_Container>
                                        {userInfo.sameFriend.length > 0 ?
                                            userInfo.sameFriend.map((friend) => (
                                                <ListItem_Container key={friend}>
                                                    <ListItem_Profile_Container>

                                                    </ListItem_Profile_Container>
                                                    <ListItem_Name_Container>
                                                        {friend}
                                                    </ListItem_Name_Container>
                                                </ListItem_Container>
                                            )) :
                                            <EmptyData_Content>
                                                함께아는 친구가 없습니다.
                                            </EmptyData_Content>
                                        }

                                    </UserInfoContent_Container>
                                }
                                {viewState === 'sameGroup' &&
                                    <UserInfoContent_Container>
                                        {userInfo.sameGroup.length > 0 ?
                                            userInfo.sameGroup.map((group) => (
                                                <ListItem_Container key={group}>
                                                    <ListItem_Profile_Container style={{borderRadius: '10px'}}>

                                                    </ListItem_Profile_Container>
                                                    <ListItem_Name_Container>
                                                        {group}
                                                    </ListItem_Name_Container>
                                                </ListItem_Container>
                                            )) :
                                            <EmptyData_Content>
                                                같은 소속의 그룹이 존재하지 않습니다.
                                            </EmptyData_Content>
                                        }
                                    </UserInfoContent_Container>
                                }
                            </UserInfo_Container>
                            {(myRequest && !waitingView) &&
                                <RequestMemo_Container placeholder={'상대방이 내가 누구인지 알 수 있도록 간단하게 소개해주세요.'}
                                                       onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setSendMsg(e.target.value)}
                                                       maxLength={30}/>
                            }


                            <RequestFriendViewButton_Container>
                                <Modal_Condition_Button style={{height: '100%', marginRight: '10px'}}
                                                        onClick={responseEventCancel}>
                                    {waitingView ? "닫기" : myRequest ? "취소" : "거절"}
                                </Modal_Condition_Button>
                                <Modal_Condition_Button style={{height: '100%'}} $isAble={true}
                                                        onClick={responseEventAccept}>
                                    {waitingView ? "요청 취소" : myRequest ? "친구요청" : "수락"}
                                </Modal_Condition_Button>
                            </RequestFriendViewButton_Container>
                        </Content_Container>
                    </RequestFriendView_Container>
                }
            </Modal_Container>
        </Modal_Background>,
        document.body
    )
}