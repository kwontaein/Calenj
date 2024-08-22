import styled from "styled-components";
import {PointColor, ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";

export const Create_Group_Container = styled.div`
    background-color: ${ThemeColor3};
    display: flex;
    justify-content: center;
    padding: 20px;
    border-radius: 5px;
`

export const Create_Group_Wrapper = styled.div`
`
export const Create_Group_Input = styled.input`
    background-color: ${ThemeColor2};
    width: 300px;
    height: 40px;
    font-size: 16px;
    margin-bottom: 20px;
    border-radius: 5px;
`
export const Create_Group_Button_Container = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
`
export const Create_Group_Button = styled.button`
    background-color: ${PointColor};
    width: 50px;
    padding: 5px;
    margin: 2px;
`
export const Create_Group_Button2 = styled.button`
    background-color: ${ThemeColor2};
    width: 50px;
    padding: 5px;
    margin: 2px;
`