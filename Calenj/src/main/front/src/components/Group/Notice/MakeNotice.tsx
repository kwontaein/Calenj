import React, { ChangeEvent, useEffect, useRef ,useState} from 'react';
import {RowFlexBox,Mini_Textarea} from '../../../style/FormStyle';
import '../../../style/ModalStyle.scss';
import {useLocation} from 'react-router-dom';
import {useConfirm,stateFilter,saveDBFormat} from '../../../stateFunc/actionFun'
import axios ,{AxiosError}from 'axios';
import { Modal_Background} from '../../../style/FormStyle'
import { UseQueryResult } from '@tanstack/react-query';
import {
    GroupNoticeModal_Btn,
    GroupNoticeModal_Button_Container,
    GroupNoticeModal_Container,
    GroupNoticeModal_Textarea, GroupNoticeModal_Title
} from "../../../style/Group/GroupNoticeStyle";


interface ModalProps {
    onClose: () => void;
    groupId: string;
    queryState: UseQueryResult;
}

const NoticeModal :React.FC<ModalProps> = ({onClose, groupId,queryState})=>{
    const inputRef = useRef<HTMLInputElement>(null);
    const [content,setContent] = useState<string>('');
    const modalBackground = useRef<HTMLDivElement>(null);


    useEffect(()=>{
        inputRef.current?.focus();
    },[])
    const closeModal =()=>{
        if (content==='') {
            onClose();
        }else{
            useConfirm('작성한 내용은 삭제됩니다. 정말로 취소하시겠습니까?', onClose,()=>{})
        }
    }

    const postNotice =()=>{
        const createDate= saveDBFormat(new Date());
        axios.post('api/makeNotice', {noticeContent:content, noticeCreated:createDate, groupId: groupId})
        .then((res)=>{
            window.alert('공지를 생성했습니다.')
            onClose();
        })
        .catch((error)=>{
            const axiosError = error as AxiosError;
                console.log(axiosError);
                if(axiosError.response?.data){
                    stateFilter((axiosError.response.data) as string);
                }
        })
    }

    const createNotice =()=>{
        if(content!==''){
            useConfirm(`공지를 생성하시겠습니까?`,postNotice,()=>{}, queryState)
        }else{
            window.alert('내용을 입력해주세요.')
        }  
    }
    


    return(
            <Modal_Background ref={modalBackground} onClick={e => {
                if (e.target === modalBackground.current) {
                    closeModal();
                }
            }}>
                <GroupNoticeModal_Container>
                    <GroupNoticeModal_Button_Container>
                        <GroupNoticeModal_Title>공지</GroupNoticeModal_Title>
                        <GroupNoticeModal_Btn onClick={createNotice}>완료</GroupNoticeModal_Btn>
                    </GroupNoticeModal_Button_Container>
                    <GroupNoticeModal_Textarea onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>setContent(e.target.value)} placeholder='내용을 입력해주세요'/>
                </GroupNoticeModal_Container>
            </Modal_Background>

    )
}
export default NoticeModal;