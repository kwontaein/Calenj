import {Modal_Background, Modal_Condition_Button, Modal_Container} from "../../../../../../shared/ui/SharedStyled";
import React, {useRef, useState} from "react";
import {createPortal} from "react-dom";
import {
    Content_Container, ListItem_Container, ListItem_Name_Container, ListItem_Profile_Container,
    RequestFriendView_Container, RequestFriendViewButton_Container, RequestMemo_Container,
    SpeechBox_Container,
    SpeechTail,
    SpeechTextBox,
    UserId,
    UserInfo_Container, UserInfoContent_Container, UserInfoContent_Text, UserInfoTitle_Text,
    UserInfoView_Button,
    UserInfoViewSelect_Container,
    UserName,
    UserName_Container,
    UserProfile,
    UserProfile_Container
} from "./RequestFriendViewStyled";

interface RequestFriendProps {
    onClose: () => void,
    myRequest: boolean, // 보낸요청 or 받은요청
}

interface UserInfo {
    id: string,
    name: string,
}

interface GroupInfo {
    id: string,
    groupName: string,
}

export const RequestFriendView: React.FC<RequestFriendProps> = ({onClose, myRequest}) => {
    const [viewState, setViewState] = useState<string>("introduce")
    const initData = [{id: '123', name: '김말이순대'}, {id: '456', name: '간순대'}, {id: '789', name: '짜장순대'}]
    const groupData = [{id: '123', groupName: '권사모'}, {id: '456', groupName: '순대모임'}, {id: '789', groupName: '캘린제이 개발'}]

    const [linkFriend, setLinkFriend] = useState<UserInfo[]>(initData)

    return createPortal(
        <Modal_Background>
            <Modal_Container style={{width: '500px', height: 'auto', backgroundColor: 'transparent'}}>
                {!myRequest && <SpeechBox_Container>
                    <SpeechTail/>
                    <SpeechTextBox>
                        ㅎㅇ 권태인임 받으삼
                    </SpeechTextBox>
                </SpeechBox_Container>
                }
                <RequestFriendView_Container $myRequest={myRequest}>
                    <UserProfile_Container>
                        <UserProfile/>
                        <UserName_Container>
                            <UserName>구록불</UserName>
                            <UserId>ku_rook_bul</UserId>
                        </UserName_Container>
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
                                        2024년 6월 23일
                                    </UserInfoContent_Text>
                                    <UserInfoTitle_Text>
                                        소개:
                                    </UserInfoTitle_Text>
                                    <UserInfoContent_Text>
                                        안녕하세요 권태인입니다. 와~... 보소
                                    </UserInfoContent_Text>
                                </>
                            }
                            {viewState ==='knowTogether' &&
                                <UserInfoContent_Container>
                                    {linkFriend.map((user)=>(
                                        <ListItem_Container key={user.id}>
                                            <ListItem_Profile_Container>

                                            </ListItem_Profile_Container>
                                            <ListItem_Name_Container>
                                                {user.name}
                                            </ListItem_Name_Container>
                                        </ListItem_Container>
                                    ))}
                                </UserInfoContent_Container>
                            }
                            {viewState === 'sameGroup' &&
                                <UserInfoContent_Container>
                                    {groupData.map((group) => (
                                        <ListItem_Container key={group.id}>
                                            <ListItem_Profile_Container style={{borderRadius: '10px'}}>

                                            </ListItem_Profile_Container>
                                            <ListItem_Name_Container>
                                                {group.groupName}
                                            </ListItem_Name_Container>
                                        </ListItem_Container>
                                    ))}
                                </UserInfoContent_Container>
                            }
                        </UserInfo_Container>
                        {myRequest &&
                            <RequestMemo_Container placeholder={'상대방이 내가 누구인지 알 수 있도록 간단하게 소개해주세요.'}>

                            </RequestMemo_Container>
                        }


                        <RequestFriendViewButton_Container>
                            <Modal_Condition_Button style={{height: '100%', marginRight: '10px'}}>
                                {myRequest ? "취소" : "거절"}
                            </Modal_Condition_Button>
                            <Modal_Condition_Button style={{height: '100%'}} $isAble={true}>
                                {myRequest ? "친구요청" : "수락"}
                            </Modal_Condition_Button>
                        </RequestFriendViewButton_Container>
                    </Content_Container>
                </RequestFriendView_Container>
            </Modal_Container>
        </Modal_Background>,
        document.body
    )
}