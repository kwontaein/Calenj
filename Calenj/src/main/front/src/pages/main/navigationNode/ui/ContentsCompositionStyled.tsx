import styled from "styled-components";
import {
    SubNavigate_padding,
    SubNavigateTopBar_hegiht
} from "../../../../features/group/subNavItems/ui/GroupSubNavigationStyle";
import {BackGroundColor, ThemaColor2} from "../../../../shared/ui/SharedStyled";

export const EventTopBar_Container = styled.div`
    width: calc(100% -${SubNavigate_padding*2}px);
    height: ${SubNavigateTopBar_hegiht}px;
    padding: ${SubNavigate_padding}px;
    background-color : ${ThemaColor2};
    border-bottom: 1.2px ${BackGroundColor} solid;
    display: flex;
    flex-direction: row;
    justify-content: right ;
`

export const ContentsScreen_div = styled.div`
    width:100%;
    height: calc(100% - ${SubNavigateTopBar_hegiht + SubNavigate_padding*2}px);
    display: flex;
    flex-direction: row;
`