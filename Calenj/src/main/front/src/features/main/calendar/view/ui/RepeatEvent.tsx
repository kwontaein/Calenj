import {
    CustomSelect,
    EventTime_container,
    EventTimeIcon_Container,
    EventTimePicker, InfoIcon_Container, PatternContent, PatternContent_Container,
    RepeatBottom_Container, RepeatButton_Container,
    RepeatCheckState_Div,
    RepeatContent_Container, RepeatEndDatePicker,
    RePeatEvent_Container,
    RepeatIcon_Container,
    RepeatNum_Input,
    RepeatState_Container,
    RepeatText_Container, RepeatWeek_Container, SelectContainer,
} from "./RePeatEventStyled";
import React, {ChangeEvent, useEffect, useReducer, useState} from "react";
import {ko} from "date-fns/locale/ko";
import {
    EventDateAction,
    EventDateState,
    RepeatAction,
    RepeatState
} from "../../../../../entities/calendar";
import {CheckBox_Label, CheckBoxStyle} from "../../../../../shared/ui/SharedStyled";
import {InfoBox} from "../../../../../shared/ui/InfoBox";
import {repeat} from "rrule/dist/esm/helpers";


interface EventDateProps {
    eventState: EventDateState;
    eventDispatch: React.Dispatch<EventDateAction>;
    repeatState: RepeatState;
    repeatDispatch: React.Dispatch<RepeatAction>;
}

export const RepeatEvent: React.FC<EventDateProps> = ({eventState, eventDispatch, repeatState, repeatDispatch}) => {
    const [hoverState,setHoverState] = useState<string>("")

    useEffect(() => {
        if(!repeatState.repeat){
            repeatDispatch({type:'SET_REPEAT_DEADLINE', payload:''})
            repeatDispatch({type:'SET_REPEAT_MODE', payload:''})
        }
    }, [repeatState.repeat]);


    const selectWeek = (week:number) =>{
        repeatDispatch({type:'SET_REPEAT_WEEK', payload:repeatState.repeatWeek.map((item,index)=> index=== week ? !item : item)})
    }

    const changeStartTime = (startTime: Date) =>{
        if( repeatState.endTime < startTime){
            window.alert('시작 시간이 마감시간보다 커질 수 없습니다.')
        }else{
            repeatDispatch({type: 'SET_START_TIME', payload: startTime})
        }
    }
    const changeEndTime = (endTime: Date) =>{
        if( repeatState.startTime > endTime){
            window.alert('마감시간이 시작시간보다 작아질 수 없습니다.')
        }else{
            repeatDispatch({type: 'SET_END_TIME', payload: endTime})
        }
    }

    return (
        <RePeatEvent_Container>
            <EventTime_container>
                <EventTimeIcon_Container>
                    <i className="bi bi-clock-history"></i>
                </EventTimeIcon_Container>
                <EventTimePicker
                    selected={repeatState.startTime}
                    onChange={(date: Date) => changeStartTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="시작시간"
                    dateFormat="HH시 mm분 부터"
                    timeClassName={() => "date-picker-time"}
                />
                <EventTimePicker
                    selected={repeatState.endTime}
                    onChange={(date: Date) => changeEndTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="마감시간"
                    dateFormat="HH시 mm분까지"
                    timeClassName={() => "date-picker-time"}
                />
            </EventTime_container>


            <RepeatBottom_Container>
                <RepeatIcon_Container>
                    <i className="bi bi-arrow-repeat"></i>
                </RepeatIcon_Container>
                <RepeatContent_Container>
                    <RepeatButton_Container>
                        <RepeatCheckState_Div $isClick={repeatState.repeat}
                                              onClick={() => repeatDispatch({
                                                  type: 'SET_REPEAT',
                                                  payload: !repeatState.repeat
                                              })}>
                            일정 반복
                        </RepeatCheckState_Div>

                    </RepeatButton_Container>

                    <RepeatState_Container $isClick={repeatState.repeat}>
                        <RepeatText_Container>
                            <InfoIcon_Container>
                                <i className="bi bi-check2-circle"></i>
                            </InfoIcon_Container>
                            <b style={{fontSize: '15px'}}>
                                반복형식
                            </b>
                            <CheckBox_Label style={{marginRight: '0'}}
                                            onMouseEnter={()=>setHoverState("주기")}
                                            onMouseLeave={()=>setHoverState("")}>
                                <CheckBoxStyle disabled={!repeatState.repeat} type={"checkbox"}
                                               checked={repeatState.repeatMode==="cycle"}
                                               onChange={()=>repeatDispatch({type:'SET_REPEAT_MODE', payload:"cycle"})}></CheckBoxStyle>
                                주기
                            </CheckBox_Label>
                            {hoverState==="주기" &&
                                <InfoBox marginLeft={95} marginTop={-55} text={"특정 주기로 반복설정을 할 수 있습니다."}/>
                            }


                            <CheckBox_Label onMouseEnter={()=>setHoverState("요일")}
                                            onMouseLeave={()=>setHoverState("")}>
                                <CheckBoxStyle disabled={!repeatState.repeat} type={"checkbox"}
                                               checked={repeatState.repeatMode==="week"}
                                               onChange={()=>repeatDispatch({type:'SET_REPEAT_MODE', payload:"week"})}></CheckBoxStyle>
                                요일
                            </CheckBox_Label>
                            {hoverState==="요일" &&
                                <InfoBox marginLeft={153} marginTop={-55} text={"지정한 요일로 반복설정을 할 수 있습니다."}/>
                            }
                        </RepeatText_Container>

                        <RepeatText_Container>
                            {repeatState.repeatMode ==="cycle" &&
                                <RepeatText_Container>
                                    <RepeatNum_Input type={"number"}
                                                     $numLength={(repeatState.repeatNum + "").split("").length}
                                                     readOnly={!repeatState.repeat}
                                                     defaultValue={repeatState.repeatNum}
                                                     onChange={(e: ChangeEvent<HTMLInputElement>) => repeatDispatch({
                                                         type: 'SET_REPEAT_NUM',
                                                         payload: +e.target.value
                                                     })}>

                                    </RepeatNum_Input>

                                    <SelectContainer>
                                        <CustomSelect value={repeatState.repeatOption} disabled={!repeatState.repeat}
                                                      onChange={(e: ChangeEvent<HTMLSelectElement>) => repeatDispatch({
                                                          type: 'SET_REPEAT_OPTION',
                                                          payload: e.target.value
                                                      })}>
                                            <option value="일">일</option>
                                            <option value="주">주</option>
                                            <option value="달">달</option>
                                            <option value="년">년</option>
                                        </CustomSelect>
                                        <p style={{margin:'0'}}>마다 반복</p>
                                    </SelectContainer>
                                </RepeatText_Container>
                            }
                            {repeatState.repeatMode ==="week" &&
                                <PatternContent_Container>
                                    <PatternContent $isClick={repeatState.repeatWeek[0]}
                                                    onClick={()=> selectWeek(0)}>
                                        일
                                    </PatternContent>
                                    <PatternContent $isClick={repeatState.repeatWeek[1]}
                                                    onClick={()=> selectWeek(1)}>
                                        월
                                    </PatternContent>
                                    <PatternContent $isClick={repeatState.repeatWeek[2]}
                                                    onClick={()=> selectWeek(2)}>
                                        화
                                    </PatternContent>
                                    <PatternContent $isClick={repeatState.repeatWeek[3]}
                                                    onClick={()=> selectWeek(3)}>
                                        수
                                    </PatternContent>
                                    <PatternContent $isClick={repeatState.repeatWeek[4]}
                                                    onClick={()=> selectWeek(4)}>
                                        목
                                    </PatternContent>
                                    <PatternContent $isClick={repeatState.repeatWeek[5]}
                                                    onClick={()=> selectWeek(5)}>
                                        금
                                    </PatternContent>
                                    <PatternContent $isClick={repeatState.repeatWeek[6]}
                                                    onClick={()=> selectWeek(6)}>
                                        토
                                    </PatternContent>
                                </PatternContent_Container>


                            }
                        </RepeatText_Container>

                        <RepeatText_Container style={{marginTop: "15px"}}>
                            <InfoIcon_Container>
                                <i className="bi bi-check2-circle"></i>
                            </InfoIcon_Container>
                            <b style={{fontSize:'15px'}}>
                                반복마감
                            </b>
                            <CheckBox_Label style={{marginRight: '0'}}
                                            onMouseEnter={()=>setHoverState("기간")}
                                            onMouseLeave={()=>setHoverState("")}>
                                <CheckBoxStyle disabled={!repeatState.repeat} type={"checkbox"}
                                               checked={repeatState.repeatDeadline==="date"}
                                               onChange={()=>repeatDispatch({type:'SET_REPEAT_DEADLINE', payload:'date'})}></CheckBoxStyle>
                                기간
                            </CheckBox_Label>
                            {hoverState==="기간" &&
                                <InfoBox marginLeft={95} marginTop={-55} text={"설정한 기간까지 일정을 반복합니다."}/>
                            }
                            <CheckBox_Label onMouseEnter={()=>setHoverState("횟수")}
                                            onMouseLeave={()=>setHoverState("")}>
                                <CheckBoxStyle disabled={!repeatState.repeat} type={"checkbox"}
                                               checked={repeatState.repeatDeadline==="count"}
                                               onChange={()=>repeatDispatch({type:'SET_REPEAT_DEADLINE', payload:'count'})}></CheckBoxStyle>
                                횟수
                            </CheckBox_Label>
                            {hoverState==="횟수" &&
                                <InfoBox marginLeft={153} marginTop={-55} text={"설정한 횟수만큼만 일정을 반복합니다."}/>
                            }
                        </RepeatText_Container>

                        <RepeatText_Container>
                            {repeatState.repeatDeadline === "date" &&
                                <RepeatEndDatePicker
                                    disabled={!repeatState.repeat}
                                    dateFormat={'yy.MM.dd 까지 반복'} // 날짜 형태
                                    shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                    selected={repeatState.repeatEnd}
                                    onChange={(date: Date) => repeatDispatch({
                                        type: 'SET_REPEAT_END',
                                        payload: date
                                    })}
                                    minDate={eventState.startDate}
                                    locale={ko}
                                />
                            }
                            {repeatState.repeatDeadline === "count" &&
                                <>
                                    <RepeatNum_Input type={"number"}
                                                     $numLength={(repeatState.repeatCount + "").split("").length}
                                                     readOnly={!repeatState.repeat}
                                                     defaultValue={repeatState.repeatCount}
                                                     onChange={(e: ChangeEvent<HTMLInputElement>) => repeatDispatch({
                                                         type: 'SET_REPEAT_COUNT',
                                                         payload: +e.target.value
                                                     })}/>
                                    번만 반복
                                </>
                            }
                        </RepeatText_Container>

                    </RepeatState_Container>
                </RepeatContent_Container>

            </RepeatBottom_Container>
        </RePeatEvent_Container>
    )
}