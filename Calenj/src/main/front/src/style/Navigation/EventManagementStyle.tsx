import styled from 'styled-components';
import {GroupList_Container_width} from '../Group/GroupListStyle'
import {SubNavigation_Container_width} from '../Navigation/SubNavigationContainer'

export const EventManagement_Container_height:number = 50;

export const EventManagement_Container = styled.div`
    width: auto;  
    height: ${EventManagement_Container_height}px;
    background-color: #797979;
    display: flex;
    flex-direction: row;
    border-bottom: 1.2px #222831 solid;
    border-radius: 10px 0 0 0;
`


export const SubNavigateTopBar = styled.div`
    width: ${SubNavigation_Container_width+8}px;
    padding: 4px;
    background-color: #393E46;
    border-radius: 10px 0 0 0;
`