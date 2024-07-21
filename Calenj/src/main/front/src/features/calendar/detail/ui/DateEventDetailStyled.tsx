import styled from "styled-components";
import {BackGroundColor, TextColor, TextColor2, ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";
import chroma from "chroma-js";

const bottomSize = 60;

export const DateEventDetail_Container = styled.div<{$formState:string}>`
    width: 520px;
    height: ${props=>props.$formState ==="schedule"? `260px`: props.$formState==="todo" ? '330px' :'400px'};
    background-color: ${ThemeColor3};
    border-radius: 10px;
`

export const DateEventTop_Container = styled.div`
    height: calc(100% - ${bottomSize}px);
`

export const DateEventTop_Wrapper = styled.div`
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    padding: 20px;
`
export const TitleContent_Container = styled.div`
    width: calc(100% - 20px);
    height: 50px;
    padding-inline: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`


export const TitleContent_Wrapper = styled.div`
    width: calc(90% - 20px);
    padding-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 30px;
    font-weight: 550;
`

export const EventButton_Wrapper = styled.div`
    width: 10%;
    display: flex;
    flex-direction: row;
    justify-content: right;
    font-size: 20px;
`

export const EventDetailContent_Wrapper = styled.div<{$isRepeat:boolean}>`
    width: calc(100% - 30px);
    margin-top: ${props=> props.$isRepeat ? '15px' : '20px'};
    height: calc(100% - ${props=> props.$isRepeat ? '70px' : '75px'});
    padding-inline: 10px;
    padding-left: 20px;
`
export const EventTime_Container = styled.div`
    height: 20px;
    width: calc(100% - 45px);
    padding-left: 45px;
    font-size: 12px;
`

export const DateTime_Container = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
`
export const EventDetailIcon_Wrapper = styled.div`
    width: 10%;
    height: calc(100% - 5px);
    margin-top: 5px;
    font-size: 23px;
    display: flex;
    align-items: center;
`

export const EventTimeContent_Wrapper= styled.div`
    width: 90%;
    height: 100%;
    font-size: 20px;
`



export const DateEventBottom_Container = styled.div`
    height: ${bottomSize}px;
    border-top: 1px solid ${TextColor}77;
    border-radius: 0 0 10px 10px;
    display: flex;
    flex-direction: row;
`
export const EventDetailContent_Container = styled.div`
    height: calc(100% - 10px);
    width: calc(100% - 45px);
    margin-top: 10px;
`

export const DateEventContent_Container = styled.div`
    height: calc(100% - 50px);
    display: flex;
    flex-direction: row;
`
export const RepeatEventContent_Wrapper = styled.div`
    padding-top: 2px;
    font-size: 16px;
`

export const PromiseContent_Container =styled.div`
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    padding: 10px;
    word-wrap: break-word;
    white-space: pre-wrap;
    background-color: ${ThemeColor2};
    border-radius: 5px;
    overflow: auto;
`
export const TodoListContent_Container =styled.div`
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


export const BottomLeft_Container = styled.div`
    width: calc(50% - 20px);
    height: calc(100% - 10px);
    padding : 5px;
    border-right: 1px solid ${TextColor}77;
    padding-inline: 10px;
    overflow: hidden;
    border-radius: 0 0 0 10px;
    display: flex;
    align-items: center;
`
export const BottomRight_Container = styled.div`
    width: calc(50% - 20px);
    height: calc(100% - 10px);
    padding : 5px;
    padding-inline: 10px;
    overflow: hidden;
    border-radius: 0 0 10px 0;
`
export const EventTag_Wrapper = styled.div<{$color:string, $isFirst:boolean}>`
    min-width: 30px;
    width: fit-content;
    padding: 4px;
    padding-inline: 10px;
    height: calc(100% - 30px);
    border-radius: 2px;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    margin-left: ${props=>props.$isFirst ? '10px': 0};
    background-color: ${props=> chroma(props.$color).alpha(0.5).css()};
`