import styled from 'styled-components';

export const SubNavigation_Container_width:number  = 240;
export const SubNavigateTopBar_hegiht: number =40;
export const SubNavigateTopBar_padding: number =10;


export const SubNavigation_Container = styled.div`
    border-radius: 10px 0 0 0;
    min-width: ${SubNavigation_Container_width}px;
    height: 100%;
    background-color: #393E46;
`


export const SubNavigateTopBar = styled.div`
    height: ${SubNavigateTopBar_hegiht}px;
    padding: ${SubNavigateTopBar_padding}px;
    display: flex;
    flex-direction: row;
    border-bottom: 1.2px #222831 solid;
    background-color: #393E46;
    border-radius: 10px 0 0 0;
    text-align: left;
`
export const SubNavigateTopBar_leftContent =styled.div`
    height: 100%;
    width: 80%;
    font-size: 16px;
    align-content: center;
`


export const SubNavigateTopBar_EventSelecter_Container =styled.div`
    height: 100%;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const SubNavigateTopBar_rightContent_item = styled.div`
    width: 25px;
    height: 25px;
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top:-1px;
    cursor:pointer;
`



