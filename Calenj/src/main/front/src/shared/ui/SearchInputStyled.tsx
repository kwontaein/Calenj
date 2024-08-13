import styled from "styled-components";
import {ThemeColor3} from "./SharedStyled";

export const SearchInput_Container = styled.div`
    width: 100%;
    height: 40px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    background-color: ${ThemeColor3};
`
export const SearchInput_Wrapper = styled.input.attrs({ type: 'text' })`
    width: calc(100% - 40px);
    padding : 10px;
    box-sizing: border-box;
    background-color: ${ThemeColor3};
    border: none;
    &:focus{
        border: none;
    }
`

export const SearchIcon_Container = styled.div`
    width: 40px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
`