import styled from "styled-components";
import {BackGroundColor, PointColor, TextColor, ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";

export const DeleteModalContainer = styled.div`
    width: 400px;
    height: 200px;
    border-radius: 5px;
    background-color: ${ThemeColor3};
`
export const Delete_Contents = styled.div`
    width: 380px;
    height: 130px;
    margin: 10px;
    background-color: ${ThemeColor3};
`
export const Delete_Warn = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${ThemeColor3};
`

export const Delete_ButtonContainer = styled.div`
    display: flex;
    height: 50px;
    background-color: ${ThemeColor3};
`
export const DeleteButton = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${ThemeColor2};
    }
`
export const CancelButton = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${PointColor};

    &:hover {
        background-color: ${PointColor}77;
    }
`
export const TitleContent_Wrapper = styled.div`
    width: calc(100% - 20px);
    padding-inline: 10px;
    padding-block: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 30px;
    font-weight: 550;
`
export const EventDetailIcon_Wrapper = styled.div`
    padding-inline: 10px;
    font-size: 20px;
    display: flex;
    align-items: center;
`
export const EventTimeContent_Wrapper = styled.div`
    width: 90%;
    display: flex;
    font-size: 15px;
`
