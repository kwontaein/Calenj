import {
    DatePicker_Styled,
    VoteCheckOption_Container, VoteCheckOption_Label, VoteCheckStyle_CheckBox,
    VoteSetting_Container
} from "../../../../../style/Group/GroupVoteStyle";
import {ko} from "date-fns/locale/ko";
import React, {useCallback, useState} from "react";
import {VoteContent} from "../../../../../features/vote/makeVote";

interface ChildProps {
    selectedDate: Date | null;
    onDateChange: (selectedDate: Date) => void;
    onMultipleChange: (multipleOption: boolean) => void;
    onAnonymousChange: (anonymousOption: boolean) => void;
}

const VoteSetting: React.FC<ChildProps> = ({onDateChange, onMultipleChange, onAnonymousChange, selectedDate}) => {
    const handleDateChange = useCallback((date: Date) => {
        onDateChange(date);
    }, [onDateChange]);

    const handleMultipleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onMultipleChange(e.target.checked);
    }, [onMultipleChange]);

    const handleAnonymousChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onAnonymousChange(e.target.checked);
    }, [onAnonymousChange]);

    return (
        <VoteSetting_Container>
            <DatePicker_Styled
                dateFormat=' yy/MM/dd (EEE)  aa hh:mm 까지' // 날짜 형태
                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                minDate={new Date(new Date().setDate(new Date().getDate() + 1))} // minDate 이전 날짜 선택 불가
                maxDate={new Date(new Date().setDate(new Date().getDate() + 6))}//최대 날짜를 현재기준 일주일까지
                showTimeSelect //시간선택
                timeFormat="HH:mm" //시간 포맷
                timeIntervals={15} //시간 단위
                selected={selectedDate}
                onChange={handleDateChange}
                className='DatePicker'
                placeholderText='날짜 선택'
                locale={ko}
            />
            <VoteCheckOption_Container>
                <VoteCheckOption_Label>
                    <VoteCheckStyle_CheckBox
                        type="checkbox"
                        name="choice"
                        onChange={handleMultipleChange}
                    />복수선택
                </VoteCheckOption_Label>
                <VoteCheckOption_Label>
                    <VoteCheckStyle_CheckBox
                        type="checkbox"
                        name="anonymous"
                        onChange={handleAnonymousChange}
                    />익명투표
                </VoteCheckOption_Label>
            </VoteCheckOption_Container>
        </VoteSetting_Container>
    )
}
export default VoteSetting;