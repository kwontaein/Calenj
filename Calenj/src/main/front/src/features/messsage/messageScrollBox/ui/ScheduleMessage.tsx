import React, {useEffect, useId, useReducer, useRef, useState} from "react";
import {UserDateEvent} from "../../../../entities/reactQuery";
import {Modal_Background, ProfileContainer, TextColor} from "../../../../shared/ui/SharedStyled";
import {
    AdditionalInfo_Container, DateEventBottom_Container,
    DateEventContent_Container,
    DateEventDetail_Container,
    DateTime_Container,
    EventButton_Container,
    EventButtonIcon_Wrapper,
    EventDetailContent_Container,
    EventDetailContent_Wrapper,
    EventDetailIcon_Wrapper,
    EventOption_Container,
    EventTag_Container,
    EventTag_Wrapper,
    EventTime_Container,
    EventTimeContent_Wrapper, JoinFriendList_Container,
    PromiseContent_Container,
    RepeatEventContent_Wrapper,
    TitleContent_Container,
    TitleContent_Wrapper,
    TodoListContent_Container,
    TodoListItem_Wrapper
} from "../../../calendar/detail/ui/DateEventDetailStyled";
import {AHMFormat, shortAHMFormat2} from "../../../../shared/lib/dateFormat";
import {ShareDateView} from "../../../calendar/detail/ui/ShareDateView";

export const ScheduleMessage: React.FC<{ events: UserDateEvent }> = ({events}) => {
    const {repeatState, formState, content, todoList, tagKeys, friendList} = events.extendedProps
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const id = useId()
    const [isShared, setIsShare] = useReducer((prev) => !prev, false)

    return (
        <div>
            <DateEventDetail_Container style={{marginTop:'10px', width:`auto`}}>
                <EventOption_Container/>
                <TitleContent_Container>
                    <TitleContent_Wrapper style={{fontSize:'20px'}}>
                        {events.title}
                    </TitleContent_Wrapper>
                </TitleContent_Container>


                <EventDetailContent_Wrapper $isRepeat={formState === 'schedule'}>
                    <DateTime_Container style={{height:'25px'}}>
                        <EventDetailIcon_Wrapper style={{fontSize:'15px', marginTop:'0'}}>
                            <i className="fi fi-rr-clock-three"></i>
                        </EventDetailIcon_Wrapper>
                        <EventTimeContent_Wrapper style={{fontSize: '15px'}}>
                            {shortAHMFormat2(events.start as Date)}
                            {(shortAHMFormat2(events.start as Date) === shortAHMFormat2(events.end as Date) || formState === 'todo') ? '' : " ~ " + shortAHMFormat2(events.end as Date)}
                        </EventTimeContent_Wrapper>
                    </DateTime_Container>

                    <EventTime_Container>
                        {formState === 'todo' ?
                            "체크리스트" : `${AHMFormat(events.start as Date).slice(-8)} ~ ${AHMFormat(events.end as Date).slice(-8)}`
                        }
                    </EventTime_Container>

                    <DateEventContent_Container>
                        <EventDetailIcon_Wrapper style={{fontSize: '20px'}}>
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
                                    {repeatState.repeatMode === 'cycle' && `${repeatState.repeatNum}일 마다 반복`}
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
                {isShared ?
                    <ShareDateView onClose={setIsShare} scheduleId={events.id}/> :
                    <DateEventBottom_Container/>
                }
            </DateEventDetail_Container>
        </div>
    );
}