import {
    CreateGroupEvent_Container, CreateGroupEvent_Wrapper, CreateGroupTop_Container,
    GroupEvent_RowBox, GroupEventItem_Title,
    GroupEventTitle_Input, LimitNum_Input
} from "./CreateGroupEventStyled";
import {EventDatePicker} from "../../../../../shared/ui/CustomDatePickerStyled";
import {ko} from "date-fns/locale/ko";
import React, {useEffect, useReducer, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    InputType_Radio,
    Modal_Background,
    Modal_Condition_Button,
    Radio_Label
} from "../../../../../shared/ui/SharedStyled";
import {GroupEventReducer, initialGroupEventState} from "../../../../../entities/group";
import {createGroupScheduleApi} from "../api/createGroupScheduleApi";

export const CreateGroupEvent:React.FC<{onClose:()=>void}> = ({onClose}) =>{
    const [groupEventState, dispatchGroupEvent] = useReducer(GroupEventReducer, initialGroupEventState);
    const {startDate, groupScheduleTitle, privacy, isLimit, maxPeople} = groupEventState
    const [month,setMonth] = useState<number>(startDate.getMonth())
    const modalBackground = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(!inputRef.current) return
        inputRef.current.focus()
    }, [inputRef,isLimit]);

    const createGroupSchedule = () =>{
        if(groupScheduleTitle==""){
            window.alert('제목을 입력해주세요')
            return
        }else if(isLimit && !maxPeople){
            window.alert('인원제한을 정확히 설정해주세요')
            return
        }
        createGroupScheduleApi(groupScheduleTitle,startDate,privacy, isLimit? maxPeople:0)
    }

    return(
        <Modal_Background ref={modalBackground} onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (e.target === modalBackground.current && groupScheduleTitle === "") {
                onClose();
            }
        }}>
        <CreateGroupEvent_Container>
            <CreateGroupTop_Container>
                그룹일정 생성하기
            </CreateGroupTop_Container>
                <CreateGroupEvent_Wrapper>
                <GroupEvent_RowBox>
                    <GroupEventItem_Title>
                        일정 제목 :
                    </GroupEventItem_Title>
                    <GroupEventTitle_Input value={groupScheduleTitle} onChange={(e)=>dispatchGroupEvent({type:'SET_TITLE',payload : e.target.value})} placeholder={'제목을 입력해주세요'}/>
                </GroupEvent_RowBox>
                <GroupEvent_RowBox>
                    <GroupEventItem_Title>
                        시작 날짜 :
                    </GroupEventItem_Title>
                    <div style={{marginLeft: '-8px'}}>
                    <EventDatePicker
                        dateFormat={'yy년 MM월 dd일 (EEE)'} // 날짜 형태
                        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                        selected={startDate}
                        onChange={(date:Date) => dispatchGroupEvent({type:'SET_START_DATE', payload: date})}
                        locale={ko}
                        minDate={new Date(new Date().setDate(new Date().getDate() + 1))} // minDate 이전 날짜 선택 불가
                        popperPlacement="right-start"
                        timeClassName={()=>"date-picker-time"}
                        onMonthChange={(date:Date)=>setMonth(date.getMonth())}
                        dayClassName={(d) =>
                            (d.getDate() === startDate.getDate() && d.getMonth() === startDate.getMonth())
                                ? 'custom-day selected-day'
                                : d.getMonth() === month
                                    ? 'custom-day'
                                    : 'custom-day gray-day'
                        }
                    />
                    </div>
                </GroupEvent_RowBox>
                <GroupEvent_RowBox>
                    <GroupEventItem_Title>
                        공개 범위 :
                    </GroupEventItem_Title>
                    <Radio_Label>
                        <InputType_Radio name='inputForm'
                                         defaultChecked={!privacy}
                                         onChange={(e)=>dispatchGroupEvent({type:'SET_PRIVACY', payload:true})}/>
                        <span style={{fontSize: '11px'}}>전체</span>
                    </Radio_Label>
                    <Radio_Label>
                        <InputType_Radio name='inputForm'
                                         defaultChecked={privacy}
                                         onChange={(e)=>dispatchGroupEvent({type:'SET_PRIVACY', payload:false})}/>
                        <span style={{fontSize: '11px'}}>참가자</span>
                    </Radio_Label>
                </GroupEvent_RowBox>
                <GroupEvent_RowBox>
                    <GroupEventItem_Title>
                        인원 제한 :
                    </GroupEventItem_Title>
                    <Radio_Label>
                        <InputType_Radio name='inputForm2'
                                         defaultChecked={!isLimit}
                                         onChange={()=>dispatchGroupEvent({type:'SET_IS_LIMIT', payload:false})}/>
                        <span style={{fontSize: '11px'}}>없음</span>
                    </Radio_Label>
                    <Radio_Label>
                        <InputType_Radio name='inputForm2'
                                         defaultChecked={isLimit}
                                         onChange={()=>dispatchGroupEvent({type:'SET_IS_LIMIT', payload:true})}/>
                        <span style={{fontSize: '11px'}}>있음</span>
                    </Radio_Label>
                    {isLimit &&
                        <>
                        <LimitNum_Input ref={inputRef}
                                        $numLength={(maxPeople+"").split("").length}
                                        defaultValue={maxPeople}
                                        maxLength={3}
                                        onChange={(e)=> dispatchGroupEvent({type:'SET_MAX_PEOPLE', payload: +e.target.value})}/>
                        <span style={{fontSize:'12px'}}>
                            명 제한
                        </span>
                        </>
                        }
                </GroupEvent_RowBox>
                <GroupEvent_RowBox style={{justifyContent:'right'}}>
                    <Modal_Condition_Button style={{height:"100%", width:'50px', marginRight:'10px'}} onClick={onClose}>
                        취소
                    </Modal_Condition_Button>
                    <Modal_Condition_Button $isAble={groupScheduleTitle!==''} style={{height:"100%", width:'50px'}} onClick={createGroupSchedule}>
                        생성
                    </Modal_Condition_Button>
                </GroupEvent_RowBox>
            </CreateGroupEvent_Wrapper>
        </CreateGroupEvent_Container>
        </Modal_Background>
    )
}