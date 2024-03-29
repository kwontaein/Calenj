import React, { ChangeEvent, InputHTMLAttributes, useEffect, useRef ,useState} from 'react';
import {RowFlexBox, Mini_Input, Button, FormLable,Li,OveflowBlock} from '../style/FormStyle';
import '../style/ModalStyle.scss';
import {useLocation} from 'react-router-dom';
import axios ,{AxiosError}from 'axios';
import {stateFilter, useConfirm} from '../stateFunc/actionFun'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import '../style/Datepicker.scss'




interface ModalProps {
    onClose: () => void;
    groupId: string;
}

interface VoteList{
    id: number,
    content:string,
}

const MakeVote :React.FC<ModalProps>=({onClose})=>{
    const [title,setTitle] = useState<string>('');
    const [voteList,setVoteList] = useState<VoteList[]>([]);
    const [content,setContent] =useState<string>('');
    const location = useLocation();
    const groupInfo = {...location.state};
    const inputRef =useRef<HTMLInputElement>(null);
    const contentRef =useRef<HTMLInputElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
    
    //List추가
    const addList=(content:string)=>{
        if(content!=''){
            const id = new Date().getTime();
            const list:VoteList ={
                id: id,
                content:content
            }
            setVoteList([...voteList,list])
            setContent('');

            if(contentRef.current){
                contentRef.current.value ='';
            }
            return
        }
        window.alert('내용을 입력해주세요.');
    }


    //List 부분 삭제하기
    const deletLi = (key :number)=>{
        const newList :VoteList[] =voteList.filter((current)=>{
            return current.id !== key
        })
        setVoteList([...newList]);
    }

    //모달창 닫기
    const cancle = () =>{
        if(voteList.length===0){
            onClose();
            return
        }
        useConfirm('내용은 저장되지 않습니다. 정말로 취소하시겠습니까?', onClose,()=>{})
    }



    useEffect(()=>{
        inputRef.current?.focus();
    },[])

    return(
        <div>
            
            <div className='makeVote_container'>
            <RowFlexBox>
                <Mini_Input onChange={(e:ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)} ref={inputRef} style={{marginTop:'1px', width:'210px'}} placeholder='투표 제목'/>
            </RowFlexBox>
            <RowFlexBox style={{alignItems:"center"}}>
                <Mini_Input ref={contentRef} onChange={(e:ChangeEvent<HTMLInputElement>)=>setContent(e.target.value)} style={{width: '150px', fontSize:'12px'}} placeholder='항목 입력'></Mini_Input>
                <button onClick={()=>addList(content)} style={{height: '25px'}}>추가</button>
            </RowFlexBox>
           
            {voteList && 
                <div style={{listStyle: 'none', marginTop:'20px'}}>
                    {voteList.map((list) => (
                        <Li key={list.id} style={{width:'203px'}}>
                            <RowFlexBox>
                            <OveflowBlock style={{maxWidth:'150px',fontSize:'14px'}}>{list.content}</OveflowBlock>
                            <button style={{marginLeft:'auto'}} onClick={()=>deletLi(list.id)}>제거</button>
                            </RowFlexBox>
                        </Li>
                    ))}
                </div>
            }

            <DatePicker
                dateFormat='yyyy.MM.dd' // 날짜 형태
                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                minDate={new Date()} // minDate 이전 날짜 선택 불가
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className='DatePicker'
                placeholderText='날짜선택'
             />

            <div style={{width:'210px', marginTop:'20px', textAlign:'right'}}>
                <button onClick={cancle}>취소</button>
            </div>
            </div>            
        </div>
    )
}
export default MakeVote;