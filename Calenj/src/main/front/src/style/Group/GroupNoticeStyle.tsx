import styled from 'styled-components';
import {ThemaColor2} from "../FormStyle";

const GroupNoticeModal_Button_Container_height = 40;
const GroupNoticeModal_Button_Container_marginBottom = 10;
export const CreateNotice_Btn = styled.div`
    background-color: ${ThemaColor2};
    padding: 4px;
`

export const GroupNoticeModal_Container = styled.div`
    background-color: ${ThemaColor2};
    width: 400px;
    height:50%;
    padding: 15px;
    border-radius: 5px;
`
export const GroupNoticeModal_Textarea = styled.textarea`
    width: calc(100% - 10px);
    height: calc(100% - ${GroupNoticeModal_Button_Container_height+ GroupNoticeModal_Button_Container_marginBottom+10}px);
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #000000;
    font-size: 15px;
    resize: none;
`

export const GroupNoticeModal_Button_Container = styled.div`
    width: 100%;
    height:${GroupNoticeModal_Button_Container_height}px;
    margin-bottom:${GroupNoticeModal_Button_Container_marginBottom}px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const GroupNoticeModal_Title = styled.div`
    font-size: 24px;
`

export const GroupNoticeModal_Btn = styled.button`
`