import styled from 'styled-components';
import {BackGroundColor, PointColor, TextColor, TextColor2, ThemaColor2, ThemaColor3} from "../FormStyle";

export const SubScreenSelecter_Container = styled.div`
    width: auto;
    background-color: ${BackGroundColor};
    position: relative;
    padding-block: 8px;
    padding-left: 8px;
    border-radius: 30px;
    top: 40px;
    left: 25px;
    display: flex;
    flex-direction: row;
`

export const SubScreenIcon_Container=styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: transparent solid;
    background-color: ${ThemaColor2};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    color:${TextColor2};

    font-size: 12px;
    &:hover{
        border:3px solid ${PointColor};
        background-color: ${ThemaColor3};
        color: ${TextColor};
    }
`
