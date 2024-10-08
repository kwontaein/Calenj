import styled from 'styled-components';
import {ThemeColor3} from "../../../../shared/ui/SharedStyled";

export const GroupUserList_Container_width = 200;
export const GroupUserList_Container = styled.div`
    width: ${GroupUserList_Container_width}px;
    height: 100%;
    font-size: 13px;
    background-color: ${ThemeColor3};
`
export const UserProfile = styled.img`
    border-radius: 50%;
    width: 25px;
    height: 25px;
    margin-right: 10px;
`