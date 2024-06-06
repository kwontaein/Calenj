import {DatePicker_Container, DatePickerIcon_Container, EventDatePicker} from "./EventDatePickerStyled";
import {ko} from "date-fns/locale/ko";
import React from "react";
import {EventDateAction, EventDateState, RepeatAction, RepeatState} from "../../../entities/calendar";
interface EventDateProps {
    eventState: EventDateState;
    eventDispatch: React.Dispatch<EventDateAction>;
}
export const EventDatePickerView : React.FC<EventDateProps> = ({eventState,eventDispatch})=>{
    const {formState,startDate,endDate, startMonth,endMonth} = eventState



    const endDateHandler = (date:Date) => {
        if(date<eventState.startDate){
            window.alert('설정한 시작시간보다 큰시간으로 설정해주세요.')
        }else{
            eventDispatch({type:'SET_END_DATE', payload:date})
        }
    }
    const dayClassHandler = (date:Date) => {
        return (date.getDate() === endDate.getDate() && date.getMonth() === endDate.getMonth())
            ? 'custom-day selected-day'
            : date.getMonth() === endMonth
                ? 'custom-day'
                : 'custom-day gray-day'
    }

    return (
        <DatePicker_Container>
            <DatePickerIcon_Container>
                {formState === "promise" ?
                    <i className="fi fi-tr-calendar-clock"></i> :
                    <i className="fi fi-tr-calendar-day"></i>}
            </DatePickerIcon_Container>
            <EventDatePicker
                dateFormat={formState ==="promise" ? ' yy.MM.dd (EEE)  HH:mm': ' yy년 MM월 dd일 (EEE)'} // 날짜 형태
                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                showTimeSelect={formState === "promise"}
                timeFormat={formState === "promise" ? "HH:mm" : undefined}
                timeIntervals={formState === "promise" ? 30 : undefined}
                selected={startDate}
                onChange={(date:Date) => eventDispatch({type:'SET_START_DATE', payload: date})}
                locale={ko}
                popperPlacement="right-start"
                timeClassName={()=>"date-picker-time"}
                onMonthChange={(date:Date)=>eventDispatch({type:'SET_START_MONTH', payload: date.getMonth()})}
                dayClassName={(d) =>
                    (d.getDate() === startDate.getDate() && d.getMonth() === startDate.getMonth())
                        ? 'custom-day selected-day'
                        : d.getMonth() === startMonth
                            ? 'custom-day'
                            : 'custom-day gray-day'
                }
            />
            {formState!=="schedule" &&
                <>
                    <p>~</p>
                    <EventDatePicker
                        dateFormat={formState ==="promise" ? ' yy.MM.dd (EEE)  HH:mm': ' yy년 MM월 dd일 (EEE)'} // 날짜 형태
                        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                        showTimeSelect={formState === "promise"}
                        timeFormat={formState === "promise" ? "HH:mm" : undefined}
                        timeIntervals={formState === "promise" ? 30 : undefined}
                        selected={endDate}
                        onChange={endDateHandler}
                        minDate={startDate}
                        locale={ko}
                        popperPlacement="right-start"
                        timeClassName={()=>"date-picker-time"}
                        onMonthChange={(date:Date)=>eventDispatch({type:'SET_END_MONTH', payload: date.getMonth()})}
                        dayClassName={dayClassHandler}
                    />
                </>
            }
        </DatePicker_Container>
    )
}