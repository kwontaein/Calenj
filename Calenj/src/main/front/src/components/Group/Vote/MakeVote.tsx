import React, {ChangeEvent, InputHTMLAttributes, useEffect, useRef, useState} from 'react';
import {RowFlexBox, Mini_Input, Button, FormLable, Li, OveflowBlock} from '../../../style/FormStyle';
import '../../../style/ModalStyle.scss';
import {useLocation} from 'react-router-dom';
import axios, {AxiosError} from 'axios';
import {stateFilter, useConfirm, saveDBFormat} from '../../../stateFunc/actionFun'
import '../../../style/Datepicker.scss'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import {ko} from "date-fns/locale/ko";
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 locale 추가
import { UseQueryResult } from '@tanstack/react-query';

interface ModalProps {
    onClose: () => void;
    groupId: string;
    queryState: UseQueryResult;
}

interface VoteList {
    id: number,
    content: string,
}

const MakeVote: React.FC<ModalProps> = ({onClose, groupId, queryState}) => {
    const [title, setTitle] = useState<string>('');
    const [voteList, setVoteList] = useState<VoteList[]>([]);//항목 리스트
    const [content, setContent] = useState<string>(''); //항목 (텍스트)
    const [content_Date, setContent_Date] = useState<Date | null>(null);  //항목 (날짜)
    const [inputForm, setInputForm] = useState<string>('TEXT'); //입력형식
    const [multipleOption, setMultipleOption] = useState<boolean>(false);//중복투표여부
    const [anonymousOption, setanonymousOption] = useState<boolean>(false); //익명여부
    const location = useLocation();
    const groupInfo = {...location.state};
    const inputRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLInputElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);


    //List추가
    const addList = () => {
        let inputContent: string | null = null;

        if (inputForm === 'TEXT') {
            if (content != '') {
                inputContent = content; 
            }
        } else if (inputForm === 'DATE') {
            if (content_Date != null) {

                const dateToString = dayjs(content_Date).locale('ko').format('YYYY년 MM월 DD일 (dd)');
                inputContent = dateToString;
                const id = new Date().getTime();
            }
        }

        if (inputContent != null) {
            const id = new Date().getTime();

            voteList.map((value) => {
                if (value.content === inputContent) { //내용 중복 시 초기화
                    inputContent = '';
                }
            })
            if (inputContent === '') {
                window.alert('항목에 존재하는 내용입니다.')
            } else {
                const list: VoteList = {
                    id: id,
                    content: inputContent
                }
                setVoteList([...voteList, list])
                setContent('');
                setContent_Date(null);
                if (contentRef.current) {
                    contentRef.current.value = '';
                }

            }
            return
        }
        window.alert('내용을 입력해주세요.')

    }

    //List목록 삭제하기
    const deletLi = (key: number) => {
        const newList: VoteList[] = voteList.filter((current) => {
            return current.id !== key
        })
        setVoteList([...newList]);
    }


    //투표 항목유형 변경
    const inputFormHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const mutation = () => {
            setInputForm(e.currentTarget.value);
            setVoteList([]);
            if (inputForm === 'TEXT') {
                setContent('')
            } else if (inputForm === 'DATE') {
                setContent_Date(null)
            }
        }
        if (voteList.length === 0) {
            mutation();
        } else {
            useConfirm('응답 유형을 변경할 경우 입력된 내용이 초기화 됩니다.\n변경 하시겠습니까?'
            ,mutation
            ,() => {e.preventDefault()})
        }
    }
    //모달창 닫기
    const cancle = () => {
        if (voteList.length === 0) {
            onClose();
            return
        }
        useConfirm('내용은 저장되지 않습니다. 정말로 취소하시겠습니까?', onClose, () => {})
    }


    const postVote = () => {

   

            const voteItem = voteList.map(item => item.content);
            const VoteEndDate = saveDBFormat(selectedDate as Date);
            const createDate = saveDBFormat(new Date());
            const data = {
                dto1: {
                    groupId: groupId,
                    voteCreated: createDate,
                    voteTitle: title,
                    voteEndDate: VoteEndDate,
                    isMultiple: multipleOption,
                    anonymous: anonymousOption,
                    postedVoteChoiceDTO: voteItem
                }
            };
            axios.post('api/makeVote', data.dto1)
                .then((res) => {
                    window.alert('투표를 생성했습니다.')
                    onClose();
                })
                .catch((error) => {
                    const axiosError = error as AxiosError;
                    console.log(axiosError);
                    if (axiosError.response?.data) {
                        stateFilter((axiosError.response.data) as string);
                    }
                })
        

    }

    const createVote = () => {
        if (title !== '' && voteList.length > 1 && selectedDate != null) {
            useConfirm(`투표를 생성하시겠습니까?`, postVote, () => {},queryState)
        } else if (title === '' && voteList.length < 2) {
            window.alert('제목 입력해주세요.')
        } else if (voteList.length < 2) {
            window.alert('항목을 2개이상 추가해주세요.')
        }else if(selectedDate ===null){
            window.alert('날짜를 입력해주세요.')
        }else {
            window.alert('제목 및 항목을 입력해주세요.')
        }
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    useEffect(() => {


    }, [selectedDate])

    return (
        <div>

            <div className='makeVote_container'>
                <RowFlexBox>
                    <Mini_Input onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} ref={inputRef}
                                style={{marginTop: '1px', width: '210px', fontWeight: '550'}} placeholder='투표 제목'/>
                </RowFlexBox>
                <RowFlexBox style={{alignItems: "center"}}>
                    {inputForm === 'TEXT' ?
                        <Mini_Input ref={contentRef}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                                    style={{width: '150px', fontSize: '12px'}} placeholder='항목 입력'></Mini_Input>
                        :
                        <DatePicker
                            dateFormat=' yyyy년 MM월 dd일 (EEE)' // 날짜 형태
                            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                            selected={content_Date}
                            onChange={(date) => setContent_Date(date)}
                            className='VoteConter_DatePicker'
                            placeholderText='날짜 선택'
                            locale={ko}
                        />
                    }


                    <button onClick={() => addList()} style={{height: '25px'}}>추가</button>
                </RowFlexBox>
                <label style={{fontSize: '13px'}}>
                    <input type='radio' name='inputForm' value='TEXT'
                        onClick={(e) => inputFormHandler(e)}
                        defaultChecked/>텍스트
                </label>
                <label style={{fontSize: '13px'}}>
                    <input type='radio' name='inputForm' value='DATE'
                    onClick={(e) => inputFormHandler(e)}/>날짜
                </label>
                {voteList &&
                    <div style={{listStyle: 'none', marginTop: '20px'}}>
                        {voteList.map((list) => (
                            <Li key={list.id} style={{width: '203px', paddingTop: '2px'}}>
                                <RowFlexBox>
                                    <OveflowBlock
                                        style={{maxWidth: '150px', fontSize: '14px'}}>{list.content}</OveflowBlock>
                                    <button style={{marginLeft: 'auto'}} onClick={() => deletLi(list.id)}>제거</button>
                                </RowFlexBox>
                            </Li>
                        ))}
                    </div>
                }

                <div style={{fontSize: '14px', marginLeft: '5px', marginTop: '30px'}}>투표 마감</div>
                <DatePicker
                    dateFormat=' yy/MM/dd (EEE)  aa hh:mm 까지' // 날짜 형태
                    shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                    minDate={new Date(new Date().setDate(new Date().getDate() + 1))} // minDate 이전 날짜 선택 불가
                    maxDate={new Date(new Date().setDate(new Date().getDate() + 6))}//최대 날짜를 현재기준 일주일까지
                    showTimeSelect //시간선택
                    timeFormat="HH:mm" //시간 포맷
                    timeIntervals={15} //시간 단위
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className='DatePicker'
                    placeholderText='날짜 선택'
                    locale={ko}
                />
                <label style={{fontSize: '13px', marginLeft: '3px'}}><input type='checkBox' name='choice'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setMultipleOption(e.target.checked)
                    }}/>복수선택</label>
                <label style={{fontSize: '13px'}}><input type='checkBox' name='anonymous'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setanonymousOption(e.target.checked)
                    }}/>익명투표</label>
                <div style={{width: '210px', marginTop: '20px', textAlign: 'right'}}>
                    <button style={{marginRight: '5px'}} onClick={createVote}>생성</button>
                    <button onClick={cancle}>취소</button>
                </div>
            </div>
        </div>
    )
}
export default MakeVote;