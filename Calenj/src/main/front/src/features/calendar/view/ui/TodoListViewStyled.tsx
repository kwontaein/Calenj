import styled from "styled-components";
import {ThemeColor2} from "../../../../shared/ui/SharedStyled";

export const TodoListView_Container = styled.div<{$top:number,$left:number, $width:number}>`
    width: ${props => props.$width}px;
    max-height: 100px;
    background-color: ${ThemeColor2};
    position: absolute;
    border-radius: 5px;
    top:${props => props.$top}px; 
    left:${props => props.$left}px;
    margin-top: 22px;
    overflow-y: auto;
`
export const TodoList_Item = styled.div<{$R:number,$G:number,$B:number}>`
    min-height: 22px;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
 
    &:hover{
        background-color: ${props=> `rgb(${props.$R},${props.$G},${props.$B},0.3)`};
        text-overflow:unset;
        white-space:normal;
    }
  
`