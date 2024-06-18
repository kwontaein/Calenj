import styled from "styled-components";
import { TextColor2, ThemeColor2} from "../../../../../shared/ui/SharedStyled";

export const Controller_Container = styled.div`
    width: calc(100% - 10px);
    height: 30px;
    padding: 5px;
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
    background-color : ${ThemeColor2};
    color:${TextColor2};
    font-weight: 550;
     &:hover{background-color : ${ThemeColor2}77;
     }
    
`