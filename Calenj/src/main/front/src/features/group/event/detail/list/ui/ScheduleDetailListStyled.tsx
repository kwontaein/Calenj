import styled from "styled-components";
import {PointColor, TextColor, ThemeColor2, ThemeColor3} from "../../../../../../shared/ui/SharedStyled";

export const ScheduleDetailList_Container = styled.div`
    width: 100%;
`
export const ScheduleDetailList_Div = styled.div<{$isDrop :boolean}>`
    text-align: center;
    font-size: 40px;
    width: calc(100% - 50px);
    border-radius: 5px;
    color : ${props=> props.$isDrop ? `${ThemeColor3}` : TextColor};
    border: 1px ${props=> props.$isDrop ?`dashed ${TextColor}`:`solid ${TextColor}`};
    background-color: ${props=> props.$isDrop ?`${ThemeColor3}` :ThemeColor2};
    white-space: pre-wrap;
    position: relative;
`

export const ScheduleDetailList_Progress = styled.div`
    display: flex;
    align-items: center;
`
export const ScheduleDetailList_Structure_Container = styled.div`
    display: flex;
    align-items: center;
`

export const ScheduleDetailList_StandHr = styled.hr<{ $isNow: boolean }>`
    min-height: 110px;
    border: 1px solid ${props => props.$isNow ? PointColor : TextColor};
    margin: 0 0 0 9px;
`

export const ScheduleDetailList_Line = styled.div<{ $isNow: boolean }>`
    height: 2px;
    width: 40px;
    background-color: ${props => props.$isNow ? PointColor : TextColor};
`

export const ScheduleDetailList_Circle = styled.div<{ $isNow: boolean }>`
    height: 16px;
    width: 16px;
    border: 2px solid white;
    background-color: ${props => props.$isNow ? PointColor : TextColor};
    border-radius: 50%;
    position: absolute;
`