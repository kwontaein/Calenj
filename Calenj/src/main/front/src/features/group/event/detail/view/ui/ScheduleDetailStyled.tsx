import {BackGroundColor, PointColor, TextColor, ThemeColor2} from "../../../../../../shared/ui/SharedStyled";
import styled, {css, keyframes} from "styled-components";

export const ScheduleDetail_Container = styled.div`
    width: 100%;
    height: 100%;
`
export const ScheduleDetailScroll_Wrapper = styled.div<{$editMode:boolean}>`
    width: calc(100% - 20px);
    height: calc(100% - ${props=> props.$editMode ? '60px': '20px'});
    padding: 10px;
    overflow-y: auto;
`

export const ScheduleMap_Container = styled.div`
    width: 100%;
    height: 250px;
    margin-top: 5px;
    position: relative;
    z-index: 0;
    border-radius: 4px;
`
export const ScheduleButton_Container = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
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
    height: 25px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
`

export const Schedule_Button = styled.button`
    background-color: ${PointColor};
    margin: 5px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${PointColor}77;
    }
    margin-inline: 5px;
`

export const ScheduleMember_Container = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    font-size: 12px;
    color: ${TextColor};
`
export const SchedulePrivacy_Container = styled.div`
    width: 100%;
    height: 15px;
    display: flex;
    flex-direction: row;
    margin-top: 8px;
    font-size: 12px;
    color: ${TextColor};

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


export const ScheduleDotsIcon_Container = styled.div`
    color: ${TextColor};
    transition: color ease-in;
    &:hover{
        color: ${TextColor}77;
    }    
`



export const SubScheduleButton_Container = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

// 애니메이션 정의
const tiltAndMoveUpAnimation = keyframes`
    0% {
        transform: rotate(0deg) translateY(0);
    }
    50% {
        transform: rotate(20deg) translateY(-5px) translateX(3px);
    }
    100% {
        transform: rotate(0deg) translateY(0);
    }
`
export const Trash_Top = styled.div <{ $isDrag: boolean }>`
    position: relative;
    height: 40%;
    overflow: hidden;
    ${({$isDrag}) =>
    !$isDrag &&
    css`
                animation: ${tiltAndMoveUpAnimation} 3s infinite;
            `}
`

export const Trash_Body = styled.div`

    position: relative;
    height: 60%;
    overflow: hidden;
`

export const Trash_Container = styled.div`
    position: relative;
    width: 23px;
    height: 46px;
`

export const TrashIconTop = styled.i`
    position: absolute;
    font-size: 23px;
    top: 40%;
`

export const TrashIconBottom = styled.i`
    position: absolute;
    top: -40%;
    font-size: 23px;
`