import React, { ChangeEvent, useEffect, useRef ,useState} from 'react';
import {RowFlexBox, Mini_Input,Mini_Textarea, Button, FormLable,} from '../../../style/FormStyle';
import '../../../style/ModalStyle.scss';
import {useLocation} from 'react-router-dom';
import {useConfirm} from '../../../stateFunc/actionFun'
import axios from 'axios';


interface ModalProps {
    onClose: () => void;
    groupId: string;
}

const NoticeModal :React.FC<ModalProps> = ({onClose, groupId})=>{
    const inputRef = useRef<HTMLInputElement>(null);
    const [title,setTitle] = useState<string>('');
    const [content,setContent] = useState<string>('');
    const location = useLocation();
    const groupInfo = {...location.state};

    useEffect(()=>{
        inputRef.current?.focus();
    },[])
    const closeModal =()=>{
        if (content===''&& title==='') {
            onClose();
        }else{
            useConfirm('작성한 내용은 삭제됩니다. 정말로 취소하시겠습니까?', onClose,()=>{})
        }
    }

    const postNotice =()=>{
        axios.post('api/makeNotice', {noticeTitle:title,noticeContent:content, groupId: groupId})
        .then((res)=>{
            window.alert('공지를 생성했습니다.')
            onClose();
        })
        .catch((err)=>console.error(err))
    }

    const createNotice =()=>{
        if(title!=='' && content!==''){
            useConfirm(`'${title}'이름으로 공지를 생성하시겠습니까?`,postNotice,()=>{})
        }else{
            window.alert('제목 및 내용을 입력해주세요.')
        }  
    }
    


    return(
        <div id='notice_container' >
            <RowFlexBox>
            <FormLable style={{marginTop : '7px'}}>제목</FormLable>
            <Mini_Input onChange={(e:ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)} ref={inputRef} style={{marginTop:'1px'}}/>
            </RowFlexBox>
            <RowFlexBox>
            <Mini_Textarea onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>setContent(e.target.value)} placeholder='내용을 입력해주세요'/> 
            </RowFlexBox> 
            <div style={{width:'210px', marginTop:'10px', textAlign:'right'}}>
                <button onClick={createNotice}>생성</button> <button onClick={closeModal}>취소</button> 
            </div>  
            
        </div>
    )
}
export default NoticeModal;