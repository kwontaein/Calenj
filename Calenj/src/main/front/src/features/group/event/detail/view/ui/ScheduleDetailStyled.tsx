import styled from "styled-components";
import {BackGroundColor, PointColor, TextColor, ThemeColor2} from "../../../../../../shared/ui/SharedStyled";

export const ScheduleDetail_Container = styled.div`
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    padding: 10px;
    overflow-y: auto;
`

export const ScheduleMap_Container = styled.div`
    width: 100%;
    height: 250px;
    margin-top: 5px;
    background-color: #aba8b9;
`
export const ScheduleButton_Container = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
export const MapIcon_Container = styled.div`
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

export const ScheduleTop_Container = styled.div`
    width: 100%;
    height: 20px;
    font-size: 16px;
    display: flex;
    align-items: center;
`

export const ScheduleStartDate_Container = styled.div`
    width: 100%;
    height: 20px;
    font-size: 12px;
`

export const Schedule_Button = styled.button`
    background-color: ${PointColor};

    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${PointColor}77;
    }
`

export const ScheduleMember_Container = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    font-size: 12px;
    color: ${TextColor}77;

`

export const MemberMoreView_Text = styled.div`
    font-size: 12px;
    color: ${TextColor}77;

    &:hover {
        color: ${TextColor};
        text-decoration: underline;
    }
`
export const ScheduleMember_Viewer_Container = styled.div`
    width: 150px;
    height: auto;
    max-height: 200px;
    background-color: ${BackGroundColor};
    margin-top: 10px;
    margin-left: -30px;
    border-radius: 5px;
    overflow-y: auto;
    position: absolute;
`
export const ScheduleMemberItem_Container = styled.div`
    margin: 10px;
    height: 30px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;

    &:hover {
        background-color: ${ThemeColor2}77;
    }
`
export const ScheduleMemberProfile_Container = styled.div<{ $userId: string }>`
    height: 20px;
    width: 20px;
    background-color: ${TextColor};
    border-radius: 50%;
    display: flex;
    background-image: ${props => props.$userId ? `url("/image/savedImage/${props.$userId.trim()}.jpeg")` : `url("/image/Logo.png")`};
    background-size: cover;

`
export const ScheduleMemberName_Container = styled.div`
    width: calc(100% - 30px);
    padding-left: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
`
