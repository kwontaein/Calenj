import styled from 'styled-components';
import {PointColor, TextColor, TextColor2, ThemaColor2, ThemaColor3} from "../FormStyle";


const GroupNoticeModal_TopContent_Container_height =40
const GroupNoticeModal_Button_Container_height = 40;
const GroupNoticeModal_TopContent_Container_marginBottom = 10;
const GroupNoticeModal_Button_Container_marginTop = 5;
const GroupNoticeTitle_Input_height = 20;
interface NoticeCreateAble{
    $isAble :boolean;
}

interface subScreenWidthProps{
    $subScreenWidth: number;
}



/** MakeNotice **/
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
    //105(40+40+10+10+5)
    GroupNoticeModal_TopContent_Container_height+ 
    GroupNoticeModal_Button_Container_height+        
    GroupNoticeModal_TopContent_Container_marginBottom+
    GroupNoticeModal_Button_Container_marginTop+
    GroupNoticeTitle_Input_height+ 34
    }px);
    margin-top:10px;
    padding: 5px;
    border-radius: 5px;
    border: 2px solid ${ThemaColor2};
    font-size: 15px;
    resize: none;
    font-weight: 550;
    background-color: ${ThemaColor3};
    color: ${TextColor};
    &:focus{
        outline: none;
        border: 2px solid;
        border-color: ${PointColor};
    }
`


export const GroupNoticeTitle_Input = styled.input`
    width: calc(100% - 10px);
    height: ${GroupNoticeTitle_Input_height}px;
    padding: 5px;
    border-radius: 5px;
    border: 2px solid ${ThemaColor2};
    font-size: 15px;
    background-color:${ThemaColor3};
    color: ${TextColor};
    &:focus{
        outline: none;
        border: 2px solid;
        border-color: ${PointColor};
    }
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
    width: 70px;
    height: 100%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${ThemaColor3};
    margin-right: 5px;
    font-size: 14px;
    &:hover{
        background-color: rgb(0,0,0,0.4);
    }
`


/** NoticeList **/

export const GroupNoticeList_Container = styled.div`
    width: 100%;
    height: calc(100% - 5px);
`
export const GroupNoticeListView_Li = styled.li`
    width: calc(100% - 20px);
    list-style: none;
    padding-inline: 10px;
    padding-block: 15px;
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



/** NoticeDetail **/

export const NoticeDetailContainer = styled.div`
    width: 100%;
    height: calc(100% - 5px);
`

export const NoticeDetailContent_Container = styled.div`
    width: calc(100% - 20px);
    padding-inline: 10px;
    user-select: text;
    margin-top: 10px;
`

export const BoardDetailTop_Container = styled.div`
    width: calc(100% - 20px);
    height: 50px;
    padding: 10px;
    padding-block: 15px;
    background-color: ${ThemaColor3};
    color: ${TextColor};
    display: flex;
    flex-direction: row;
`
interface DetailTopProps{
    $state:string,
}
export const BoardDetailTop_title = styled.div<DetailTopProps>`
    font-size: ${props=> props.$state ==="notice"? "14px": "18px"};
    width: 100%;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    justify-content: space-between;

`
