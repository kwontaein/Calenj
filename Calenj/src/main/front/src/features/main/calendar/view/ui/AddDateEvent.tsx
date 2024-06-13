import {
    Modal_Background,
    Modal_Condition_Button,
    Modal_Container,
    ModalContent_Container,
    ModalTopBar_Container
} from "../../../../../shared/ui/SharedStyled";
import React, {ChangeEvent, useCallback, useEffect, useReducer, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {
    AddFriend_Button,
    AddFriend_Container,
    AddFriendIcon_Container,
    Category_Container,
    ContentIcon_Container,
    DateContentBottom_Container,
    DateEventTag_Container, DateEventTagColor,
    DateEventTagContent,
    DateEventTagSelector_Container,
    DateEventTitle_Input,

    DateTopContent_Container,
    EventContent_Container,
    EventContent_TextArea,
    ModalButton_Container,
} from "./AddDateEventStyled";
import {useConfirm} from "../../../../../shared/model";
import '../../../../../shared/ui/DatePicker.scss';
import {DateSelectArg, EventApi} from "@fullcalendar/react";
import {
    EventDateReducer,
    initialEventDateState,
    initialRepeatState,
    RepeatReducer,
    RepeatState
} from "../../../../../entities/calendar";
import {useTodoList} from "../model/useTodoList";
import {EventDatePickerView} from "./EventDatePickerView";
import {AddTodoList} from './AddTodoList'
import {RepeatEvent} from './RepeatEvent'
import {ByWeekday, Options, RRule, Weekday} from "rrule";;
import {DateEvent, RepeatOption} from "../model/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../entities/redux";
import {FormatOptionLabelMeta, MultiValue} from "react-select";
import {ColorOption, CustomSelector} from "../../../../../shared/ui/CustomSelector";


interface CalendarProps{
    onClose : ()=>void,
    selectInfo: DateSelectArg,
}
export const AddDateEvent : React.FC<CalendarProps> = ({onClose,selectInfo}) =>{
    const calendarApi = selectInfo?.view.calendar;
    const modalBackground = useRef<HTMLDivElement>(null);
    function adjustDate(dateStr: string, allDay: boolean): Date {
        const date = new Date(dateStr);
        if (allDay) {
            date.setHours(date.getHours()-9);
        }
        return date;
    }
    const initialAdjustedStartDate = adjustDate(selectInfo.startStr, selectInfo.allDay);
    const initialAdjustedEndDate = adjustDate(selectInfo.endStr, selectInfo.allDay);

    const [eventState, eventDispatch] = useReducer(EventDateReducer, {
        ...initialEventDateState,
        startDate: initialAdjustedStartDate,
        endDate: initialAdjustedEndDate,
        formState: selectInfo.allDay ? 'todo' : 'promise'
    });
    const [repeatState, repeatDispatch] = useReducer(RepeatReducer, initialRepeatState);
    const {formState,startDate,endDate, title, content, backgroundColor, tagKeys} = eventState
    const {todoList, contentRef, setContent, addList, removeItem} = useTodoList();

    const {dynamicEventTag} = useSelector((state:RootState) => state.dateEventTag)

    const closeModal =()=>{
        if(title==="" && content===""){
            onClose()
        }else{
            useConfirm("내용은 저장되지 않습니다. 정말로 취소하시겠습니까?", onClose,()=>{})
        }
    }

    useEffect(() => {
        if(startDate>endDate){
            eventDispatch({type:'SET_END_DATE', payload: new Date(+startDate + 1800000)})
        }
    }, [startDate]);

    const setTag = (values:MultiValue<ColorOption>) =>{
        if(values.length >0){
            eventDispatch({type:'SET_BG_COLOR', payload: values[0].color})
        }else{
            eventDispatch({type:'SET_BG_COLOR', payload: ''})
        }
        const tagIdList = values.map((value)=>value.id)
        eventDispatch({type:'SET_TAG_KEYS', payload: tagIdList})
    }


    const postEvent = () =>{
        const {repeat,repeatMode,repeatOption, repeatDeadLine, repeatNum, repeatCount, repeatWeek, repeatEnd,startTime,endTime} = repeatState

        if (title===""){
            window.alert('제목을 입력해주세요.')
            return
        }
        if(formState==="promise" && content===""){
            window.alert('내용을 입력해주세요.')
            return
        }else if(formState ==="todo" && todoList.length ===0){
            window.alert('할 일을 추가해주세요.')
            return
        }else if(backgroundColor ===""){
            window.alert('한 개 이상의 태그를 선택해주세요.')
        }

        if(repeat){
            if(repeatMode==="" || repeatDeadLine ===""){
                window.alert('반복 설정을 해주세요')
                return
            }
            if(repeatMode==="cycle" && repeatNum < 1){
                window.alert('반복 주기를 1이상의 값으로 설정해주세요')
                return
            }
            if(repeatMode === "week" && repeatWeek.indexOf(true)<0){
                window.alert('반복할 요일을 하나이상 선택해주세요.')
                return;
            }
            if(repeatDeadLine==="count" && repeatCount<1){
                window.alert('반복 횟수를 1이상으로 설정해주세요')
                return
            }
            if(startTime>endTime){
                window.alert('시작시간이 끝나는 시간보다 클 수 없습니다.')
                return
            }
            if(repeatDeadLine==="date" && (repeatEnd<startDate)){
                window.alert('반복마감 기간을 설정한 시작날짜 이후로 설정해주세요.')
                return
            }
        }


        const weekArr = [RRule.SU,RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA]

        const freqHash = {
            일: RRule.DAILY,
            주: RRule.WEEKLY,
            달: RRule.MONTHLY,
            년: RRule.YEARLY
        };

        const event : DateEvent = {
            id: Date.now().toString(),
            title:title,
            start: startDate,
            end: endDate,
            backgroundColor: backgroundColor,
            borderColor : backgroundColor,
            allDay: formState==="todo",
            extendedProps :{
                tagKeys:tagKeys,
                formState:formState,
                content: content,
                todoList: [...todoList],
                repeatState:repeatState,
            },
        }
        if(repeat){
            const options: Partial<Options> = {
                dtstart: event.start,
            };

            if(repeatMode==="cycle"){
                options.freq = freqHash[repeatOption as RepeatOption];
                options.interval = repeatNum;
            }else if(repeatMode==="week"){
                options.freq = RRule.WEEKLY;
                const byWeekData: string | number | Weekday | ByWeekday[] | null | undefined =[];
                repeatWeek.forEach((week,index)=>{
                    if(week){
                        byWeekData.push(weekArr[index])
                    }
                })
                options.byweekday =byWeekData;
            }
            if(repeatDeadLine ==="count"){
                options.count = repeatCount;
            }else if(repeatDeadLine ==="date"){
                options.until = repeatEnd;
            }
            options.byhour = startTime.getHours();
            options.byminute = startTime.getMinutes();
            event.duration ={ milliseconds: endTime.getTime() - startTime.getTime()};
            event.rrule = options
            console.log(options)
        }
        calendarApi.addEvent(event)

        window.alert('일정이 생성되었습니다.');
        onClose()
    }



    const customSelectorProps = ():ColorOption[] =>{
        const options:ColorOption[] =[]
        Object.keys(dynamicEventTag).map((id)=>{
            const option:ColorOption ={
                id: id,
                value : dynamicEventTag[id].name,
                label :dynamicEventTag[id].name,
                color: dynamicEventTag[id].color,
                isDisabled: dynamicEventTag[id].name==='그룹 일정',

            }
            options.push(option)
        })
        return options
    }

    //eventSave

    return createPortal(
        <Modal_Background ref={modalBackground} onClick={(e : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (e.target === modalBackground.current && content==="" && title ==="") {
                onClose();
            }}}>
            <Modal_Container style={{height:'530px'}}>
                <ModalTopBar_Container>
                    일정 추가
                </ModalTopBar_Container>
                <ModalContent_Container>
                    <DateTopContent_Container>
                        <DateEventTitle_Input onChange={(e:ChangeEvent<HTMLInputElement>)=>eventDispatch({type:'SET_TITLE', payload: e.target.value})}
                                              type={"text"}
                                              placeholder={"제목 추가"}
                                              maxLength={30}/>
                        <DateEventTag_Container>
                            <DateEventTagContent>
                                지정태그
                            </DateEventTagContent>
                            <DateEventTagSelector_Container>
                                <CustomSelector options={customSelectorProps()} setValue={setTag}/>

                            </DateEventTagSelector_Container>
                        </DateEventTag_Container>
                        <Category_Container>
                            <Modal_Condition_Button $isAble={formState==="promise"} onClick={()=>eventDispatch({type:'SET_FORM_STATE', payload: "promise"})}>
                                약속일정
                            </Modal_Condition_Button>
                            <Modal_Condition_Button  $isAble={formState==="todo"} onClick={()=>eventDispatch({type:'SET_FORM_STATE', payload: "todo"})}
                                                     style={{marginInline:'5px'}}>
                                할 일
                            </Modal_Condition_Button>
                            <Modal_Condition_Button  $isAble={formState==="schedule"} onClick={()=>eventDispatch({type:'SET_FORM_STATE', payload: "schedule"})}>
                                스케줄
                            </Modal_Condition_Button>
                        </Category_Container>
                    </DateTopContent_Container>

                    <DateContentBottom_Container>
                        <EventDatePickerView eventState={eventState} eventDispatch={eventDispatch}/>
                    </DateContentBottom_Container>

                    {formState !=="schedule" &&
                        <EventContent_Container $formState={formState}>
                            <ContentIcon_Container>
                                {formState ==="promise" &&
                                    <i className="bi bi-justify-left"></i>
                                }
                                {formState === "todo" &&
                                    <i className="bi bi-list-check"></i>
                                }
                            </ContentIcon_Container>
                            {formState ==="promise" &&
                                <EventContent_TextArea $isNull={content===""}
                                                       defaultValue={content}
                                                       onChange={(e:ChangeEvent<HTMLTextAreaElement>)=> {
                                                           eventDispatch({type:'SET_CONTENT', payload: e.target.value})
                                                       }}
                                                       placeholder={"내용을 입력해주세요."}>
                                </EventContent_TextArea>
                            }
                            {eventState.formState ==="todo" && <AddTodoList todoList={todoList}
                                                                            contentRef={contentRef}
                                                                            setContent={setContent}
                                                                            addList={addList}
                                                                            removeItem={removeItem}/>}
                        </EventContent_Container>
                    }
                    {formState==="schedule" && <RepeatEvent eventState={eventState}
                                                            eventDispatch={eventDispatch}
                                                            repeatState={repeatState}
                                                            repeatDispatch={repeatDispatch}/>}
                    {formState ==="promise" &&
                        <AddFriend_Container>
                            <AddFriendIcon_Container>
                                <i className="fi fi-sr-user-add"></i>
                            </AddFriendIcon_Container>
                            <AddFriend_Button>
                                나의 친구
                            </AddFriend_Button>
                        </AddFriend_Container>
                    }

                    <ModalButton_Container>
                        <Modal_Condition_Button onClick={closeModal} style={{marginRight:'5px'}}>
                            취소
                        </Modal_Condition_Button>
                        <Modal_Condition_Button $isAble={title!=="" && ((formState==="promise" && content !=="") || (formState==="todo" && todoList.length > 0) || formState==="schedule")}
                                                onClick={postEvent}>
                            생성
                        </Modal_Condition_Button>

                    </ModalButton_Container>
                </ModalContent_Container>
            </Modal_Container>
        </Modal_Background>,
        document.body
    )
}
