import {boolean} from "yup";
import styled from "styled-components";
import {PointColor, TextColor, ThemeColor2, ThemeColor3} from "../../../../../shared/ui/SharedStyled";

export const ScheduleDetailList_Container = styled.div`
    width: 100%;
    height: auto;
`

export const ScheduleDetail_Wrapper = styled.div`
    width: calc(100% - 30px);
    height: auto;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`

export const ScheduleDetailList_Progress = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: 'stretch';
`
export const ScheduleDetailList_Structure_Container = styled.div`
    width: 20px;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
`

export const ScheduleDetailList_TopLine_Container = styled.div<{ $isNow: boolean, $isClick:boolean}>`
    width: 70%;
    height: calc(40% + 27px);
    box-sizing: border-box;
    border-left: 2px solid ${props => props.$isNow ? PointColor : TextColor};
    border-bottom: 2px solid ${props =>  props.$isClick? PointColor: props.$isNow ? PointColor : TextColor};
    margin-bottom: -7px;
    position: relative;
`
export const ScheduleDetailList_BottomLine_Container = styled.div<{ $isNow: boolean }>`
    width: 70%;
    height: calc(60% - 27px);
    box-sizing: border-box;
    border-left: 2px solid ${props => props.$isNow ? PointColor : TextColor};
    position: relative;
`

export const ScheduleDetailList_Circle = styled.div<{ $isNow: boolean, $isClick:boolean }>`
    height: 12px;
    width: 12px;
    border: 2px solid ${TextColor};
    background-color: ${props => props.$isClick? PointColor: (props.$isNow ? PointColor : TextColor)};
    border-radius: 50%;
    margin-right: 5px;
    position: relative;
`
export const MapInterval_Container = styled.div`
    height: 30px;
    width: 100%;
`


export const ScheduleDetail_Wrapper_Container = styled.div`
    width: calc(100% - 20px);
    padding-inline: 10px;
    margin-block: 2px;
    display: flex;
    flex-direction: row;
    color: inherit;
    background-color: inherit;
`
export const ScheduleDetail_ContentTitle_Container = styled.div`
    width: 60px;
    padding-inline: 5px;
    color: inherit;
    background-color: inherit;
    font-size: 13px;
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const ScheduleDetail_Content_Container = styled.div`
    width: auto;
    color: inherit;
    background-color: inherit;
    display: flex;
    align-items: center;
    font-size: 13px;
`

export const SubScheduleJoinUser_Wrapper = styled.div`
    width: calc(100% - 65px);
    font-size: inherit;
    padding-right: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

export const SubScheduleJoinUser_Empty = styled.div`
    width: 100%;
    color: ${TextColor}77;
    display: flex;
    justify-content: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 12px;
`

export const SubSchedule_Title_Container = styled.div`
    width: calc(100% - 20px);
    font-size: 16px;
    padding-inline: 10px;
    height: 30px;
    display: flex;
    justify-content: left;
    color: inherit;
    background-color: inherit;
`
export const SubSchedule_Title_Wrapper = styled.div`
    font-size: 15px;
    width: calc(100% - 4px);
    background-color: inherit;
    border: 2px solid transparent;
    color:inherit;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: left;
    padding-inline: 2px;
`
export const EditSubSchedule_Title = styled.input.attrs({ type: 'text' })`
    font-size: 15px;
    width: 100%;
    background-color: inherit;
    border: 2px solid transparent;
    color:inherit;
    box-sizing: border-box;
`

export const SubScheduleOption_Container = styled.div`
    width :100%;
    height :100%;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    color:inherit;
`
export const SubScheduleIcon_Wrapper = styled.div`
    width :25px;
    height :100%;
    &:hover{
        color:${TextColor}77;
    }
`

export const SubScheduleJoinUser_Container =styled.div`
    width:calc(100% - 60px);
    display: flex;
    justify-content: left;
    font-size: 12px;
    align-items: center;
    text-align: center;
    color: inherit;
`



export const SubSchedule_Content_Container= styled.div`
    width: calc(100% - 20px);
    background-color: ${ThemeColor3};
    border-radius: 5px;
    padding: 10px;
    display: flex;
    text-align: left;
    min-height: 20px;
    margin-top: 5px;
    word-wrap: break-word;
    white-space: pre-wrap;
    
`
export const EditSubSchedule_Content =styled.textarea`
    width: 100%;
    font-size: 15px;
    background-color: ${ThemeColor3};
    border-radius: 5px;
    padding : 10px;
    display: flex;
    justify-content: left;
    min-height: 20px;
    margin-top: 5px;
    appearance: none;
    resize: none;
    box-sizing: border-box;
    border: none;
    color: inherit;
`

export const MapPositionText_Container = styled.div<{ $isNull:boolean}>`
    max-width: calc(100% - 70px);
    width: auto;
    color: ${props=> props.$isNull ? `${TextColor}77` : TextColor};
    background-color: inherit;
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

export const MapIcon_Container = styled.div`
    color: ${PointColor};
    margin-right: 5px;
    align-items: center;
    margin-top: -3px;
    &:hover{
        color:${PointColor}77;
    }
`

export const MapToggle_Container = styled.div`
    width: 50px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;

    &:hover {
        color: ${TextColor}77;
    }
`


export const ScheduleDetailList_Div = styled.div<{ $isClick?:boolean }>`
    height: auto;
    text-align: center;
    font-size: 40px;
    width: 100%;
    border-radius: 5px;
    box-sizing: border-box;
    color: ${TextColor};
    border: 1px ${props => props.$isClick ? `solid ${PointColor}` :`solid ${TextColor}`};
    background-color: ${ThemeColor2};
    white-space: pre-wrap;
    position: relative;
    padding-block: 10px;

    ${SubSchedule_Content_Container} {
        color:  ${TextColor};
    }
`

export const BlindSchedule_Div = styled.div`
    background-color: ${ThemeColor2};
    position: absolute;
`

export const EditDuration_Input =  styled.input.attrs({ type: 'number' })<{$numLength:number}>`
    height: 15px;
    width: ${props=>(props.$numLength * 8)+4}px;
    margin-top: 1px;
    background-color: transparent;
    color: inherit;
    border: 1px solid transparent;
    font-size: 13px;
    text-align: right;
    box-sizing: border-box;
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
    }
    &:focus {
        border: 1px solid ${PointColor};
        outline: none;
    }
`
