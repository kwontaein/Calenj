import styled, {keyframes} from "styled-components";
import {
    PointColor,
    PointColor2,
    TextColor,

    ThemeColor2,
    ThemeColor3
} from "../../../../shared/ui/SharedStyled";

export const FriendEventBarSelect_Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    min-width: 304px;
`
export const FriendSelectTitle_Container = styled.div`
    height: 100%;
    font-size: 13px;
    display: flex;
    padding: 0 19px 0 5px;
    align-items: center;
    flex-direction: row;
    box-sizing: border-box;
    
`
export const FriendSelectButton_Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    padding: 0 5px;
`
export const FriendSelectButton = styled.div<{ $isAble: boolean }>`
    height: 100%;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding-inline :14px;
    border-radius: 5px;
    margin-inline: 2px;
    ${props => props.$isAble && `background-color : ${ThemeColor3};`}
    &:hover {
        background-color: ${ThemeColor3}77;
    }
`

export const SignOfFriendAlarm = styled.div`
    margin-left: 30px;
    margin-top: -15px;
    width: 5px;
    height: 5px;
    position: absolute;
    background-color: ${PointColor2};
    border-radius: 10px;
    justify-content: center;
    text-align: center;
    color: ${TextColor};
`

