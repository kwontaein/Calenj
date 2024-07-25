/** NoticeList **/
import styled from "styled-components";
import {ThemeColor3} from "../../../../../../shared/ui/SharedStyled";
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
        background-color: ${ThemeColor3};
    }
`

export const GroupNoticeListTitle = styled.div`
    width:100%;
    max-width: calc(100% - 30px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`


