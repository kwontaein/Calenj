import styled from "styled-components";
import {BackGroundColor} from "../../../../../shared/ui/SharedStyled";

export const EventTagEdit_Container = styled.div<{$index:number, $colorChange: boolean}>`
    width: ${props=>props.$colorChange ? "220px" : "150px"};
    display: flex;
    flex-direction: column;
    position:absolute;
    border-radius: 4px;
    left: 304px;
    top: ${props=>props.$index *30 +35}px;
    background-color: ${BackGroundColor};
    z-index: 1;
`

export const EventTagItem_Container= styled.div<{$colorChange?: boolean}>`
    width: calc(100% - 10px);
    height: 20px;
    padding: 5px;
    border-radius: 4px;
    text-align: center;
    ${props=> !props.$colorChange  && 
        `&:hover{
            background-color: rgb(0,0,0,3);
        }`
    }
`