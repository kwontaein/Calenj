import styled from "styled-components";
import {
    SubNavigate_padding, SubNavigate_paddingBlock,
    SubNavigateTopBar_height
} from "../../../../features/group/subNavItems/ui/GroupSubNavigationStyle";
import {BackGroundColor, ThemeColor2} from "../../../../shared/ui/SharedStyled";

export const EventTopBar_Container = styled.div`
    width: calc(100% -${SubNavigate_padding * 2}px);
    height: ${SubNavigateTopBar_height}px;
    padding: ${SubNavigate_padding}px;
    padding-block: ${SubNavigate_paddingBlock}px;
    background-color: ${ThemeColor2};
    border-bottom: 1px ${BackGroundColor} solid;
    display: flex;
    flex-direction: row;
    justify-content: right;
`

export const ContentsScreen_div = styled.div`
    width:100%;
    height: calc(100% - ${SubNavigateTopBar_height + SubNavigate_paddingBlock*2}px);
    display: flex;
    flex-direction: row;
`