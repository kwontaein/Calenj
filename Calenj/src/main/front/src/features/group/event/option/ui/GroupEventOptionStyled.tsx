import styled from "styled-components";
import {
    BackGroundColor,
    PointColor2,
    ThemeColor3
} from "../../../../../shared/ui/SharedStyled";

export const GroupEventOption_Container= styled.div`
    width: 110px;
    height: auto;
    background-color: ${ThemeColor3};
    position: absolute;
    margin-left: -80px;
    border-radius: 4px;
`

export const GroupEventOption_Item = styled.div`
    width: calc(100% - 28px);
    height: 15px;
    margin: 4px;
    padding: 10px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    &:hover{
        background-color: ${BackGroundColor};
        color: ${PointColor2};
    }
`