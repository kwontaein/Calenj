import styled from 'styled-components';
import {
    TextColor,

} from "../../../../shared/ui/SharedStyled";
import {GroupUserList_Container_width} from '../../members'

interface ScreenModeProps {
    $screenRowFlex: boolean,
    $showMemberList?: boolean,
}

interface CustomScreenProps {
    $mode: string,
    $clickState: boolean,
    $width?: number,
    $height?: number,
}

interface CustomSubScreenProps {
    $mode: string,
    $screenRowFlex: boolean,
    $width?: number,
    $height?: number,
}





export const TransContentsScreen_div = styled.div<ScreenModeProps>`
    width: ${props => props.$showMemberList ? `calc(100% - ${GroupUserList_Container_width}px)` : `100%`};
    height: 100%;
    display: flex;
    flex-direction: ${props => props.$screenRowFlex ? "row" : "column"};
`

export const CustomScreen_MessageBox_Container = styled.div.attrs<CustomScreenProps>(props => ({
    style: {
        width: props.$clickState ? '100%' : props.$mode === "column" ? "100%" : `${100 - (props.$width || 0)}%`,
        height: props.$clickState ? '100%' : props.$mode === "row" ? "100%" : `calc(100% - ${props.$height}px)`
    }
}))`
    order: ${props => props.$mode === "row" ? 0 : 1};
`

export const CustomScreen_SubContent_Container = styled.div.attrs<CustomSubScreenProps>(props => ({
    style: {
        width: props.$mode === "column" ? "100%" : `${props.$width}%`,
        height: props.$mode === "row" ? "100%" : `${props.$height}px`
    }
}))`

    display: flex;
    flex-direction: ${props => props.$mode};
    order: ${props => props.$mode === "row" ? 1 : 0};
`




