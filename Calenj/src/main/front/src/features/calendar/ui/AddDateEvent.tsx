import {
    Modal_Background,
    Modal_Condition_Button,
    Modal_Container,
    ModalContent_Container,
    ModalTopBar_Container
} from "../../../shared/ui/SharedStyled";
import React, {ChangeEvent, useEffect, useReducer, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {
    AddFriend_Button, AddFriend_Container, AddFriendIcon_Container,
    Category_Container,
    CategoryContent,
    CategoryItems_Container, ContentIcon_Container,
    DateContentBottom_Container,
    DateEventTitle_Input,

    DateTopContent_Container, EventContent_Container,
    EventContent_TextArea,
    ModalButton_Container,
} from "./AddDateEventStyled";
import {useConfirm} from "../../../shared/model";
import '../../../shared/ui/DatePicker.scss';
import {DateSelectArg} from "@fullcalendar/react";
import {AddTodoList} from "./AddTodoList";
import {RepeatEvent} from "./RepeatEvent";
import {EventDateReducer, initialEventDateState, initialRepeatState, RepeatReducer} from "../../../entities/calendar";
import {EventDatePickerView} from "./EventDatePickerView";
import {useTodoList} from "../model/useTodoList";
import {createEventId} from "../utils/event-utils";

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
        formState: selectInfo.allDay ? 'B' : 'A'
    });
    const [repeatState, repeatDispatch] = useReducer(RepeatReducer, initialRepeatState);
    const {formState,startDate,endDate, title, content} = eventState
    const {todoList, contentRef, setContent, addList, removeItem} = useTodoList();

    const closeModal = ()=>{
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


    const postEvent = () =>{
        const eventId =createEventId()
        calendarApi.unselect();
        console.log(selectInfo.startStr)
        if(formState==="A" && title && content){


            calendarApi.addEvent({
                id: eventId,
                title,
                start: startDate,
                end: endDate,
                allDay: false
            });
            onClose()

        }else if(formState ==="B" && todoList.length >0){

            calendarApi.addEvent({
                id: eventId,
                title,
                todoList: [...todoList],
                start: startDate,
                end: endDate,
                allDay: true
            });
            onClose()

        }else if(formState ==="C"){
            calendarApi.addEvent({
                id: eventId,
                title,
                start: startDate.setHours(repeatState.startTime.getHours(), repeatState.startTime.getMinutes()),
                end: startDate.setHours(repeatState.endTime.getHours(), repeatState.endTime.getMinutes()),
                allDay: false,
            })
            onClose()
        }

    }


    return createPortal(
        <Modal_Background ref={modalBackground} onClick={(e : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (e.target === modalBackground.current && content==="" && title ==="") {
                onClose();
            }}}>
            <Modal_Container>
                <ModalTopBar_Container>
                    일정 추가
                </ModalTopBar_Container>
                <ModalContent_Container>

                    <DateTopContent_Container>
                        <DateEventTitle_Input onChange={(e:ChangeEvent<HTMLInputElement>)=>eventDispatch({type:'SET_TITLE', payload: e.target.value})}
                                              type={"text"}
                                              placeholder={"제목 추가"}
                                              maxLength={30}/>
                        <Category_Container>
                            <CategoryContent>
                                카테고리
                            </CategoryContent>
                            <CategoryItems_Container>
                                <Modal_Condition_Button $isAble={formState==="A"} onClick={()=>eventDispatch({type:'SET_FORM_STATE', payload: "A"})}>
                                    약속일정
                                </Modal_Condition_Button>
                                <Modal_Condition_Button  $isAble={formState==="B"} onClick={()=>eventDispatch({type:'SET_FORM_STATE', payload: "B"})}
                                                      style={{marginInline:'5px'}}>
                                    할 일
                                </Modal_Condition_Button>
                                <Modal_Condition_Button  $isAble={formState==="C"} onClick={()=>eventDispatch({type:'SET_FORM_STATE', payload: "C"})}>
                                    스케줄
                                </Modal_Condition_Button>
                            </CategoryItems_Container>
                        </Category_Container>
                    </DateTopContent_Container>

                    <DateContentBottom_Container>
                        <EventDatePickerView eventState={eventState} eventDispatch={eventDispatch}/>
                    </DateContentBottom_Container>

                    {formState !=="C" &&
                        <EventContent_Container $formState={formState}>
                            <ContentIcon_Container>
                                {formState ==="A" &&
                                    <i className="fi fi-sr-menu-burger"></i>
                                }
                                {formState === "B" &&
                                    <i className="fi fi-sr-list"></i>
                                }
                            </ContentIcon_Container>
                            {formState ==="A" &&
                            <EventContent_TextArea $isNull={content===""}
                                                   defaultValue={content}
                                                   onChange={(e:ChangeEvent<HTMLTextAreaElement>)=> {
                                                       eventDispatch({type: 'SET_CONTENT', payload: e.target.value})
                                                   }}
                                                   placeholder={"내용을 입력해주세요."}>
                            </EventContent_TextArea>
                            }
                            {eventState.formState ==="B" && <AddTodoList todoList={todoList}
                                                                         contentRef={contentRef}
                                                                         setContent={setContent}
                                                                         addList={addList}
                                                                         removeItem={removeItem}/>}
                        </EventContent_Container>
                    }
                    {formState==="C" && <RepeatEvent eventState={eventState}
                                                     eventDispatch={eventDispatch}
                                                     repeatState={repeatState}
                                                     repeatDispatch={repeatDispatch}/>}
                    {formState ==="A" &&
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
                        <Modal_Condition_Button $isAble={title!=="" && (formState==="A" && content !=="") || (formState==="B" && todoList.length > 0) || formState==="C"}
                                                style={{marginRight:'5px'}}
                                                onClick={postEvent}>
                            생성
                        </Modal_Condition_Button>
                        <Modal_Condition_Button onClick={closeModal}>
                            취소
                        </Modal_Condition_Button>
                    </ModalButton_Container>
                </ModalContent_Container>
            </Modal_Container>
        </Modal_Background>,
        document.body
    )
}
