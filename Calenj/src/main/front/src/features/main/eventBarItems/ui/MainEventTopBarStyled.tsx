import styled from "styled-components";
import {ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";

export const MainEventTopBar_Container = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `
export const RightEventBar_Container = styled.div<{$coverAble:boolean}>`
    margin-left: ${props => props.$coverAble ? '-280px' : '-30px'};
    display: flex;
    flex-direction: row;
    justify-content: right;
    position: relative;
    z-index: 0;
    height: 32px;
    &::before {
        content: "";
        width: 20px; /* 패딩과 동일한 너비 설정 */
        background: linear-gradient(to left, ${ThemeColor2}, transparent); /* 그라데이션 설정 */
        pointer-events: none; /* 클릭 이벤트 무시 */
    }
`
export const LeftEventBar_Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    position: relative;
`