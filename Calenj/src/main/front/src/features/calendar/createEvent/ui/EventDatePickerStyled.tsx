import styled from "styled-components";
import DatePicker from "react-datepicker";
import {TextColor} from "../../../../shared/ui/SharedStyled";

export const DatePicker_Container = styled.div`
    width: 100%;
    height: 40px;
    padding-bottom: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
`
export const DatePickerIcon_Container= styled.div`
    width: 20px;
    margin-inline: 4px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`

export const EventDatePicker = styled(DatePicker)`
    width: 130px;
    height : 25px;
    margin-inline: 8px;
    border-radius: 5px;
    border: 1px solid transparent;
    background-color: transparent;
    color:${TextColor};
    font-size: 14px;
    display: flex;
    cursor: pointer;
    &:hover{
        border: 1px solid ${TextColor};
    }
`;