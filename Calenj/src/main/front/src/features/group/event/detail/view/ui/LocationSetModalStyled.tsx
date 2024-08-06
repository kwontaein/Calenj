import styled from "styled-components";
import {BackGroundColor, TextColor, ThemeColor2, ThemeColor3} from "../../../../../../shared/ui/SharedStyled";

export const LocationSet_Container =styled.div`
    width: 400px;
    height: 500px;
    border-radius: 4px;
    background-color: ${ThemeColor3};
    padding : 20px;
    box-sizing: border-box;
`
export const LocationSet_Title = styled.div`
    font-size: 20px;
    font-weight: 550;
    height: 30px;
`

export const LocationSearch_Input = styled.input.attrs({type:"text"})`
    width: 100%;
    height: 30px;
    border-radius: 4px;
    box-sizing: border-box;
    margin-block: 5px;
`

export const SearchResult_Container = styled.div`
    width: 100%;
    max-height: 240px;
    overflow-y: auto;
    background-color: ${ThemeColor2};
`

export const SearchResult_Item = styled.div`
    width: 100%;
    padding : 5px;
    height: 30px;
    box-sizing: border-box;
    &:hover{
        background-color: ${ThemeColor3}77;
    }
    
`