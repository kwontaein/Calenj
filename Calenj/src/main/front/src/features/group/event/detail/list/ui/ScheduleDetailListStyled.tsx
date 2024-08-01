import styled from "styled-components";
import {PointColor, PointColor2, TextColor, ThemeColor2, ThemeColor3} from "../../../../../../shared/ui/SharedStyled";

export const ScheduleDetailList_Container = styled.div`
    width: 100%;
`

export const ScheduleDetail_Wrapper = styled.div`
    width: calc(100% - 60px);
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
    width: 60px;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    flex:1;
`

export const ScheduleDetailList_TopLine_Container = styled.div<{ $isNow: boolean }>`
    width: 50%;
    height: calc(40% + 27px);
    box-sizing: border-box;
    border-left: 2px solid ${props=> props.$isNow ? PointColor : TextColor};
    border-bottom: 2px solid ${props=> props.$isNow ? PointColor : TextColor};
    margin-bottom: -7px;
    position: relative;
`
export const ScheduleDetailList_BottomLine_Container = styled.div<{ $isNow: boolean }>`
    width: 50%;
    height: calc(60% - 27px);
    box-sizing: border-box;
    border-left: 2px solid ${props=> props.$isNow ? PointColor : TextColor};
    position: relative;
`

export const ScheduleDetailList_Circle = styled.div<{ $isNow: boolean }>`
    height: 12px;
    width: 12px;
    border: 2px solid ${TextColor};
    background-color: ${props => props.$isNow ? PointColor : TextColor};
    border-radius: 50%;
    margin-right: 20px;
    position: relative;
`
export const MapInterval_Container = styled.div`
    height: 30px;
    width: 100%;
`


export const ScheduleDetail_Wrapper_Container = styled.div`
    width: calc(100% - 20px);
    padding-inline: 10px;
    font-size: 15px;
    margin-block: 2px;
    display: flex;
    flex-direction: row;
    color:inherit;
    background-color: inherit;
`
export const ScheduleDetail_ContentTitle_Container = styled.div`
    width: auto;
    padding-inline: 5px;
    color:inherit;
    background-color: inherit;
    font-size: 14px;
`

export const ScheduleDetail_Content_Container = styled.div`
    width: auto;
    color:inherit;
    background-color: inherit;
    font-size: 14px;
`

export const SubSchedule_Title_Container = styled.div`
    width: calc(100% - 20px);
    font-size: 16px;
    padding-inline: 10px;
    height: 30px;
    display: flex;
    justify-content: left;
    color:inherit;
    background-color: inherit;
`
export const SubSchedule_Content_Container= styled.div`
    width: calc(100% - 20px);
    background-color: ${ThemeColor3};
    border-radius: 5px;
    padding : 10px;
    display: flex;
    justify-content: left;
    min-height: 20px;
`



export const ScheduleDetailList_Div = styled.div<{ $isDrop: boolean }>`
    height: auto;
    text-align: center;
    font-size: 40px;
    width: 100%;
    border-radius: 5px;
    box-sizing: border-box;
    color: ${props => props.$isDrop ? `${ThemeColor3}` : TextColor};
    border: 1px ${props => props.$isDrop ? `dashed ${TextColor}` : `solid ${TextColor}`};
    background-color: ${props => props.$isDrop ? `${ThemeColor3}` : ThemeColor2};
    white-space: pre-wrap;
    position: relative;
    padding-block: 10px;
    ${SubSchedule_Content_Container}{
        color :${props => props.$isDrop ? `${ThemeColor3}` : TextColor};
    }
`