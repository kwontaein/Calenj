import styled from 'styled-components';
import {SubNavigateTopBar_hegiht, SubNavigateTopBar_padding} from "./SubNavigationContainer";

export const ContentsByEventTopBar = styled.div`
    width:auto;
    height: ${SubNavigateTopBar_hegiht}px;
    padding: ${SubNavigateTopBar_padding}px;
    background-color : #31363F;
    border-bottom: 1.2px #222831 solid;
`

export const ContentsScreen_div = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`