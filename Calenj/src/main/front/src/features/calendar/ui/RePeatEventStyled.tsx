import styled from "styled-components";
import DatePicker from "react-datepicker";
import {
    BackGroundColor,
    PointColor,
    TextColor,
    TextColor2,
    ThemaColor2,
    ThemaColor3
} from "../../../shared/ui/SharedStyled";

interface ClickProps {
    $isClick: boolean,
}

export const RePeatEvent_Container = styled.div`
    width: calc(100% - 30px);
    height: 190px;
`
export const EventTime_container = styled.div`
    height: 30px;
    width: 100%;
    display: flex;
    flex-direction: row;
`
export const EventTimeIcon_Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 30px;
    height: 100%;
    font-size: 21px;
    padding-top: 3px;

    align-items: center;
`
export const EventTimePicker = styled(DatePicker)`
    width: 100px;
    height: 25px;
    margin-left: 8px;
    border-radius: 5px;
    border: 1px solid transparent;
    background-color: transparent;
    color: ${TextColor};
    font-size: 14px;
    display: flex;
    cursor: pointer;

    &:hover {
        border: 1px solid ${TextColor};
    }
`;

export const RepeatBottom_Container = styled.div`
    margin-top: 20px;
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    flex-direction: row;
`

export const RepeatIcon_Container = styled.div`
    margin-top: 3px;
    display: flex;
    flex-direction: column;
    width: 30px;
    height: 100%;
    font-size: 18px;
    align-items: center;
`
export const RepeatContent_Container = styled.div`
    width: calc(100% - 40px);
    height: 100%;
    margin-left: 10px;
`
export const RepeatCheckState_Div = styled.div<ClickProps>`
    width: 60px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
    background-color: ${props => props.$isClick ? PointColor : ThemaColor2};
    transition: background-color 0.5 ease-in;
`
export const RepeatText_Container = styled.div`
    font-size: 14px;
    display: flex;
    flex-direction: row;
    height: 30px;
    align-items: center;
`

export const RepeatNum_Input = styled.input`
    height: 14px;
    width: 25px;
    margin-top: 1px;
    margin-left: 5px;
    background-color: transparent;
    color: ${TextColor};
    border: 1px solid transparent;
    text-align: right;

    &[type="number"] {
        -moz-appearance: textfield;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`
// Styled-components for the select box
export const CustomSelect = styled.select`
    padding: 1px;
    font-size: 14px;
    border: 0;
    border-radius: 4px;
    background: transparent;
`;

export const RepeatEndDatePicker = styled(DatePicker)`
    width: 130px;
    height: 25px;
    margin-inline: 8px;
    border-radius: 5px;
    border: 1px solid transparent;
    background-color: transparent;
    color: ${TextColor};
    font-size: 14px;
    display: flex;
    cursor: pointer;

    &:hover {
        border: 1px solid ${TextColor};
    }
`;


export const RepeatState_Container = styled.div<ClickProps>`
    width: calc(100% - 10px);
    height: calc(100% - 60px);
    margin-top: 10px;
    border-radius: 5px;
    padding: 5px;

    ${RepeatText_Container} {
        color: ${props => props.$isClick ? TextColor : `${TextColor}77`};
    }

    ${RepeatNum_Input} {
        color: ${props => props.$isClick ? TextColor : `${TextColor}77`};
    }

    ${CustomSelect} {
        color: ${props => props.$isClick ? TextColor : `${TextColor}77`};
    }

    ${RepeatEndDatePicker} {
        color: ${props => props.$isClick ? TextColor : `${TextColor}77`};
    }
`


export const SelectContainer = styled.div`
    display: flex;
    align-items: center;
`;

