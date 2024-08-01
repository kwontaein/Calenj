import styled from "styled-components";
import DatePicker from "react-datepicker";
import {PointColor, TextColor} from "./SharedStyled";

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

export const EventDatePicker = styled(DatePicker)<{$width?:number,$height?:number, $fontSize?:number, $marginInline?:number}>`
    width: ${props=>props.$width ? `${props.$width}px`:'130px'};
    height :${props=>props.$height ? `${props.$height}px`:'27px'};
    box-sizing: border-box;
    margin-inline: ${props=>props.$marginInline!==null ? `${props.$marginInline}px` :'8px'};
    border-radius: 5px;
    border: 1px solid transparent;
    background-color: transparent;
    color:${TextColor};
    font-size: ${props=>props.$width ? `${props.$fontSize}px`:'14px'};
    display: flex;
    cursor: pointer;
    &:hover{
        border: 1px solid ${TextColor};
    }
    &:focus{
        border: 1px solid ${PointColor};
    } 
`;