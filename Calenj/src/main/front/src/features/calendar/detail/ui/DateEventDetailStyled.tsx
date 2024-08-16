import styled from "styled-components";
import {BackGroundColor, TextColor, ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";
import chroma from "chroma-js";

const bottomSize = 40;

export const DateEventDetail_Container = styled.div`
    width: 520px;
    background-color: ${ThemeColor3};
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, .14),
    0 9px 46px 8px rgba(0, 0, 0, .12),
    0 11px 15px -7px rgba(0, 0, 0, .2);
    transition: opacity 0.2s ease-in-out;
    
`


export const TitleContent_Container = styled.div`
    width: calc(100% - 20px);
    height: auto;
    padding-inline: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`


export const TitleContent_Wrapper = styled.div`
    width: calc(100% - 50px);
    height: auto;
    padding-left: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 25px;
    font-weight: 550;
`
export const EventOption_Container = styled.div`
    width: calc(100% - 20px);
    padding-inline: 10px;
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const EventButton_Container = styled.div`
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: right;
    font-size: 15px;
`
export const EventButtonIcon_Wrapper = styled.div`
    width: 20px;
    padding: 5px;
    font-size: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-inline: 2px;
    border-radius: 50%;

    &:hover {
        color: ${TextColor}77;
    }
`

export const EventDetailContent_Wrapper = styled.div<{ $isRepeat: boolean }>`
    width: calc(100% - 20px);
    margin-top: ${props => props.$isRepeat ? '15px' : '20px'};
    height: auto;
    padding-inline: 10px;
`
export const EventTime_Container = styled.div`
    height: 20px;
    width: calc(100% - 50px);
    padding-left: 50px;
    font-size: 12px;
`

export const DateTime_Container = styled.div`
    width: calc(100% - 20px);
    height: 30px;
    display: flex;
    flex-direction: row;
    padding-left: 20px;
`
export const EventDetailIcon_Wrapper = styled.div`
    width: 30px;
    height: calc(100% - 5px);
    margin-top: 5px;
    font-size: 18px;
    display: flex;
    align-items: center;
`

export const EventTimeContent_Wrapper = styled.div`
    width: calc(100% - 30px);
    height: 100%;
    font-size: 20px;
`


export const DateEventBottom_Container = styled.div`
    height: ${bottomSize}px;
    border-top: 1px solid ${TextColor}77;
    border-radius: 0 0 10px 10px;
    display: flex;
    margin-top: 10px;
    flex-direction: row;
`
export const EventDetailContent_Container = styled.div`
    height: auto;
    max-height: 500px;
    width: calc(100% - 40px);
    margin-top: 10px;
    margin-right: 10px;
`

export const DateEventContent_Container = styled.div`
    width: calc(100% - 20px);
    height: auto;
    display: flex;
    flex-direction: row;
    padding-left: 20px;
`
export const RepeatEventContent_Wrapper = styled.div`
    font-size: 16px;
`

export const PromiseContent_Container = styled.div`
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    padding: 10px;
    word-wrap: break-word;
    white-space: pre-wrap;
    background-color: ${ThemeColor2};
    border-radius: 5px;
    overflow: auto;
    max-height: 250px;
`
export const TodoListContent_Container = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    overflow: auto;
`
export const TodoListItem_Wrapper = styled.div`
    height: 20px;
    width: calc(100% - 20px);
    padding: 5px;
    margin-block: 4px;
    border-radius: 5px;
    background-color: ${ThemeColor2};
`


export const AdditionalInfo_Container = styled.div`
    width: calc(100% - 60px);
    height: 70px;
    margin-left: 50px;
    overflow: hidden;
    display: flex;
    align-items: center;
`
export const JoinFriendList_Container = styled.div`
    height: 25px;
    padding-block: 5px;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
`
export const EventTag_Container = styled.div`
    width: auto;
    height: auto;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
`
export const EventTag_Wrapper = styled.div<{ $color: string }>`
    min-width: 30px;
    width: fit-content;
    height: 16px;
    padding: 2px;
    padding-inline: 10px;
    border-radius: 2px;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-inline: 4px;
    background-color: ${props => chroma(props.$color).alpha(0.5).css()};
`