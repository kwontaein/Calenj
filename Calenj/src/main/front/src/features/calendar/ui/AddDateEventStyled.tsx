import styled from "styled-components";
import {BackGroundColor, PointColor, TextColor, ThemaColor2, ThemaColor3} from "../../../shared/ui/SharedStyled";
import DatePicker from "react-datepicker";

interface ButtonProps{
    $isClick : boolean,
}

export const DateTopContent_Container = styled.div`
    width: calc(100% - 50px);
    margin-top: 20px;
    margin-inline: 50px;
`
export const DateContentBottom_Container = styled.div`
    margin-top: 30px;
    width: 100%;
`


export const DateEventTitle_Input = styled.input`
    width: 100%;
    height: 20px;
    border: 0;
    border-bottom: 2px solid ${BackGroundColor}77;
    background-color: transparent;
    font-size: 1.2rem;
    font-weight: 550;
    color: ${TextColor};
    transition: border-bottom-color 0.3s ease-in;
    &:focus{
        outline: none;
        border-bottom: 2px solid ${PointColor};
    }
`

export const Category_Container = styled.div`
    margin-top: 15px;
`
export const CategoryContent = styled.div`
    font-size: 14px;
`

export const CategoryItems_Container = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`
export const CategoryItem_Button = styled.button<ButtonProps>`
    width: 70px;
    height: 40px;
    border-radius: 5px;
    ${props=> props.$isClick && `background-color : ${PointColor}`};
`


export const DatePicker_Container = styled.div`
    width: 275px;
    height: 30px;
    padding-block: 10px;
    margin-block: 10px;
    display: flex;
    flex-direction: row;
`
export const DatePickerIcon_Container= styled.div`
    display: flex;
    flex-direction: column;
    width: 40px;
    height: 50px;
    font-size: 25px;
    align-items: center;
`
export const TimeIconText = styled.div`
    font-size: 12px;
`
export const EventDatePicker = styled(DatePicker)`
    width: 200px;
    height : 20px;
    margin-block: 5px;
    border-radius: 5px;
    margin-left: 20px;
    border: 0 solid ${ThemaColor3};
    background-color: ${ThemaColor2};
    color:${TextColor};
    font-size: 14px;
    display: flex;
    &:focus{
    }
`;
