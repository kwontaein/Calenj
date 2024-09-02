import styled from "styled-components";
import {ThemeColor3} from "../../../../shared/ui/SharedStyled";

export const NoticeMessage_Container = styled.div`
    width: 100%;
    margin-top: 10px;
    padding-inline: 12px;
    padding-bottom: 0;
    box-sizing: border-box;
`

export const SpeakerIcon_Wrapper = styled.div`
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
`

export const NoticeMessage_Wrapper =styled.div`
    width: calc(100% - 46px);
    margin-top: 10px;
    margin-left: 10px;
`


export const NoticeTitle_Wrapper = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
export const NoticeContent_Wrapper = styled.div`
    margin-top: 5px;
`