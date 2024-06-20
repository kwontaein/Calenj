import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {
    Modal_Background,
    Modal_Condition_Button,
    Modal_Container, ModalContent_Container,
    ModalTopBar_Container
} from '../../../../../../shared/ui/SharedStyled'
import {
    GroupNoticeModal_Button_Container,
    GroupNoticeTitle_Input,
    GroupNoticeModal_Textarea
} from './NoticeModalStyle';
import {useConfirm} from '../../../../../../shared/model'
import {CreateNoticeButton} from './CreateNoticeButton';
import {RootState, updateClickState,BoardParamMap} from "../../../../../../entities/redux";
import {useDispatch, useSelector} from "react-redux";


export const NoticeModal: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const modalBackground = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch()

    const groupId = useSelector((state:RootState) => state.group_subNavState.param)

    useEffect(() => {
        inputRef.current?.focus();
        return ()=>{
            BoardParamMap.delete(`${groupId}Notice`)
        }
    }, []);

    const onClose = () =>{
        dispatch(updateClickState({clickState: ''}))
    }

    const closeModal = () => {
        if(title==='' && content ===''){
            onClose()
        }else{
            useConfirm('작성한 내용은 저장되지 않습니다. 정말로 취소하시겠습니까?', onClose,() => {})
        }
    };

    return (

        <Modal_Background ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current && content === '' && title === '') {
                onClose()
            }
        }}>
            <Modal_Container>
                <ModalTopBar_Container>
                    공지 작성하기
                </ModalTopBar_Container>
                <ModalContent_Container>
                    <GroupNoticeTitle_Input maxLength={30}
                                            ref={inputRef}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                                            placeholder='제목을 입력해주세요'/>
                    <GroupNoticeModal_Textarea
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                        placeholder='내용을 입력해주세요'/>

                    <GroupNoticeModal_Button_Container>
                        <Modal_Condition_Button style={{marginRight:"5px"}} onClick={closeModal}>
                            취소
                        </Modal_Condition_Button>
                        <CreateNoticeButton title={title} content={content}/>
                    </GroupNoticeModal_Button_Container>
                </ModalContent_Container>
            </Modal_Container>
       </Modal_Background>
    );
};


