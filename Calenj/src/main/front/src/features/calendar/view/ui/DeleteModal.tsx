import {EventClickArg} from "@fullcalendar/react";
import {Modal_Background, TextColor} from "../../../../shared/ui/SharedStyled";
import {useEffect, useId, useReducer, useRef, useState} from "react";
import {
    CancelButton,
    Delete_ButtonContainer,
    Delete_Contents, Delete_Warn,
    DeleteButton,
    DeleteModalContainer, EventDetailIcon_Wrapper, EventTimeContent_Wrapper, TitleContent_Wrapper

} from "./DeleteModalStyled";
import {shortAHMFormat2} from "../../../../shared/lib/dateFormat";
import {deleteScheduleApi} from "../api/deleteScheduleApi";
import {useFetchUserDateEvent} from "../../../../entities/reactQuery/model/queryModel";

interface EventDetailProps {
    deleteEvent: EventClickArg,
    close: () => void,
}

export const DeleteModal: React.FC<EventDetailProps> = ({deleteEvent, close}) => {
    const modalBackground = useRef<HTMLDivElement>(null);
    const userId = localStorage.getItem('userId')||''
    const userEventDateState = useFetchUserDateEvent(userId)


    const sendDelete = () => {
        deleteScheduleApi(deleteEvent.event.id).then(() => {
            userEventDateState.refetch()
            close();
        });
    }

    return (
        <Modal_Background ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current) {
                close();
            }
        }}>
            <DeleteModalContainer>
                <Delete_Contents>
                    <TitleContent_Wrapper>{deleteEvent.event.title}</TitleContent_Wrapper>
                    <EventTimeContent_Wrapper>
                        <EventDetailIcon_Wrapper>
                            <i className="fi fi-rr-clock-three"></i>
                        </EventDetailIcon_Wrapper>
                        {shortAHMFormat2(deleteEvent.event.start as Date)} ~ {shortAHMFormat2(deleteEvent.event.end as Date)}
                    </EventTimeContent_Wrapper>
                    <Delete_Warn>정말로 해당 일정을 삭제하시겠습니까?</Delete_Warn>
                </Delete_Contents>
                <Delete_ButtonContainer>
                    <DeleteButton onClick={sendDelete}>예</DeleteButton>
                    <CancelButton onClick={close}>아니요</CancelButton>
                </Delete_ButtonContainer>
            </DeleteModalContainer>
        </Modal_Background>

    )
}