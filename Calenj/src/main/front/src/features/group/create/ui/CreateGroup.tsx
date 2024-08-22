import React, {useRef} from 'react';
import {Modal_Background} from "../../../../shared/ui/SharedStyled";
import {useCreateGroup} from "../model/useCreateGroup";
import {createPortal} from "react-dom";
import {
    Create_Group_Button, Create_Group_Button2,
    Create_Group_Button_Container,
    Create_Group_Container,
    Create_Group_Input,
    Create_Group_Wrapper
} from "./CreateGroupStyled";

interface ModalProps {
    onClose: () => void;
}


//단순 그룹 생성을 위한 컴포넌트
export const CreateGroup: React.FC<ModalProps> = ({onClose}) => {
    const modalBackground = useRef<HTMLDivElement>(null);
    const [groupTitle, setGroupTitle, createGroup] = useCreateGroup(onClose)

    return createPortal(
        <Modal_Background ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current && groupTitle === "") {
                onClose();
            }
        }}>
            <Create_Group_Container>
                <Create_Group_Wrapper>
                    <h3>새로운 그룹을 만들어보세요!</h3>
                    <Create_Group_Input type='text'
                                        placeholder='캘린룸 이름'
                                        maxLength={12}
                                        onChange={(e) => setGroupTitle(e.target.value)}>
                    </Create_Group_Input>
                    <Create_Group_Button_Container>
                        <Create_Group_Button onClick={createGroup}>생성</Create_Group_Button>
                        <Create_Group_Button2 onClick={onClose}>닫기</Create_Group_Button2>
                    </Create_Group_Button_Container>
                </Create_Group_Wrapper>
            </Create_Group_Container>
        </Modal_Background>,
        document.body
    );
}

