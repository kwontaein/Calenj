import styled from "styled-components";
import {PointColor, TextColor, ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";

export const EventFriendList_Container = styled.div`
    width: 400px;
    height: 250px;
    padding: 5px;
    background-color: ${ThemeColor2};
    position: absolute;
    margin-top: 50px;
    border-radius: 5px;
    z-index: 9999;
    box-shadow:
            0 24px 38px 3px rgba(0,0,0,.14),
            0 9px 46px 8px rgba(0,0,0,.12),
            0 11px 15px -7px rgba(0,0,0,.2);
    transition: opacity .2s ease-in-out;
`

export const EventFriendListTop_Container =styled.div`
    width: calc(100% - 20px);
    height: 20px;
    padding-inline: 10px;
    padding-top: 10px;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
`

export const EventFriendButton_Container = styled.div`
    width: 10px;
    padding: 5px;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-inline: 2px;
    border-radius: 50%;
    &:hover{
        color: ${TextColor}77;
    }
`
export const EventFriendItem_Container = styled.div`
    width: calc(100% - 10px);
    padding: 5px;
    height: 25px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: transparent;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover{
        background-color: rgb(0,0,0,0.3);
    }
    cursor: pointer;
`
export const EventFriendName_Container = styled.div`
    width: calc(100% - 60px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
`

export const FriendJoinState_Button = styled.button<{$isJoin:boolean}>`
    width: 50px;
    height: 100%;
    margin-inline: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props=> props.$isJoin ? ThemeColor2 : PointColor};
    transition: background-color 0.3s ease, color 0.3s ease;
    &:hover{
        background-color:  ${props=> props.$isJoin ? `${ThemeColor2}77` : `${PointColor}77`};
    }
`


export const EventFriendListMiddle_Container =styled.div`
    width: calc(100% - 30px);
    height: 140px;
    margin: 10px;
    background-color: ${ThemeColor3};
    border-radius: 4px;
    padding: 5px;
`

export const EventFriendListBottom_Container =styled.div`
    width: calc(100% - 20px);
    height: 60px;
    padding-inline: 10px;
`

export const JoinFriendList_Container = styled.div`
    height: 25px;
    padding-block: 5px;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
`