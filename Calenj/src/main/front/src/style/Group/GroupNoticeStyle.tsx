import styled from 'styled-components';
import {PointColor, TextColor2, ThemaColor2, BackGroundColor, TextColor, TextColor3} from "../FormStyle";
import {bool} from "yup";

const GroupNoticeModal_TopContent_Container_height =40
const GroupNoticeModal_Button_Container_height = 40;
const GroupNoticeModal_TopContent_Container_marginBottom = 10;
const GroupNoticeModal_Button_Container_marginTop =5;

interface NoticeCreateAble{
    $isAble :boolean;
}
//공지 리스트

export const GroupNoticeList_Container = styled.div`
    width: 100%;
    height: calc(100% - 10px);
`

//공지 생성하기
export const GroupNoticeModal_Container = styled.div`
    background-color: ${ThemaColor2};
    width: 400px;
    height:50%;
    padding: 15px;
    border-radius: 5px;
`
export const GroupNoticeModal_Textarea = styled.textarea`
    width: calc(100% - 10px);
    height: calc(100% - 
    ${
    GroupNoticeModal_TopContent_Container_height+
    GroupNoticeModal_Button_Container_height+        
    GroupNoticeModal_TopContent_Container_marginBottom+
    GroupNoticeModal_Button_Container_marginTop+10
    }px);
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #000000;
    font-size: 15px;
    resize: none;
`

export const GroupNoticeModal_TopContent_Container = styled.div`
    width: 100%;
    height:${GroupNoticeModal_TopContent_Container_height}px;
    margin-bottom:${GroupNoticeModal_TopContent_Container_marginBottom}px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const GroupNoticeModal_Title = styled.div`
    font-size: 20px;
`


export const GroupNoticeModal_Button_Container = styled.div`
    width: 100%;
    height:${GroupNoticeModal_Button_Container_height}px;
    margin-top: ${GroupNoticeModal_Button_Container_marginTop}px;
    display: flex;
    align-items: center;
    justify-content: right;
`
export const GroupNoticeModal_close_Btn = styled.button`
    &:hover{
        background-color: rgb(0,0,0,0.4);
    }
`

