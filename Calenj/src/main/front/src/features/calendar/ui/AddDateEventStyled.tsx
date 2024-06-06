import styled from "styled-components";
import {BackGroundColor, PointColor, TextColor, ThemaColor2, ThemaColor3} from "../../../shared/ui/SharedStyled";
import DatePicker from "react-datepicker";

interface ButtonProps{
    $isClick : boolean,
}

interface InputProps{
    $isNull : boolean,
}

interface FormProps{
    $formState:string;
}
export const DateTopContent_Container = styled.div`
    width: calc(100% - 80px);
    margin-top: 15px;
    margin-inline: 40px;
`
export const DateContentBottom_Container = styled.div`
    margin-top: 10px;
    width: 100%;
`


export const DateEventTitle_Input = styled.input`
    width: 100%;
    height: 20px;
    border: 0;
    border-bottom: 2px solid ${BackGroundColor};
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
    margin-top: 20px;
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




export const EventContent_Container = styled.div<FormProps>`
    margin-top: 10px;
    width : calc(100% - 20px);
    height: ${props=>props.$formState ==="B" ?"180px" : "130px"};
    display: flex;
    flex-direction: row;
`
export const ContentIcon_Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 30px;
    height: 100%;
    font-size: 18px;
    align-items: center;
`

export const EventContent_TextArea = styled.textarea<InputProps>`
    width : calc(100% - 40px);
    height : calc(100% - 20px);
    margin-left: 10px;
    background-color: ${ThemaColor2};
    border : 1px solid ${ThemaColor2};
    font-size: 14px;
    padding : 10px;
    overflow-y: auto; /* 수직 스크롤을 활성화. */
    border-radius: 5px;
    color:${TextColor};
    &:focus{
        outline: none;
        border : 1px solid ${PointColor};
    }
    resize: none;
`

export const AddFriend_Container = styled.div`
    margin-top:20px;
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
`

export const AddFriendIcon_Container = styled.div`
    margin-top: 3px;
    display: flex;
    flex-direction: column;
    width: 30px;
    height: 100%;
    font-size: 18px;
    align-items: center;
`
export const AddFriend_Button = styled.button`
    font-size: 12px;
    margin-left: 8px;
    &:hover{
        background-color: ${PointColor};
    }
`
export const ModalButton_Container = styled.div`
    margin-top: 5px;
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: right;
`
