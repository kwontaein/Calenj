/** NoticeList **/
import styled from "styled-components";
import {ThemaColor3} from "../../../../../../shared/ui/SharedStyled";
interface subScreenWidthProps{
    $subScreenWidth: number;
}

export const GroupNoticeList_Container = styled.div`
    width: 100%;
    height: calc(100% - 5px);
`
export const GroupNoticeListView_Li = styled.li`
    width: calc(100% - 20px);
    list-style: none;
    padding-inline: 10px;
    padding-block: 10px;
    margin-block: 2px;

    &:hover {
        background-color: ${ThemaColor3};
    }
`

export const GroupNoticeListTitle = styled.div<subScreenWidthProps>`
    width:100%;
    max-width: ${props=>props.$subScreenWidth-40}px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`


