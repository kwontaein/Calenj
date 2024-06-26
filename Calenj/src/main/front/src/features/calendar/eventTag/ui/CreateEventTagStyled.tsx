import {PointColor, TextColor} from "../../../../shared/ui/SharedStyled";
import styled from "styled-components";
import {tagPaddingLeft} from "./DateEventTagStyled";

export const CreateTag_Container = styled.div`
    width: 100%;
    height:30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: rgb(0,0,0,0.3);
`
export const CreateTag_Content = styled.div`
    width: calc(100% - 10px); //232-10 =222
    height: calc(100% - 10px);
    display: flex;
    align-items: center;
    padding: 5px 5px 5px ${tagPaddingLeft}px;
    font-size: 14px;
    flex-direction: row;
`
export const CreateTagColor_Container = styled.div<{$color : string}>`
    display: inline-block;
    width: 20px; 
    height: 20px;
    background-color: ${props =>props.$color};
    border: 1px solid ${TextColor};
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    margin-left: 4px;
`
export const CreateTagInput_Container = styled.input.attrs({ type: 'text' })`
    width: calc(100% - 100px);//222-100 +30 +2  = 154
    margin-inline: 15px;
    background-color: transparent;
    color:${TextColor};
    border: 1px dotted ${TextColor};

    &:focus {
        outline: none;
        border: 1px solid ${PointColor};
    }
`
export const CreateTagText_Container = styled.div`
    width: calc(100% - 164px);
    background-color: transparent;
    color:${PointColor};
    font-weight: 550;
    font-size: 12px;
`