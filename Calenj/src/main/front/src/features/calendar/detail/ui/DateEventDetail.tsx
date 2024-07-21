import {DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/react";
import {Modal_Background, TextColor} from "../../../../shared/ui/SharedStyled";
import {useEffect, useId, useReducer, useRef, useState} from "react";
import {
    AdditionalInfo_Container,
    DateEventBottom_Container,
    DateEventContent_Container,
    DateEventDetail_Container,
    DateTime_Container, EventButton_Container,
    EventButtonIcon_Wrapper,
    EventDetailContent_Container,
    EventDetailContent_Wrapper,
    EventDetailIcon_Wrapper, EventOption_Container, EventTag_Container, EventTag_Wrapper,
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
import {AddDateEvent} from "../../createEvent";

interface EventDetailProps{
    eventDetail:EventApi,
    close:()=>void,
}

export const DateEventDetail : React.FC<EventDetailProps> =({eventDetail, close})=>{
    const modalBackground = useRef<HTMLDivElement>(null);
    const week = ["일","월","화","수","목","금","토"];
    const {repeatState,formState,content,todoList,tagKeys} = eventDetail._def.extendedProps
    const {dynamicEventTag} = useSelector((state: RootState) => state.dateEventTag)
    const id = useId()
    const [modify,setModify] = useState<boolean>(false);


    return(
        <>
        {modify ? <AddDateEvent onClose={()=>setModify(false)}
                                mode={'modify'}
                                event={eventDetail}/> :
        <Modal_Background style={{backgroundColor:'rgba(0, 0, 0, 0)'}} ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current) {
                close();
            }
        }}>
        <DateEventDetail_Container>
            <EventOption_Container>
                <EventTag_Container>
                    <div style={{fontSize:'10px', display:"flex", alignItems:"center", justifyContent:"center", marginRight:'5px', marginLeft:'50px'}}>적용된 태그</div>

                    {tagKeys.map((key:string)=>(
                        <EventTag_Wrapper key={key} $color={dynamicEventTag[key].color}>
                            {dynamicEventTag[key].name}
                        </EventTag_Wrapper>
                    ))}
                </EventTag_Container>

                <EventButton_Container>
                    <EventButtonIcon_Wrapper onClick={()=>setModify(true)}>
                        <i className="fi fi-sr-pencil"></i>
                    </EventButtonIcon_Wrapper>
                    <EventButtonIcon_Wrapper>
                        <i className="bi bi-share-fill"></i>
                    </EventButtonIcon_Wrapper>
                    <EventButtonIcon_Wrapper style={{backgroundColor: `rgb(0,0,0,0.3)`}} onClick={close}>
                        <i className="bi bi-x-lg"></i>
                    </EventButtonIcon_Wrapper>
                </EventButton_Container>
            </EventOption_Container>

            <TitleContent_Container>
                <TitleContent_Wrapper>
                    {eventDetail.title}
                </TitleContent_Wrapper>
            </TitleContent_Container>


            <EventDetailContent_Wrapper $isRepeat={formState === 'schedule'}>

                <DateTime_Container>
                    <EventDetailIcon_Wrapper>
                        <i className="fi fi-rr-clock-three"></i>
                    </EventDetailIcon_Wrapper>
                    <EventTimeContent_Wrapper>
                        {shortAHMFormat2(eventDetail.start as Date)}
                        {(shortAHMFormat2(eventDetail.start as Date) === shortAHMFormat2(eventDetail.end as Date) || formState === 'todo') ? '': " ~ "+ shortAHMFormat2(eventDetail.end as Date)}
                    </EventTimeContent_Wrapper>
                </DateTime_Container>

                <EventTime_Container>
                    {formState === 'todo' ?
                        "체크리스트" : `${AHMFormat(eventDetail.start as Date).slice(-8)} ~ ${AHMFormat(eventDetail.end as Date).slice(-8)}`
                    }
                </EventTime_Container>

                <DateEventContent_Container>
                    <EventDetailIcon_Wrapper style={{fontSize:'20px'}}>
                        {formState === 'todo' && <i className="bi bi-list-check"></i>}
                        {formState === 'promise' && <i className="bi bi-list-ul"></i>}
                        {(formState === 'schedule' && repeatState.repeat) &&
                            <i className="bi bi-arrow-repeat"></i>
                        }
                    </EventDetailIcon_Wrapper>

                    <EventDetailContent_Container>
                        {(formState === 'schedule' && repeatState.repeat) &&
                            <RepeatEventContent_Wrapper>
                                {repeatState.repeatMode==='week'&&  !repeatState.repeatWeek.every((item:boolean)=>item) && repeatState.repeatWeek.some((item:boolean)=> item) &&
                                `매주 ${repeatState.repeatWeek.map((item:boolean,index:number)=>{
                                    if(item){
                                        return week[index];
                                    }
                                }).join('').split("")} 마다 반복`}
                                {repeatState.repeatMode==='week'&& repeatState.repeatWeek.every((item:boolean)=>item) && '매주 반복'}
                                {repeatState.repeatMode==='cycle'&& `${repeatState.repeatMode}${repeatState.repeatNum}마다 반복`}
                            </RepeatEventContent_Wrapper>
                        }
                        {formState==="todo" &&
                            <TodoListContent_Container>
                                {todoList.map((todo:string,index : number)=>
                                    <TodoListItem_Wrapper key={id+index}>{todo}</TodoListItem_Wrapper>
                                )}
                            </TodoListContent_Container>
                        }
                        {formState==="promise" &&
                            <PromiseContent_Container>
                                {content}
                            </PromiseContent_Container>
                        }

                    </EventDetailContent_Container>
                </DateEventContent_Container>
                {formState!=="todo" && !(formState==='schedule' && !repeatState.repeat) &&
                    <AdditionalInfo_Container>
                        {formState === "promise" &&
                            <div style={{width:'calc(100% - 10px)', marginRight:'10px' }}>
                                <div style={{fontSize: '10px'}}>참여인원</div>
                                <div style={{width:'100%',display:'flex', alignItems:"center", justifyContent:'center', fontSize:'13px', color:`${TextColor}77`}}>지정한 인원이 없습니다.</div>
                            </div>
                        }
                        {(formState ==="schedule" && repeatState.repeat) &&

                            <div style={{fontSize:'13px'}}>
                                반복 시작일 : {shortAHMFormat2(repeatState.startTime)}
                                {repeatState.repeatDeadline !== "count" ?
                                    <div style={{fontSize: 'inherit'}}>
                                        반복 마감일 : {shortAHMFormat2(repeatState.endTime)}
                                    </div> :
                                    <div style={{fontSize: 'inherit'}}>
                                        반복 횟수 : {repeatState.repeatCount}회 반복
                                    </div>
                                }
                            </div>
                        }
                    </AdditionalInfo_Container>
                }
            </EventDetailContent_Wrapper>

            <DateEventBottom_Container>

            </DateEventBottom_Container>
        </DateEventDetail_Container>

        </Modal_Background>
        }
        </>
    )
}