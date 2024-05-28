import styled from 'styled-components';
import {ThemaColor3} from "../FormStyle";

export const GroupUserList_Container_width = 200;
export const GroupUserList_Container = styled.div`
    width: ${GroupUserList_Container_width}px;
    height: 100%;
    font-size: 13px;
    background-color: ${ThemaColor3};
`
export const UserProfile = styled.img<{ $isOnline: boolean | undefined }>`
    border: ${({$isOnline}) => $isOnline ? 'green' : 'gray'} 3px inset;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    margin-right: 10px;
`