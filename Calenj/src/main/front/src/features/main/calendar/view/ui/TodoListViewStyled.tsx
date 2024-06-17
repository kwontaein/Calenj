import styled from "styled-components";
import {ThemaColor2} from "../../../../../shared/ui/SharedStyled";

export const TodoListView_Container = styled.div<{$top:number,$left:number, $width:number}>`
    width: ${props => props.$width}px;
    height: 100px;
    background-color: ${ThemaColor2};
    position: absolute;
    border-radius: 5px;
    z-index: 2;
    top:${props => props.$top}px; 
    left:${props => props.$left}px;
    margin-top: 22px;
`