import styled from "styled-components";
import {tagPaddingLeft} from "../../../calendar/eventTag/ui/DateEventTagStyled";
import {BackGroundColor, TextColor} from "../../../../shared/ui/SharedStyled";

export const FriendTop_Container = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    background-color: rgb(0,0,0,0.3);
    margin-bottom: 1px;
        &:hover {
        background-color: rgb(0,0,0,0.3);
    }
`

export const TopContent_Container = styled.div`
    width: calc(85% - 10px);
    height: calc(100% - 10px);
    display: flex;
    align-items: center;
    padding: 5px 5px 5px ${tagPaddingLeft}px;
    font-size: 14px;
`
export const TopIcon_Container = styled.div`
    width: calc(15% - 10px);
    height: calc(100% - 10px);
    padding: 5px;
    display: flex;
    font-size: 20px;
`


export const FriendChatList_Container = styled.ul`
    appearance: none;
    margin: 5px;
    padding: 0;
    width: calc(100% - 10px);
    height: calc(100% - 20px);
    overflow-y: auto;
`
export const FriendChatList_Item_Wrapper = styled.li<{$isClick:boolean}>`
    height: 35px;
    padding: 8px;
    display: flex;
    margin-block: 1px;
    flex-direction: row;
    padding-inline: 15px;
    border-radius: 5px;
    background-color: ${props=>props.$isClick ? BackGroundColor : "transparent"};
    &:hover{
        background-color: ${BackGroundColor};
    }
`
export const FriendUserName_Wrapper = styled.div`
    width: calc(100% - 45px);
    padding-left: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
export const FriendDeleteIcon_Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: ${TextColor}77;
    transition: color 0.3s ease;
    &:hover{
        color: ${TextColor};
    }
`

