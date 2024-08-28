import styled from "styled-components";
import {PointColor, TextColor, ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";


export const SideAlarm_TitleView_Container = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    position: fixed;
    left: 4.5em;
    z-index: 2;
`
export const SideAlarm_TitleViewTail = styled.div`
    background-color: ${ThemeColor2};
    width: 10px;
    height: 10px;
    transform: rotate(45deg);

`
export const SideAlarm_TitleViewContent = styled.div`
    background-color: ${ThemeColor2};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    padding: 5px;
    border-radius: 3px;
    position: absolute;
    left: 5px;
    font-size: 14px;
`




export const NavigateState = styled.div<{ $isClick:boolean }>`
    background-color: ${props => props.$isClick ? TextColor : "transParent"};
    width: ${props => props.$isClick ? 5.5 : 5}px;
    height: ${props => props.$isClick ? 40 : 5}px;
    border-radius: 50px;
    display: flex;
    position: absolute;
    left: -2px;
`
/**
 * 그룹 리스트의 아이콘
 */
export const Li_GroupList_Item = styled.li<{ $isClick:boolean }>`
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin-block: 8px;
    background-color: ${props => (props.$isClick ? PointColor : ThemeColor3)};
    border-radius: ${props => (props.$isClick ? "19px" : "50px")};
    white-space: nowrap;
    cursor: pointer;

    transition: background-color 0.3s ease, border-radius 0.3s ease;

    &:hover {
        ${NavigateState} {
            transition: border-wsz2 w2radius 0.3s ease, height 0.3s ease, background-color 0.3s ease, height 0.3s ease; /* 변경된 부분 */
            border-radius: 20px;
            height: ${props => props.$isClick ? 40 : 18}px;
            background-color: white;
        }

        background-color: ${PointColor};
        border-radius: 19px;
    }

    font-weight: bold;
`


/**그룹리스트별 알림 갯수 */


export const GroupListTitle = styled.div`
    width: 100%;
    overflow: hidden;
    font-size: 13px;
`



/**그룹 생성 버튼*/
export const Btn_MakeGroup = styled.button`
    appearance: none;
    list-style: none;
    background-color: ${ThemeColor3};
    height: 50px;
    width: 50px;
    border: 0;
    border-radius: 50px;
    overflow: hidden;
    margin-block: 8px;
    font-size: 20px;
    transition: background-color 0.3s ease, border-radius 0.3s ease;

    &:hover {
        background-color: ${PointColor}77;
        border-radius: 10px;
    }
`
