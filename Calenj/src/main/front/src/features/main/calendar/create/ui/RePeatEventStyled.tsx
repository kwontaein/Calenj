import styled from "styled-components";
import DatePicker from "react-datepicker";
import {
    PointColor,
    TextColor,
    ThemeColor2,
    ThemeColor3
} from "../../../../../shared/ui/SharedStyled";

interface ClickProps {
    $isClick: boolean,
}

export const RePeatEvent_Container = styled.div`
    width: calc(100% - 30px);
    height: 200px;
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
    margin-top: 10px;
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
    font-size: 22px;
    align-items: center;
`


export const RepeatContent_Container = styled.div`
    width: calc(100% - 40px);
    height: 100%;
    margin-left: 10px;
`
export const RepeatButton_Container = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
`
export const RepeatCheckState_Div = styled.div<ClickProps>`
    margin-top: 2px;
    width: 70px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 12px;
    margin-right: 5px;
    cursor: pointer;
    background-color: ${props => props.$isClick ? PointColor : ThemeColor2};
    transition: background-color 0.5 ease-in;
`
export const InfoIcon_Container = styled.div`
    margin-left: -5px;
    margin-right: 5px;
    width: 20px;
    height: 30px;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${TextColor}77;
`

export const RepeatText_Container = styled.div`
    font-size: 14px;
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    height: 20px;
    align-items: center;
`

interface InputWidth{
    $numLength : number,
}

export const RepeatNum_Input = styled.input<InputWidth>`
    height: 14px;
    width: ${props=>props.$numLength * 8}px;
    margin-top: 1px;
    margin-left: 4px;
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
    &:hover {
        border: 1px solid ${TextColor};
        border-radius: 4px;
        color : ${PointColor}
    }
    
`
// Styled-components for the select box
export const CustomSelect = styled.select`
    -webkit-appearance: none;
    appearance: none;
    padding: 1px;
    font-size: 14px;
    border-radius: 4px;
    background: transparent;
    border: 1px solid transparent;

    &:hover {
        border: 1px solid ${TextColor};
        border-radius: 4px;
        color : ${PointColor}
    }
`;

export const RepeatWeek_Container = styled.div`
    width: 40px;
    padding: 1px;
    font-size: 14px;
    border-radius: 4px;
    color: ${TextColor};
    background: ${ThemeColor2};
    border: 1px solid transparent;
    display: flex;
    justify-content: center;
    text-align: center;
    margin-right: 10px;
`

export const PatternContent_Container = styled.div`
    height: 22px;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid ${TextColor}77;
    border-radius: 50px;
    margin-left: 10px;
`

export const PatternContent = styled.div<ClickProps>`
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-inline: 3px;
    border-radius: 50%;
    background-color: ${props => props.$isClick ? PointColor : ThemeColor3};
    color:${TextColor};
    font-size: 12px;
`


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

export const SelectContainer = styled.div`
    display: flex;
    align-items: center;
`;


export const RepeatState_Container = styled.div<ClickProps>`
    margin-top: 10px;
    width: calc(100% - 10px);
    height: calc(100% - 20px);
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
    ${SelectContainer}{
        color: ${props => props.$isClick ? TextColor : `${TextColor}77`};
    }
`


