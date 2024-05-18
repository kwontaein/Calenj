import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Modal_Background} from '../../../style/FormStyle'
import {
    GroupNoticeModal_Container,
    GroupNoticeModal_TopContent_Container,
    GroupNoticeModal_Title,
    GroupNoticeModal_Button_Container,
    GroupNoticeModal_close_Btn,
    GroupNoticeTitle_Input,
    GroupNoticeModal_Textarea
} from '../styles/NoticeModalStyle';
import {useConfirm} from '../../../shared/model'
import {CreateBtn} from '../../../features/notice/ui/NoticeButtons';

interface ModalProps {
    onClose: () => void;
}

const NoticeModal: React.FC<ModalProps> = ({onClose}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const modalBackground = useRef<HTMLDivElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const closeModal = () => {
        if (content === '' && title === '') {
            onClose();
        } else {
            useConfirm('작성한 내용은 저장되지 않습니다. 정말로 취소하시겠습니까?', onClose, () => {
            });
        }
    };

    return (
        <Modal_Background ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current && content === '' && title === '') {
                onClose();
            }
        }}>
            <GroupNoticeModal_Container>
                <GroupNoticeModal_TopContent_Container>
                    <GroupNoticeModal_Title>공지 작성하기</GroupNoticeModal_Title>
                </GroupNoticeModal_TopContent_Container>
                <GroupNoticeTitle_Input maxLength={30}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                                        placeholder='제목을 입력해주세요'/>
                <GroupNoticeModal_Textarea
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                    placeholder='내용을 입력해주세요'/>
                <GroupNoticeModal_Button_Container>
                    <GroupNoticeModal_close_Btn onClick={closeModal}>
                        취소
                    </GroupNoticeModal_close_Btn>
                    <CreateBtn title={title} content={content}/>
                </GroupNoticeModal_Button_Container>

            </GroupNoticeModal_Container>
        </Modal_Background>
    );
};

export const CreateNoticeModal = NoticeModal;
