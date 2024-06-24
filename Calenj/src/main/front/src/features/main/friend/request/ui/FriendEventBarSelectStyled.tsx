import styled, {keyframes} from "styled-components";
import {
    PointColor,
    PointColor2,
    TextColor,
    TextColor2,
    ThemeColor2,
    ThemeColor3
} from "../../../../../shared/ui/SharedStyled";

export const FriendEventBarSelect_Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const FriendSelectTitle_Container = styled.div`
    height: 100%;
    font-size: 13px;
    display: flex;
    padding: 0 19px 0 5px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`
export const FriendSelectButton_Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 5px;
`
export const FriendSelectButton = styled.div`
    height: 100%;
    font-size: 13px;
    display: flex;
    align-items: center;
    padding: 0 14px;
    border-radius: 5px;

    &:hover {
        background-color: ${ThemeColor3};
    }
`