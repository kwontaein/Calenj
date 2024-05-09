import styled from 'styled-components';
import {ScrollMin_width} from '../ChatBoxStyle'
import {ThemaColor3} from "../FormStyle";
import {TextColor3, TextColor, TextColor2} from "../FormStyle";

interface ScreenModeProps{
    $mode:string;
}
export const GroupSubScreen_Container = styled.div<ScreenModeProps>`
    overflow-y: auto; /* 수직 스크롤을 활성화. */
    width: ${props=>props.$mode ==="row"? "calc(100% - 3px)" : "100%"}; //middleLine을 제외한 크기
    height: ${props=>props.$mode ==="column"? "calc(100% - 3px)" : "100%"};

    background-color: ${ThemaColor3};
`

export const GroupSubScreenTop_Container = styled.div`
    display: flex;
    height: 30px;
    align-items: center;
    padding-inline: 10px;
    justify-content: space-between;
`
export const GroupSubScreenTopIcon_Container = styled.div`
    width: auto;
    display: flex;
    align-items: center;
    color:${TextColor3};
    margin-right: 10px;
    &:hover{
        color: ${TextColor};
    }
`
export const GroupSubScreenList_HR = styled.hr`
    height: 1.5px;
    background-color: ${TextColor2};
    border: 0px;
`