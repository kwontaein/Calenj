import styled from "styled-components";
import {PointColor, SubScreenColor} from "../../../../style/FormStyle";
import {MiddleLine_Size} from "../../../../style/Navigation/ContentCompositionStyle";
interface CustomScreenProps{
    $mode:string,
    $width?:number,
    $height?:number,
}

export const CustomScreen_MiddleLine_div = styled.div<CustomScreenProps>`
    width:  ${props => props.$mode ==="row" ? `${MiddleLine_Size}px` : "100%"};
    height:  ${props => props.$mode ==="column" ? `${MiddleLine_Size}px` : "100%"};
    background-color: ${SubScreenColor};
    transition : background-color 0.3s ease;
    cursor: ${props => props.$mode ==="row" ? "col-resize" : "row-resize"};
    &:hover{
        background-color: ${PointColor};
    }
`
