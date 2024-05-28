import React, {useRef, useState} from "react";
import {VoteContent} from "./types";
import dayjs from "dayjs";
import {useConfirm} from "../../../../../../shared/model";

interface voteListState{
    voteList:VoteContent[],
    contentRef: React.RefObject<HTMLInputElement>
    setContent:  React.Dispatch<React.SetStateAction<string>>,
    contentDate : Date|null
    setContentDate: React.Dispatch<React.SetStateAction<Date | null>>
    addList: ()=>void,
    removeList: (id:number)=>void,
    inputForm : string,
    inputFormHandler : (e: React.MouseEvent<HTMLInputElement, MouseEvent>)=>void,
}

export const useVoteListState = ():voteListState =>{
    const [voteList, setVoteList] = useState<VoteContent[]>([]);//항목 리스트
    const [content, setContent] = useState<string>(''); //항목 (텍스트)
    const [contentDate, setContentDate] = useState<Date | null>(null);//항목 (날짜)
    const contentRef = useRef<HTMLInputElement>(null);
    const [inputForm, setInputForm] = useState<string>('TEXT'); //입력형식

    //List추가
    const addList = () => {
        let inputContent: string | null = null;

        if (inputForm === 'TEXT' && content !== '') {
            inputContent = content;
        } else if (inputForm === 'DATE' && contentDate !== null) {
            inputContent = dayjs(contentDate).locale('ko').format('YYYY년 MM월 DD일 (dd)');
        }
        if (inputContent === null) {
            window.alert('내용을 입력해주세요.');
            return;
        }
        const isDuplicate = voteList.some((value) => value.content === inputContent);

        if (isDuplicate) {
            window.alert('항목에 존재하는 내용입니다.');
        } else {
            const list: VoteContent = {
                id: Date.now(),
                content: inputContent
            };
            setVoteList([...voteList, list]);
            setContent('');
            setContentDate(null);
            if (contentRef.current) {
                contentRef.current.value = '';
            }
        }
    };

    //List 목록 삭제하기
    const removeList = (key: number) => {
        const newList: VoteContent[] = voteList.filter((current) => {
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
                setContentDate(null)
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

    return {voteList,setContent, contentDate, setContentDate ,contentRef, addList, removeList, inputForm ,inputFormHandler}
}