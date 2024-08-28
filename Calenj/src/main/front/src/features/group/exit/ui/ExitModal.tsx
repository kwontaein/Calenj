import React, {useRef} from 'react';
import {Modal_Background} from '../../../../shared/ui/SharedStyled'
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {groupExitApi} from "../api/GroupExitApi";
import {
    Content_Exit_Div,
    Exit_Cancel_Div,
    ExitLink_Div,
    Group_Exit_Top, Group_Exit_Wrapper,
    GroupExitModal_Container
} from "./ExitModalStyled";

interface ModalProps {
    onClose: () => void;
}

export const ExitModal: React.FC<ModalProps> = ({onClose}) => {
    const modalBackground = useRef<HTMLDivElement>(null);
    const groupId = useSelector((state: RootState) => state.subNavigation.group_subNavState.param)

    function sendToFriend(friendId: string, inviteLink: string) {
        //친구에게 알림 보내기
        // stompClient?.subscribe(`/topic/userOnline/${friendId}`, (isOnline: IMessage) => {})
        // stompClient?.send('/app/online', {}, JSON.stringify({inviteLink}));
    }

    return (
        <Modal_Background ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current) {
                onClose();
            }
        }}>
            <GroupExitModal_Container>
                <Group_Exit_Wrapper>
                    <Group_Exit_Top>정말로 그룹을 나가시겠습니까?</Group_Exit_Top>
                    <Content_Exit_Div>
                        <ExitLink_Div onClick={() => groupExitApi(groupId)}>
                            나가기
                        </ExitLink_Div>
                        <Exit_Cancel_Div onClick={onClose}>
                            취소
                        </Exit_Cancel_Div>
                    </Content_Exit_Div>
                </Group_Exit_Wrapper>
            </GroupExitModal_Container>
        </Modal_Background>
    )
}
