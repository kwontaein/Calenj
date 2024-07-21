import styled from "styled-components";
import {TextColor} from "./SharedStyled";

interface CheckBoxProps{
    $bgColor:string,
}

export const CustomCheckBox_Label = styled.label`
    display: flex;
    align-items: center;
`
export const CustomCheckBox_Input = styled.input.attrs({ type: 'checkbox' })`
    display: none;
`;

export const CustomCheck_Icon = styled.span<CheckBoxProps>`
    display: inline-block;
    width: 18px;
    height: 18px;
    background-color: transparent;
    border: 1px solid  ${props=>props.$bgColor};
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    margin-right: 5px;

    ${CustomCheckBox_Input}:checked + &::before {
        content: '';
        display: block;
        width: 16px;
        height: 16px;
        background: url(https://intranet.adef.co.kr/asset/images/ic_check.png) ${props=>props.$bgColor} no-repeat center;
        border: none;
    }
`;

