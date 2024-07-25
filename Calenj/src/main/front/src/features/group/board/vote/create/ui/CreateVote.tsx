import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {
    Modal_Background,
    Modal_Condition_Button, Modal_Container, ModalContent_Container, ModalTopBar_Container,
} from '../../../../../../shared/ui/SharedStyled';
import {useConfirm} from "../../../../../../shared/model";
import 'react-datepicker/dist/react-datepicker.css'
import {ko} from "date-fns/locale/ko";
import 'dayjs/locale/ko'; // 한국어 locale 추가
import {
    AddVoteList_Btn,
    BottomContent_Container,
    DatePicker_Styled,
    GroupVoteModal_Button_Container,
    ListInput_Container,
    MiniVote_Input,
    VoteCheckOption_Container,
    VoteCheckOption_Label,
    VoteCheckStyle_CheckBox,
    VoteCounter_DatePicker,
    VoteList_Container,
    VoteListContent_Drop_Btn,
    VoteListEmptyText,
    VoteListItem_Container,
    VoteListItem_Content,
    VoteSetting_Container,
    VoteType_Radio,
    VoteTypeRadio_Label, VoteTypeRadio_Label_Container,
} from "./CreateVoteStyled";
import {updateClickState} from "../../../../../../entities/redux";
import {useDispatch} from "react-redux";
import {useVoteListState} from "../model/useVoteListState";
import {useCreateVote} from "../model/useCreateVote";


export const CreateVote: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const {voteList, setContent, contentDate, setContentDate ,contentRef, addList, removeList, inputForm ,inputFormHandler} = useVoteListState()
    const [multipleOption, setMultipleOption] = useState<boolean>(false);//중복투표여부
    const [anonymousOption, setAnonymousOption] = useState<boolean>(false); //익명여부
    const inputRef = useRef<HTMLInputElement>(null);//focus를 위한 Ref
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() + 1)));
    const modalBackground = useRef<HTMLDivElement>(null);
    const createVote = useCreateVote(voteList, selectedDate, title, multipleOption, anonymousOption);
    const dispatch = useDispatch()
    const onClose = () => {
        dispatch(updateClickState({clickState:''}));
    };

    const closeModal = () => {
        if (voteList.length === 0 && title==="") {
            onClose();
            return
        }
        useConfirm('내용은 저장되지 않습니다. 정말로 취소하시겠습니까?', onClose, () => {})
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    return (
            <Modal_Background ref={modalBackground} onClick={(e : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                if (e.target === modalBackground.current && title === "" && voteList.length === 0) {
                    onClose();
                }
            }}>
                <Modal_Container style={{width:'440px', height:'500px'}}>
                    <ModalTopBar_Container>
                        투표 만들기
                    </ModalTopBar_Container>
                    <ModalContent_Container>


                    <MiniVote_Input onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                                ref={inputRef}
                                maxLength={30}
                                placeholder='투표 제목'/>

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
                                selected={contentDate}
                                onChange={(date:Date) => setContentDate(date)}
                                placeholderText='날짜 선택'
                                locale={ko}
                                timeClassName={()=>"date-picker-time"}
                            />
                        }
                        <AddVoteList_Btn onClick={() => addList()} >추가</AddVoteList_Btn>
                    </ListInput_Container>
                    <VoteTypeRadio_Label_Container>
                        <VoteTypeRadio_Label>
                            <VoteType_Radio type='radio' name='inputForm' value='TEXT'
                                onClick={(e) => inputFormHandler(e)}
                                defaultChecked/>텍스트
                        </VoteTypeRadio_Label>
                        <VoteTypeRadio_Label>
                            <VoteType_Radio type='radio' name='inputForm' value='DATE'
                            onClick={(e) => inputFormHandler(e)}/>날짜
                        </VoteTypeRadio_Label>
                    </VoteTypeRadio_Label_Container>
                    <VoteList_Container>
                    {voteList.length!==0 ?
                        (voteList.map((list) => (
                            <VoteListItem_Container key={list.id}>
                                <VoteListItem_Content>
                                    {list.content}
                                </VoteListItem_Content>
                                <VoteListContent_Drop_Btn
                                    onClick={() => removeList(list.id)}>
                                    <i className="fi fi-br-trash" style={{marginTop:'5px'}}></i>
                                </VoteListContent_Drop_Btn>
                            </VoteListItem_Container>
                        )))
                    :
                        <VoteListEmptyText>
                            항목을 추가해주세요
                        </VoteListEmptyText>
                    }
                    </VoteList_Container>
                    <BottomContent_Container>
                        <div style={{height: "4.3%"}}>투표 마감</div>
                        <VoteSetting_Container>
                            <DatePicker_Styled
                                dateFormat=' yy/MM/dd (EEE)  aa hh:mm 까지' // 날짜 형태
                                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                minDate={new Date(new Date().setDate(new Date().getDate() + 1))} // minDate 이전 날짜 선택 불가
                                maxDate={new Date(new Date().setDate(new Date().getDate() + 6))}//최대 날짜를 현재기준 일주일까지
                                showTimeSelect //시간선택
                                timeFormat="HH:mm" //시간 포맷
                                timeIntervals={15} //시간 단위
                                selected={selectedDate}
                                onChange={(date:Date) => setSelectedDate(date)}
                                className='DatePicker'
                                placeholderText='날짜 선택'
                                locale={ko}
                                timeClassName={()=>"date-picker-time"}
                            />
                            <VoteCheckOption_Container>
                                <VoteCheckOption_Label>
                                    <VoteCheckStyle_CheckBox type='checkBox' name='choice'
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setMultipleOption(e.target.checked)
                                    }}/>복수선택
                                </VoteCheckOption_Label>
                                <VoteCheckOption_Label>
                                    <VoteCheckStyle_CheckBox type='checkBox' name='anonymous'
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setAnonymousOption(e.target.checked)
                                    }}/>익명투표
                                </VoteCheckOption_Label>
                            </VoteCheckOption_Container>
                        </VoteSetting_Container>
                        <GroupVoteModal_Button_Container>
                            <Modal_Condition_Button style={{marginRight:"5px"}}onClick={closeModal}>
                                취소
                            </Modal_Condition_Button>
                            <Modal_Condition_Button $isAble={voteList.length>1 && title!==""}
                                                   onClick={createVote}>
                                생성
                            </Modal_Condition_Button>
                        </GroupVoteModal_Button_Container>
                    </BottomContent_Container>
                </ModalContent_Container>
            </Modal_Container>

        </Modal_Background>
    )
}