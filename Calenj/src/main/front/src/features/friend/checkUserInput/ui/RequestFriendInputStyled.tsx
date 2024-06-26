import styled, {keyframes} from "styled-components";
import {
    PointColor,
    PointColor2,
    TextColor,
    TextColor2,
    ThemeColor2,
    ThemeColor3
} from "../../../../shared/ui/SharedStyled";

const shake = keyframes`
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-5px);
    }
    50% {
        transform: translateX(5px);
    }
    75% {
        transform: translateX(-5px);
    }
    100% {
        transform: translateX(0);
    }
`;



export const FriendEventBarItems_Container = styled.div`
    width: auto;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
`
export const AddFriendInput_Container = styled.div`
    background-color: ${ThemeColor3};
    border-radius: 5px;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px 0 10px;

    &.shake {
        animation: ${shake} 0.5s linear;
    }
`
export const AddFriendInput = styled.input`
    background-color: transparent;
    border: none;
    width: 150px;
    height: 100%;
    color: ${TextColor};
    &:focus {
        outline: none;
        border: none;
    }
`
export const AddFriendButton = styled.button`
    background-color: ${PointColor};
    border: none;
    width: 90px;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
        background-color: ${PointColor}77;
    }
`
export const WarningMessage_Div = styled.div`
    margin-top: 40px;
    background-color: ${ThemeColor2};
    height: 10px;
    text-align: center;
    display: flex;
    font-size: 10px;
    justify-content: left;
    align-items: center;
    color: ${PointColor2};
    position: absolute;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid ${PointColor2};

`

export const Message_Container = styled.div`
    font-size: 12px;
    margin-left: 10px;
`
