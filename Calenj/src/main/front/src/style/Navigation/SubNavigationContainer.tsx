import styled from 'styled-components';

export const SubNavigation_Container_width:number  = 220;
export const SubNavigateTopBar_hegiht: number =50;
export const SubNavigateTopBar_padding: number =4;

export const SubNavigateTopBar = styled.div`

    height: ${SubNavigateTopBar_hegiht}px;
    padding: ${SubNavigateTopBar_padding}px;
    border-bottom: 1.2px #222831 solid;
    background-color: #393E46;
    border-radius: 10px 0 0 0;
`

export const SubNavigation_Container = styled.div`
    border-radius: 10px 0 0 0;
    min-width: ${SubNavigation_Container_width}px;
    height: auto;
    background-color: #393E46;
`


