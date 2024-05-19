import {
    AddVoteList_Btn,
    ListInput_Container,
    MiniVote_Input,
    VoteCounter_DatePicker, VoteType_Radio, VoteTypeRadio_Label, VoteTypeRadio_Lable_Container
} from "../../../../../style/Group/GroupVoteStyle";
import React, {ChangeEvent, useRef, useState} from "react";
import {ko} from "date-fns/locale/ko";
import dayjs from "dayjs";
import {VoteContent} from "../../../../../features/vote/makeVote";
import {useConfirm} from "../../../../../shared/model";

interface ChildProps {
    onDataChange: (data: VoteContent[]) => void;
    voteList: VoteContent[];
}

const ListInput: React.FC<ChildProps> = ({onDataChange, voteList}) => {
    const [content, setContent] = useState<string>(''); //항목 (텍스트)
    const [content_Date, setContent_Date] = useState<Date | null>(null);  //항목 (날짜)
    const [inputForm, setInputForm] = useState<string>('TEXT'); //입력형식
    // const datepickerRef =useRef<ReactDatePickerProps>()
    const contentRef = useRef<HTMLInputElement>(null);

    const dataSendToParent = (voteList: VoteContent[]) => {
        onDataChange(voteList); // 부모 컴포넌트에 데이터 전달
    };

    //model
    //List추가 -> 사용 state -> inputForm,content,content_date,contentRef,voteList
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
                const list: VoteContent = {
                    id: id,
                    content: inputContent
                }

                dataSendToParent([list]);
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

    //model
    //투표 항목유형 변경 -> voteList,contentDate,content,inputForm
    const inputFormHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const mutation = () => {
            setInputForm(e.currentTarget.value);

            dataSendToParent([]);

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
                , mutation
                , () => {
                    e.preventDefault()
                })
        }
    }

    return (
        <div>
            <ListInput_Container>
                {inputForm === 'TEXT' ?
                    <MiniVote_Input ref={contentRef}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                                    placeholder='항목 입력' maxLength={40}>
                    </MiniVote_Input>
                    :
                    <VoteCounter_DatePicker
                        dateFormat=' yyyy년 MM월 dd일 (EEE)' // 날짜 형태
                        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                        selected={content_Date}
                        onChange={(date: Date) => setContent_Date(date)}
                        placeholderText='날짜 선택'
                        locale={ko}
                    />
                }
                <AddVoteList_Btn onClick={() => addList()}>추가</AddVoteList_Btn>
            </ListInput_Container>
            <VoteTypeRadio_Lable_Container>
                <VoteTypeRadio_Label style={{fontSize: '13px'}}>
                    <VoteType_Radio type='radio' name='inputForm' value='TEXT'
                                    onClick={(e) => inputFormHandler(e)}
                                    defaultChecked/>텍스트
                </VoteTypeRadio_Label>
                <VoteTypeRadio_Label style={{fontSize: '13px'}}>
                    <VoteType_Radio type='radio' name='inputForm' value='DATE'
                                    onClick={(e) => inputFormHandler(e)}/>날짜
                </VoteTypeRadio_Label>
            </VoteTypeRadio_Lable_Container>
        </div>
    )
}
export default ListInput;