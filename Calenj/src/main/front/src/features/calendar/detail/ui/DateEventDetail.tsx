import {EventClickArg} from "@fullcalendar/react";
import {Modal_Background, TextColor} from "../../../../shared/ui/SharedStyled";
import {useEffect, useId, useReducer, useRef, useState} from "react";
import {
    BottomLeft_Container,
    BottomRight_Container,
    DateEventBottom_Container,
    DateEventContent_Container,
    DateEventDetail_Container,
    DateEventTop_Container,
    DateEventTop_Wrapper,
    DateTime_Container,
    EventButton_Wrapper,
    EventDetailContent_Container,
    EventDetailContent_Wrapper,
    EventDetailIcon_Wrapper, EventTag_Wrapper,
    EventTime_Container,
    EventTimeContent_Wrapper, PromiseContent_Container, RepeatEventContent_Wrapper,
    TitleContent_Container,
    TitleContent_Wrapper, TodoListContent_Container, TodoListItem_Wrapper
} from "./DateEventDetailStyled";
import {AHMFormat, changeDateForm, shortAHMFormat} from "../../../../shared/lib";
import {shortAHMFormat2} from "../../../../shared/lib/dateFormat";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import styled from "styled-components";
import {DateEventOption} from "./DateEventOption";

interface EventDetailProps {
    eventDetail: EventClickArg,
    close: () => void,
}

export const DateEventDetail: React.FC<EventDetailProps> = ({eventDetail, close}) => {
    const modalBackground = useRef<HTMLDivElement>(null);
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const {repeatState, formState, content, todoList, tagKeys} = eventDetail.event._def.extendedProps
    const {dynamicEventTag} = useSelector((state: RootState) => state.dateEventTag)
    const [showOption, setShowOption] = useReducer((prev) => !prev, false)
    const id = useId()
    const optionRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (optionRef.current && !optionRef.current.contains(e.target as Node)) {
                setShowOption();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        if (!showOption) { //이벤트를 삭제하여 다른 곳을 클릭해도 안닫히도록 설정
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showOption, optionRef]);


    return (
        <Modal_Background ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current) {
                close();
            }
        }}>
            <DateEventDetail_Container $formState={formState}>
                <DateEventTop_Container>
                    <DateEventTop_Wrapper>
                        <TitleContent_Container>
                            <TitleContent_Wrapper>
                                {eventDetail.event.title}
                            </TitleContent_Wrapper>
                            <EventButton_Wrapper ref={optionRef}>
                                <i className="bi bi-three-dots" onClick={setShowOption}></i>
                                {showOption && <DateEventOption/>}
                            </EventButton_Wrapper>
                        </TitleContent_Container>

                        <EventDetailContent_Wrapper $isRepeat={formState === 'schedule'}>
                            <DateTime_Container>
                                <EventDetailIcon_Wrapper>
                                    <i className="fi fi-rr-clock-three"></i>
                                </EventDetailIcon_Wrapper>
                                <EventTimeContent_Wrapper>
                                    {shortAHMFormat2(eventDetail.event.start as Date)}
                                    {(shortAHMFormat2(eventDetail.event.start as Date) === shortAHMFormat2(eventDetail.event.end as Date) || formState === 'todo') ? '' : " ~ " + shortAHMFormat2(eventDetail.event.end as Date)}
                                </EventTimeContent_Wrapper>
                            </DateTime_Container>
                            <EventTime_Container>
                                {formState === 'todo' ?
                                    "체크리스트" : `${AHMFormat(eventDetail.event.start as Date).slice(-8)} ~ ${AHMFormat(eventDetail.event.end as Date).slice(-8)}`
                                }

                            </EventTime_Container>
                            <DateEventContent_Container>
                                <EventDetailIcon_Wrapper style={{alignItems: 'unset', fontSize: '25px'}}>
                                    {formState === 'todo' && <i className="bi bi-list-check"></i>}
                                    {formState === 'promise' && <i className="bi bi-list-ul"></i>}
                                    {(formState === 'schedule' && repeatState.repeat) &&
                                        <i className="bi bi-arrow-repeat"></i>
                                    }
                                </EventDetailIcon_Wrapper>
                                <EventDetailContent_Container>
                                    {(formState === 'schedule' && repeatState.repeat) &&
                                        <RepeatEventContent_Wrapper>
                                            {repeatState.repeatMode === 'week' && !repeatState.repeatWeek.every((item: boolean) => item) && repeatState.repeatWeek.some((item: boolean) => item) &&
                                                `매주 ${repeatState.repeatWeek.map((item: boolean, index: number) => {
                                                    if (item) {
                                                        return week[index];
                                                    }
                                                }).join('').split("")} 마다 반복`}
                                            {repeatState.repeatMode === 'week' && repeatState.repeatWeek.every((item: boolean) => item) && '매주 반복'}
                                            {repeatState.repeatMode === 'cycle' && `${repeatState.repeatMode}${repeatState.repeatNum}마다 반복`}
                                        </RepeatEventContent_Wrapper>
                                    }
                                    {formState === "todo" &&
                                        <TodoListContent_Container>
                                            {todoList.map((todo: string, index: number) =>
                                                <TodoListItem_Wrapper key={id + index}>{todo}</TodoListItem_Wrapper>
                                            )}
                                        </TodoListContent_Container>
                                    }
                                    {formState === "promise" &&
                                        <PromiseContent_Container>
                                            {content}
                                        </PromiseContent_Container>
                                    }

                                </EventDetailContent_Container>
                            </DateEventContent_Container>
                        </EventDetailContent_Wrapper>
                    </DateEventTop_Wrapper>
                </DateEventTop_Container>
                <DateEventBottom_Container>

                    {formState !== "todo" && !(formState === 'schedule' && !repeatState.repeat) &&
                        <BottomLeft_Container>
                            {formState === "promise" &&
                                <div style={{width: '100%'}}>
                                    <div style={{fontSize: '10px'}}>참여인원</div>
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: "center",
                                        justifyContent: 'center',
                                        fontSize: '13px',
                                        color: `${TextColor}77`
                                    }}>지정한 인원이 없습니다.
                                    </div>
                                </div>
                            }
                            {(formState === "schedule" && repeatState.repeat) &&

                                <div style={{fontSize: '13px', marginLeft: '10px'}}>
                                    반복 시작일 : {shortAHMFormat2(repeatState.startTime)}
                                    {repeatState.repeatDeadline !== "count" ?
                                        <div style={{fontSize: 'inherit'}}>
                                            반복 마감일 : {shortAHMFormat2(repeatState.endTime)}
                                        </div> :
                                        <div style={{fontSize: 'inherit', marginTop: '5px'}}>
                                            반복 횟수 : {repeatState.repeatCount}회 반복
                                        </div>
                                    }
                                </div>
                            }

                        </BottomLeft_Container>
                    }
                    <BottomRight_Container>
                        <div style={{fontSize: '10px'}}>적용된 태그</div>

                        {tagKeys.map((key: string, index: number) => (
                            <EventTag_Wrapper key={key} $color={dynamicEventTag[key].color} $isFirst={index === 0}>
                                {dynamicEventTag[key].name}
                            </EventTag_Wrapper>
                        ))}

                    </BottomRight_Container>

                </DateEventBottom_Container>
            </DateEventDetail_Container>

        </Modal_Background>
    )
}