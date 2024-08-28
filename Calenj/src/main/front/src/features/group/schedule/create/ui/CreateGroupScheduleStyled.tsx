import styled from "styled-components";
import {BackGroundColor, PointColor, TextColor, ThemeColor2, ThemeColor3} from "../../../../../shared/ui/SharedStyled";

export const CreateGroupEvent_Container= styled.div`
    width: 400px;
    height: auto;
    background-color: ${BackGroundColor};
    border-radius: 5px;
`
export const CreateGroupTop_Container = styled.div`
    padding: 8px;
    font-size: 13px;
    background-color: ${ThemeColor2};
    border-radius: 5px 5px 0 0;
`

export const CreateGroupEvent_Wrapper= styled.div`
    width:calc(100% - 40px);
    height: auto;
    padding-inline: 20px;
    padding-block: 10px;
`


export const GroupEvent_RowBox = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
`
export const GroupEventItem_Title = styled.div`
    width: 70px;
    font-size: 13px;
    font-weight: 550;
`

export const GroupEventTitle_Input = styled.input.attrs({ type: 'text' })`
    width: calc(100% - 70px);
    margin-top: 2px;
    border: 0;
    border-bottom: 2px solid ${BackGroundColor};
    background-color: transparent;
    color: ${TextColor};
    transition: border-bottom-color 0.3s ease-in;
    &:focus{
        outline: none;
        border:none;
        border-bottom: 2px solid ${PointColor};
    }
`


export const LimitNum_Input = styled.input.attrs({ type: 'number' })<{$numLength : number}>`
    height: 14px;
    width: ${props=>props.$numLength * 8}px;
    margin-top: 1px;
    margin-left: 4px;
    background-color: transparent;
    color: ${TextColor};
    border: 1px solid transparent;
    text-align: right;
    border-radius: 4px;
    font-size: 12px;
    
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