import styled from 'styled-components';
import {SubNavigateTopBar_hegiht, SubNavigate_padding} from "./SubNavigationStyle";
import {ThemaColor2} from "../FormStyle";

export const ContentsByEventTopBar = styled.div`
    width:auto;
    height: ${SubNavigateTopBar_hegiht}px;
    padding: ${SubNavigate_padding}px;
    background-color : ${ThemaColor2};
    border-bottom: 1.2px #222831 solid;
    display: flex;
    justify-content: center;
`

export const ContentsScreen_div = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
`