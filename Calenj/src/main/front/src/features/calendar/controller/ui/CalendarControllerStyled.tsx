import styled from "styled-components";
import {TextColor2, ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";

export const Controller_Container = styled.div`
    width: auto;
    height: 30px;
    padding-inline: 5px;
    display: flex;
    flex-direction: row;
`
export const Controller_Button = styled.button`
    width: 43px;
    height: 100%;
    display: flex;
    border-radius: 0;
    justify-content: center;
    align-items: center;
    background-color : ${ThemeColor3};
    color:${TextColor2};
    font-weight: 550;
     &:hover{background-color : ${ThemeColor3}77;
     }
    
`