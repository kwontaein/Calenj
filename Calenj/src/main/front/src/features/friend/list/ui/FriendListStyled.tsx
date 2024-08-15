import styled from "styled-components";
import {tagPaddingLeft} from "../../../calendar/eventTag/ui/DateEventTagStyled";

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
