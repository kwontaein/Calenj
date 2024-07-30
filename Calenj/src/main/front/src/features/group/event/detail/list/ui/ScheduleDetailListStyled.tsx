import styled from "styled-components";
import {PointColor, PointColor2, TextColor, ThemeColor2, ThemeColor3} from "../../../../../../shared/ui/SharedStyled";

export const ScheduleDetailList_Container = styled.div`
    width: 100%;
`
export const ScheduleDetailList_Div = styled.div<{ $isDrop: boolean }>`
    text-align: center;
    font-size: 40px;
    width: calc(100% - 50px);
    border-radius: 5px;
    color: ${props => props.$isDrop ? `${ThemeColor3}` : TextColor};
    border: 1px ${props => props.$isDrop ? `dashed ${TextColor}` : `solid ${TextColor}`};
    background-color: ${props => props.$isDrop ? `${ThemeColor3}` : ThemeColor2};
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
    min-height: 50px;
    border: none;
    border-left: 2px solid ${props => props.$isNow ? PointColor : TextColor};
    margin: 0 0 0 9px;
`

export const ScheduleDetailList_Line = styled.div<{ $isNow: boolean }>`
    height: 2px;
    width: 20px;
    background-color: ${props => props.$isNow ? PointColor : TextColor};
`

export const ScheduleDetailList_Circle = styled.div<{ $isNow: boolean }>`
    height: 16px;
    width: 16px;
    border: 2px solid white;
    background-color: ${props => props.$isNow ? PointColor : TextColor};
    border-radius: 50%;
    right: 0;
    position: relative;
`

export const ScheduleDetailAdd_Progress = styled.div`
    display: flex;
    align-items: center;
`


export const ScheduleDetailAdd_Structure_Container = styled.div`
    display: flex;
    align-items: center;
`

export const ScheduleDetailAdd_StandHr = styled.hr`
    min-height: 40px;
    border: none;
    border-left: 2px solid ${TextColor};
    margin: 0 0 0 9px;
`
export const ScheduleDetailAdd_BlankHr = styled.hr`
    min-height: 40px;
    border: none;
    margin: 0 0 0 9px;
`
export const ScheduleDetailAdd_Line = styled.div`
    height: 2px;
    width: 20px;
    background-color: ${TextColor};
`

export const ScheduleDetailAdd_Circle = styled.div`
    height: 16px;
    width: 16px;
    border: 2px solid white;
    background-color: ${TextColor};
    border-radius: 50%;
    right: 0;
    position: relative;
`
export const ScheduleDetailAdd_Div = styled.div`
    text-align: center;
    font-size: 14px;
    width: calc(100% - 50px);
    border-radius: 5px;
    color: ${TextColor};
    border: 1px solid ${TextColor};
    background-color: ${PointColor};
    white-space: pre-wrap;
    padding-block: 10px;
    position: relative;
`


export const Sub_Schedule_Top = styled.div`
    display: flex;
    justify-content: space-between;
`

export const SubScheduleTitle = styled.div`
    font-size: 15px;
    text-align: left;
`
export const SubSchedule_Delete = styled.div`
    background-color: ${PointColor};
`
export const Sub_Schedule_Middle = styled.div`

`
export const SubScheduleContent = styled.div`
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const Sub_Schedule_Bottom = styled.div`
    display: flex;
    justify-content: space-between;
`

export const SubScheduleDuration = styled.div`
    text-align: left;
`
export const JoinUser = styled.div`
    display: flex;
    float: right;
`
export const UserProfile = styled.div<{ $userId: string }>`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-image: ${props => props.$userId ? `url("/image/savedImage/${props.$userId.trim()}.jpeg")` : `url("/image/Logo.png")`};
    background-size: cover;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); /* 음영 추가 */
    position: relative;
    margin-left: -10px; /* 절반 크기의 음수 값 */
    background-color: ${PointColor2};

    &:first-child {
        margin-left: 0; /* 첫 번째 프로필은 원래 위치에 유지 */
    }
`