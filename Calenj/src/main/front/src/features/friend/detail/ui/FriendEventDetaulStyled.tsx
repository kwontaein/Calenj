import styled from "styled-components";
import {PointColor, TextColor, ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";

const userProfileSize = 100;

export const RequestFriendView_Container = styled.div<{ $myRequest: boolean }>`
    width: calc(100% - 20px);
    height: ${props => props.$myRequest ? '350px' : '250px'};
    background-color: ${ThemeColor3};
    border-radius: 10px;
    padding: 10px;
`

export const SpeechBox_Container = styled.div`
    width: auto;
    height: 40px;
    margin-bottom: 15px;
    max-width: calc(100% - 150px);
    margin-left: ${userProfileSize + 35}px;
    display: flex;
    flex-direction: row;
`

export const SpeechTextBox = styled.div`
    height: calc(100% - 20px);
    padding: 10px;
    background-color: ${ThemeColor2};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const SpeechTail = styled.div`
    width: 0;
    height: 0;
    border-bottom: 10px solid ${ThemeColor2};
    border-left: 6px solid transparent;
    border-right: 12px solid transparent;
    transform: rotate(-15deg);
    margin-top: 32px;
    margin-right: -14px;
`

export const UserProfile_Container = styled.div`
    width: 100%;
    height: ${userProfileSize - 30}px;
    display: flex;
    flex-direction: row;
`


export const UserProfile = styled.div<{$userId:string}>`
    width: ${userProfileSize}px;
    height: ${userProfileSize}px;
    border-radius: 50%;
    border: 8px solid ${ThemeColor2};
    background-color: ${TextColor};
    margin-left: 10px;
    margin-top: -${userProfileSize - 40}px;
    padding: 3px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    color: white;
    user-select: none;
    background: ${props => `url("/image/savedImage/${props.$userId.trim()}.jpeg")`}, url("/image/Logo.png");
    background-size: cover;
    list-style: none;
    white-space: nowrap;
    cursor: pointer;
`

export const UserName_Container = styled.div`
    width: calc(100% - ${userProfileSize + 16 + 40}px);
    margin-left: 10px;
`

export const UserName = styled.div`
    font-size: 22px;
`
export const UserId = styled.div`
    font-size: 12px;
    margin-left: 2px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const FriendDetail_Close_Button = styled.div`
    width: auto;
    height: 15px;

    &:hover {
        color: ${TextColor}77;
    }
`

export const Content_Container = styled.div`
    width: calc(100% - 20px);
    height: calc(100% - ${userProfileSize - 30}px);
    margin-inline: 10px;
`

export const UserInfoViewSelect_Container = styled.div`
    width: 100%;
    height: 35px;
    border-bottom: 2px solid ${TextColor}77;
`

export const UserInfoView_Button = styled.button<{ $isFocus: boolean }>`
    background-color: transparent;
    margin-top: 1px;
    height: 100%;
    padding: 0;
    margin-inline: 10px;
    ${props => props.$isFocus && `border-bottom: 2px solid ${TextColor};`}
    border-radius: 0;
    transition: border-bottom-color 0.3 ease;

    &:hover {
        background-color: transparent;
    }
`
export const UserInfo_Container = styled.div`
    width: 100%;
    height: 95px;
    margin-block: 5px;
`

export const RequestFriendViewButton_Container = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: right;
`

export const UserInfoTitle_Text = styled.div`
    margin-top: 10px;
    margin-bottom: 5px;
    color: ${TextColor}77;
    font-size: 12px;
`
export const UserInfoContent_Text = styled.div`
    font-size: 14px;
`

export const UserInfoContent_Container = styled.div`
    margin-top: 10px;
    height: calc(100% - 10px);
    overflow-y: auto;
`

export const EmptyData_Content = styled.div`
    width: 100%;
    height: 100%;
    color: ${TextColor}77;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
`

export const ListItem_Container = styled.div`
    height: 40px;
    width: 100%;
    display: flex;
    flex-direction: row;

    &:hover {
        background-color: rgb(0, 0, 0, 0.3);
    }

    align-items: center;
    border-radius: 2px;
`

export const ListItem_Profile_Container = styled.div`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: ${PointColor};
    margin-inline: 5px;
`

export const ListItem_Name_Container = styled.div`
    height: 100%;
    width: calc(100% - 35px);
    display: flex;
    align-items: center;
`

export const RequestMemo_Container = styled.textarea`
    margin-block: 10px;
    height: 50px;
    border-radius: 10px;
    width: calc(100% - 10px);
    background-color: ${ThemeColor2};
    padding: 10px 5px 5px;
    border: 2px solid ${ThemeColor2};
    font-size: 12px;
    resize: none;
    font-weight: 550;
    background-color: ${ThemeColor2};
    color: ${TextColor};

    &:focus {
        outline: none;
        border: 2px solid ${PointColor};
    }
`