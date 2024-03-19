import { useEffect, useRef ,useState} from 'react';
import {RowFlexBox, Mini_Input,Mini_Textarea, Button, FormLable,} from '../style/FormStyle';
import '../style/ModalStyle.scss';
import {useConfirm} from '../stateFunc/actionFun'

interface ModalProps {
    onClose: () => void;
}

const NoticeModal :React.FC<ModalProps> = ({onClose})=>{
    const inputRef = useRef<HTMLInputElement>(null);
    const [title,setTitle] = useState<string>('');
    const [content,setContent] = useState<string>('');

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



    return(
        <div id='notice_container' >
            <RowFlexBox>
            <FormLable style={{marginTop : '7px'}}>제목</FormLable>
            <Mini_Input onChange={(e)=>setTitle(e.target.value)} ref={inputRef} style={{marginTop:'1px'}}/>
            </RowFlexBox>
            <RowFlexBox>
            <Mini_Textarea onChange={(e)=>setContent(e.target.value)} placeholder='내용을 입력해주세요'/> 
            </RowFlexBox> 
            <div style={{width:'210px', marginTop:'10px', textAlign:'right'}}>
                <button>생성</button> <button onClick={closeModal}>취소</button> 
            </div>  
            
        </div>
    )
}
export default NoticeModal;