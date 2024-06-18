import styled from "styled-components";
import {
    BackGroundColor,
    PointColor,
    TextColor,
    TextColor2,
    ThemeColor2,
    ThemeColor3
} from "../../../../../../shared/ui/SharedStyled";
import DatePicker from "react-datepicker";


const GroupVoteModal_TopContent_Container_height =40
const GroupVoteModal_TopContent_Container_marginBottom = 10;
const MiniVote_Input_height =30;
const GroupVoteModal_Button_Container_marginTop =5;


/** VoteMake **/

//1588 1688
export const MiniVote_Input = styled.input`
    width: calc(100% - 16px);
    height: ${MiniVote_Input_height}px;
    margin-block: 5px;
    border-radius: 5px;
    border: 2px solid ${ThemeColor2};
    padding-left: 10px;
    font-size: 14px;
    color: ${TextColor};
    background-color: ${ThemeColor2};

    &:focus {
        outline: none;
        border: 2px solid ${PointColor};
    }
`

export const ListInput_Container = styled.div`
    display: flex;
    flex-direction: row;
`
export const AddVoteList_Btn = styled.button`
    display: flex;
    position: absolute;
    margin-top: 5px;
    margin-left: 340px;
    height: ${MiniVote_Input_height+6}px;
    width: 60px;
    align-items: center;
    border-radius: 0 5px 5px 0;
    justify-content: center;
    font-size: 14px;
    font-weight: 550;
    background-color: ${BackGroundColor};
    &:hover{
        background-color: rgb(0,0,0,0.3);
    }
`

export const VoteTypeRadio_Label_Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 30px;
    align-items: center;
    &:focus{
        outline: none;
        border: 2px solid ${PointColor};
    }
`
export const VoteTypeRadio_Label = styled.label`
    margin-right: 5px;
`

export const VoteType_Radio = styled.input`
    appearance: none; /* 기본 브라우저 스타일 제거 */
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid ${ThemeColor3};
    background-color: ${ThemeColor2};
    margin-right: 5px;
    margin-top: 5px;
    /* 체크됐을 때의 색상 */
    &:checked {
        background-color: ${PointColor}; /* 체크됐을 때의 배경색 */
        border-color: ${TextColor}; /* 체크됐을 때의 테두리 색 */
    }
    &:focus {
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5); /* 포커스 효과 */
    }
`

export const VoteList_Container = styled.div`
    margin-top:5px;
    height: 170px;
    overflow-y: auto; /* 수직 스크롤을 활성화. */
`

export const VoteListEmptyText = styled.div`
    width: 100%;
    height: 100%;
    color: ${TextColor2};
    display: flex;
    align-items: center;
    justify-content: center;
`

export const VoteListItem_Container = styled.div`
    width: calc(100% - 3px);
    height: ${GroupVoteModal_TopContent_Container_height-10}px;
    display: flex;
    flex-direction: row;
    margin-block: 10px;
    border-radius: 5px;
    border: 1px solid ${TextColor2};
    border-right: 0;
    align-items: center;

`
export const VoteListItem_Content = styled.div`
    height: 100%;
    width: 360px;
    padding-left: 10px;
    display: flex;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: center;
    font-weight: 550;
`

export const VoteListContent_Drop_Btn = styled.button`
    height: ${MiniVote_Input_height+2}px;
    width: 60px;
    display: flex;
    position: relative;
    align-items: center;
    border-radius: 0 5px 5px 0;
    justify-content: center;
    font-size: 13px;
    border: 1px solid ${TextColor2};
    border-left: 0;
`

export const BottomContent_Container = styled.div`
    margin-top: 10px;
`


export const GroupVoteModal_Button_Container = styled.div`
    width: 100%;
    height:${GroupVoteModal_TopContent_Container_height}px;
    margin-top: ${GroupVoteModal_Button_Container_marginTop}px;
    display: flex;
    align-items: center;
    justify-content: right;
`

export const VoteSetting_Container = styled.div`
    width: 100%;
    height: 37px;
    display: flex;
    flex-direction: row;
`
export const VoteCheckOption_Container = styled.div`
    width: 195px;
    height: 100%;
    margin-left: 5px;
    display: flex;
    align-items: center;
`

export const VoteCheckOption_Label = styled.label`
    margin-inline: 5px;
    height: 100%;
    display: flex;
    align-items: center;
`
export const VoteCheckStyle_CheckBox = styled.input`
    appearance: none; /* 기본 브라우저 스타일 제거 */
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid ${ThemeColor3};
    background-color: ${ThemeColor2};
    margin-right: 5px;
    /* 체크됐을 때의 색상 */
    &:checked {
        background-color: ${PointColor}; /* 체크됐을 때의 배경색 */
        border-color: ${TextColor}; /* 체크됐을 때의 테두리 색 */
        border: 2px solid ${TextColor}
    }
    &:focus {
        box-shadow: ${PointColor}; /* 포커스 효과 */
    }
`



export const DatePicker_Styled = styled(DatePicker)`
    width: 200px;
    height : 20px;
    margin-block: 5px;
    border-radius: 5px;
    border: 0 solid ${ThemeColor3};
    background-color: ${ThemeColor2};
    color:${TextColor};
`;



export const VoteCounter_DatePicker = styled(DatePicker)`
    width: 200%;
    height: 30px;
    margin-block: 5px;
    background-color: ${ThemeColor2};
    color:${TextColor};
    border-radius: 5px;
    border: 2px solid ${ThemeColor2};
    padding-left: 10px;
    font-size: 14px;
    &:focus{
        outline: none;
        border: 2px solid ${PointColor};
    }
`;

