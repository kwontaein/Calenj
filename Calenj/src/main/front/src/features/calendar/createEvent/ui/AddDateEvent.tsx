
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {
    AddFriend_Button,
    AddFriend_Container,
    AddFriendIcon_Container,
    Category_Container,
    ContentIcon_Container,
    DateContentBottom_Container,
    DateEventTag_Container,
    DateEventTagContent,
    DateEventTagSelector_Container,
    DateEventTitle_Input,

    DateTopContent_Container,
    EventContent_Container,
    EventContent_TextArea,
    ModalButton_Container,
} from "./AddDateEventStyled";
import '../../../../shared/ui/DatePicker.scss';
import {DateSelectArg} from "@fullcalendar/react";
import {EventDatePickerView} from "./EventDatePickerView";
import {AddTodoList} from './AddTodoList'
import {RepeatEvent} from './RepeatEvent'


import {useAddDateEvent} from "../model/useAddDateEvent";
import {useDateEventTag} from "../model/useDateEventTag";
import {
    Modal_Background,
    Modal_Condition_Button,
    Modal_Container, ModalContent_Container,
    ModalTopBar_Container
} from "../../../../shared/ui/SharedStyled";
import {MultiSelector} from "../../../../shared/ui/MultiSelector";
import {useFetchUserDateEvent} from "../../../../entities/reactQuery/model/queryModel";



interface CalendarProps {
    onClose: () => void,
    selectInfo : DateSelectArg
}

export const AddDateEvent: React.FC<CalendarProps> = ({onClose,selectInfo}) => {
    const modalBackground = useRef<HTMLDivElement>(null);
    //eventState & repeatState
    const {repeatState, repeatDispatch, eventState, eventDispatch, todoState, postEvent, closeModal} = useAddDateEvent(onClose,selectInfo)
    const {formState, title, content} = eventState
    const {selectorOptionProps, setTag} =useDateEventTag(eventDispatch)


    return createPortal(
        <Modal_Background ref={modalBackground} onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (e.target === modalBackground.current && content === "" && title === "") {
                onClose();
            }
        }}>
            <Modal_Container style={{height: '530px'}}>
                <ModalTopBar_Container>
                    일정 추가
                </ModalTopBar_Container>
                <ModalContent_Container>
                    <DateTopContent_Container>
                        <DateEventTitle_Input onChange={(e: ChangeEvent<HTMLInputElement>) => eventDispatch({
                            type: 'SET_TITLE',
                            payload: e.target.value
                        })}
                                              type={"text"}
                                              placeholder={"제목 추가"}
                                              maxLength={30}/>
                        <DateEventTag_Container>
                            <DateEventTagContent>
                                지정태그
                            </DateEventTagContent>
                            <DateEventTagSelector_Container>
                                <MultiSelector options={selectorOptionProps()} setValue={setTag}/>
                            </DateEventTagSelector_Container>
                        </DateEventTag_Container>
                        <Category_Container>
                            <Modal_Condition_Button $isAble={formState === "promise"} onClick={() => eventDispatch({
                                type: 'SET_FORM_STATE',
                                payload: "promise"
                            })}>
                                약속일정
                            </Modal_Condition_Button>
                            <Modal_Condition_Button $isAble={formState === "todo"} onClick={() => eventDispatch({
                                type: 'SET_FORM_STATE',
                                payload: "todo"
                            })}
                            style={{marginInline: '5px'}}>
                                할 일
                            </Modal_Condition_Button>
                            <Modal_Condition_Button $isAble={formState === "schedule"} onClick={() => eventDispatch({
                                type: 'SET_FORM_STATE',
                                payload: "schedule"
                            })}>
                                스케줄
                            </Modal_Condition_Button>
                        </Category_Container>
                    </DateTopContent_Container>

                    <DateContentBottom_Container>
                        <EventDatePickerView eventState={eventState} eventDispatch={eventDispatch}/>
                    </DateContentBottom_Container>

                    {formState !== "schedule" &&
                        <EventContent_Container $formState={formState}>
                            <ContentIcon_Container>
                                {formState === "promise" &&
                                    <i className="bi bi-justify-left"></i>
                                }
                                {formState === "todo" &&
                                    <i className="bi bi-list-check"></i>
                                }
                            </ContentIcon_Container>
                            {formState === "promise" &&
                                <EventContent_TextArea $isNull={content === ""}
                                                       defaultValue={content}
                                                       onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                                           eventDispatch({type: 'SET_CONTENT', payload: e.target.value})
                                                       }}
                                                       placeholder={"내용을 입력해주세요."}>
                                </EventContent_TextArea>
                            }
                            {eventState.formState === "todo" && <AddTodoList todoList={todoState.todoList}
                                                                             contentRef={todoState.contentRef}
                                                                             setContent={todoState.setContent}
                                                                             addList={todoState.addList}
                                                                             removeItem={todoState.removeItem}/>}
                        </EventContent_Container>
                    }
                    {formState === "schedule" && <RepeatEvent eventState={eventState}
                                                              repeatState={repeatState}
                                                              repeatDispatch={repeatDispatch}/>}
                    {formState === "promise" &&
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
                        <Modal_Condition_Button onClick={closeModal} style={{marginRight: '5px'}}>
                            취소
                        </Modal_Condition_Button>
                        <Modal_Condition_Button
                            $isAble={title !== "" && ((formState === "promise" && content !== "") || (formState === "todo" && todoState.todoList.length > 0) || formState === "schedule")}
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
