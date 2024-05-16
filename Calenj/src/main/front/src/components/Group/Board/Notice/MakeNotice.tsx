import React, { ChangeEvent, useEffect, useRef ,useState} from 'react';
import { CheckCondition_Button} from '../../../../style/FormStyle';
import '../../../../style/ModalStyle.scss';
import {jwtFilter} from '../../../../entities/authentication/jwt'
import { useConfirm } from '../../../../shared/model'
import {saveDBFormat} from '../../../../shared/lib'
import axios ,{AxiosError}from 'axios';
import { Modal_Background } from '../../../../style/FormStyle'
import { UseQueryResult } from '@tanstack/react-query';
import {
    GroupNoticeModal_Button_Container, GroupNoticeModal_close_Btn,
    GroupNoticeModal_Container,
    GroupNoticeModal_Textarea,
    GroupNoticeModal_Title,
    GroupNoticeModal_TopContent_Container, GroupNoticeTitle_Input
} from "../../../../style/Group/GroupNoticeStyle";


interface ModalProps {
    onClose: () => void;
    groupId: string;
    queryState: UseQueryResult;
}

const NoticeModal :React.FC<ModalProps> = ({onClose, groupId,queryState})=>{
    const inputRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState<string>('');
    const [content,setContent] = useState<string>('');
    const modalBackground = useRef<HTMLDivElement>(null);


    useEffect(()=>{
        inputRef.current?.focus();
    },[])

    const closeModal =()=>{
        if (content==='' && title==='') {
            onClose();
        }else{
            useConfirm('작성한 내용은 저장되지 않습니다. 정말로 취소하시겠습니까?', onClose,()=>{})
        }
    }

    const postNotice =()=>{
        const createDate= saveDBFormat(new Date());
        axios.post('api/makeNotice', {noticeTitle:title, noticeContent:content, noticeCreated:createDate, groupId: groupId})
        .then((res)=>{
            window.alert('공지를 생성했습니다.')
            onClose();
        })
        .catch((error)=>{
            const axiosError = error as AxiosError;
                console.log(axiosError);
                if(axiosError.response?.data){
                    jwtFilter((axiosError.response.data) as string);
                }
        })
    }

    const createNotice =()=>{
        if(content!=='' && title!==''){
            useConfirm(`공지를 등록하시겠습니까??`,postNotice,()=>{}, queryState)
        }else if(content===''){
            window.alert('내용을 입력해주세요.')
        }else{
            window.alert('제목을 입력해주세요.')
        }
    }
    


    return(
            <Modal_Background ref={modalBackground} onClick={e => {
                if (e.target === modalBackground.current && content==='' && title==='') {
                    onClose();
                }
            }}>
                <GroupNoticeModal_Container>
                    <GroupNoticeModal_TopContent_Container>
                        <GroupNoticeModal_Title>공지 작성하기</GroupNoticeModal_Title>
                    </GroupNoticeModal_TopContent_Container>
                    <GroupNoticeTitle_Input maxLength={30} onChange={(e:ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)} placeholder='제목을 입력해주세요'/>
                    <GroupNoticeModal_Textarea onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>setContent(e.target.value)} placeholder='내용을 입력해주세요'/>
                    <GroupNoticeModal_Button_Container>
                        <GroupNoticeModal_close_Btn onClick={closeModal}>
                            취소
                        </GroupNoticeModal_close_Btn>
                        <CheckCondition_Button $isAble={content!=="" && title !== ""} onClick={createNotice}>
                            등록
                        </CheckCondition_Button>

                    </GroupNoticeModal_Button_Container>
                </GroupNoticeModal_Container>
            </Modal_Background>

    )
}
export default NoticeModal;