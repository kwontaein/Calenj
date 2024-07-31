import styled from "styled-components";
import {TextColor} from "../../../../shared/ui/SharedStyled";

export const MultiImage_Container = styled.div<{ $exist: boolean, $widthSize: number }>`
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    max-width: ${props => props.$widthSize}px;
    height: ${props => props.$exist ? "150px" : "0"};
    padding-top: ${props => props.$exist ? "10px" : "0"};

`
export const HR_ImageLine = styled.hr<{ $isFocus: boolean }>`
    margin: 2px;
    height: 1px;
    background-color: ${props => props.$isFocus ? TextColor : `${TextColor}77`};
    border: 0;
    border-radius: 10px;
`