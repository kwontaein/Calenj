import {
    CustomSelect,
    EventTime_container,
    EventTimeIcon_Container,
    EventTimePicker,
    RepeatBottom_Container,
    RepeatCheckState_Div,
    RepeatContent_Container, RepeatEndDatePicker,
    RePeatEvent_Container,
    RepeatIcon_Container,
    RepeatNum_Input,
    RepeatState_Container,
    RepeatText_Container, SelectContainer,
} from "./RePeatEventStyled";
import React, {ChangeEvent, useEffect, useReducer, useState} from "react";
import {ko} from "date-fns/locale/ko";
import {
    EventDateAction,
    EventDateState,
    RepeatAction,
    RepeatState
} from "../../../entities/calendar";


interface EventDateProps {
    eventState: EventDateState;
    eventDispatch: React.Dispatch<EventDateAction>;
    repeatState: RepeatState;
    repeatDispatch: React.Dispatch<RepeatAction>;
}

export const RepeatEvent: React.FC<EventDateProps> = ({eventState, eventDispatch, repeatState, repeatDispatch}) => {


    return (
        <RePeatEvent_Container>
            <EventTime_container>
                <EventTimeIcon_Container>
                    <i className="fi fi-rr-clock-three"></i>
                </EventTimeIcon_Container>
                <EventTimePicker
                    selected={repeatState.startTime}
                    onChange={(date: Date) => repeatDispatch({type: 'SET_START_TIME', payload: date})}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="시작시간"
                    dateFormat="HH시 mm분 부터"
                    timeClassName={() => "date-picker-time"}
                />
                <EventTimePicker
                    selected={repeatState.endTime}
                    onChange={(date: Date) => repeatDispatch({type: 'SET_END_TIME', payload: date})}
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
                </RepeatIcon_Container>
                <RepeatContent_Container>
                    <RepeatCheckState_Div $isClick={repeatState.repeat}
                                          onClick={() => repeatDispatch({
                                              type: 'SET_REPEAT',
                                              payload: !repeatState.repeat
                                          })}>
                        반복
                    </RepeatCheckState_Div>
                    <RepeatState_Container $isClick={repeatState.repeat}>
                        <RepeatText_Container>
                            반복주기 :
                            <RepeatNum_Input type={"number"}
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
                            </SelectContainer>
                        </RepeatText_Container>
                        <RepeatText_Container>
                            반복마감 :
                            <RepeatEndDatePicker
                                disabled={!repeatState.repeat}
                                dateFormat={'yy.MM.dd 까지 반복'} // 날짜 형태
                                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                selected={repeatState.repeatEnd}
                                onChange={(date: Date) => repeatDispatch({type: 'SET_REPEAT_END', payload: date})}
                                minDate={eventState.startDate}
                                locale={ko}
                            />
                        </RepeatText_Container>

                    </RepeatState_Container>
                </RepeatContent_Container>

            </RepeatBottom_Container>
        </RePeatEvent_Container>
    )
}