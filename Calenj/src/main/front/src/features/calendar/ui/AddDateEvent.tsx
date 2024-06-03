import {
    Modal_Background,
    Modal_Container,
    ModalContent_Container,
    ModalTopBar_Container
} from "../../../shared/ui/SharedStyled";
import React, {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {
    Category_Container,
    CategoryContent, CategoryItem_Button, CategoryItems_Container, DateContentBottom_Container,
    DateEventTitle_Input, DatePicker_Container, DatePickerIcon_Container,
    DateTopContent_Container, TimeIconText
} from "./AddDateEventStyled";
import {ko} from "date-fns/locale/ko";
import {EventDatePicker} from "./AddDateEventStyled";
import {DateSelectArg} from "@fullcalendar/react";

interface CalendarProps{
    onClose : ()=>void,
    selectInfo: DateSelectArg,
}
export const AddDateEvent : React.FC<CalendarProps> = ({onClose,selectInfo}) =>{
    const calendarApi = selectInfo?.view.calendar;

    useEffect(() => {
        console.log(selectInfo)
    }, [selectInfo]);
    const modalBackground = useRef<HTMLDivElement>(null);
    const [startDate, setStartDate] = useState<Date>(new Date(selectInfo.startStr));
    const [endDate, setEndDate] = useState<Date>(new Date(new Date().setDate(new Date(selectInfo.endStr).getDate() -1)));

    return createPortal(
        <Modal_Background ref={modalBackground} onClick={(e : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (e.target === modalBackground.current) {
                onClose();
            }}}>
            <Modal_Container>
                <ModalTopBar_Container>
                    일정 추가
                </ModalTopBar_Container>
                <ModalContent_Container>
                    <DateTopContent_Container>
                        <DateEventTitle_Input type={"text"} placeholder={"제목 추가"} maxLength={30}/>

                        <Category_Container>
                            <CategoryContent>
                                카테고리
                            </CategoryContent>
                            <CategoryItems_Container>
                                <CategoryItem_Button $isClick={false}>
                                    약속일정
                                </CategoryItem_Button>
                                <CategoryItem_Button  $isClick={true}
                                                      style={{marginInline:'5px'}}>
                                    할 일
                                </CategoryItem_Button>
                                <CategoryItem_Button  $isClick={false}>
                                    스탬프
                                </CategoryItem_Button>
                            </CategoryItems_Container>
                        </Category_Container>
                    </DateTopContent_Container>
                    <DateContentBottom_Container>
                        <DatePicker_Container>
                            <DatePickerIcon_Container>
                                <i className="fi fi-rr-clock-three"></i>
                                <TimeIconText>시작</TimeIconText>
                            </DatePickerIcon_Container>
                            <EventDatePicker
                                dateFormat=' yy/MM/dd (EEE)  aa hh:mm 까지' // 날짜 형태
                                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                minDate={new Date(new Date().setDate(new Date().getDate() + 1))} // minDate 이전 날짜 선택 불가
                                maxDate={new Date(new Date().setDate(new Date().getDate() + 6))}//최대 날짜를 현재기준 일주일까지
                                showTimeSelect //시간선택
                                timeFormat="HH:mm" //시간 포맷
                                timeIntervals={15} //시간 단위
                                selected={startDate}
                                onChange={(date:Date) => setStartDate(date)}
                                className='DatePicker'
                                placeholderText='날짜 선택'
                                locale={ko}
                                popperPlacement="right-start"

                            />
                        </DatePicker_Container>
                        <DatePicker_Container>
                            <DatePickerIcon_Container>
                                <i className="fi fi-rr-clock-five"></i>
                                <TimeIconText>마감</TimeIconText>
                            </DatePickerIcon_Container>
                            <EventDatePicker
                                dateFormat=' yy/MM/dd (EEE)  aa hh:mm 까지' // 날짜 형태
                                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                minDate={new Date(new Date().setDate(new Date().getDate() + 1))} // minDate 이전 날짜 선택 불가
                                maxDate={new Date(new Date().setDate(new Date().getDate() + 6))}//최대 날짜를 현재기준 일주일까지
                                showTimeSelect //시간선택
                                timeFormat="HH:mm" //시간 포맷
                                timeIntervals={15} //시간 단위
                                selected={endDate}
                                onChange={(date:Date) => setEndDate(date)}
                                className='DatePicker'
                                placeholderText='날짜 선택'
                                locale={ko}
                                popperPlacement="right-start"
                            />
                        </DatePicker_Container>


                    </DateContentBottom_Container>
                </ModalContent_Container>
            </Modal_Container>
        </Modal_Background>,
        document.body
    )
}
