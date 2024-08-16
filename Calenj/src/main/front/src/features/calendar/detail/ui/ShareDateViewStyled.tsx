import styled from "styled-components";
import {PointColor, TextColor, ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";

export const ShareDateView_Container = styled.div`
    width: 520px;
    height: auto
    box-sizing: border-box;
    background-color: ${ThemeColor3};
    border-radius: 0 0 8px 8px;
    margin-top: 10px;
    overflow: hidden;
    border-top: 1px solid ${TextColor}77;
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, .14);
`

export const ShareContent_Container = styled.div`
    display: flex;
    width: calc(100% - 20px);
    flex-direction: column;
    margin-inline: 10px;
`
export const ShareContent_Wrapper = styled.div`
    width: 30px;
    height: 100%;
    display: flex;
    justify-content: center;
    font-size: 10px;
    margin-block: 5px;
`
export const SideScrollBox_Container =styled.div`
    width: calc(100% - 45px);
    overflow-x: auto;
    display: flex;
    padding-left: 15px;
    flex-direction: row;
`

export const MapProfile_Container = styled.div`
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-inline: 2px;
    flex-direction: column;
`
export const ProfileName_Wrapper = styled.div`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    align-items: inherit;
    justify-content: inherit;
    font-size: 10px;
    font-weight: 550;
`

export const GroupName_Container = styled.div<{$isPick:boolean}>`
    width: 30px;
    height: 30px;
    padding: 3px;
    box-sizing: border-box;
    border-radius: 50px;
    background-color: ${props=> props.$isPick ? PointColor:ThemeColor2};
    border: 1px solid ${TextColor}20;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    font-size: 10px;
    color: white;
    font-weight: 550;
    user-select: none;
`

export const ShareButton_Container= styled.div`
    width: calc(100% - 20px);
    height: 30px;
    margin: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;    
`
export const SharePickIcon_Container = styled.div`
    position: absolute;
    margin-left: 20px;
    margin-top: 5px;
    background-color: ${PointColor};
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
`