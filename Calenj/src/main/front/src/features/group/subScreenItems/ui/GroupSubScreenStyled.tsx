import styled from 'styled-components';
import { SubScreenColor, TextColor, TextColor2} from "../../../../shared/ui/SharedStyled";
import {MiddleLine_Size} from "../../contentItems/ui/ControlMidLineStyled";



interface OptionClick{
    $isClick:boolean;
}

interface ScreenModeProps{
    $mode:string;
}
export const GroupSubScreen_Container = styled.div<ScreenModeProps>`
    width: ${props=>props.$mode ==="row"? `calc(100% - ${MiddleLine_Size}px)` : "100%"}; //middleLine을 제외한 크기
    height: ${props=>props.$mode ==="column"? `calc(100% - ${MiddleLine_Size}px)` : "100%"};
    background-color: ${SubScreenColor};
`

export const GroupSubScreenTop_Container = styled.div`
    width: auto;
    display: flex;
    height: 35px;
    align-items: center;
    padding-inline: 10px;
    justify-content: space-between;
    overflow: hidden;
`
export const GroupSubScreenTopIcon_Container = styled.div<OptionClick>`
    display: flex;
    align-items: center;
    color:${props => props.$isClick ? TextColor:TextColor2};
    margin-right: 10px;
    &:hover{
        color: ${TextColor}77;
    }
`
export const GroupSubScreenContent_Container =styled.div`
    width: calc(100% - 10px);
    height: calc(100% - 40px);
    margin-inline: 5px;
    padding-bottom: 5px;
    overflow-y: auto; /* 수직 스크롤을 활성화. */
`

export const OptionIcon_Container = styled.div`
    color:${TextColor};
    &:hover{
        color: ${TextColor}77;
    }
`